import React from 'react'
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import WebView from 'react-native-webview';
import Icon from "react-native-vector-icons/FontAwesome5";

export function MareAnalysisReportScreen({ route, navigation }) {
    const { FirstHorseID, SecondHorseID, RegistrationID } = route.params;

    const [isLoading, setIsLoading] = React.useState(true);
    const [getAnalysisCreateReportData, setAnalysisCreateReportData] = React.useState()

    const readAnalysisCreateReport = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Analysis/CreateMareReport?p_iRegistrationId=' + RegistrationID + '&p_iLanguageId=' + 2, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        'MARE_ID': FirstHorseID,
                        'SIRE_ID_LIST': SecondHorseID.toString()
                    }),
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setAnalysisCreateReportData(json.m_cData)
                        setIsLoading(false)
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

    React.useEffect(() => {
        readAnalysisCreateReport();
    }, [])


    return (
        <View style={styles.Container}>
            <View>
                <TouchableOpacity
                    style={styles.BackButton}
                    onPress={() => {
                        navigation.navigate('MareAnalysis')
                    }}>
                    <Icon name="chevron-left" size={24} color="silver" style={{ alignSelf: 'center' }} />
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>

            </View>
            {isLoading ?
                <ActivityIndicator size="large" color="#000" />
                :
                <WebView
                    source={{ html: getAnalysisCreateReportData }}
                    startInLoadingState={true}
                    style={{ width: '100%', height: '100%', marginTop:10 }}
                    javaScriptEnabledAndroid={true}
                    showsHorizontalScrollIndicator={true}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    renderLoading={() => <ActivityIndicator color='#000' size='large' />}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    BackButton:{
        flexDirection:'row',
        alignSelf:'baseline',
        padding:10,
        width:'100%',
        borderBottomWidth:0.5, 
        borderColor:'silver',
        marginBottom:10
      },
})