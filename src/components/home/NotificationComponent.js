import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

export default function NotificationComponent(props) {

  const theme = useContext(themeContext);

  return (
    <>
      <TouchableHighlight
        style={[styles.container, { backgroundColor: theme.surface }]}
        activeOpacity={0.6}
        underlayColor={theme.separation}
        onPress={() => {}}>
        <View style={{ flex: 1, flexDirection: 'row' }}>

          <View style={{ flex: .2, alignItems: 'center', paddingTop: 10 }}>
            <Entypo name='info-with-circle' color='black' size={35}/>
          </View>

          <View style={{ flex: .8, flexDirection: 'column', paddingTop: 15 }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: .7 }}>
                <Text style={{ color: theme.textOnLight, fontSize: 15, color: '#B4ABAB' }}>{props.name}</Text>
              </View>
              <View style={{ flex: .3, alignItems: 'flex-end', paddingRight: 15 }}>
                <Text style={{ color: '#B4ABAB' }}>{props.date}</Text>
              </View>
            </View>

            <View style={{ flex: 1,justifyContent: 'flex-end', alignContent: 'center', paddingBottom: 20 }}>
              <Text>{props.description}</Text>
            </View> 

          </View>

        </View>
      </TouchableHighlight>
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