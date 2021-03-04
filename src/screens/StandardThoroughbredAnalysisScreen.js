import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity, Dimensions, ActivityIndicator, Platform } from 'react-native'
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


    const readDataPaymentTypeList = async (data) => {
        fetch('https://api.pedigreeall.com/Page/Get', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.m_cData)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const StandardThoroughbredList = [
        {
            text: "Detailed Thoroughbred Profile"
        },
        {
            text: "5x Pedigree"
        },
        {
            text: "Family Summary"
        },
        {
            text: "5x Linebreeding"
        },
        {
            text: "Top 5 Horses Bred On This Cross"
        },
        {
            text: "4 Different Dosage Index and Distance Analysis"
        }
    ]

    const AdvancedThoroughbredList = [
        {
            text: "Full Standard Report"
        },
        {
            text: "Detailed Thoroughbred Profile"
        },
        {
            text: "5x Pedigree"
        },
        {
            text: "7x Linebreeding"
        },
        {
            text: "Top 15 Horses Bred On This Cross"
        },
        {
            text: "Family Summary"
        },
        {
            text: "4 Different Dosage Index and Distance Analysis"
        },
        {
            text: "Siblings From Mare"
        },
        {
            text: "Tail Female"
        },
        {
            text: "Progeny"
        }
    ]
    const ProfessionalThoroughbredList = [
        {
            text: "Full Standard Report"
        },
        {
            text: "Detailed Thoroughbred Profile"
        },
        {
            text: "5x Pedigree"
        },
        {
            text: "9x Linebreeding"
        },
        {
            text: "All Horses Bred On This Cross"
        },
        {
            text: "Family Summary"
        },
        {
            text: "4 Different Dosage Index and Distance Analysis"
        },
        {
            text: "Siblings From Mare"
        },
        {
            text: "Tail Female"
        },
        {
            text: "Progeny"
        },
        {
            text: "Siblings From Sire"
        },
        {
            text: "Siblings From Broodmare Sire"
        },
        {
            text: "Foals As Broodmare Sire"
        }
    ]

    const StandardStallionList = [
        {
            text: "Unlimited Standart Reports"
        },
        {
            text: "1 Year Free Detailed Stallion Ad"
        },
        {
            text: "For Next Years Detailed Stallion Ad Fee 99 USD"
        },
        {
            text: "Detailed Thoroughbred Profile"
        },
        {
            text: "5x Pedigree"
        },
        {
            text: "Family Summary"
        },
        {
            text: "5x Linebreeding"
        },
        {
            text: "Top 5 Horses Bred On This Cross"
        },
        {
            text: "4 Different Dosage Index and Distance Analysis"
        }
    ]
    const AdvancedStallionList = [
        {
            text: "Unlimited Standart Reports"
        },
        {
            text: "1 Year Free Detailed Stallion Ad"
        },
        {
            text: "For Next Years Detailed Stallion Ad Fee 99 USD"
        },
        {
            text: "Detailed Thoroughbred Profile"
        },
        {
            text: "5x Pedigree"
        },
        {
            text: "Family Summary"
        },
        {
            text: "7x Linebreeding"
        },
        {
            text: "Top 15 Horses Bred On This Cross"
        },
        {
            text: "4 Different Dosage Index and Distance Analysis"
        },
        {
            text: "Full Standard Report"
        },
        {
            text: "Siblings From Mare"
        },
        {
            text: "Tail Female"
        },
        {
            text: "Progeny"
        }
    ]

    const ProfessionalStallionList = [
        {
            text: "Unlimited Standart Reports"
        },
        {
            text: "1 Year Free Detailed Stallion Ad"
        },
        {
            text: "For Next Years Detailed Stallion Ad Fee 99 USD"
        },
        {
            text: "Detailed Thoroughbred Profile"
        },
        {
            text: "5x Pedigree"
        },
        {
            text: "Family Summary"
        },
        {
            text: "9x Linebreeding"
        },
        {
            text: "All Horses Bred On This Cross"
        },
        {
            text: "4 Different Dosage Index and Distance Analysis"
        },
        {
            text: "Full Standard Report"
        },
        {
            text: "Siblings From Sire"
        },
        {
            text: "Siblings From Broodmare Sire"
        },
        {
            text: "Foals As Broodmare Sire"
        },
        {
            text: "Website with a Domain Name for Your Stallion"
        }

    ]



    React.useEffect(() => {
        readDataPaymentTypeList();
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
                            <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
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
                                initialParams={{ ScreenName: "Thoroughbred" }}
                                options={{
                                    tabBarLabel: 'Thoroughbred'
                                }}
                            />
                            <Tab.Screen
                                name="Hypothetical"
                                component={BuildReportHorseSearchScreen}
                                initialParams={{ ScreenName: "Hypothetical" }}
                                options={{
                                    tabBarLabel: 'Hypothetical',
                                }}
                            />
                        </Tab.Navigator>

                    </View>



                </>


                :
                <ScrollView>
                    <Card>
                        {EffectiveNick_Code === "StandardThoroughbred" &&
                            <Card.Title style={styles.CardTitle}>Standard Thoroughbred Analysis</Card.Title>
                            ||
                            EffectiveNick_Code === "AdvancedThoroughbred" &&
                            <Card.Title style={styles.CardTitle}>Advanced Thoroughbred Analysis</Card.Title>
                            ||
                            EffectiveNick_Code === "ProfessionalThoroughbred" &&
                            <Card.Title style={styles.CardTitle}>Professional Thoroughbred Analysis</Card.Title>
                            ||
                            EffectiveNick_Code === "StandardMare" &&
                            <Card.Title style={styles.CardTitle}>Standard Mare Analysis</Card.Title>
                            ||
                            EffectiveNick_Code === "AdvancedMare" &&
                            <Card.Title style={styles.CardTitle}>Advanced Mare Analysis</Card.Title>
                            ||
                            EffectiveNick_Code === "ProfessionalMare" &&
                            <Card.Title style={styles.CardTitle}>Professional Mare Analysis</Card.Title>
                            ||
                            EffectiveNick_Code === "StandartStallion" &&
                            <Card.Title style={styles.CardTitle}>Standard Stallion Registration</Card.Title>
                            ||
                            EffectiveNick_Code === "AdvancedStallion" &&
                            <Card.Title style={styles.CardTitle}>Advanced Stallion Registration</Card.Title>
                            ||
                            EffectiveNick_Code === "ProfessionalStallion" &&
                            <Card.Title style={styles.CardTitle}>Professional Stallion Registration</Card.Title>
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
                                        <Text style={styles.ButtonText}>View Sample Report</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBuildReport(true)
                                        }}
                                        style={[styles.Button, { backgroundColor: '#2e3f6e' }]}>
                                        <Icon style={{ alignSelf: 'center' }} name="shopping-basket" size={16} color="#fff" />
                                        <Text style={styles.ButtonText}>Build Report</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.BoldText, { textAlign: 'center' }]}>Available for any horse or hypothetical mating.</Text>
                                <Text style={[styles.Text, { textAlign: 'center' }]}>Reports are created after the data of the relevant pedigree are compiled and checked by our data experts.</Text>
                                {EffectiveNick_Code === "StandardThoroughbred" &&
                                    <View style={styles.ListViewContainer}>
                                        {StandardThoroughbredList.map((item, index) => (
                                            <View
                                                style={styles.ListItemContainer}
                                                key={index}>
                                                <Icon style={{ alignSelf: 'center' }} name="caret-right" size={16} color="#2e3f6e" />
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                                <Text style={[styles.Text, { marginLeft: 10 }]}>{item.text}</Text>
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
                                <Text style={styles.OpenPriceBoxButtonText}>Thoroughbred Analysis Price</Text>
                                ||
                                EffectiveNick_Name === "Mare" &&
                                <Text style={styles.OpenPriceBoxButtonText}>Mare Analysis Price</Text>
                                ||
                                EffectiveNick_Name === "Stallion" &&
                                <Text style={styles.OpenPriceBoxButtonText}>Stallion Analysis Price</Text>
                            }

                        </TouchableOpacity>
                    </View>





                </ScrollView>


            }

        </View>
    )
}

