import React, { useState } from "react";

import { StyleSheet, ScrollView, View, Vibration, Text, TouchableOpacity ,InteractionManager,Switch } from "react-native";
import { FilledButton } from "../components/FilledButton";
import { Input } from "../components/Input";
import { Error } from "../components/Error";
import { AuthContainer } from "../components/AuthContainer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ListItem, SearchBar,CheckBox } from "react-native-elements";
import Flag from "react-native-flags";

export function RegistrationScreen({ route, navigation }) {
  const { countryID, countryCode,countryName, countryIcon } = route.params;
  const {headerTitle} = route.params;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_again, setPassword_again] = React.useState("");
  const [name, setname] = React.useState("");
  const [surname, setsurname] = React.useState("");
  const [error, setError] = React.useState("");
  const [checked_1, toggleChecked_1] = useState(true);
  const [checked_2, toggleChecked_2] = useState(false);
  const [flagText, setFlagText] = React.useState(countryName);
  const [countryIconText, setCountryIcon] = React.useState(countryIcon);
  const onSelect = (country) => {
    setFlagText(countryName);
    console.log(countryName)
  }
  const unsubscribe = navigation.addListener('focus', () => {
    // The screen is focused
    // Call any action
    setFlagText(countryName);
    console.log(countryName);
    setCountryIcon(countryIcon);
    console.log(countryIcon);
    console.log(navigation);
    navigation.setParams({ name: headerTitle })
    console.log(navigation);
  })
 
 

  return (

    <AuthContainer>
      <ScrollView style={styles.scrollContainer}>

        <Error error={error} />
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
            placeholder={"Password"}
            secureTextEntry
            name={"password"}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputView}>
          <Icon style={styles.icon} name="key" size={20} color="#2e3f6e" />
          <Input
            placeholder={"Password Again"}
            secureTextEntry
            name={"password"}
            value={password_again}
            onChangeText={setPassword_again}
          />
        </View>

        <View style={styles.inputView}>
          <Icon style={styles.icon} name="user" size={20} color="#2e3f6e" />
          <Input placeholder={"Name"} value={name} onChangeText={setname} />
        </View>

        <View style={styles.inputView}>
          <Icon style={styles.icon} name="user" size={20} color="#2e3f6e" />
          <Input
            placeholder={"Surname"}
            value={surname}
            onChangeText={setsurname}
          />
        </View>
       
       
        <TouchableOpacity  style={styles.FlagContainer} onPress={() => {
              navigation.navigate("Countries");
              //setFlagText(countryName);
              //console.log(setFlagText);
              
            }}>
            {countryIconText === 'flag' ? 
              <Icon style={styles.icon} name={countryIconText} size={20} color="#2e3f6e" /> 
              : <Flag code={countryIconText} size={24} />
            }
            
            
            <Text style={styles.FlagText}>{flagText}</Text>
        </TouchableOpacity>
        <View style={styles.CheckboxView}>
        <CheckBox
            center
            title="Bireysel"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            style={styles.checkbox}
            checked={checked_1}
            onPress={() => {
              if (checked_2 === true) {
                toggleChecked_1(!checked_1);
                toggleChecked_2(!checked_2);
              }
            }}
          />

          <CheckBox
            center
            title="Kurumsal"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            style={styles.checkbox}
            checked={checked_2}
            onPress={() => {
              if (checked_1 === true) {
                toggleChecked_2(!checked_2);
                toggleChecked_1(!checked_1);
              }
            }}
          />
          
        </View>
      </ScrollView>

      <FilledButton
        title="Register"
        style={styles.registerButton}
        onPress={async (e) => {
          try {
            //await register(email, password);
            //console.log(e);
            //alert(selectedPersonTypeValue+ ' ' +selectedCountryValue);
            if (email === "") {
              setError("Email is required");
              Vibration.vibrate(10);
            } else if (password === "" || password_again === "") {
              setError("Password is required");
              Vibration.vibrate(10);
            } else if (password_again != password) {
              setError("Passwords are not match");
              Vibration.vibrate(10);
            } else if (name === "") {
              setError("Name is required");
              Vibration.vibrate(10);
            } else if (surname === "") {
              setError("Surname is required");
              Vibration.vibrate(10);
            } else {
              //navigation.navigate("Main");
            }
          } catch (e) {
            console.log(e);
          }
          //register(email,password);
        }}
      />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    marginVertical: 8,
  },
  registerButton: {
    marginVertical: 32,
  },
  scrollContainer: {
    paddingTop: 0,
    width: "100%",
  },
  picker: {
    backgroundColor: "#e8e8e8",
    padding: 8,
    borderRadius: 8,
    alignSelf: "stretch",
    marginTop: 8,
    marginBottom: 8,
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
  buttonView: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#e8e8e8",
    width: "100%",
    padding: 20,
    borderRadius: 8,
  },
  icon: {
    paddingLeft: 20,
  },
  RadioButton: {
    marginVertical: 8,
    flex: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  CheckboxView: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  FlagContainer: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    width: "100%",
    padding: 20,
    borderRadius: 8,

  },
  FlagText: {
    fontSize: 18,
    paddingLeft:20,
  },
  flag: {
    marginRight: 8,
    width: "100%",
    position: "absolute",
  },
});

/*

Picker


<View style={styles.picker}>
          <Picker
            selectedValue={selectedPersonTypeValue}
            onValueChange={(itemValue, itemIndex) => setPersonType(itemValue)}
          >
            {PersonType.map((item, key) => (
              <Picker.Item
                label={item.PERSON_TYPE_TR}
                value={item.PERSON_TYPE_ID}
                key={key}
                PERSON_TYPE_TR={item.PERSON_TYPE_TR}
              />
            ))}
          </Picker>
        </View>


<View style={styles.picker}>
<Picker
            selectedValue={selectedCountryValue}
            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
          >
            {Country.map((item, key) => (
              <Picker.Item
                label={item.COUNTRY_EN}
                value={item.COUNTRY_ID}
                key={key}
                PERSON_TYPE_TR={item.COUNTRY_EN}
              />
            ))}
          </Picker>
           </View>

*/

/*

Group Button 

<RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View style={{ flexDirection: "row", alignItems: "center",alignContent:'center' , justifyContent:'center'}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Bireysel</Text>
              <RadioButton value="Bireysel" backgroundColor="black"/>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center",marginLeft:30 }}>
              <Text>Kurumsal</Text>
              <RadioButton value="Kurumsal" backgroundColor="black" />
            </View>
          </View>
        </RadioButton.Group>

*/

/*
FLAGG 


{country === null && (
              <Flag
              style = {{marginTop:7}}
              code="TR"
              size={32}
            />)}

            {country !== null && (
              <Flag
              style = {{marginTop:7}}
              code={country.cca2}
              size={32}
            />)}

*/


/* 

<CheckBox
            center
            title="Bireysel"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            style={styles.checkbox}
            checked={checked_1}
            onPress={() => {
              if (checked_2 === true) {
                toggleChecked_1(!checked_1);
                toggleChecked_2(!checked_2);
              }
            }}
          />

          <CheckBox
            center
            title="Kurumsal"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            style={styles.checkbox}
            checked={checked_2}
            onPress={() => {
              if (checked_1 === true) {
                toggleChecked_2(!checked_2);
                toggleChecked_1(!checked_1);
              }
            }}
          />

*/