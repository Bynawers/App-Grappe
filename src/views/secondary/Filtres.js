import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Image, Animated } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import themeContext from '../../../config/themeContext';

export default function Filtres (props){

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

  return(
    <Modal
    animationType="slide"
    transparent={props.visible}
    visible={props.visible}
    onRequestClose={() => { props.setVisible(false); }}>

      <Animated.View style={[ styles.headerContainer, { backgroundColor: theme.primary, height: headerHeight }]}>
        <Animated.View style={[ styles.headerComponentsContainer, { opacity: opacity }]}>

          <TouchableOpacity style={{ justifyContent: 'center', left: 30, paddingBottom: 10, flex: 1 }}
            onPress={() => props.setVisible(false)}>
            <MaterialIcons name='arrow-back-ios' size={30} color={props.theme.textOnDark}/>
          </TouchableOpacity> 

          <View style={{ flex: 3, alignItems: 'center'}}>
            <Text style={{ color: theme.textOnDark, fontSize: 20 }}>Rechercher des vins</Text>
          </View>

          <TouchableOpacity style={{ flex: 1 }}
          onPress={() => props.setVisible(false)}>
            <Text style={{ fontSize: 20, color: 'white' }}>Apply</Text>
          </TouchableOpacity>

        </Animated.View>
      </Animated.View>
      
      <View style={{ backgroundColor: theme.primary }}>
        <Animated.ScrollView style={[ styles.scrollContainer, { backgroundColor: theme.textOnDark }]}
          contentContainerStyle={{ paddingTop: 15, paddingBottom: 100, flexGrow: 1 }}
          decelerationRate={4}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
            {useNativeDriver: false},
          )}>
          <FiltresComponent theme={theme}/>
        </Animated.ScrollView>
      </View>

    </Modal>
 
  );
}

const FiltresComponent = (props) => {
  return(
    <View style={{ flex: 1}}>
      <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: '5%', marginBottom: 15, color: props.theme.primary}}>Filtrer par:</Text>
      <View style={[styles.line, {backgroundColor: props.theme.separation }]}/>

      <FiltresElement name='Prix' theme={props.theme}/>
      <FiltresElement name='Type de vins' theme={props.theme}/>
      <FiltresElement name='Année' theme={props.theme}/>
      <FiltresElement name='Région' theme={props.theme}/>
      <FiltresElement name='Domaine' theme={props.theme}/>
    </View>
  );
}

const FiltresElement = (props) => {

  const [visible, setVisible] = useState(false);

  const [select, setSelect] = useState("");

  return(
    <>
    <TouchableOpacity style={styles.filtresElementContainer}
    onPress={ () => { setVisible(!visible); } }>
      <View style={{ justifyContent: 'center', flex: 1, marginTop: 20, marginBottom: 20}}>
        <Text style={styles.filtresElementText}>{props.name}</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1, right: 40 }}>
        <AntDesign name={visible ? 'down' : 'right' } color='black' size={30}/>
      </View>
    </TouchableOpacity>
    {visible && props.name === "Type de vins" &&
      <View style={{ marginTop: 10, marginBottom: 40, paddingLeft: '5%', paddingRight:'5%', flexDirection: 'row'}}>

        <TouchableOpacity style={[ styles.buttonTypeDeVin, { backgroundColor: select === "Rouge" ? props.theme.primary : props.theme.separation }]} 
        onPress={() => setSelect("Rouge")}>
          <Text style={{ fontSize: 20, color: 'white'}}>Rouge</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ styles.buttonTypeDeVin, { backgroundColor: select === "Rose" ? props.theme.primary : props.theme.separation }]}
        onPress={() => setSelect("Rose")}>
          <Text style={{ fontSize: 20, color: 'white'}}>Rose</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ styles.buttonTypeDeVin, { marginRight: 0, backgroundColor: select === "Blanc" ? props.theme.primary : props.theme.separation }]}
        onPress={() => setSelect("Blanc")}>
          <Text style={{ fontSize: 20, color: 'white'}}>Blanc</Text>
        </TouchableOpacity>

      </View>

    }
    <View style={[styles.line, { backgroundColor: props.theme.separation }]}/>
    </>
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
  line: {
    width: '100%',
    height: 1
  },
  filtresElementText: {
    fontSize: 20,
  },
  filtresElementContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: '5%'
  },
  buttonTypeDeVin: {
    flex: 1, 
    height: 40,
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 20,
  }
});