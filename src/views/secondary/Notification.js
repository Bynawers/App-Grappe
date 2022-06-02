import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

import NotificationComponent from '../../components/home/NotificationComponent.js';
import Header from '../../shared/Header.js'

export default function Notification({navigation}) {

  const theme = useContext(themeContext);

  const data = require('../../data/example/notifications.json');

  return (
    <>
      <Header name='Notifications' navigation={navigation} type='Notification'/>
      <View style={[styles.line, { backgroundColor: theme.separation }]}/>
      
      <ScrollView style={{  height: '100%', width: '100%', backgroundColor: theme.surface}}
        contentContainerStyle={{ paddingBottom: 100 }}>

        <View style={styles.mainContainer}>
          {data.example.map((item, index) =>{
            return(
              <React.Fragment key={index}>
                <NotificationComponent name={item.type} date={item.date} description={item.description}/>
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