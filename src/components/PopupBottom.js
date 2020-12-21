import React, { useState } from "react";
import { StyleSheet, View, Modal,Button,TouchableOpacity  } from "react-native";
import {  Text, Overlay } from "react-native-elements";
import Animated from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome5";
import { FilledButton } from "./FilledButton";
import SwipeablePanel from 'rn-swipeable-panel';


export default function PopupBottom({ visible, toggleOverlay, title }) {
    const [modalVisible, setModalVisible] = useState(true);
    return (
      <Overlay
      overlayStyle={styles.OverlayContainer}
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      //animationType = 'fade'
    >

    <View style={styles.ViewContainer} >
        <Icon style={styles.Icon} name="envelope" size={20} color="#2e3f6e" />

        <Text style={styles.Title}>{title.toUpperCase()}</Text>

        <Text style={styles.Subtitle}>{title}</Text>

        <TouchableOpacity type="outline" title="Ok" style={styles.button}>

          <Text style={styles.ButtonText}>Ok.</Text>

          </TouchableOpacity>
      </View>

    
      
    </Overlay>
    )
}

const styles = StyleSheet.create({
  OverlayContainer: {
    marginHorizontal: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  ViewContainer: {
    width: "100%",
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Icon: {
    marginVertical: 8,
  },
  Title: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  Subtitle: {
    marginVertical: 8,
    fontSize: 16,
  },
  button:{
    padding:15,
    width:"70%",
    marginVertical: 8,
    backgroundColor:'rgb(182, 186, 193)',
    borderRadius:8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText:{
    color:"white",
    fontSize:18,
    justifyContent:'center',
    textAlign:'center'
  }
});