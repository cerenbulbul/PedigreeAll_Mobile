import React from "react";
import AsyncStorage from '@react-native-community/async-storage'
import Data from './Data';

export class Global {
    static IsLogin = false;
    static Token = "";
    static Horse_ID = 1673471;
    static Horse_ID_Second = -1;
    static Horse_Second_ID_Female_Family = -1;
    static Generation = 5;
    static TJK_ID = 60991;
    static HorseDetail;
    static Horse_First_ID;
    static Horse_Second_ID;
    static Generation_Hypothetical=5;
    static EffectiveNick_Code = "StandardThoroughbred"
    static BreedingContentScreenName= "";
    static MinCross = 2;
    static MinCross_Fename_Family = 2;


    static getToken = async () => {
        try {
          const token = await AsyncStorage.getItem('TOKEN');
          if (token !== null) {
            this.Token = token;
            this.IsLogin = true;
          }
        } catch (error) {
          console.log("Token Error");
        }
      };

      static getUser = async () => {
        try {
            const userKey = await AsyncStorage.getItem('USER')
            if (userKey !== null) {
              this.IsLogin = true
            }
            else {
              this.IsLogin = false
            }
          } catch (e) {
              console.log("User Error")
          }
      };

      

      

      
}







