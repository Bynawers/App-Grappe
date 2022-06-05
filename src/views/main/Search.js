import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

export default function Home({navigation}) {

  const theme = useContext(themeContext);

  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 0
  const maxHeaderHeight = 100
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 100],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });
  const opacity = scrollPosition.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });

  return (
    <>
      <Animated.View style={[ styles.headerContainer, { backgroundColor: theme.primary, height: headerHeight }]}>
        <Animated.View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, opacity: opacity }}>
          <Animated.View style={{ flex: 1, alignItems: 'flex-end', right: 10 }}>
            <Image source={require('../../../assets/Logo_Purple.png')} style={[ styles.imageGrappe, { tintColor: theme.textOnDark }]}/>
          </Animated.View>
          <View style={{ flex: 3}}>
            <Text style={{ color: theme.textOnDark, fontSize: 25 }}>Search</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', right: '10%'}}>
            <TouchableOpacity style={{marginRight: '30%'}}
            onPress={() => { navigation.push('NotificationStack') }}>
              <Ionicons name='notifications' size={30} color={theme.textOnDark}/>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => { navigation.push('RewardStack') }}>
              <FontAwesome5 name='coins' size={30} color={'#f1cb66'}/>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
      
      <View style={{ backgroundColor: theme.primary }}>
      <Animated.ScrollView style={{  height: '100%', width: '100%', backgroundColor: theme.background, borderRadius: 30}}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
          {useNativeDriver: false},
        )}>
        <View style={styles.mainContainer}>
          <Text>Component</Text>
        </View>
      </Animated.ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
