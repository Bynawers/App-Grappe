import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, TextInput } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';
import Filtres from "../secondary/Filtres.js";

export default function Home({navigation}) {

  const theme = useContext(themeContext);

  const scrollPosition = useRef(new Animated.Value(0)).current;
  const minHeaderHeight = 0
  const maxHeaderHeight = 100
  const headerHeight = scrollPosition.interpolate({
    inputRange: [0, 200],
    outputRange: [maxHeaderHeight, minHeaderHeight],
    extrapolate: 'clamp',
  });
  const opacity = scrollPosition.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  });

  return (
    <>
      <Animated.View style={[ styles.headerContainer, { backgroundColor: theme.primary, height: headerHeight }]}>
        <Animated.View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, opacity: opacity }}>
          <Animated.View style={{ flex: 1, alignItems: 'flex-end', right: 10 }}>
            <Image source={require('../../../assets/Logo_Purple.png')} style={[ styles.imageGrappe, { tintColor: theme.textOnDark }]}/>
          </Animated.View>
          <View style={{ flex: 3}}>
            <Text style={{ color: theme.textOnDark, fontSize: 25 }}>Search</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', right: '10%'}}>
            <Ionicons name='notifications' size={30} color={theme.primary}/>
          </View>
        </Animated.View>
      </Animated.View>
      
      <View style={{ backgroundColor: theme.primary }}>
      <Animated.ScrollView style={{  height: '100%', width: '100%', borderRadius: 30, backgroundColor: theme.background }}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
          {useNativeDriver: false},
        )}>
          <SearchMainComponent theme={theme}/>

      </Animated.ScrollView>
      </View>
    </>
  );
}

const SearchMainComponent = (props) => {

  const data = require('../../data/api/wine.json');

  const [visible, setVisible] = useState(false);

  const [text, onChangeText] = React.useState("Rechercher");

  return(
    <View style={{ flex: 1, marginTop: 40 }}>

      <View style={styles.topContainer}>
        <View style={styles.search}>
          <TextInput style={styles.input} onChangeText={onChangeText} value={text}
          onFocus={() => { console.log('focus') }}
          onBlur={() => { console.log('leave focus') }}/>
        </View>
        <TouchableOpacity style={[ styles.filtres, { backgroundColor: props.theme.primary }]}
        onPress={() => { setVisible(true); }}>
          <Text style={{ fontSize: 15, color: props.theme.textOnDark }}>Filtres</Text>
        </TouchableOpacity>
      </View>

      {data.wine.map((item, index) => {
        return(
          <React.Fragment key={index}>
            <WineComponent name={item.name} theme={props.theme} have={false} wish={true}/>
          </React.Fragment>
        );
      })}
      
      <Filtres visible={visible} setVisible={setVisible} theme={props.theme}/>
    </View>
  );
}

const WineComponent = (props) => {

  const [have, setHave] = useState(props.have);
  const [wish, setWish] = useState(props.wish);

  return(
    <>
      <View style={[ styles.line, { backgroundColor: props.theme.separation }]}/>
      <View style={{ backgroundColor: 'white', flex: 1, height: 200, flexDirection: 'row'}}>

        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <Image style={styles.wineImage} source={require('../../../assets/redWine.png')}/>
        </View>

        <View style={{ flex: 0.7, marginTop: 10}}>

        <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: props.theme.primary, fontWeight: 'bold', fontSize: 20 }}>{props.name}</Text>
          </View>

          <View style={{ flex: 0.9, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

            <TouchableOpacity style={{ marginRight: 20 }}
            onPress={() => { setHave(!have) }}>
              <FontAwesome name={have ? 'heart' : 'heart-o'} color={have ? 'red' : props.theme.textOnLight} size={40}/>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => { setWish(!wish) }}>
              <FontAwesome name={wish ? 'bookmark' : 'bookmark-o'} color={wish ? props.theme.primary : props.theme.textOnLight} size={40}/>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </>
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
  imageGrappe: {
    position: 'relative',
    resizeMode: "contain", 
    width: 30, 
    height: 30, 
    tintColor: 'white', 
  },
  topContainer: {
    width: '100%', 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    flexDirection: 'row',
    marginBottom: 50
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
  line: {
    width: '100%',
    height: 1,
  },
  wineImage: {
    position: 'relative',
    resizeMode: "contain",
    width: '100%',
    height: '90%'
  }
});
