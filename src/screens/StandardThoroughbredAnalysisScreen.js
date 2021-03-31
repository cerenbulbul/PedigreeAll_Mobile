import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity, Dimensions, ActivityIndicator, Platform, Alert } from 'react-native'
import { PricingCard, Card, ListItem, SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-community/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RBSheet from "react-native-raw-bottom-sheet";
import { Global } from '../Global';
import { BlueButton } from '../components/BlueButton';


const Tab = createMaterialTopTabNavigator();

export function StandardThoroughbredAnalysisScreen({ route, navigation }) {
    const { EffectiveNick_Code, EffectiveNick_Name } = route.params;
    const [openModal, setOpenModal] = React.useState(false);

    const [buildReport, setBuildReport] = React.useState(false)
    const [getCounter, setCounter] = React.useState();

    const [getThoroughbredName, setThoroughbredName] = React.useState("")
    const [getHypotheticalName, setHypotheticalName] = React.useState("")


    const readCounter = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Horse/GetCounter?p_iLanguage=' + Global.Language + '&p_iRaceId=' + 1, {
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

    const StandardThoroughbredList = [
        {
            textEnglish: "Detailed Thoroughbred Profile",
            textTurkish: " Detaylı Safkan Profili"
        },
        {
            textEnglish: "5x Pedigree",
            textTurkish: " 5x Pedigree | Soyağacı"
        },
        {
            textEnglish: "Family Summary",
            textTurkish: "Familya Özeti",
        },
        {
            textEnglish: "5x Linebreeding",
            textTurkish: "5x Linebreeding | Eş Soyluluk",
        },
        {
            textEnglish: "Top 5 Horses Bred On This Cross",
            textTurkish: "Benzer Nickten Top 5 Safkan",
        },
        {
            textEnglish: "4 Different Dosage Index and Distance Analysis",
            textTurkish: "4 Farklı Dosaj İndeks ve Mesafe Analizi"
        }
    ]

    const AdvancedThoroughbredList = [
        {
            textEnglish: "Full Standard Report",
            textTurkish: "Standart Raporun Tamamı ile Birlikte"
        },
        {
            textEnglish: "Detailed Thoroughbred Profile",
            textTurkish: " Detaylı Safkan Profili"
        },
        {
            textEnglish: "5x Pedigree",
            textTurkish: "5x Pedigree | Soyağacı"
        },
        {
            textEnglish: "7x Linebreeding",
            textTurkish: "7x Linebreeding | Eş Soyluluk"
        },
        {
            textEnglish: "Top 15 Horses Bred On This Cross",
            textTurkish: "Benzer Nickten Top 15 Safkan"
        },
        {
            textEnglish: "Family Summary",
            textTurkish: "Familya Özeti"
        },
        {
            textEnglish: "4 Different Dosage Index and Distance Analysis",
            textTurkish: " 4 Farklı Dosaj İndeks ve Mesafe Analizi"
        },
        {
            textEnglish: "Siblings From Mare",
            textTurkish: "Kısrak Kardeşleri"
        },
        {
            textEnglish: "Tail Female",
            textTurkish: "Dişi Soy | Tail Female"
        },
        {
            textEnglish: "Progeny",
            textTurkish: "Taylar | Progeny"
        }
    ]
    const ProfessionalThoroughbredList = [
        {
            textEnglish: "Full Standard Report",
            textTurkish: "Gelişmiş Raporun Tamamı ile Birlikte"
        },
        {
            textEnglish: "Detailed Thoroughbred Profile",
            textTurkish: "Detaylı Safkan Profili"
        },
        {
            textEnglish: "5x Pedigree",
            textTurkish: "5x Pedigree | Soyağacı"
        },
        {
            textEnglish: "9x Linebreeding",
            textTurkish: "9x Linebreeding | Eş Soyluluk"
        },
        {
            textEnglish: "All Horses Bred On This Cross",
            textTurkish: "Benzer Nickten Bütün Safkanlar"
        },
        {
            textEnglish: "Family Summary",
            textTurkish: "Familya Özeti"
        },
        {
            textEnglish: "4 Different Dosage Index and Distance Analysis",
            textTurkish: "4 Farklı Dosaj İndeks ve Mesafe Analizi"
        },
        {
            textEnglish: "Siblings From Mare",
            textTurkish: "Kısrak Kardeşleri"
        },
        {
            textEnglish: "Tail Female",
            textTurkish: "Dişi Soy | Tail Female"
        },
        {
            textEnglish: "Progeny",
            textTurkish: "Taylar | Progeny"
        },
        {
            textEnglish: "Siblings From Sire",
            textTurkish: "Aygır Kardeşleri"
        },
        {
            textEnglish: "Siblings From Broodmare Sire",
            textTurkish: "Kısrak Babasından Kardeşleri"
        },
        {
            textEnglish: "Foals As Broodmare Sire",
            textTurkish: "Kısrak Babası Olarak Tayları"
        }
    ]

    const StandardStallionList = [
        {
            textEnglish: "Unlimited Standart Reports",
            textTurkish: "Sınırsız Standart Rapor"
        },
        {
            textEnglish: "1 Year Free Detailed Stallion Ad",
            textTurkish: "1 Yıllık Ücretsiz Detaylı Aygır Aşım İlanı"
        },
        {
            textEnglish: "For Next Years Detailed Stallion Ad Fee 99 USD",
            textTurkish: "Sonraki Yıllar için Yıllık Aşım İlanı 99 USD"
        },
        {
            textEnglish: "Detailed Thoroughbred Profile",
            textTurkish: "Detaylı Safkan Profili"
        },
        {
            textEnglish: "5x Pedigree",
            textTurkish: "5x Pedigree | Soyağacı"
        },
        {
            textEnglish: "Family Summary",
            textTurkish: "Familya Özeti"
        },
        {
            textEnglish: "5x Linebreeding",
            textTurkish: "5x Linebreeding | Eş Soyluluk"
        },
        {
            textEnglish: "Top 5 Horses Bred On This Cross",
            textTurkish: "Benzer Nickten Top 5 Safkan"
        },
        {
            textEnglish: "4 Different Dosage Index and Distance Analysis",
            textTurkish: "4 Farklı Dosaj İndeks ve Mesafe Analizi"
        }
    ]
    const AdvancedStallionList = [
        {
            textEnglish: "Unlimited Standart Reports",
            textTurkish: "Sınırsız Gelişmiş Rapor"
        },
        {
            textEnglish: "1 Year Free Detailed Stallion Ad",
            textTurkish: "1 Yıllık Ücretsiz Detaylı Aygır Aşım İlanı"
        },
        {
            textEnglish: "For Next Years Detailed Stallion Ad Fee 99 USD",
            textTurkish: "Sonraki Yıllar için Yıllık Aşım İlanı 199 USD"
        },
        {
            textEnglish: "Detailed Thoroughbred Profile",
            textTurkish: "Detaylı Safkan Profili"
        },
        {
            textEnglish: "5x Pedigree",
            textTurkish: "5x Pedigree | Soyağacı"
        },
        {
            textEnglish: "Family Summary",
            textTurkish: "Familya Özeti"
        },
        {
            textEnglish: "7x Linebreeding",
            textTurkish: "7x Linebreeding | Eş Soyluluk"
        },
        {
            textEnglish: "Top 15 Horses Bred On This Cross",
            textTurkish: "Benzer Nickten Top 15 Safkan"
        },
        {
            textEnglish: "4 Different Dosage Index and Distance Analysis",
            textTurkish: "4 Farklı Dosaj İndeks ve Mesafe Analizi"
        },
        {
            textEnglish: "Full Standard Report",
            textTurkish: "Standart Raporun Tamamı ile Birlikte"
        },
        {
            textEnglish: "Siblings From Mare",
            textTurkish: "Kısrak Kardeşleri"
        },
        {
            textEnglish: "Tail Female",
            textTurkish: "Dişi Soy | Tail Female"
        },
        {
            textEnglish: "Progeny",
            textTurkish: "Taylar | Progeny"
        }
    ]

    const ProfessionalStallionList = [
        {
            textEnglish: "Unlimited Standart Reports",
            textTurkish: "Sınırsız Profesyonel Rapor"
        },
        {
            textEnglish: "1 Year Free Detailed Stallion Ad",
            textTurkish: "1 Yıllık Ücretsiz Detaylı Aygır Aşım İlanı"
        },
        {
            textEnglish: "For Next Years Detailed Stallion Ad Fee 99 USD",
            textTurkish: "Sonraki Yıllar için Yıllık Aşım İlanı 299 USD"
        },
        {
            textEnglish: "Detailed Thoroughbred Profile",
            textTurkish: "Detaylı Safkan Profili"
        },
        {
            textEnglish: "5x Pedigree",
            textTurkish: "5x Pedigree | Soyağacı"
        },
        {
            textEnglish: "Family Summary",
            textTurkish: "Familya Özeti"
        },
        {
            textEnglish: "9x Linebreeding",
            textTurkish: "9x Linebreeding | Eş Soyluluk"
        },
        {
            textEnglish: "All Horses Bred On This Cross",
            textTurkish: "Benzer Nickten Bütün Safkanlar"
        },
        {
            textEnglish: "4 Different Dosage Index and Distance Analysis",
            textTurkish: "4 Farklı Dosaj İndeks ve Mesafe Analizi"
        },
        {
            textEnglish: "Full Standard Report",
            textTurkish: "Standart Raporun Tamamı ile Birlikte"
        },
        {
            textEnglish: "Siblings From Sire",
            textTurkish: "Aygır Kardeşleri"
        },
        {
            textEnglish: "Siblings From Broodmare Sire",
            textTurkish: "Kısrak Babasından Kardeşleri"
        },
        {
            textEnglish: "Foals As Broodmare Sire",
            textTurkish: "Kısrak Babası Olarak Tayları"
        },
        {
            textEnglish: "Website with a Domain Name for Your Stallion",
            textTurkish: "Aygırınıza Özel Alan Adı İle Web Sitesi"
        }

    ]



    React.useEffect(() => {
        readCounter();

        if (Global.Language === 1) {
            setThoroughbredName("Safkan");
            setHypotheticalName("Varsayımsal")
        }
        else {
            setThoroughbredName("Thoroughbred");
            setHypotheticalName("Hypothetical")
        }
    }, [])



    return (
        <View style={styles.Container}>

            {buildReport ?
                <>

                    <View style={{ width: '100%', height: '100%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setBuildReport(false)
                            }}
                            style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                            <Icon name="chevron-left" size={24} color="silver" />
                            {Global.Language === 1 ?
                                <Text style={{ fontSize: 16, marginLeft: 10 }}>Geri</Text>
                                :
                                <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                            }

                        </TouchableOpacity>

                        <Tab.Navigator
                            initialRouteName="Thoroughbred"
                            removeClippedSubviews={true}
                            sceneContainerStyle={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'white',
                            }}
                            tabBarOptions={{
                                activeTintColor: '#000',
                                inactiveTintColor: '#b5b5b5',
                                showIcon: true,
                                indicatorStyle: {
                                    backgroundColor: '#2169ab'
                                },
                                labelStyle: {
                                    fontSize: 14,
                                },
                                style: {
                                    backgroundColor: 'white', //e8edf1
                                    //height: (Platform.OS === 'ios') ? 48 : 50,
                                    //overflow: "hidden"
                                },
                                tabStyle: {
                                    marginTop: (Platform.OS === 'ios') ? 0 : 0,
                                    height: 50,
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                },
                            }}
                        >

                            <Tab.Screen
                                name="Thoroughbred"
                                component={BuildReportHorseSearchScreen}
                                initialParams={{ ScreenName: "Thoroughbred", EffectiveNick_Code: EffectiveNick_Code }}
                                options={{
                                    tabBarLabel: getThoroughbredName
                                }}
                            />
                            <Tab.Screen
                                name="Hypothetical"
                                component={BuildReportHorseSearchScreen}
                                initialParams={{ ScreenName: "Hypothetical", EffectiveNick_Code: EffectiveNick_Code }}
                                options={{
                                    tabBarLabel: getHypotheticalName,
                                }}
                            />
                        </Tab.Navigator>

                    </View>



                </>


                :
                <ScrollView>
                    <Card>
                        {EffectiveNick_Code === "StandardThoroughbred" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Standart Safkan Analiz</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Standard Thoroughbred Analysis</Card.Title>
                                }
                            </>

                            ||
                            EffectiveNick_Code === "AdvancedThoroughbred" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Gelişmiş Safkan Analiz</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Advanced Thoroughbred Analysis</Card.Title>
                                }
                            </>

                            ||
                            EffectiveNick_Code === "ProfessionalThoroughbred" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Profesyonel Safkan Analiz</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Professional Thoroughbred Analysis</Card.Title>
                                }
                            </>

                            ||
                            EffectiveNick_Code === "StandardMare" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Standart Kısrak Analiz</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Standard Mare Analysis</Card.Title>
                                }
                            </>

                            ||
                            EffectiveNick_Code === "AdvancedMare" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Gelişmiş Kısrak Analiz</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Advanced Mare Analysis</Card.Title>
                                }
                            </>

                            ||
                            EffectiveNick_Code === "ProfessionalMare" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Profesyonel Kısrak Analiz</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Professional Mare Analysis</Card.Title>
                                }
                            </>

                            ||
                            EffectiveNick_Code === "StandartStallion" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Standart Aygır Kaydı</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Standard Stallion Registration</Card.Title>
                                }
                            </>

                            ||
                            EffectiveNick_Code === "AdvancedStallion" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Gelişmiş Aygır Kaydı</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Advanced Stallion Registration</Card.Title>
                                }
                            </>

                            ||
                            EffectiveNick_Code === "ProfessionalStallion" &&
                            <>
                                {Global.Language === 1 ?
                                    <Card.Title style={styles.CardTitle}>Profesyonel Aygır Kaydı</Card.Title>
                                    :
                                    <Card.Title style={styles.CardTitle}>Professional Stallion Registration</Card.Title>
                                }
                            </>

                        }

                        <View style={styles.PaymentContainer}>
                            <View style={styles.ImageContainer}>
                                <Image
                                    style={styles.PaymentBookImage}
                                    source={{
                                        uri:
                                            'https://www.pedigreeall.com/images/cover.jpg',
                                    }}
                                />

                            </View>

                            <View>
                                {EffectiveNick_Code === "StandardThoroughbred" &&
                                    <Text style={styles.PriceText}>$9</Text>
                                    ||
                                    EffectiveNick_Code === "AdvancedThoroughbred" &&
                                    <Text style={styles.PriceText}>$19</Text>
                                    ||
                                    EffectiveNick_Code === "ProfessionalThoroughbred" &&
                                    <Text style={styles.PriceText}>$29</Text>
                                    ||
                                    EffectiveNick_Code === "StandardMare" &&
                                    <Text style={styles.PriceText}>$19</Text>
                                    ||
                                    EffectiveNick_Code === "AdvancedMare" &&
                                    <Text style={styles.PriceText}>$29</Text>
                                    ||
                                    EffectiveNick_Code === "ProfessionalMare" &&
                                    <Text style={styles.PriceText}>$39</Text>
                                    ||
                                    EffectiveNick_Code === "StandartStallion" &&
                                    <Text style={styles.PriceText}>$299</Text>
                                    ||
                                    EffectiveNick_Code === "AdvancedStallion" &&
                                    <Text style={styles.PriceText}>$599</Text>
                                    ||
                                    EffectiveNick_Code === "ProfessionalStallion" &&
                                    <Text style={styles.PriceText}>$999</Text>
                                }

                                <View style={styles.ButtonContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('ThoroughbredStallionsSearch')
                                        }}
                                        style={[styles.Button, { backgroundColor: '#4DB7FE' }]}>
                                        <Icon style={{ alignSelf: 'center' }} name="eye" size={16} color="#fff" />
                                        {Global.Language === 1 ?
                                            <Text style={styles.ButtonText}>Örnek Raporu Görüntüle</Text>
                                            :
                                            <Text style={styles.ButtonText}>View Sample Report</Text>
                                        }

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBuildReport(true)
                                        }}
                                        style={[styles.Button, { backgroundColor: '#2e3f6e' }]}>
                                        <Icon style={{ alignSelf: 'center' }} name="shopping-basket" size={16} color="#fff" />
                                        {Global.Language === 1 ?
                                            <Text style={styles.ButtonText}>Rapor Oluştur</Text>
                                            :
                                            <Text style={styles.ButtonText}>Build Report</Text>
                                        }

                                    </TouchableOpacity>
                                </View>

                                {getCounter !== undefined &&

                                    <View style={{ marginVertical: 8, marginBottom: 5, width: '100%', marginLeft: 15 }}>
                                        {Global.Language === 1 ?
                                            <Text style={{ fontSize: 14, fontWeight: '700' }}>{getCounter.REPORT} Rapor Oluşturuldu</Text>
                                            :
                                            <Text style={{ fontSize: 14, fontWeight: '700' }}>{getCounter.REPORT} Reports Created</Text>}

                                    </View>

                                }
                                <View style={{ marginTop: 20 }}>
                                    {EffectiveNick_Name === "Thoroughbred" &&
                                        <>
                                            {Global.Language === 1 ?
                                                <>
                                                    <Text style={[styles.BoldText, { textAlign: 'center' }]}>
                                                        Herhangi bir at veya varsayımsal çiftleşme için oluşturulabilir.
                                                </Text>
                                                    <Text style={[styles.Text]}>
                                                        Raporlar, ilgili safkanın verilerinin, veri uzmanlarımız tarafından derlenip kontrol edilmesinden sonra oluşturulmaktadır.
                                                </Text>
                                                </>
                                                :
                                                <>
                                                    <Text style={[styles.BoldText, { textAlign: 'center' }]}>
                                                        Available for any horse or hypothetical mating.
                                                </Text>
                                                    <Text style={[styles.Text]}>
                                                        Reports are created after the data of the relevant pedigree are compiled and checked by our data experts.
                                                </Text>
                                                </>
                                            }
                                        </>
                                        ||
                                        EffectiveNick_Name === "Mare" &&
                                        <>
                                            {Global.Language === 1 ?
                                                <>
                                                    <Text style={[styles.BoldText, { textAlign: 'center' }]}>
                                                        Kısrağınız ve sizin seçeceğiniz 5 farklı aygır ile varsayımsal çiftleşme için oluşturulur.
                                                </Text>
                                                    <Text style={[styles.Text]}>
                                                        Raporlar, ilgili safkanın verilerinin, veri uzmanlarımız tarafından derlenip kontrol edilmesinden sonra oluşturulmaktadır.
                                                </Text>
                                                </>
                                                :
                                                <>
                                                    <Text style={[styles.BoldText, { textAlign: 'center' }]}>
                                                        Available for your mare and hypothetical mating with 5 stallions of your choice.
                                                </Text>
                                                    <Text style={[styles.Text]}>
                                                        Available for your mare and hypothetical mating with 5 stallions of your choice.
                                                </Text>
                                                </>
                                            }
                                        </>
                                        ||
                                        EffectiveNick_Name === "Stallion" &&
                                        <>
                                            {Global.Language === 1 ?
                                                <>
                                                    <Text style={[styles.BoldText, { textAlign: 'center' }]}>
                                                        Aygır kayıt ücretleri bir defaya mahsustur.
                                                </Text>
                                                    <Text style={[styles.Text]}>
                                                        Raporlar, ilgili safkanın verilerinin, veri uzmanlarımız tarafından derlenip kontrol edilmesinden sonra oluşturulmaktadır.
                                                </Text>
                                                </>
                                                :
                                                <>
                                                    <Text style={[styles.BoldText, { textAlign: 'center' }]}>
                                                        Stallion registration fees are for once.
                                                </Text>
                                                    <Text style={[styles.Text]}>
                                                        Reports are created after the data of the relevant pedigree are compiled and checked by our data experts.
                                                </Text>
                                                </>
                                            }
                                        </>
                                    }
                                </View>


                                {EffectiveNick_Code === "StandardThoroughbred" &&
                                    <View style={styles.ListViewContainer}>
                                        {StandardThoroughbredList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }

                                            </View>
                                        ))}
                                    </View>
                                    ||
                                    EffectiveNick_Code === "AdvancedThoroughbred" &&
                                    <View style={styles.ListViewContainer}>
                                        {AdvancedThoroughbredList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }

                                            </View>
                                        ))}
                                    </View>
                                    ||
                                    EffectiveNick_Code === "ProfessionalThoroughbred" &&
                                    <View style={styles.ListViewContainer}>
                                        {ProfessionalThoroughbredList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }

                                            </View>
                                        ))}
                                    </View>
                                    ||
                                    EffectiveNick_Code === "StandardMare" &&
                                    <View style={styles.ListViewContainer}>
                                        {StandardThoroughbredList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }

                                            </View>
                                        ))}
                                    </View>
                                    ||
                                    EffectiveNick_Code === "AdvancedMare" &&
                                    <View style={styles.ListViewContainer}>
                                        {AdvancedThoroughbredList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }
                                            </View>
                                        ))}
                                    </View>
                                    ||
                                    EffectiveNick_Code === "ProfessionalMare" &&
                                    <View style={styles.ListViewContainer}>
                                        {ProfessionalThoroughbredList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }
                                            </View>
                                        ))}
                                    </View>
                                    || EffectiveNick_Code === "StandartStallion" &&
                                    <View style={styles.ListViewContainer}>
                                        {StandardStallionList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }

                                            </View>
                                        ))}
                                    </View>
                                    || EffectiveNick_Code === "AdvancedStallion" &&
                                    <View style={styles.ListViewContainer}>
                                        {AdvancedStallionList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }

                                            </View>
                                        ))}
                                    </View>
                                    || EffectiveNick_Code === "ProfessionalStallion" &&
                                    <View style={styles.ListViewContainer}>
                                        {ProfessionalStallionList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                {Global.Language === 1 ?
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textTurkish}</Text>
                                                    :
                                                    <Text style={[styles.Text, { marginLeft: 10 }]}>{item.textEnglish}</Text>
                                                }

                                            </View>
                                        ))}
                                    </View>
                                }
                            </View>


                        </View>

                    </Card>

                    <View style={styles.OpenPriceBoxButtonContainer}>
                        <TouchableOpacity
                            style={styles.OpenPriceBoxButton}
                            onPress={() => {
                                navigation.navigate('ThoroughbredAnalysisPrice', {
                                    EffectiveNick_Code: EffectiveNick_Code,
                                    EffectiveNick_Name: EffectiveNick_Name
                                });
                            }}>
                            {EffectiveNick_Name === "Thoroughbred" &&
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.OpenPriceBoxButtonText}>Safkan Analizleri Fiyatları</Text>
                                        :
                                        <Text style={styles.OpenPriceBoxButtonText}>Thoroughbred Analysis Price</Text>
                                    }
                                </>

                                ||
                                EffectiveNick_Name === "Mare" &&
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.OpenPriceBoxButtonText}>Kısrak Analizleri Fiyatları</Text>
                                        :
                                        <Text style={styles.OpenPriceBoxButtonText}>Mare Analysis Price</Text>
                                    }
                                </>
                                ||
                                EffectiveNick_Name === "Stallion" &&
                                <>
                                    {Global.Language === 1 ?
                                        <Text style={styles.OpenPriceBoxButtonText}>Aygır Kayıtları Fiyatları</Text>
                                        : <Text style={styles.OpenPriceBoxButtonText}>Stallion Analysis Price</Text>
                                    }
                                </>
                            }

                        </TouchableOpacity>
                    </View>





                </ScrollView>


            }

        </View>
    )
}

