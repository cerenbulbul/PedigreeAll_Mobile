import React, { useState,useEffect } from "react";
import { StyleSheet, View, Text, StatusBar, Button , TouchableOpacity,Platform, Dimensions} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchBar } from "react-native-elements";
import { MyStatusBar } from "../components/StatusBar";
import { TopBarView } from "../View/TopBarView";
const Drawer = createDrawerNavigator();
const API_URL = "http://api.pedigreeall.com/";

export function MainScreen({ navigation }) {
  

  const [searchText, setSearchText] = React.useState("");
  return (
    <View style={styles.container}>
      <MyStatusBar barStyle="light-content" />
      <TopBarView navigation={navigation} />
      <View>
        <SearchBar
          lightTheme={true}
          placeholder="Type Here..."
          containerStyle={{ backgroundColor: "#fff" }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          value={searchText}
          onChangeText={(e) => {
            setSearchText(e);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  topBarContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#2e3f6e",
    alignItems: "center",
    flexDirection: "row",
  },
  TopBarIcon: {
    marginLeft: 30,
  },
  TopBartText: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 30,
  },
  buttonContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
  },
});
