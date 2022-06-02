import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'

import { EventRegister } from 'react-native-event-listeners';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigation from './src/containers/BottomTabNavigation.js';
import themeContext from './config/themeContext.js';
import theme from './config/theme.js';

export default function App() {

  const [mode, setMode] = useState('grappeTheme');

  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
      console.log(data)
    })
    return () => {
      EventRegister.removeEventListener(eventListener)
    }
  })

  return (
    <themeContext.Provider value={mode === 'grappe' ? theme.grappeTheme : theme.grappeTheme} style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTabNavigation/>
      </NavigationContainer>
      <StatusBar style="auto"/>
    </themeContext.Provider>
  );
}