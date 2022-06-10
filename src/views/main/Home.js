import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

import themeContext  from '../../../config/themeContext';
import Wine from '../secondary/Wine.js';

export default function Home({navigation}) {

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

  return (
    <>
      <Animated.View style={[ styles.headerContainer, { backgroundColor: theme.primary, height: headerHeight }]}>
        <Animated.View style={[ styles.headerComponentsContainer, { opacity: opacity }]}>

          <Animated.View style={styles.logoContainer}>
            <Image 
            source={require('../../../assets/Logo_Purple.png')} 
            style={[ styles.imageGrappe, { tintColor: theme.textOnDark }]}
            />
          </Animated.View>

          <View style={styles.titleContainer}>
            <Text style={{ color: theme.textOnDark, fontSize: 25 }}>Grappe</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{marginRight: '30%'}}
            onPress={() => { navigation.push('NotificationStack') }}>
              <Ionicons name='notifications' size={30} color={theme.textOnDark}/>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => { navigation.push('RewardStack') }}>
              <FontAwesome5 name='coins' size={30} color={'#f1cb66'}/>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </Animated.View>
      
      <View style={{ backgroundColor: theme.primary }}>
        <Animated.ScrollView style={[ styles.scrollContainer, { backgroundColor: theme.background }]}
          contentContainerStyle={{ paddingTop: 50, paddingBottom: 100, flexGrow: 1 }}
          decelerationRate={4}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
            {useNativeDriver: false},
          )}>
          <HomeComponent theme={theme} navigation={navigation}/>
        </Animated.ScrollView>
      </View>
    </>
  );
}

const HomeComponent = (props) => {

  const dataMesVins = require('../../data/example/mesVins.json');

  const [dataSelect, setDataSelect] = useState({name: 'none', year: -1, rate: -1, type: 'none'});

  const [visible, setVisible] = useState(false);

  return(
    <View style={{ flex: 1 }}>
      <HomeTitle navigation={props.navigation} theme={props.theme} name='Mes vins'/>
      <ListData data={dataMesVins} setVisible={setVisible} setDataSelect={setDataSelect}/>

      <HomeTitle navigation={props.navigation} theme={props.theme} name='Liste de souhaits'/>
      <ListData data={dataMesVins} setVisible={setVisible} setDataSelect={setDataSelect}/>

      <View style={styles.buttonsContainer}>
        <BottomComponent name='Actualitées' navigation={props.navigation}/>
        <BottomComponent name='Evaluation' navigation={props.navigation}/>
      </View>

      <PersonalisationButton theme={props.theme}/>

      <Wine setVisible={setVisible} visible={visible} theme={props.theme} dataSelect={dataSelect}/>

    </View>
  );
}

const HomeTitle = (props) => {
  return(
    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: '5%' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: props.theme.primary }}>{props.name}</Text>
      </View>
      <TouchableOpacity style={{ flex: .4, alignItems: 'flex-end', justifyContent: 'center', marginRight: '5%'}}
      onPress={() => { props.navigation.navigate("SeeMoreStack", {name: props.name}) }}>
        <Text style={{ fontSize: 15, color: props.theme.primary, fontFamily: 'System'}}>Tout Afficher</Text>
      </TouchableOpacity>

    </View>
  );
}

const ListData = (props) => {
  return(
    <View style={styles.listWineContainer}>
      <FlatList
        data={props.data.example}
        renderItem={({item, index}) => { return(<DataRender name={item.name} date={item.date} rate={item.rate} type={item.type} navigation={props.navigation} setVisible={props.setVisible} setDataSelect={props.setDataSelect}/>); }}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
    </View>
  );
}

const PersonalisationButton = (props) => {
  return(
    <TouchableOpacity style={[ styles.buttonPersonalisation, { backgroundColor: props.theme.primary}]}
      onPress={ () => {}}>
      <View style={{ flex: .4, alignItems: 'flex-end', justifyContent: 'center' }}>
        <Ionicons name='options-outline' color='white' size={30}/>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>Personalisation</Text>
      </View>
    </TouchableOpacity>
  );
}

const DataRender = (props) => {

  return(
    <TouchableOpacity style={styles.componentWine}
    onPress={ () => {props.setVisible(true); props.setDataSelect({name: props.name, date: props.date, rate: props.rate, type: props.type}) }}>
      <View style={styles.textRender}>
        <Text numberOfLines={1} style={{ fontWeight: 'bold', flexWrap: 'wrap', flex: 1 }}>{props.name}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row'}}>

        <View style={{ flex: .5, marginLeft: 10, marginBottom: 15 }}>
          <Image style={{ width: '100%', height: '100%', resizeMode: "contain" }} source={require('../../../assets/redWine.png')}/>
        </View>

        <View style={{ flex: 1, alignItems: 'center', marginBottom: '15%' }}>
          <View style={{ flex: 1 }}>
            <Text>{props.date}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{props.type}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#EFCE4A'}}>{props.rate}/5</Text>
            <Ionicons name='star' color='#EFCE4A' size={20}/>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
}

const BottomComponent = (props) => {
  return(
    <TouchableOpacity style={ styles.bottomComponent }
    onPress={ () => props.navigation.navigate(props.name === "Evaluation" ? 'EvaluationStack' : 'SocialStack')}>
      <View style={{ flex: .5, alignItems: 'center' }}>
        {props.name === 'Actualitées' && <MaterialIcons name='local-fire-department' color='#ff9f00' size={40}/>}
        {props.name === 'Evaluation' &&  <Ionicons name='star' color='#EFCE4A' size={40}/>}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', alignItems: 'flex-start' }}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  /*Header*/
  scrollContainer: {
    height: '100%', 
    width: '100%', 
    borderRadius: 30
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center', 
  },
  logoContainer: {
    flex: 1, 
    alignItems: 'flex-end', 
    right: 10
  },
  titleContainer: {
    flex: 3
  },
  buttonContainer: {
    flex: 1, 
    flexDirection: 'row', 
    right: '10%'
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
  headerComponentsContainer: {
    flex: 1, 
    flexDirection: 'row', 
    paddingBottom: 10,
  },
  imageGrappe: {
    position: 'relative',
    resizeMode: "contain", 
    width: 30, 
    height: 30, 
    tintColor: 'white', 
  },
  /*HomeComponent*/
  componentWine: {
    height: 140, 
    width: 115,
    marginLeft: 10, 
    borderRadius: 30,
    backgroundColor: 'white'
  },
  listWineContainer: {
    height: 140, 
    width: '100%', 
    marginBottom: 20
  },
  textRender: {
    flex: .3, 
    alignItems: 'center', 
    paddingTop: 10, 
    flexWrap: 'auto', 
    marginRight: '5%', 
    marginLeft: '5%',
  },
  bottomComponent: {
    flex: 1, 
    backgroundColor: 'white', 
    height: '100%', 
    marginRight: '3%',
    marginLeft: '3%', 
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonsContainer: {
    height: 70, 
    width: '100%', 
    marginBottom: 30, 
    flexDirection: 'row'
  },
  buttonPersonalisation: {
    height: 50, 
    marginRight: '25%', 
    marginLeft: '25%', 
    flexDirection: 'row', 
    borderRadius: 25
  }
});
