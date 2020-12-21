import React, { useState } from "react";
import { StyleSheet, View, Modal ,TouchableOpacity,RefreshControl  } from "react-native";
import { Button, Text, Overlay } from "react-native-elements";
import Animated from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome5";
import { FilledButton } from "./FilledButton";
import SwipeablePanel from 'rn-swipeable-panel';

export default function PopupMiddle({Isvisible, IstoggleOverlay}) {

  const [visible, setVisible] = useState(Isvisible);
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  {console.log("popup: "+ Isvisible)}

  if(Isvisible === true) {
    return (
      <Overlay
              isVisible={Isvisible}
              animationType="fade"
              onBackdropPress={IstoggleOverlay}
            >
              <View style={styles.ViewContainer}>
                <Icon
                  style={styles.Icon}
                  name="envelope"
                  size={20}
                  color="#2e3f6e"
                />
  
                <TouchableOpacity 
                style={styles.MiddlePopupButton}
                onPress={() => {
                    setVisible(false);
                  }}>
                <Text>Ok</Text>
                </TouchableOpacity>
              </View>
            </Overlay>
    );
  }
  else {
    return(
      null
    )
  }
  
  
}
const styles = StyleSheet.create({
  OverlayContainer:{
    width:'80%',
    borderRadius:8,
    justifyContent:'center',
    alignItems: "center",
  },
  MiddlePopupButton:{
    backgroundColor:'#2e3f6e',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius:8,
  },
  buttonText:{
    color:'white',
    fontSize:16,
  }
});
