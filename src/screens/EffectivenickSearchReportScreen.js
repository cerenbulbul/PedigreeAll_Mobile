import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import WebView from 'react-native-webview';
import Icon from "react-native-vector-icons/FontAwesome5";

export function EffectivenickSearchReportScreen({ route, navigation }) {
    const { FirstHorseID, SecondHorseID, RegistrationID, BackButtonVisible } = route.params;
    const [loader, setLoader] = React.useState(true);
    const [loaderHeader, setLoaderHeader] = React.useState(true);
    const [getAnalysisCreateReport, setAnalysisCreateReport] = React.useState();
    const [getCounter, setCounter] = React.useState();
    const [showHeader, setShowHeader] = React.useState(false)
    const readAnalysisCreateReport = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Analysis/CreateReport?p_iHorseId1=' + FirstHorseID + '&p_iHorseId2=' + SecondHorseID + '&p_iRegistrationId=' + RegistrationID + '&p_iLanguageId=' + 2, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setAnalysisCreateReport(json)
                        setLoader(false)
                        // setSireMareHorseData(json)
                        //setLoader(false);
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
    const readCounter = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Horse/GetCounter?p_iLanguage=' + 2, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setCounter(json.m_cData[0])
                        setLoaderHeader(false)
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
        readCounter();
        readAnalysisCreateReport();
    }, [])
    return (
        <View style={styles.Container}>
            {BackButtonVisible ?
                <View>
                    <TouchableOpacity
                        style={styles.BackButton}
                        onPress={() => {
                            navigation.navigate('ThoroughbredAnalysis')
                        }}>
                        <Icon name="chevron-left" size={24} color="silver" style={{ alignSelf: 'center' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                    </TouchableOpacity>

                </View>
                :
                null}
            {loaderHeader ?
                <ActivityIndicator size="large" color="#000" />
                :
                <View>
                    <View style={styles.HeaderCounterContainer1}>

                        <>
                            <View style={styles.HeaderCounterView}>
                                <Text style={styles.HeaderCounterCount}>{getCounter.REPORT}</Text>
                                <Text style={styles.HeaderContainerText}>{getCounter.REPORT_TEXT}</Text>
                            </View>

                            <View style={styles.HeaderCounterView}>
                                <Text style={styles.HeaderCounterCount}>{getCounter.SEARCH}</Text>
                                <Text style={styles.HeaderContainerText}>{getCounter.SEARCH_TEXT}</Text>
                            </View>

                            <View style={styles.HeaderCounterView}>
                                <Text style={styles.HeaderCounterCount}>{getCounter.THOROUGHBRED}</Text>
                                <Text style={styles.HeaderContainerText}>{getCounter.THOROUGHBRED_TEXT}</Text>
                            </View>
                        </>

                    </View>

                    <View style={styles.HeaderCounterContainer2}>

                        <View style={styles.HeaderCounterView}>
                            <Text style={styles.HeaderCounterCount}>{getCounter.STALLION}</Text>
                            <Text style={styles.HeaderContainerText}>{getCounter.STALLION_TEXT}</Text>
                        </View>

                        <View style={styles.HeaderCounterView}>
                            <Text style={styles.HeaderCounterCount}>{getCounter.MARE}</Text>
                            <Text style={styles.HeaderContainerText}>{getCounter.MARE_TEXT}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.ShowHeaderButtonContainer}
                            onPress={() => { setShowHeader(!showHeader) }}>
                            {showHeader ?
                                <Icon name="minus" size={14} color="#fff" />
                                : <Icon name="plus" size={14} color="#fff" />}

                        </TouchableOpacity>

                    </View>

                </View>
            }
            {showHeader ?
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ThoroughbredAnalysisPrice', {
                                EffectiveNick_Code: "",
                                EffectiveNick_Name: "Mare"
                            });
                        }}
                        style={styles.HeaderTextContainer}>
                        <Text style={styles.HeaderText}>Mare Owners; Click here to create a report about a stallion not on the list!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ThoroughbredAnalysisPrice', {
                                EffectiveNick_Code: "",
                                EffectiveNick_Name: "Stallion"
                            });
                        }}
                        style={styles.HeaderTextContainer}>
                        <Text style={styles.HeaderText}>Registered Stallions are stallions registered on the system for EffectiveNick reports.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ThoroughbredAnalysisPrice', {
                                EffectiveNick_Code: "",
                                EffectiveNick_Name: "Stallion"
                            });
                        }}
                        style={styles.HeaderTextContainer}>
                        <Text style={styles.HeaderText}>Stallion Owners; Click to reach more mare owners by registering your stallion!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ThoroughbredAnalysisPrice', {
                                EffectiveNick_Code: "",
                                EffectiveNick_Name: "Stallion"
                            });
                        }}
                        style={styles.HeaderTextContainer}>
                        <Text style={styles.HeaderText}>An unlimited number of EffectiveNick Match Reports can be generated free of charge for registered stallions.</Text>
                    </TouchableOpacity>
                </View>
                :
                null}


            {loader ?
                <ActivityIndicator size="large" color="#000" />
                :
                <WebView
                    source={{ html: getAnalysisCreateReport.m_cData }}
                    startInLoadingState={true}
                    style={{ width: '100%', height: '100%' }}
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
    HeaderContainer: {
        padding: 10,
        marginVertical: 10,
    },
    HeaderTextContainer: {
        marginVertical: 5,
        borderWidth: 0.5,
        borderColor: 'silver',
        padding: 5,
        borderRadius: 8
    },
    HeaderText: {
        fontSize: 14,
        fontWeight: '700'
    },
    HeaderCounterContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    HeaderCounterContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,

    },
    HeaderCounterView: {
        width: 100,
        alignItems: 'center',
    },
    HeaderCounterCount: {
        fontSize: 16,
        fontWeight: '700'
    },
    HeaderContainerText: {
        textAlign: 'center'
    },
    ShowHeaderButtonContainer: {
        backgroundColor: '#2169ab',
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center'
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