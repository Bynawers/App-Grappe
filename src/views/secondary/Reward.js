import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Header from '../../shared/Header.js';
import ComingSoon from '../third/ComingSoon.js';

import themeContext  from '../../../config/themeContext';

export default function Reward({navigation}) {

  const theme = useContext(themeContext);

  return (
    <>
      <Header name='Reward' navigation={navigation}/>
        <View style={styles.mainContainer}>
          <ComingSoon name='reward'/>
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