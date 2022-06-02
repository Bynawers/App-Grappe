import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

export default function NotificationAdvanceComponent(props) {

  const theme = useContext(themeContext);

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  }

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.surface }]}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ left: 20, flex: 1 }}>
            <Text style={{ color: theme.textOnLight, fontSize: 15}}>{props.name}</Text>
          </View>
          <View style={{ right: 30 }}>
            <Switch 
              trackColor={{ false: theme.separation, true: theme.textOnLight }}
              ios_backgroundColor={theme.separation} 
              onValueChange={toggleSwitch}
              value={isEnabled}/>
          </View>
        </View>
      </View>
      <View style={[ styles.line, { backgroundColor: theme.separation }]}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    flexDirection: 'row'
  },
  line: {
    height: 1, 
    width: '100%',
  }
});