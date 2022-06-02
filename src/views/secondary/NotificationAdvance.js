import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

import NotificationAdvanceComponent from '../../components/home/NotificationAdvanceComponent.js';
import Header from '../../shared/Header.js'

export default function NotificationAdvance({navigation}) {

  const theme = useContext(themeContext);

  const data = require('../../data/using/notificationAdvanceData.json');

  return (
    <>
      <Header name='Notifications avancées' navigation={navigation} type='NotificationAdvance'/>
      <View style={[styles.line, { backgroundColor: theme.separation }]}/>
      
      <ScrollView style={{  height: '100%', width: '100%', backgroundColor: theme.surface}}
        contentContainerStyle={{ paddingBottom: 100 }}>

        <View style={styles.mainContainer}>
          {data.using.map((item, index) =>{
            return(
              <React.Fragment key={index}>
                <NotificationAdvanceComponent name={item.name}/>
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
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
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  imageGrappe: {
    position: 'relative',
    resizeMode: "contain", 
    width: 30, 
    height: 30, 
    tintColor: 'white', 
  },
  line: {
    height: 1, 
    width: '100%'
  }

});