import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, Switch, TouchableOpacity, TextInput , Alert} from 'react-native'
import { Input } from "../components/Input";
import { Error } from "../components/Error";
import Icon from "react-native-vector-icons/FontAwesome5";
import { FilledButton } from "../components/FilledButton";
import { Root, Popup, Toast } from "../components/Popup";
import Flag from "react-native-flags";
import { SwipeablePanel } from "rn-swipeable-panel";
import RBSheet from "react-native-raw-bottom-sheet";
import { SettingBottomSheet } from '../components/SettingBottomSheet'
import { BlueButton } from '../components/BlueButton';
import AsyncStorage from '@react-native-community/async-storage'

export function ContactScreen({ navigation }) {
  const refRBSheet = useRef();
  const [getName, setName] = React.useState("");
  const [getEmail, setEmail] = React.useState("");
  const [getPhone, setPhone] = React.useState("");
  const [getMessage, setMessage] = React.useState("");

  const alertDialog = (messageTitle, message) =>
  Alert.alert(
      messageTitle,
      message,
      [
          {
              text: "OK",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
          },
      ],
      { cancelable: false }
  );


  const [panelProps, setPanelProps] = useState({
    openLarge: false,
    onlySmall: true,
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

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            refRBSheet.current.open()
          }}>
          <Icon name="cogs" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  const readSendEmail = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Email/SendEmail', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify({
            "BCC_EMAIL_LIST": [],
            "EMAIL_LIST": [
              "info@pedigreeall.com"
            ],
            "HTML_MESSAGE": getName + "<br/>" + getEmail + "<br/>" + getMessage,
            "SUBJECT": "Site Mesaj",
          })
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.m_eProcessState === 1) {
              alertDialog("Congratulations", json.m_lUserMessageList[1])
              setName("")
              setEmail("")
              setMessage("")
          }
          else {
              alertDialog("Error", json.m_lUserMessageList[1])
          }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <Root>
      <View style={styles.Container}>



        <View style={styles.ContactContainer}>

          <View style={{ marginVertical: 40, paddingLeft: 10, paddingRight: 10 }}>



            <Text style={styles.Title}>Contact</Text>

            <View style={styles.ButtonsContainer}>

              <View style={styles.TextInputContainer}>
                <Icon name="user" size={16} color="#222" />
                <Text style={styles.TextInputHeader}>Your Name: </Text>
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={"Name"}
                  name={"username"}
                  value={getName}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.TextInputContainer}>
                <Icon name="envelope" size={16} color="#222" />
                <Text style={styles.TextInputHeader}>Email&Phone: </Text>
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={"Email & Phone"}
                  keyboardType={"email-address"}
                  name={"mail"}
                  value={getEmail}
                  onChangeText={setEmail}
                />
              </View>


              <TextInput
                style={styles.LongImputStyle}
                placeholder={"Message"}
                name={"message"}
                value={getMessage}
                onChangeText={setMessage}
                multiline={true}
              />


              <BlueButton
                title="Submit"
                style={styles.SubmitButton}
                onPress={async (e) => {
                  if (getName === '') {
                    Toast.show({
                      type: 'Danger',
                      title: 'Name is undefined',
                      text: 'You have to type your name',
                      color: '#e74c3c',
                    })
                  }
                  else if (getEmail === '') {
                    Toast.show({
                      type: 'Danger',
                      title: 'Email is undefined',
                      text: 'You have to type your email',
                      color: '#e74c3c',
                    })
                  }
                  else {
                    Popup.show({
                      type: 'Success',
                      title: 'Sent',
                      button: true,
                      textBody: 'Congrats! You submitted successfully.',
                      buttonText: 'Ok',
                      callback: () => Popup.hide()
                    })
                    readSendEmail();
                  }
                }
                }

              />

              <Text style={styles.ThankfullText}>Thank You For Contacting Us.</Text>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.SocialIconContainer}>
                  <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.facebook.com/pedigreeallcom'); }}
                    style={styles.SocialMediaItems}>
                    <Icon name="facebook" size={32} color="#222" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { Linking.openURL('https://twitter.com/pedigreeall'); }}
                    style={styles.SocialMediaItems}>
                    <Icon name="twitter" size={32} color="#222" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.instagram.com/pedigreeallcom/'); }}
                    style={styles.SocialMediaItems}>
                    <Icon name="instagram" size={32} color="#222" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { Linking.openURL('https://www.linkedin.com/company/pedigreeall'); }}
                    style={styles.SocialMediaItems}>
                    <Icon name="linkedin" size={32} color="#222" />
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>


        </View>



      </View>

    </Root>
  )
}


const styles = StyleSheet.create({
  Container: {
    bottom: 0,
    top: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  ContactContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",

  },
  Title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  ButtonsContainer: {
    marginVertical: 20
  },
  Input: {
    width: '100%',
    padding: 10,
    marginVertical: 5
  },
  InputMessage: {
    marginVertical: 20,
    padding: 70,
  },
  SubmitButton: {
    marginVertical: 15
  },
  ThankfullText: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 16,
    color: '#2169ab'
  },
  swipeContainer: {
    width: "100%",
  },
  SwipeablePanelContainer: {
    padding: 20,
  },
  SwipeablePanelItem: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SwipeablePanelText: {
    fontSize: 18,
  },
  FlagContainer: {
    flexDirection: 'row',
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  TextInputContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center'
  },
  TextInputHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  },
  InformationText: {
    fontSize: 16,
    marginLeft: 5
  },
  HalfInputStyle: {
    width: '90%',
    paddingLeft: 20,
    fontSize: 16,
    margin: 0,
  },
  LongImputStyle: {
    marginVertical: 5,
    width: '100%',
    height: 100,
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 18,
    margin: 0,
    padding: 10,
    borderColor: 'silver',
    borderWidth: 0.5,
    lineHeight: 23,
    textAlignVertical: 'top',
  },
  SocialIconContainer: {
    width: '70%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: "row",
    marginVertical: 20,
  },
  SocialMediaItems: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: '#e0e1e2'
  },
});
