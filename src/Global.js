import React from "react";
import AsyncStorage from '@react-native-community/async-storage'
import Data from './Data';

export class Global {
  static IsLogin = false;
  static Token = "Y2VyZW5idWxidWwyN0BnbWFpbC5jb206UjBteTNyc2c=";
  static Horse_ID = 0;
  static Horse_ID_Second = -1;
  static Horse_Second_ID_Female_Family = -1;
  static Generation = 5;
  static TJK_ID = 60991;
  static HorseDetail;
  static Horse_First_ID;
  static Horse_Second_ID;
  static Generation_Hypothetical = 5;
  static EffectiveNick_Code = "StandardThoroughbred"
  static BreedingContentScreenName = "";
  static MinCross = 2;
  static MinCross_Fename_Family = 2;
  static getBlogListData;
  static laodingForBlog = true;
  static Sepetim=[];
  static TabBarBasketNotification = 0;
  static Language;
  static Link;
  static BackButton = false;
  static Hypothetical_Search_View = true;

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

  static getBasket = async () => {
    try {
      const userKey = await AsyncStorage.getItem('SEPETIM')
      if (userKey !== null) {
        this.Sepetim.push(JSON.parse(userKey)[0]) 
        this.TabBarBasketNotification = JSON.parse(userKey).length;
        //console.log(JSON.parse(userKey).length)
        //console.log(this.Sepetim)
      }
    } catch (e) {
      console.log("User Error")
    }
  };

  static readGetBlogListData = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Blog/Get?p_iBlogCategoryId=' + -1 + '&p_iSelection=' + -1, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            this.getBlogListData = json.m_cData
            this.laodingForBlog = false
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
    }
  }




}







