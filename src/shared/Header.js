import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import themeContext  from '../../config/themeContext';

export default function Header(props) {

  const theme = useContext(themeContext);

  const switchButtonAction = (name) => {

    switch(name){
      case 'NotificationBack':
        handleBackButtonClick()
        break;
      case 'NotificationSetting':
        props.navigation.navigate('NotificationAdvanceStack');
        break;
      case 'NotificationAdvanceBack':
        handleBackButtonClick()
        break;
    }
  }

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  return (
    <View style={[ styles.headerContainer, { backgroundColor: theme.surface, height: 100 }]}>
      <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
        <TouchableOpacity style={{ flex: 1, left: 30 }}
        onPress={() => { switchButtonAction('NotificationBack') }}>
          {props.type === 'Notification' && <MaterialIcons name='arrow-back-ios' size={30} color={theme.textOnLight}/>}
        </TouchableOpacity>
        <View style={{ flex: 3, alignItems: 'center'}}>
          <Text style={{ fontSize: 20, color: theme.primary, fontWeight: 'bold' }}>{props.name}</Text>
        </View>
        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', right: 30 }}
          onPress={() => { switchButtonAction(props.type === 'Notification' ? 'NotificationSetting' : 'NotificationAdvanceBack') }}>
          {props.type === 'Notification' && <Ionicons name='settings-outline' color={theme.textOnLight} size={30}/>}
          {props.type === 'NotificationAdvance' && <Ionicons name='close-outline' size={40} color={theme.textOnLight}/> }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});