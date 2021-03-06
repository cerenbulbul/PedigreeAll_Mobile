import React from "react";

import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Dimensions,
} from "react-native";
import { FilledButton } from "../components/FilledButton";
import { Input } from "../components/Input";
import { Error } from "../components/Error";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Global } from '../Global';
 
export function ForgotPassword({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checked, toggleChecked] = React.useState(false);
  const [focus_email, focus_email_toggle] = React.useState(true);

  const [getEmailPlaceholder, setEmailPlaceholder] = React.useState("")
  const [getSendPasswordButtonText, setSendPasswordButtonText] = React.useState("")

  React.useEffect(() => {
    if (Global.Language===1) {
      setEmailPlaceholder("Eposta adresini gir")
      setSendPasswordButtonText("Şifre Gönder")
    }
    else{
      setEmailPlaceholder("Enter your email address")
      setSendPasswordButtonText("Send Password")
    }
  }, []);

  return (
      <View style={styles.background} >

<ImageBackground source={require('../../assets/background.jpg')} style= {{flex: 1,
        resizeMode: "stretch"}}>
      <Image
      resizeMode={'contain'}
        style={styles.image}
        source={require('../../assets/logo.png')}
      />

      <View style= {{paddingTop:50 , flex: 1,
    padding: 16,
    alignItems: 'center',}}>
        <Error error={""} />
        <View style={styles.inputView} >
          <Icon
            style={styles.icon}
            name="envelope"
            size={20}
            color="#2e3f6e"
          />
          <Input
            placeholder={getEmailPlaceholder}
            keyboardType={"email-address"}
            name={"username"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <FilledButton
          title={getSendPasswordButtonText}
          style = {styles.button}
          onPress={async () => {
            fetch('https://api.pedigreeall.com/systemuser/RemindPassword?p_sEmail='+ email, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                })
                  .then((response) => response.json())
                  .then((json) => {
                    alert(json.m_lUserMessageList[0])
                    navigation.navigate('LoginScreen')
                  })
                  .catch((error) => {
                    console.error(error);
                  })
            
          }}
        />
        
      </View>
    </ImageBackground>

      </View>
    
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
    right:15
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height //for full screen
    
  },
  inputView: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#e8e8e8',
    width:'100%',
    padding:20,
    borderRadius:8,
  },
  checkBoxContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:'100%',
  },
  icon:{
    paddingLeft:20,
    
  },
  TextView:{
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
    padding:20,
    borderRadius:8,
  },
  button:{
      marginTop:20,
  }
});
