import React, { useContext, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, BackHandler, TextInput } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

export default function SeeMore({route, navigation}) {

  const { name } = route.params;

  const theme = useContext(themeContext);

  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 0
  const maxHeaderHeight = 100
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 75],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });
  const opacity = scrollPosition.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  return (
    <>
      <Animated.View style={[ styles.headerContainer, { backgroundColor: theme.primary, height: headerHeight }]}>
        <Animated.View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, opacity: opacity }}>

          <View style={{ flex: 1, flexDirection: 'row', left: '10%'}}>
            <TouchableOpacity
            onPress={() => { handleBackButtonClick() }}>
              <MaterialIcons name='arrow-back-ios' size={30} color={'white'}/>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 3, alignItems: 'center'}}>
            <Text style={{ color: theme.textOnDark, fontSize: 25 }}>{name}</Text>
          </View>

          <View style={{ flex: 1 }}/>

        </Animated.View>
      </Animated.View>
      
      <View style={{ backgroundColor: theme.primary }}>
      <Animated.ScrollView style={{  height: '100%', width: '100%', backgroundColor: theme.background, borderRadius: 30}}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
          {useNativeDriver: false},
        )}>
        <Component theme={theme}/>
      </Animated.ScrollView>
      </View>
    </>
  );
}

const Component = (props) => {

  const [text, onChangeText] = React.useState("Rechercher");

  return(
    <View style={{ flex: 1, marginTop: 40 }}>

      <View style={styles.topContainer}>
        <View style={styles.search}>
          <TextInput style={styles.input} onChangeText={onChangeText} value={text}
          onFocus={() => { console.log('focus') }}
          onBlur={() => { console.log('leave focus') }}/>
        </View>
        <TouchableOpacity style={[ styles.filtres, { backgroundColor: props.theme.primary }]}>
          <Text style={{ fontSize: 15, color: props.theme.textOnDark }}>Filtres</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonAddContainer}>
        <TouchableOpacity style={[styles.buttonAdd, { backgroundColor: props.theme.primary }]}>
          <Ionicons name='add' color='white' size={40}/>
        </TouchableOpacity>
      </View>
      
    </View>
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
    height: 50, 
    width: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  topContainer: {
    width: '100%', 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    flexDirection: 'row',
    marginBottom: 30
  },
  search: {
    backgroundColor: 'white', 
    flex: 2, 
    height: '100%', 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    paddingLeft: '5%', 
    marginLeft: '5%', 
    marginRight: '5%',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  filtres: {
    flex: 1, 
    height: '100%', 
    borderRadius: 30,
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: '5%'
  },
  input: {
    fontSize: 15,
    color: '#858585',
    flex: 1,
    width: '100%'
  },
  buttonAddContainer: {
    flex: 1, 
    alignItems: 'center',
    height: 50
  },
  buttonAdd: {
    flex: 1,
    borderRadius: 15,
    height: 50,
    width: 50, 
    justifyContent: 'center',
    alignItems: 'center'
  }
});