function BuildReportHorseSearchScreen({ route, navigation }) {
    const { ScreenName } = route.params;

    const [searchValue, setSearchValue] = React.useState()
    const [isLoading, SetisLoading] = React.useState(true);
    const [getBottomSheetText, setBottomSheetText] = React.useState();

    const [getHorseName, setHorseName] = React.useState();
    const [getSireName, setSireName] = React.useState();
    const [getMareName, setMareName] = React.useState();

    const [getHorseList, setHorseList] = React.useState();

    const BottomSheetLong = React.useRef();


    const readHorseGetByName = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Horse/GetByName?p_sName=' + searchValue, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
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


    React.useEffect(() => {
        readHorseGetByName();
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
                                        }
                                        else if (getBottomSheetText === "SireName") {
                                            setSireName(item.HORSE_NAME)
                                        }
                                        else if (getBottomSheetText === "MareName") {
                                            setMareName(item.HORSE_NAME)
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
                                <Text>Sire Name</Text>
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
                                <Text>Mare Name</Text>
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
                                <Text>Please type name...</Text>
                                :
                                <Text>{getHorseName}</Text>
                            }

                            <Icon name="chevron-down" size={16} color="#5f6368" />
                        </TouchableOpacity>


                    </View>

                </>

            }


            <View style={{padding:15}}>
                <BlueButton
                    style={{ marginVertical: 20 }}
                    title="Add To Basket"
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
    SearchIconContainer:{
        padding:15,
        backgroundColor:'#2169ab',
        alignItems:'center',
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 50,
        elevation: 10,
        justifyContent:'center'
    }
})