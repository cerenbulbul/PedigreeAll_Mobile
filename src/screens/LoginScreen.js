import React, { useState } from "react";

import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { FilledButton } from "../components/FilledButton";
import { Input } from "../components/Input";
import { Error } from "../components/Error";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SwipeablePanel } from "rn-swipeable-panel";
import { Root, Popup,Toast } from "../components/Popup";
export function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checked, toggleChecked] = React.useState(false);
  const [isOverlay, toggleIsOverlay] = useState(false);
 
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [panelProps, setPanelProps] = useState({
    //fullWidth: true,
    //openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    closeOnTouchOutside: true,
  });
  const [isPanelActive, setIsPanelActive] = useState(false);
  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  let popupRef = React.createRef();
  const onShowPopup = () => {
    popupRef.show();
  };
  const onClosePopup = () => {
    popupRef.close();
  };

  return (
    
    
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
    >
    <Root>
    <View style={{position:"absolute", width:'100%',height:'100%'}}>
      <Image
        resizeMode={"contain"}
        style={styles.image}
        source={require("../../assets/logo.png")}
      />
      <SwipeablePanel
        {...panelProps}
        isActive={isPanelActive}
        style={styles.swipeContainer}
      >
        <View style={styles.ViewContainer}>
          <Text>Bottom Popup</Text>
        </View>
      </SwipeablePanel>

      <View
        style={{ paddingTop: 50, flex: 1, padding: 16, alignItems: "center" }}
      >
        <Error error={""} />

        <View style={styles.inputView}>
          <Icon style={styles.icon} name="envelope" size={20} color="#2e3f6e" />
          <Input
            placeholder={"Email"}
            keyboardType={"email-address"}
            name={"username"}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputView}>
          <Icon style={styles.icon} name="key" size={20} color="#2e3f6e" />
          <Input
            style={styles.searchIcon}
            placeholder={"Password"}
            secureTextEntry
            name={"password"}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.checkBoxContainer}>
          
          <Text
            style={{ fontWeight: "bold", color: "#2e3f6e", paddingRight: 0 }}
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            Forgot Password{" "}
          </Text>
        </View>
        
        <FilledButton
          title="Login"
          style={styles.loginButton}
          onPress={() =>
            Popup.show({
                type: 'Success',
                title: 'Upload complete',
                button: true,
                textBody: 'Congrats! Your upload successfully done',
                buttonText: 'Ok',
                callback: () => Popup.hide()
              })
                    }
          
        />
        

        <View style={styles.TextView}>
          <Text>New to PedigreeAll? </Text>
          <Text
            style={{ color: "#2e3f6e", fontSize: 18, fontWeight: "bold" }}
            onPress={() => {
              navigation.navigate("Register", {
                headerTitle: "abc",
                countryID: 0,
                countryCode: "",
                countryName: "Select a country",
                countryIcon: "flag",
              });
            }}
          >
            Create an account.
          </Text>
        </View>
      </View>
      </View>
      </Root>
      
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    marginBottom: 48,
  },
  image: {
    margin: 15,
    marginBottom: 50,
    top: 80,
    width: "100%",
    height: "9%",
    right: 15,
  },
  background: {
    bottom: 0,
    top: 0,
    height: "100%",
    width: "100%",
  },
  inputView: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    width: "100%",
    padding: 20,
    borderRadius: 8,
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    paddingLeft: 20,
  },
  TextView: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  swipeContainer: {
    width: "100%",
  },
  ViewContainer: {
    padding: 20,
  },
  OverlayContainer: {
    width: "80%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  MiddlePopupButton: {
    backgroundColor: "#2e3f6e",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

/*

onPress={toggleOverlay}
<PopupMiddle visible = {visible} toggleOverlay ={toggleOverlay} title="deneme1"></PopupMiddle>

*/

/*

const [panelProps, setPanelProps] = useState({
  fullWidth: true,
  openLarge: true,
  showCloseButton: true,
  onClose: () => closePanel(),
  onPressCloseButton: () => closePanel(),
  // ...or any prop you want
});
const [isPanelActive, setIsPanelActive] = useState(false);

const openPanel = () => {
  setIsPanelActive(true);
};

const closePanel = () => {
  setIsPanelActive(false);
};



<View >
      <Text >Welcome to React Native!</Text>
      <Text >To get started, edit App.js</Text>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
         
      </SwipeablePanel>
    </View>

*/

/*

 <BottomPopup
            ref = {(target) => popupRef = target}
            onTouchOutside = {onClosePopup}
            title = "Demo popup">
            </BottomPopup>
            
*/



/* Checkbox

<CheckBox
            containerStyle={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              paddingLeft: 0,
            }}
            center
            title="Remember Me"
            checked={checked}
            onPress={() => {
              toggleChecked(!checked);
            }}
          />

*/