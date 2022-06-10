import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import themeContext  from '../../config/themeContext';

export default function Header(props) {

  const theme = useContext(themeContext);

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

  const switchButtonAction = (name) => {

    switch(name){
      case 'back':
        handleBackButtonClick()
        break;
      case 'setting':
        props.navigation.navigate('NotificationAdvanceStack');
        break;
    }
  }

  const params = {
    styles: {
      background: (props.name === 'Actualités' || props.name === "Reward") ? theme.primary : theme.surface,
      text: (props.name === 'Actualités' || props.name === "Reward") ? theme.textOnDark : theme.primary,
      shadow: true
    },
    button: {
      backArrow: (props.name === 'Notifications' || props.name === 'Reward' || props.name === 'Actualités') ? true : false,
      backCross: (props.name === 'Notifications avancées') ? true : false,
      setting: (props.name === 'Notifications') ? true : false,
      actionName: (props.name === 'Notifications') ? 'setting' : 'back'
    }
  }
  
  return (
    <View style={[ styles.headerContainerShadow, 
      { backgroundColor: params.styles.background, shadowOpacity: params.styles.shadow ? 0.3 : 0 }]}>
      <View style={styles.headerComponentsContainer}>

        <TouchableOpacity style={styles.headerLeftComponent}
        onPress={() => { switchButtonAction('back') }}>
          {params.button.backArrow && 
            <MaterialIcons name='arrow-back-ios' size={30} color={params.styles.text}/>}
        </TouchableOpacity>

        <View style={styles.headerMiddleComponent}>
          <Text style={[ styles.title, { color: params.styles.text }]}>{props.name}</Text>
        </View>

        <TouchableOpacity style={styles.headerRightComponent}
          onPress={() => { switchButtonAction(params.button.actionName) }}>
          {params.button.setting && 
            <Ionicons name='settings-outline' color={theme.textOnLight} size={30}/>}
          {params.button.backCross
            && <Ionicons name='close-outline' size={40} color={theme.textOnLight}/> }
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainerShadow: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 100,
    width: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    flexDirection: 'row',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerComponentsContainer: {
    flex: 1, 
    flexDirection: 'row', 
    paddingBottom: 10, 
    alignItems: 'center'
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  headerLeftComponent: {
    flex: 1, 
    left: 30
  },
  headerMiddleComponent: {
    flex: 3, 
    alignItems: 'center'
  },
  headerRightComponent: {
    flex: 1, 
    alignItems: 'flex-end', 
    right: 30
  }
});