import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, TextInput } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

export default function Evaluation({navigation}) {

  const theme = useContext(themeContext);

  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 0
  const maxHeaderHeight = 300
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 100],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });
  const opacity = scrollPosition.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });

  const [text, onChangeText] = React.useState("Rechercher");

  return (
    <>
      <Animated.View style={[ styles.headerContainer, { backgroundColor: theme.primary, height: headerHeight }]}>

        <Animated.View style={{ flex: .3, flexDirection: 'row', opacity: opacity }}>
          <Animated.View style={{ flex: 1, alignItems: 'flex-end', right: 10 }}>
            <MaterialIcons name='arrow-back-ios' size={30} color={theme.textOnDark}/>
          </Animated.View>
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={{ color: theme.textOnDark, fontSize: 30 }}>Mes évaluations</Text>
          </View>
          <View style={{ flex: 1 }}/>
        </Animated.View>

        <Animated.View style={[styles.searchEvaluation, { opacity: opacity }]}>
          <View style={styles.search}>
            <TextInput style={styles.input} onChangeText={onChangeText} value={text}/>
          </View>
        </Animated.View>
        <Animated.View style={{ flex: 1, alignItems: 'center', width: '100%', opacity: opacity }}>
          <TouchableOpacity style={styles.addIcon}>
            <Ionicons name='add' color='white' size={40}/>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      
      <View style={{ backgroundColor: theme.primary }}>
      <Animated.ScrollView style={{  height: '100%', width: '100%', borderRadius: 30, backgroundColor: theme.background }}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
          {useNativeDriver: false},
        )}>
        <View style={styles.mainContainer}>
          
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
    height: 100, 
    paddingTop: '15%',
    width: '100%',
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  imageGrappe: {
    position: 'relative',
    resizeMode: "contain", 
    width: 30, 
    height: 30, 
    tintColor: 'white', 
  },
  searchEvaluation: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flex: 1, 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  input: {
    fontSize: 15,
    color: '#858585',
    flex: 1,
    width: '100%'
  },
  search: {
    backgroundColor: 'white', 
    width: '80%', 
    height: 45, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    paddingLeft: '5%'
  },
  addIcon: {
    height: 50,
    width: 50, 
    backgroundColor: '#8e538e', 
    borderRadius: 15, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});
