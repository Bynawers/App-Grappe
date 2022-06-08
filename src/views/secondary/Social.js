import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

export default function Social(props) {

  const theme = useContext(themeContext);

  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 0
  const maxHeaderHeight = 100
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 150],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View style={[ styles.headerContainer, { backgroundColor: theme.primary, height: headerHeight}]}>
        <View style={{ flex: 1, alignSelf: 'flex-end', flexDirection: 'row', paddingBottom: 10 }}>
        <View style={{ flex: 1, left: 30 }}>
          <MaterialIcons name='arrow-back-ios' size={30} color={theme.textOnDark}/>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{color: theme.textOnDark, fontSize: 25}}>Actualités</Text>
        </View>
        <View style={{ flex: 1 }}/>
        </View>
      </Animated.View>
      
      <View style={{ backgroundColor: theme.primary }}>
      <Animated.ScrollView style={{  height: '100%', width: '100%', backgroundColor: theme.background}}
        contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
          {useNativeDriver: false},
        )}>
        <View style={styles.mainContainer}>
          <Text>Social</Text>
        </View>
      </Animated.ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 50, 
    width: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  imageGrappe: {
    position: 'relative',
    resizeMode: "contain", 
    width: 30, 
    height: 30, 
    tintColor: 'white', 
  }

});