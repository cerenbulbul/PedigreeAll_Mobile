import React, { useState,useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export function TopBarView({ navigation }) {

    return (
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon style={styles.TopBarIcon} name="bars" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.TopBartText}>PedigreeAll</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon style={styles.TopBarIconSetting} name="cogs" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
    );
  }


const styles = StyleSheet.create({
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
    TopBarIconSetting:{
      right:0,
    alignItems:'flex-end',
    alignContent:'flex-end',
    alignSelf:'flex-end',
    
    },
    TopBartText: {
      color: "#fff",
      fontSize: 24,
      marginLeft: 30,
    },
  });
  