function BuildReportHorseSearchScreen({ route, navigation }) {
    const { ScreenName, EffectiveNick_Code } = route.params;

    const [searchValue, setSearchValue] = React.useState()
    const [isLoading, SetisLoading] = React.useState(true);
    const [getBottomSheetText, setBottomSheetText] = React.useState();

    const [getHorseName, setHorseName] = React.useState();
    const [getSireName, setSireName] = React.useState();
    const [getMareName, setMareName] = React.useState();

    const [getHorseID, setHorseID] = React.useState();
    const [getSireID, setSireID] = React.useState();
    const [getMareID, setMareID] = React.useState();

    const [getHorseList, setHorseList] = React.useState();

    const [getProductType, setProductType] = React.useState();
    const [getProduct, setProduct] = React.useState();

    const [getAddToBasketButtonName, setAddToBasketButtonName] = React.useState("")

    const BottomSheetLong = React.useRef();


    const readHorseGetByName = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByName', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        ID: 1,
                        NAME: searchValue,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setHorseList(json.m_cData)
                        SetisLoading(false)
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

    const readGetProductUsingTypeID = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
                fetch('https://api.pedigreeall.com/Product/Get?p_iProductTypeId=' + -1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)
                        setProductType(json.m_cData)
                        let id;
                        switch (EffectiveNick_Code) {
                            case "StandardThoroughbred":
                                id = 1;
                                break;
                            case "AdvancedThoroughbred":
                                id = 2;
                                break;
                            case "ProfessionalThoroughbred":
                                id = 3;
                                break;
                            case "StandardMare":
                                id = 4;
                                break;
                            case "AdvancedMare":
                                id = 5;
                                break;
                            case "ProfessionalMare":
                                id = 6;
                                break;
                            case "StandartStallion":
                                id = 7;
                                break;
                            case "AdvancedStallion":
                                id = 8;
                                break;
                            case "ProfessionalStallion":
                                id = 9;
                                break;

                        }
                        console.log(id)
                        json.m_cData.map((item, index) => (
                            <>
                                {item.PRODUCT_ID === id &&
                                    setProduct(item)
                                }
                            </>
                        ))

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

    const saveData = async (Basket) => {
        try {
            await AsyncStorage.setItem("SEPETIM", JSON.stringify(Basket))
            console.log('Data successfully saved')
        } catch (e) {
            console.log('Failed to save the data to the storage')
        }
    }

    const checkSepet = async (Basket) => {
        try {
            const userKey = await AsyncStorage.getItem('SEPETIM')
            if (userKey !== null) {
                for (let i = 0; i < (JSON.parse(userKey).length); i++) {
                    Basket.push(JSON.parse(userKey)[i])
                }
                saveData(Basket);
                Global.getBasket();
                Alert.alert(
                    "Successfully",
                    "Product has been added to your basket successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                );
            }
            else {
                saveData(Basket);
                Global.getBasket();
                Alert.alert(
                    "Successfully",
                    "Product has been added to your basket successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (e) {
            console.log("User Error")
        }
    };



    React.useEffect(() => {
        readHorseGetByName();
        readGetProductUsingTypeID()

        if (Global.Language===1) {
            setAddToBasketButtonName("Sepete Ekle")
        }
        else{
            setAddToBasketButtonName("Add To Basket")
        }
    }, [])

    return (
        <View>

            <RBSheet
                ref={BottomSheetLong}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={Dimensions.get('window').height - 50}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        BottomSheetLong.current.close();

                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    <SearchBar
                        placeholder={searchValue}
                        lightTheme
                        platform="ios"
                        cancelButtonTitle=""
                        inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                        containerStyle={{ backgroundColor: 'transparent', }}
                        inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                        rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                        leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                        value={searchValue}
                        onChangeText={setSearchValue}
                        onSubmitEditing={() => {
                            SetisLoading(true);
                            readHorseGetByName();
                        }}
                        showLoading={true}
                    />

                    {isLoading ?
                        <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                            <ActivityIndicator
                                style={{ height: 100, top: 150 }}
                                color="#3F51B5"
                                size="large"
                            />
                        </View>
                        :

                        <ScrollView style={styles.ScrollViewContainer}>
                            {getHorseList.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    button
                                    onPress={() => {
                                        if (getBottomSheetText === "HorseName") {
                                            setHorseName(item.HORSE_NAME)
                                            setHorseID(item.HORSE_ID)
                                        }
                                        else if (getBottomSheetText === "SireName") {
                                            setSireName(item.HORSE_NAME)
                                            setSireID(item.HORSE_ID)
                                        }
                                        else if (getBottomSheetText === "MareName") {
                                            setMareName(item.HORSE_NAME)
                                            setMareID(item.HORSE_ID)
                                        }

                                        BottomSheetLong.current.close();
                                    }}
                                >

                                    <Image
                                        source={{
                                            uri:
                                                'https://www.pedigreeall.com//upload/1000/' + item.IMAGE,
                                        }}
                                        style={{ width: 100, height: 100 }}
                                        resizeMode='contain'
                                        transition={false} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                                        <ListItem.Subtitle>{item.FATHER_NAME}</ListItem.Subtitle>
                                        <ListItem.Subtitle>{item.MOTHER_NAME}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            )
                            )}
                        </ScrollView>


                    }

                </View>
            </RBSheet>

            {ScreenName === "Hypothetical" &&

                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("SireName")
                                BottomSheetLong.current.open()
                            }}
                            style={styles.SireMareButtonContainer}>
                            {getSireName === undefined ?
                                <>
                                    {Global.Language === 1 ?
                                        <Text>Aygır Adı</Text>
                                        :
                                        <Text>Sire Name</Text>
                                    }
                                </>

                                :
                                <Text>{getSireName.substring(0, 8)}...</Text>
                            }

                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("MareName")
                                BottomSheetLong.current.open();
                            }}
                            style={styles.SireMareButtonContainer}>
                            {getMareName === undefined ?
                                <>
                                    {Global.Language === 1 ?
                                        <Text>Kısrak Adı</Text>
                                        :
                                        <Text>Mare Name</Text>
                                    }
                                </>
                                :
                                <Text>{getMareName.substring(0, 8)}...</Text>
                            }
                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>
                    </View>

                </>

            }

            {ScreenName === "Thoroughbred" &&

                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                setBottomSheetText("HorseName")
                                BottomSheetLong.current.open();
                            }}
                            style={[styles.SireMareButtonContainer, { width: '92%', }]}>
                            {getHorseName === undefined ?
                                <>
                                    {Global.Language === 1 ?
                                        <Text>Isim Giriniz...</Text>
                                        :
                                        <Text>Please type name...</Text>
                                    }
                                </>

                                :
                                <Text>{getHorseName}</Text>
                            }

                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>


                    </View>

                </>

            }


            <View style={{ padding: 15 }}>
                <BlueButton
                    onPress={() => {

                        console.log(getProduct)
                        if (getProduct !== undefined) {
                            if (ScreenName === "Hypothetical") {
                                const Basket = [
                                    {
                                        "COST_TL": (getProduct.FEE * getProduct.FEE_CURRENCY.PARITE),
                                        "COST_USD": getProduct.FEE,
                                        "INFO": "(" + getSireName + "," + getSireID + ") (" + getMareName + "," + getMareID + ")",
                                        "ORDER_DETAIL_ID": Math.floor(Math.random() * Math.floor(100)),
                                        "ORDER_ID": -1,
                                        "PRODUCT": getProduct
                                    }
                                ]
                                checkSepet(Basket)
                            }
                            else if (ScreenName === "Thoroughbred") {
                                const Basket = [
                                    {
                                        "COST_TL": (getProduct.FEE * getProduct.FEE_CURRENCY.PARITE),
                                        "COST_USD": getProduct.FEE,
                                        "INFO": "(" + getHorseName + "," + getHorseID + ")",
                                        "ORDER_DETAIL_ID": Math.floor(Math.random() * Math.floor(100)),
                                        "ORDER_ID": -1,
                                        "PRODUCT": getProduct
                                    }
                                ]
                                checkSepet(Basket)
                            }


                        }

                    }}
                    style={{ marginVertical: 20 }}
                    title={getAddToBasketButtonName}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    PaymentContainer: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    ImageContainer: {
        padding: 5,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'silver',
        elevation: 10
    },
    PaymentBookImage: {
        width: 150,
        height: 200,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#6c6c6ca8'
    },
    FullScreenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000",
    },
    PricingCardContainer: {
        width: Dimensions.get('window').width - 30,
        height: 500
    },
    PriceText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#2e3f6e',
        marginVertical: 5,
    },
    CardTitle: {
        fontSize: 20,
        color: '#2e3f6e'
    },
    BoldText: {
        marginVertical: 5,
        fontWeight: '700'
    },
    ListViewContainer: {
        marginVertical: 20
    },
    ListItemContainer: {
        flexDirection: 'row',
        marginVertical: 10
    },
    ButtonContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Button: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        elevation: 6,
        flexDirection: 'row',
    },
    ButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginLeft: 5
    },
    OpenPriceBoxButtonContainer: {
        marginVertical: 10,
        padding: 10
    },
    OpenPriceBoxButton: {
        backgroundColor: "#2169ab",
        padding: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'silver',
        elevation: 8
    },
    OpenPriceBoxButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    },
    SireMareButtonContainer: {
        backgroundColor: "#e8edf1",
        padding: 9,
        borderRadius: 8,
        height: 36,
        width: '33%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginRight: 7
    },
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25
    },
    SearchIconContainer: {
        padding: 15,
        backgroundColor: '#2169ab',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 50,
        elevation: 10,
        justifyContent: 'center'
    }
})