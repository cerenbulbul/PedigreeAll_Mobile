import React from 'react'
import { View , Text , StyleSheet, Platform, Animated, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native'
import {Global} from '../Global'
import AsyncStorage from '@react-native-community/async-storage'
import HTML from "react-native-render-html";
import { Dimensions } from 'react-native';
import WebView from 'react-native-webview';

let data;
const PedigreeHTML =  
"<style>.pedigree-table { font-size: 13px; line-height: normal; font-weight: bold; border-collapse: collapse; border-spacing: 1px; width: 100%; border: 1px solid #737373; table-layout: fixed; }.pedigree-table td.pedigree-cell { border: 1px solid #737373; padding: 2px; text-align: center; vertical-align: middle; } .background-M, .background-M A { color: #9c4d4d; } .background-M { border-radius: 1px; background-image: linear-gradient(to bottom,#dbe8f3 0,#c7e5ff 100%) } .HorseName { font-family: 'Verdana'; font-size: 7pt; font-weight: 600; color: #000 !important; } td p { font-size: 8pt; } .HorseName:hover { text-decoration: underline; } .background-F { border-radius: 1px; border-color: #ce8080; background-color: #fedcdc; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgeG1sbnM9Imh0d…0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2xlc3NoYXQtZ2VuZXJhdGVkKSIgLz48L3N2Zz4=); background-image: -webkit-linear-gradient(top,#fff0f0 0,#ffe9e9 100%); background-image: -moz-linear-gradient(top,#fff0f0 0,#ffe9e9 100%); background-image: -o-linear-gradient(top,#fff0f0 0,#ffe9e9 100%); background-image: linear-gradient(to bottom,#fff0f0 0,#ffe9e9 100%); }</style>"
;



// <Text>{Global.HorseDetail.m_cData.PEDIGREE_CELL_LIST[1][0].HORSE_NAME}</Text>
export function HorseDetailScreenPedigree() { 
    const [time, setTime] = React.useState(true);
    const [getPedigreeReport, setPedigreeReport] =React.useState();

    const readPedigreeReport = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/Pedigree/GetPedigreeReport?p_iGenerationCount=' +Global.Generation + "&p_iFirstId=" + Global.Horse_ID + "&p_iSecondId=" + -1, {
                method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + Global.Token,
                  },
                }).then((response) => response.json())
                  .then((json) => {
                    //setHorsePedigree(json)
                    if (json !== null) {
                        setPedigreeReport(json)
                        
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  })
          } 
          else{
            console.log("Basarisiz")
          }
              }
              catch (e) {
                console.log("GetPedigreeReport Error")
              }
              
      };

    function resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve("data");
          }, 10500);
        });
      }
    
      async function asyncCall() {
        const result = await resolveAfter2Seconds();
        setTime(false);
        // expected output: "resolved"
      }

    React.useEffect(() => {
        readPedigreeReport();
        asyncCall();
        
    }, [])

    const onMessage = (event) => {
    //setWebViewHeight((event.nativeEvent.data));
    alert((event.nativeEvent.data))
    }
     
  return(
      <View style={{width:'100%',height:'100%'}}>

          {time ?
          <ActivityIndicator size="large" color="000" />
          :
          <>
            {getPedigreeReport !== undefined &&
            <>
            <WebView
            source={{ html: getPedigreeReport[2] + PedigreeHTML}}
            startInLoadingState={true}
            style={{ width: '100%', height: '100%' }}
            javaScriptEnabledAndroid={true}
            showsHorizontalScrollIndicator={true}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            injectedJavaScript="
            setTimeout(function() { 
                window.ReactNativeWebView.postMessage(document.getElementsByClassName('HorseName'));
                }, 500);
                true;
            " 
            renderLoading= {()=> <ActivityIndicator color='#000' size='large' />}
            />

            <Text style={styles.FamilyText}>{getPedigreeReport[3]}</Text>
            </>
         
         }
          </>
          }
      </View>
    
  )
}

//c7e5ff, fedcdc
const styles = StyleSheet.create({

    HorseDetailContainer:{
        flex:1,
    },

    HalfOfScreen:{
        height:Dimensions.get('window').height/2.5 ,
        flexDirection:'row'
    },
    FatherContainer:{
        backgroundColor:'#c7e5ff',
        flex:1,
        borderWidth:0.5,
        borderColor:'silver'
    },
    MotherContainer:{
        backgroundColor:'#fedcdc',
        flex:1,
        borderWidth:0.5,
        borderColor:'silver'
    },
    FamilyText:{
        textAlign:'center',
        padding:5,
        fontSize:12,
        fontWeight:'bold'
    }


})


