import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import themeContext  from '../../config/themeContext';

export default function Header(props) {

  const theme = useContext(themeContext);

  return (
    <View style={[ styles.headerContainer, { backgroundColor: theme.surface, height: 100 }]}>
      <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
        <TouchableOpacity style={{ flex: 1, left: 30 }}>
          {props.type === 'Notification' && <MaterialIcons name='arrow-back-ios' size={30} color={theme.textOnLight}/>}
        </TouchableOpacity>
        <View style={{ flex: 3, alignItems: 'center'}}>
          <Text style={{ fontSize: 20, color: theme.primary, fontWeight: 'bold' }}>{props.name}</Text>
        </View>
        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end', right: 30 }}
          onPress={() => {props.navigation.navigate('NotificationAdvanceStack');}}>
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