import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';

import themeContext  from '../../../config/themeContext';

export default function Profile({navigation}) {

  const theme = useContext(themeContext);

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}/>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../assets/Logo_Purple.png')} style={[ styles.imageGrappe, { tintColor: theme.primary }]}/>
          <Text style={{ color: theme.primary, fontSize: 25, fontWeight: 'bold'}}>Grappe</Text>
        </View>

        <View style={styles.buttonsContainer}>

          <TouchableHighlight style={styles.circleButton}
            activeOpacity={0.6}
            underlayColor={'#CBCBCB'}
            onPress={() => {}}>
            <AntDesign name='earth' color='black' size={30}/>
          </TouchableHighlight>
          
          <TouchableHighlight style={styles.circleButton}
            activeOpacity={0.6}
            underlayColor={'#CBCBCB'}
            onPress={() => {}}>
            <Entypo name='pinterest' color='black' size={30}/>
          </TouchableHighlight>

          <TouchableHighlight style={styles.circleButton}
            activeOpacity={0.6}
            underlayColor={'#CBCBCB'}
            onPress={() => {}}>
            <FontAwesome name='facebook-f' color='black' size={30}/>
          </TouchableHighlight>

        </View>
      </View>
      
      <View style={styles.mainContainer}>

        <Text style={[styles.titleSectionText, { color: theme.primary }]}>Personnel</Text>
        <BoxComponent data={['Paramètre du compte',  'Points de fidélités', 'Préférences']}/>

        <Text style={[styles.titleSectionText, { color: theme.primary }]}>Application</Text>
        <BoxComponent data={['Préférences', 'Langues']}/>

        <Text style={[styles.titleSectionText, { color: theme.primary }]}>A propos</Text>
        <BoxComponent data={['Préférences', 'Langues']}/>

      </View>
    </>
  );
}

const BoxComponent = (props) => {

  return(
    <View style={styles.boxComponentContainer}>
      {props.data.map((item, index) => {
        return(
          <React.Fragment key={index}>
            <>
              <TouchableHighlight 
              style={[ styles.button, { borderTopLeftRadius: index === 0 ? 15 : 0, borderTopRightRadius: index === 0 ? 15 : 0, 
                borderBottomLeftRadius: index === props.data.length - 1 ? 15 : 0, borderBottomRightRadius: index === props.data.length - 1 ? 15 : 0 }]}
                activeOpacity={0.6}
                underlayColor={'#CBCBCB'}
                onPress={() => {}}>
                <Text>{item}</Text>
              </TouchableHighlight>

              {index !== props.data.length - 1 &&
                <View style={styles.line}/>}
            </>
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'F0F0F0',
    marginRight: '5%',
    marginLeft: '5%',
  },
  headerContainer: {
    height: 200, 
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  imageGrappe: {
    position: 'relative',
    resizeMode: "contain", 
    width: 50, 
    height: 50, 
    tintColor: 'white', 
  },
  titleSectionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxComponentContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#CBCBCB'
  },
  button : {
    height: 50, 
    width: '100%', 
    justifyContent: 'center', 
    paddingLeft: '10%',
  },
  circleButton: {
    height: 40, 
    width: 40, 
    backgroundColor: 'white', 
    borderRadius: 30,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 1
  }, 
  buttonsContainer: {
    flex: 1, 
    width: '100%', 
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center'
  }
});