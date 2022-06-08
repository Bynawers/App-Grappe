import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Wine = (props) => {

  const [pageToggle, setPageToggle] = useState(false);

  return(
    <Modal
    animationType="slide"
    transparent={props.visible}
    visible={props.visible}
    onRequestClose={() => { props.setVisible(false); }}>

      <TouchableWithoutFeedback onPress={ () => props.setVisible(false) }>
        <View style={styles.filterOverlay}/>
      </TouchableWithoutFeedback>

      <View style={[styles.filterContent, { backgroundColor: 'white' }]}>

        <View style={[styles.topContainer, { backgroundColor: props.theme.primary }]}>
          <View style={{ height: '100%', width: '30%', alignItems: 'center', justifyContent: 'center', top: '10%' }}>
            <TouchableOpacity style={{ justifyContent: 'center', padding: 10 }}
            onPress={() => props.setVisible(false)}>
              <MaterialIcons name='arrow-back-ios' size={30} color={props.theme.textOnDark}/>
            </TouchableOpacity>
          </View>
        </View>
      

        <View style={{ flex: 1, backgroundColor: props.theme.primary }}>
        <Image source={require('../../../assets/redWine.png')} style={styles.image}/>
          <View style={[ styles.titleWineContainer, { backgroundColor: props.theme.background }]}>
            <Text style={{ fontSize: 20, color: props.theme.textOnLight, fontWeight: 'bold'}}>{props.dataSelect.name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}/>
            <View style={{ flex: 1.2, marginBottom: '10%'}}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 30, color: props.theme.textOnDark, fontWeight: 'bold'}}>{props.dataSelect.date}</Text>
                <Text style={{ fontSize: 20, color: props.theme.textOnDark }}> : années</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 30, color: props.theme.textOnDark, fontWeight: 'bold'}}>{props.dataSelect.type.toUpperCase()}</Text>
                <Text style={{ fontSize: 20, color: props.theme.textOnDark }}> : type</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 30, color: props.theme.textOnDark, fontWeight: 'bold'}}>INFO</Text>
                <Text style={{ fontSize: 20, color: props.theme.textOnDark }}> : info</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 30, color: props.theme.textOnDark, fontWeight: 'bold'}}>INFO</Text>
                <Text style={{ fontSize: 20, color: props.theme.textOnDark }}> : info</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1.3, backgroundColor: props.theme.background, borderRadius: 30 }}>
            <View style={{ flex: 2.5 }}></View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: pageToggle ? props.theme.primary : props.theme.background, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 30 }}
              onPress={() => {setPageToggle(true)}}>
                <Text style={{ color: pageToggle ? props.theme.textOnDark : props.theme.textOnLight }}>Lorem ipsum</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, backgroundColor: pageToggle ? props.theme.background : props.theme.primary, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 30 }}
              onPress={() => {setPageToggle(false)}}>
                <Text style={{ color: pageToggle ? props.theme.textOnLight : props.theme.textOnDark }}>Lorem ipsum</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </View>

    </Modal>
 
  );
}

const styles = StyleSheet.create({
  filterOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  filterContent: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  topContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '15%',
  },
  titleWineContainer: {
    flex: .3, 
    marginLeft: '35%', 
    borderTopLeftRadius: 20, 
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    position: 'absolute', 
    zIndex: 5,
    width: 500,
    height: 500,
    resizeMode: "contain",
    right: 50,

  }
})

export default Wine;