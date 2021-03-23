import React, { useRef, useState, } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable, List } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import WebView from 'react-native-webview';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Global } from '../Global';
import { HorseDetailScreenPedigree } from './HorseDetailScreenPedigree'
import { HorseDetailPRofileScreen } from './HorseDetailPRofileScreen';
import { HorseDetailProgencyScreen } from './HorseDetailProgencyScreen';
import { HorseDetailSiblingMareScreen } from './HorseDetailSiblingMareScreen';
import { HorseDetailSiblingSireScreen } from './HorseDetailSiblingSireScreen';
import { HorseDetailSiblingBroodmareSireScreen } from './HorseDetailSiblingBroodmareSireScreen';
import { HorseDetailTailFemaleScreen } from "./HorseDetailTailFemaleScreen";
import { HorseDetailBroodMareSireScreen } from "./HorseDetailBroodMareSireScreen";
import { HorseDetailLinebreedingScreen } from './HorseDetailLinebreedingScreen'
import { HorseDetailScreenFemaleFamily } from './HorseDetailScreenFemaleFamily';
import { HorseDetailScreenTJK } from './HorseDetailScreenTJK';
import { HorseDetailScreenNick } from './HorseDetailScreenNick'
import { HorseDetailProfileScreenInformation } from './HorseDetailProfileScreenInformation'

export function StallionsSearchLinkScreen({ route, navigation }) {

    const { Link } = route.params;
    const Tab = createMaterialTopTabNavigator();

    const [getStallionByLinkData, setStallionByLinkData] = React.useState();
    const [showHeader, setShowHeader] = React.useState(false)
    const [isTJK, setIsTJK] = React.useState(false);
    const scrollRef = useRef(ScrollView);

    const [getScreenName, setScreenName] = React.useState("Main")

    const [getMainLineColor, setMainLineColor] = React.useState("#2169ab");
    const [getMainColor, setMainColor] = React.useState("#2169ab");
    const [getMainFontWeight, setMainFontWeight] = React.useState("700")
    const [getMainFontSize, setMainFontSize] = React.useState(18)

    const [getPedigreeLineColor, setPedigreeLineColor] = React.useState("#fff");
    const [getPedigreeColor, setPedigreeColor] = React.useState("#000");
    const [getPedigreeFontWeight, setPedigreeFontWeight] = React.useState("500")
    const [getPedigreeFontSize, setPedigreeFontSize] = React.useState(16)

    const [getProfileLineColor, setProfileLineColor] = React.useState("#fff");
    const [getProfileColor, setProfileColor] = React.useState("#000");
    const [getProfileFontWeight, setProfileFontWeight] = React.useState("500")
    const [getProfileFontSize, setProfileFontSize] = React.useState(16)

    const [getProgencyLineColor, setProgencyLineColor] = React.useState("#fff");
    const [getProgencyColor, setProgencyColor] = React.useState("#000");
    const [getProgencyFontWeight, setProgencyFontWeight] = React.useState("500")
    const [getProgencyFontSize, setProgencyFontSize] = React.useState(16)

    const [getSiblingsMareLineColor, setSiblingsMareLineColor] = React.useState("#fff");
    const [getSiblingsMareColor, setSiblingsMareColor] = React.useState("#000");
    const [getSiblingsMareFontWeight, setSiblingsMareFontWeight] = React.useState("500")
    const [getSiblingsMareFontSize, setSiblingsMareFontSize] = React.useState(16)

    const [getSiblingsSireLineColor, setSiblingsSireLineColor] = React.useState("#fff");
    const [getSiblingsSireColor, setSiblingsSireColor] = React.useState("#000");
    const [getSiblingsSireFontWeight, setSiblingsSireFontWeight] = React.useState("500")
    const [getSiblingsSireFontSize, setSiblingsSireFontSize] = React.useState(16)

    const [getSiblingsBroodmareSireLineColor, setSiblingsBroodmareSireLineColor] = React.useState("#fff");
    const [getSiblingsBroodmareSireColor, setSiblingsBroodmareSireColor] = React.useState("#000");
    const [getSiblingsBroodmareSireFontWeight, setSiblingsBroodmareSireFontWeight] = React.useState("500")
    const [getSiblingsBroodmareSireFontSize, setSiblingsBroodmareSireFontSize] = React.useState(16)

    const [getTailFemaleLineColor, setTailFemaleLineColor] = React.useState("#fff");
    const [getTailFemaleColor, setTailFemaleColor] = React.useState("#000");
    const [getTailFemaleFontWeight, setTailFemaleFontWeight] = React.useState("500")
    const [getTailFemaleFontSize, setTailFemaleFontSize] = React.useState(16)

    const [getBroodmareSireLineColor, setBroodmareSireLineColor] = React.useState("#fff");
    const [getBroodmareSireColor, setBroodmareSireColor] = React.useState("#000");
    const [getBroodmareSireFontWeight, setBroodmareSireFontWeight] = React.useState("500")
    const [getBroodmareSireFontSize, setBroodmareSireFontSize] = React.useState(16)

    const [getLinebreedingLineColor, setLinebreedingLineColor] = React.useState("#fff");
    const [getLinebreedingColor, setLinebreedingColor] = React.useState("#000");
    const [getLinebreedingFontWeight, setLinebreedingFontWeight] = React.useState("500")
    const [getLinebreedingFontSize, setLinebreedingFontSize] = React.useState(16)

    const [getFemaleFamilyLineColor, setFemaleFamilyLineColor] = React.useState("#fff");
    const [getFemaleFamilyColor, setFemaleFamilyColor] = React.useState("#000");
    const [getFemaleFamilyFontWeight, setFemaleFamilyFontWeight] = React.useState("500")
    const [getFemaleFamilyFontSize, setFemaleFamilyFontSize] = React.useState(16)

    const [getTJKLineColor, setTJKLineColor] = React.useState("#fff");
    const [gettJKColor, setTJKColor] = React.useState("#000");
    const [getTJKFontWeight, setTJKFontWeight] = React.useState("500")
    const [getTJKFontSize, setTJKFontSize] = React.useState(16)

    const [getNickLineColor, setNickLineColor] = React.useState("#fff");
    const [getNickColor, setNickColor] = React.useState("#000");
    const [getNickFontWeight, setNickFontWeight] = React.useState("500")
    const [getNickFontSize, setNickFontSize] = React.useState(16)


    const readGetStallionPageByLink = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionPage/GetByLink?p_sLink=' + Link, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setStallionByLinkData(json.m_cData[0]);
                        Global.Horse_ID = json.m_cData[0].HORSE_ID
                        Global.Generation = 5
                        if (json.m_cData[0].REF1 > 0) {
                            setIsTJK(true)
                        }
                        else {
                            setIsTJK(false)
                        }
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
        readGetStallionPageByLink();
    }, [])

    return (
        <View style={styles.Container}>

            <ScrollView>



                <View style={styles.HeaderContainer}>
                    <View style={styles.HeaderShortContainer}>
                        {getStallionByLinkData !== undefined &&
                            <Text style={styles.HeaderTitle}>{getStallionByLinkData.HORSE_NAME}</Text>
                        }
                        <TouchableOpacity
                            style={styles.ShowHeaderButtonContainer}
                            onPress={() => { setShowHeader(!showHeader) }}>
                            {showHeader ?
                                <Icon name="minus" size={14} color="#fff" />
                                : <Icon name="plus" size={14} color="#fff" />}

                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    ref={scrollRef}
                    style={{ height: 30 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>

                    <View style={styles.TabNavigationContainer}>
                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getMainLineColor }]}
                            onPress={() => {
                                setScreenName("Main")

                                setMainLineColor("#2169ab")
                                setMainColor("#2169ab")
                                setMainFontWeight("700")
                                setMainFontSize(18)

                                setPedigreeLineColor("#fff")
                                setPedigreeColor("#222")
                                setPedigreeFontWeight("500")
                                setPedigreeFontSize(16)

                                setNickLineColor("#fff")
                                setNickColor("#222")
                                setNickFontWeight("500")
                                setNickFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setProgencyLineColor("#fff")
                                setProgencyColor("#222")
                                setProgencyFontWeight("500")
                                setProgencyFontSize(16)

                                setSiblingsMareLineColor("#fff")
                                setSiblingsMareColor("#222")
                                setSiblingsMareFontWeight("500")
                                setSiblingsMareFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setTailFemaleLineColor("#fff")
                                setTailFemaleColor("#222")
                                setTailFemaleFontWeight("500")
                                setTailFemaleFontSize(16)

                                setBroodmareSireLineColor("#fff")
                                setBroodmareSireColor("#222")
                                setBroodmareSireFontWeight("500")
                                setBroodmareSireFontSize(16)

                                setLinebreedingLineColor("#fff")
                                setLinebreedingColor("#222")
                                setLinebreedingFontWeight("500")
                                setLinebreedingFontSize(16)

                                setFemaleFamilyLineColor("#fff")
                                setFemaleFamilyColor("#222")
                                setFemaleFamilyFontWeight("500")
                                setFemaleFamilyFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)
                            }}>
                            <Icon name="network-wired" size={16} color={getMainColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getMainColor, fontWeight: getMainFontWeight, fontSize: getMainFontSize }]}>Main</Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getPedigreeLineColor }]}
                            onPress={() => {
                                setScreenName("Pedigree")
                                setPedigreeLineColor("#2169ab")
                                setPedigreeColor("#2169ab")
                                setPedigreeFontWeight("700")
                                setPedigreeFontSize(18)

                                setMainLineColor("#fff")
                                setMainColor("#222")
                                setMainFontWeight("500")
                                setMainFontSize(16)

                                setNickLineColor("#fff")
                                setNickColor("#222")
                                setNickFontWeight("500")
                                setNickFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setProgencyLineColor("#fff")
                                setProgencyColor("#222")
                                setProgencyFontWeight("500")
                                setProgencyFontSize(16)

                                setSiblingsMareLineColor("#fff")
                                setSiblingsMareColor("#222")
                                setSiblingsMareFontWeight("500")
                                setSiblingsMareFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setTailFemaleLineColor("#fff")
                                setTailFemaleColor("#222")
                                setTailFemaleFontWeight("500")
                                setTailFemaleFontSize(16)

                                setBroodmareSireLineColor("#fff")
                                setBroodmareSireColor("#222")
                                setBroodmareSireFontWeight("500")
                                setBroodmareSireFontSize(16)

                                setLinebreedingLineColor("#fff")
                                setLinebreedingColor("#222")
                                setLinebreedingFontWeight("500")
                                setLinebreedingFontSize(16)

                                setFemaleFamilyLineColor("#fff")
                                setFemaleFamilyColor("#222")
                                setFemaleFamilyFontWeight("500")
                                setFemaleFamilyFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)
                            }}>
                            <Icon name="network-wired" size={16} color={getPedigreeColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getPedigreeColor, fontWeight: getPedigreeFontWeight, fontSize: getPedigreeFontSize }]}>Pedigree</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getProgencyLineColor }]}
                            onPress={() => {
                                setScreenName("Progency")

                                setProgencyLineColor("#2169ab")
                                setProgencyColor("#2169ab")
                                setProgencyFontWeight("700")
                                setProgencyFontSize(18)

                                setMainLineColor("#fff")
                                setMainColor("#222")
                                setMainFontWeight("500")
                                setMainFontSize(16)


                                setNickLineColor("#fff")
                                setNickColor("#222")
                                setNickFontWeight("500")
                                setNickFontSize(16)

                                setPedigreeLineColor("#fff")
                                setPedigreeColor("#222")
                                setPedigreeFontWeight("500")
                                setPedigreeFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setSiblingsMareLineColor("#fff")
                                setSiblingsMareColor("#222")
                                setSiblingsMareFontWeight("500")
                                setSiblingsMareFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setTailFemaleLineColor("#fff")
                                setTailFemaleColor("#222")
                                setTailFemaleFontWeight("500")
                                setTailFemaleFontSize(16)

                                setBroodmareSireLineColor("#fff")
                                setBroodmareSireColor("#222")
                                setBroodmareSireFontWeight("500")
                                setBroodmareSireFontSize(16)

                                setLinebreedingLineColor("#fff")
                                setLinebreedingColor("#222")
                                setLinebreedingFontWeight("500")
                                setLinebreedingFontSize(16)

                                setFemaleFamilyLineColor("#fff")
                                setFemaleFamilyColor("#222")
                                setFemaleFamilyFontWeight("500")
                                setFemaleFamilyFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)

                            }}>
                            <Icon name="cloudsmith" size={16} color={getProgencyColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getProgencyColor, fontWeight: getProgencyFontWeight, fontSize: getProgencyFontSize }]}>Progency</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getNickLineColor }]}
                            onPress={() => {
                                setScreenName("Nick")

                                setNickLineColor("#2169ab")
                                setNickColor("#2169ab")
                                setNickFontWeight("700")
                                setNickFontSize(18)

                                setMainLineColor("#fff")
                                setMainColor("#222")
                                setMainFontWeight("500")
                                setMainFontSize(16)

                                setProgencyLineColor("#fff")
                                setProgencyColor("#222")
                                setProgencyFontWeight("500")
                                setProgencyFontSize(16)

                                setPedigreeLineColor("#fff")
                                setPedigreeColor("#222")
                                setPedigreeFontWeight("500")
                                setPedigreeFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setSiblingsMareLineColor("#fff")
                                setSiblingsMareColor("#222")
                                setSiblingsMareFontWeight("500")
                                setSiblingsMareFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setTailFemaleLineColor("#fff")
                                setTailFemaleColor("#222")
                                setTailFemaleFontWeight("500")
                                setTailFemaleFontSize(16)

                                setBroodmareSireLineColor("#fff")
                                setBroodmareSireColor("#222")
                                setBroodmareSireFontWeight("500")
                                setBroodmareSireFontSize(16)

                                setLinebreedingLineColor("#fff")
                                setLinebreedingColor("#222")
                                setLinebreedingFontWeight("500")
                                setLinebreedingFontSize(16)

                                setFemaleFamilyLineColor("#fff")
                                setFemaleFamilyColor("#222")
                                setFemaleFamilyFontWeight("500")
                                setFemaleFamilyFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)

                            }}>
                            <Icon name="cloudsmith" size={16} color={getNickColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getNickColor, fontWeight: getNickFontWeight, fontSize: getNickFontSize }]}>Nick</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getSiblingsMareLineColor }]}
                            onPress={() => {
                                setScreenName("SiblingMare")

                                setSiblingsMareLineColor("#2169ab")
                                setSiblingsMareColor("#2169ab")
                                setSiblingsMareFontWeight("700")
                                setSiblingsMareFontSize(18)

                                setMainLineColor("#fff")
                                setMainColor("#222")
                                setMainFontWeight("500")
                                setMainFontSize(16)

                                setNickLineColor("#fff")
                                setNickColor("#222")
                                setNickFontWeight("500")
                                setNickFontSize(16)

                                setProgencyLineColor("#fff")
                                setProgencyColor("#222")
                                setProgencyFontWeight("500")
                                setProgencyFontSize(16)

                                setPedigreeLineColor("#fff")
                                setPedigreeColor("#222")
                                setPedigreeFontWeight("500")
                                setPedigreeFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setTailFemaleLineColor("#fff")
                                setTailFemaleColor("#222")
                                setTailFemaleFontWeight("500")
                                setTailFemaleFontSize(16)

                                setBroodmareSireLineColor("#fff")
                                setBroodmareSireColor("#222")
                                setBroodmareSireFontWeight("500")
                                setBroodmareSireFontSize(16)

                                setLinebreedingLineColor("#fff")
                                setLinebreedingColor("#222")
                                setLinebreedingFontWeight("500")
                                setLinebreedingFontSize(16)

                                setFemaleFamilyLineColor("#fff")
                                setFemaleFamilyColor("#222")
                                setFemaleFamilyFontWeight("500")
                                setFemaleFamilyFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)
                            }}>
                            <Icon name="cloudsmith" size={16} color={getSiblingsMareColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getSiblingsMareColor, fontWeight: getSiblingsMareFontWeight, fontSize: getSiblingsMareFontSize }]}>Siblings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getTailFemaleLineColor }]}
                            onPress={() => {
                                setScreenName("TailFemale")

                                setTailFemaleLineColor("#2169ab")
                                setTailFemaleColor("#2169ab")
                                setTailFemaleFontWeight("700")
                                setTailFemaleFontSize(18)

                                setMainLineColor("#fff")
                                setMainColor("#222")
                                setMainFontWeight("500")
                                setMainFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setNickLineColor("#fff")
                                setNickColor("#222")
                                setNickFontWeight("500")
                                setNickFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsMareLineColor("#fff")
                                setSiblingsMareColor("#222")
                                setSiblingsMareFontWeight("500")
                                setSiblingsMareFontSize(16)

                                setProgencyLineColor("#fff")
                                setProgencyColor("#222")
                                setProgencyFontWeight("500")
                                setProgencyFontSize(16)

                                setPedigreeLineColor("#fff")
                                setPedigreeColor("#222")
                                setPedigreeFontWeight("500")
                                setPedigreeFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setBroodmareSireLineColor("#fff")
                                setBroodmareSireColor("#222")
                                setBroodmareSireFontWeight("500")
                                setBroodmareSireFontSize(16)

                                setLinebreedingLineColor("#fff")
                                setLinebreedingColor("#222")
                                setLinebreedingFontWeight("500")
                                setLinebreedingFontSize(16)

                                setFemaleFamilyLineColor("#fff")
                                setFemaleFamilyColor("#222")
                                setFemaleFamilyFontWeight("500")
                                setFemaleFamilyFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)
                            }}>
                            <Icon name="cloudsmith" size={16} color={getTailFemaleColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getTailFemaleColor, fontWeight: getTailFemaleFontWeight, fontSize: getTailFemaleFontSize }]}>Tail Female</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getBroodmareSireLineColor }]}
                            onPress={() => {
                                setScreenName("BroodmareSire")

                                setBroodmareSireLineColor("#2169ab")
                                setBroodmareSireColor("#2169ab")
                                setBroodmareSireFontWeight("700")
                                setBroodmareSireFontSize(18)

                                setMainLineColor("#fff")
                                setMainColor("#222")
                                setMainFontWeight("500")
                                setMainFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setNickLineColor("#fff")
                                setNickColor("#222")
                                setNickFontWeight("500")
                                setNickFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsMareLineColor("#fff")
                                setSiblingsMareColor("#222")
                                setSiblingsMareFontWeight("500")
                                setSiblingsMareFontSize(16)

                                setProgencyLineColor("#fff")
                                setProgencyColor("#222")
                                setProgencyFontWeight("500")
                                setProgencyFontSize(16)

                                setPedigreeLineColor("#fff")
                                setPedigreeColor("#222")
                                setPedigreeFontWeight("500")
                                setPedigreeFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setTailFemaleLineColor("#fff")
                                setTailFemaleColor("#222")
                                setTailFemaleFontWeight("500")
                                setTailFemaleFontSize(16)

                                setLinebreedingLineColor("#fff")
                                setLinebreedingColor("#222")
                                setLinebreedingFontWeight("500")
                                setLinebreedingFontSize(16)

                                setFemaleFamilyLineColor("#fff")
                                setFemaleFamilyColor("#222")
                                setFemaleFamilyFontWeight("500")
                                setFemaleFamilyFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)
                            }}>
                            <Icon name="cloudsmith" size={16} color={getBroodmareSireColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getBroodmareSireColor, fontWeight: getBroodmareSireFontWeight, fontSize: getBroodmareSireFontSize }]}>Broodmare Sire</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getLinebreedingLineColor }]}
                            onPress={() => {
                                setScreenName("Linebreeding")

                                setLinebreedingLineColor("#2169ab")
                                setLinebreedingColor("#2169ab")
                                setLinebreedingFontWeight("700")
                                setLinebreedingFontSize(18)

                                setMainLineColor("#fff")
                                setMainColor("#222")
                                setMainFontWeight("500")
                                setMainFontSize(16)

                                setBroodmareSireLineColor("#fff")
                                setBroodmareSireColor("#222")
                                setBroodmareSireFontWeight("500")
                                setBroodmareSireFontSize(16)

                                setNickLineColor("#fff")
                                setNickColor("#222")
                                setNickFontWeight("500")
                                setNickFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsMareLineColor("#fff")
                                setSiblingsMareColor("#222")
                                setSiblingsMareFontWeight("500")
                                setSiblingsMareFontSize(16)

                                setProgencyLineColor("#fff")
                                setProgencyColor("#222")
                                setProgencyFontWeight("500")
                                setProgencyFontSize(16)

                                setPedigreeLineColor("#fff")
                                setPedigreeColor("#222")
                                setPedigreeFontWeight("500")
                                setPedigreeFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setTailFemaleLineColor("#fff")
                                setTailFemaleColor("#222")
                                setTailFemaleFontWeight("500")
                                setTailFemaleFontSize(16)

                                setFemaleFamilyLineColor("#fff")
                                setFemaleFamilyColor("#222")
                                setFemaleFamilyFontWeight("500")
                                setFemaleFamilyFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)

                            }}>
                            <Icon name="cloudsmith" size={16} color={getLinebreedingColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getLinebreedingColor, fontWeight: getLinebreedingFontWeight, fontSize: getLinebreedingFontSize }]}>Linebreeding</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.TabNavigationItem, { borderColor: getFemaleFamilyLineColor }]}
                            onPress={() => {
                                setScreenName("FemaleFamily")

                                setFemaleFamilyLineColor("#2169ab")
                                setFemaleFamilyColor("#2169ab")
                                setFemaleFamilyFontWeight("700")
                                setFemaleFamilyFontSize(18)

                                setMainLineColor("#fff")
                                setMainColor("#222")
                                setMainFontWeight("500")
                                setMainFontSize(16)

                                setLinebreedingLineColor("#fff")
                                setLinebreedingColor("#222")
                                setLinebreedingFontWeight("500")
                                setLinebreedingFontSize(16)

                                setNickLineColor("#fff")
                                setNickColor("#222")
                                setNickFontWeight("500")
                                setNickFontSize(16)

                                setBroodmareSireLineColor("#fff")
                                setBroodmareSireColor("#222")
                                setBroodmareSireFontWeight("500")
                                setBroodmareSireFontSize(16)

                                setSiblingsBroodmareSireLineColor("#fff")
                                setSiblingsBroodmareSireColor("#222")
                                setSiblingsBroodmareSireFontWeight("500")
                                setSiblingsBroodmareSireFontSize(16)

                                setSiblingsSireLineColor("#fff")
                                setSiblingsSireColor("#222")
                                setSiblingsSireFontWeight("500")
                                setSiblingsSireFontSize(16)

                                setSiblingsMareLineColor("#fff")
                                setSiblingsMareColor("#222")
                                setSiblingsMareFontWeight("500")
                                setSiblingsMareFontSize(16)

                                setProgencyLineColor("#fff")
                                setProgencyColor("#222")
                                setProgencyFontWeight("500")
                                setProgencyFontSize(16)

                                setPedigreeLineColor("#fff")
                                setPedigreeColor("#222")
                                setPedigreeFontWeight("500")
                                setPedigreeFontSize(16)

                                setProfileLineColor("#fff")
                                setProfileColor("#222")
                                setProfileFontWeight("500")
                                setProfileFontSize(16)

                                setTailFemaleLineColor("#fff")
                                setTailFemaleColor("#222")
                                setTailFemaleFontWeight("500")
                                setTailFemaleFontSize(16)

                                setTJKLineColor("#fff")
                                setTJKColor("#222")
                                setTJKFontWeight("500")
                                setTJKFontSize(16)

                            }}>
                            <Icon name="cloudsmith" size={16} color={getFemaleFamilyColor} style={{ alignSelf: 'center' }} />
                            <Text style={[styles.TabNavigationItemText, { color: getFemaleFamilyColor, fontWeight: getFemaleFamilyFontWeight, fontSize: getFemaleFamilyFontSize }]}>Female Family</Text>
                        </TouchableOpacity>

                        {isTJK ?
                            <TouchableOpacity
                                style={[styles.TabNavigationItem, { borderColor: getTJKLineColor }]}
                                onPress={() => {
                                    setScreenName("TJK")

                                    setTJKLineColor("#2169ab")
                                    setTJKColor("#2169ab")
                                    setTJKFontWeight("700")
                                    setTJKFontSize(18)

                                    setMainLineColor("#fff")
                                    setMainColor("#222")
                                    setMainFontWeight("500")
                                    setMainFontSize(16)

                                    setFemaleFamilyLineColor("#fff")
                                    setFemaleFamilyColor("#222")
                                    setFemaleFamilyFontWeight("500")
                                    setFemaleFamilyFontSize(16)

                                    setNickLineColor("#fff")
                                    setNickColor("#222")
                                    setNickFontWeight("500")
                                    setNickFontSize(16)

                                    setLinebreedingLineColor("#fff")
                                    setLinebreedingColor("#222")
                                    setLinebreedingFontWeight("500")
                                    setLinebreedingFontSize(16)

                                    setBroodmareSireLineColor("#fff")
                                    setBroodmareSireColor("#222")
                                    setBroodmareSireFontWeight("500")
                                    setBroodmareSireFontSize(16)

                                    setSiblingsBroodmareSireLineColor("#fff")
                                    setSiblingsBroodmareSireColor("#222")
                                    setSiblingsBroodmareSireFontWeight("500")
                                    setSiblingsBroodmareSireFontSize(16)

                                    setSiblingsSireLineColor("#fff")
                                    setSiblingsSireColor("#222")
                                    setSiblingsSireFontWeight("500")
                                    setSiblingsSireFontSize(16)

                                    setSiblingsMareLineColor("#fff")
                                    setSiblingsMareColor("#222")
                                    setSiblingsMareFontWeight("500")
                                    setSiblingsMareFontSize(16)

                                    setProgencyLineColor("#fff")
                                    setProgencyColor("#222")
                                    setProgencyFontWeight("500")
                                    setProgencyFontSize(16)

                                    setPedigreeLineColor("#fff")
                                    setPedigreeColor("#222")
                                    setPedigreeFontWeight("500")
                                    setPedigreeFontSize(16)

                                    setProfileLineColor("#fff")
                                    setProfileColor("#222")
                                    setProfileFontWeight("500")
                                    setProfileFontSize(16)

                                    setTailFemaleLineColor("#fff")
                                    setTailFemaleColor("#222")
                                    setTailFemaleFontWeight("500")
                                    setTailFemaleFontSize(16)

                                }}>
                                <Image
                                    style={{ width: 30, height: 25, alignSelf: 'center', alignContent: 'center' }}
                                    source={{ uri: 'https://www.pedigreeall.com//images/head2.jpg' }}
                                />
                                <Text style={[styles.TabNavigationItemText, { color: gettJKColor, fontWeight: getTJKFontWeight, fontSize: getTJKFontSize }]}>TJK</Text>
                            </TouchableOpacity>
                            :
                            null}


                    </View>

                </ScrollView>

                {getScreenName === "Main" ?
                    <View>
                        <Tab.Navigator
                            initialRouteName="Statistics"
                            removeClippedSubviews={true}
                            sceneContainerStyle={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'white',
                            }}
                            tabBarOptions={{
                                activeTintColor: '#000',
                                inactiveTintColor: '#b5b5b5',
                                indicatorStyle: {
                                    backgroundColor: '#2169ab'
                                },
                                labelStyle: {
                                    fontSize: 12,
                                },
                                style: {
                                    backgroundColor: 'white', //e8edf1
                                    height: (Platform.OS === 'ios') ? 48 : 50,
                                    overflow: "hidden"
                                },
                            }}
                        >
                            <Tab.Screen
                                name="Statistics"
                                component={StatisticsScreen}
                            />
                            <Tab.Screen
                                name="About"
                                component={AboutScreen}
                            />
                            <Tab.Screen
                                name="Profile"
                                component={HorseDetailProfileScreenInformation}
                            />
                        </Tab.Navigator>
                    </View>
                    :
                    null}

                {getScreenName === "Pedigree" ?
                    <View style={{ marginTop: 20, height: 400 }}>
                        <HorseDetailScreenPedigree Generation={5} navigation={navigation} />
                    </View>
                    : null
                }


                <View style={{ marginTop: 20 }}>
                    {getScreenName === "Progency" &&
                        <HorseDetailProgencyScreen BackButton={false} navigation={navigation} />
                        || getScreenName === "SiblingMare" &&
                        <HorseDetailSiblingMareScreen BackButton={false} navigation={navigation} />
                        || getScreenName === "TailFemale" &&
                        <HorseDetailTailFemaleScreen BackButton={false} navigation={navigation} />
                        || getScreenName === "BroodmareSire" &&
                        <HorseDetailBroodMareSireScreen />
                        || getScreenName === "Linebreeding" &&
                        <HorseDetailLinebreedingScreen BackButton={false} navigation={navigation} />
                        || getScreenName === "FemaleFamily" &&
                        <HorseDetailScreenFemaleFamily BackButton={false} navigation={navigation} />
                        || getScreenName === "TJK" &&
                        <HorseDetailScreenTJK />
                        || getScreenName === "Nick" &&
                        <HorseDetailScreenNick />
                    }
                </View>




            </ScrollView>

        </View>
    )
}


function AboutScreen() {
    const [getStallionByLinkData, setStallionByLinkData] = React.useState();

    const readGetStallionPageByLink = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionPage/GetByLink?p_sLink=' + Global.Link, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setStallionByLinkData(json.m_cData[0]);

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
        readGetStallionPageByLink();
    }, [])


    return (
        <View style={{ width: '100%', height: '100%', marginTop: 20, padding: 10 }}>
            {getStallionByLinkData !== undefined &&

                <WebView
                    source={{ html: getStallionByLinkData.INFO }}
                    startInLoadingState={true}
                    javaScriptEnabledAndroid={true}
                    showsHorizontalScrollIndicator={true}
                    scrollEnabled={true}
                    style={{ width: '100%', height: '100%' }}
                    showsVerticalScrollIndicator={true}
                />
            }

        </View>
    )
}

function StatisticsScreen() {

    const [getStallionByLinkData, setStallionByLinkData] = React.useState();
    const [getAccordingTitle, setAccordingTitle] = React.useState();
    const [getStatistic1Data, setStatistic1Data] = React.useState([]);
    const [getStatistic2Data, setStatistic2Data] = React.useState([]);
    const [getStatistic3Data, setStatistic3Data] = React.useState([]);
    const [getStatistic4Data, setStatistic4Data] = React.useState([]);

    const [getProgressChartRaceFoals, setProgressChartRaceFoals] = React.useState([]);
    const [getProgressChartWinnerFoals, setProgressChartWinnerFoals] = React.useState([]);
    const [getProgressChartGroupWinnerFoals, setProgressChartGroupWinnerFoals] = React.useState([]);
    const [getProgressChartBlackTypeFoals, setProgressChartBlackTypeFoals] = React.useState([]);
    const [getProgressChartWinnerFoalRaceFoal, setProgressChartWinnerFoalRaceFoal] = React.useState([]);
    const [getProgressChartGroupWinnerFoalRaceFoal, setProgressChartGroupWinnerFoalRaceFoal] = React.useState([]);
    const [getProgressChartBlackTypeRaceFoal, setProgressChartBlackTypeRaceFoal] = React.useState([]);
    const [getProgressChartGroupWinnerRaceWinner, setProgressChartGroupWinnerRaceWinner] = React.useState([]);
    const [getProgressChartBlackTypeRaceWinner, setProgressChartBlackTypeRaceWinner] = React.useState([]);
    const [getProgressChartBlackTypeGroupRaceWinner, setProgressChartBlackTypeGroupRaceWinner] = React.useState([]);

    const [getLastStatData, setLastStatData] = React.useState([]);
    const [getLastProgressData, setLastProgressData] = React.useState([]);



    const readGetStallionPageByLink = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/StallionPage/GetByLink?p_sLink=' + Global.Link, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {

                        setAccordingTitle(json.m_cData[0].STALLION_SEASON_LIST[0].YEAR + "/" + json.m_cData[0].STALLION_SEASON_LIST[0].FEE + "/" + json.m_cData[0].STALLION_SEASON_LIST[0].PLACE)
                        //setStatistic1Data([json.m_cData[0].START, json.m_cData[0].TOP4, json.m_cData[0].FIRST, json.m_cData[0].SECOND, json.m_cData[0].THIRD, json.m_cData[0].FOURTH])
                        const statisctic1Data = {
                            datasets: [
                                {
                                    data: [json.m_cData[0].START, json.m_cData[0].TOP4, json.m_cData[0].FIRST, json.m_cData[0].SECOND, json.m_cData[0].THIRD, json.m_cData[0].FOURTH]
                                }
                            ],
                            labels: [
                                "Start: 100% ",
                                "Top 4: " + json.m_cData[0].TOP4_PERCENTAGE + "%",
                                "1st: " + json.m_cData[0].FIRST_PERCENTAGE + "%",
                                "2nd: " + json.m_cData[0].SECOND_PERCENTAGE + "%",
                                "3rd: " + json.m_cData[0].THIRD_PERCENTAGE + "%",
                                "4th: " + json.m_cData[0].FOURTH_PERCENTAGE + "%"
                            ],

                        };
                        setStatistic1Data(statisctic1Data)

                        const statisctic2Data = {
                            datasets: [
                                {
                                    data: [json.m_cData[0].FOAL, json.m_cData[0].RACE_FOAL, json.m_cData[0].WINNER_FOAL, json.m_cData[0].G_WINNER_FOAL, json.m_cData[0].B_WINNER_FOAL]
                                }
                            ],
                            labels: [
                                "Foals: 100% ",
                                "Racing: " + json.m_cData[0].RACE_FOAL_PERCENTAGE + "%",
                                "R. Winner: " + json.m_cData[0].WINNER_FOAL_PERCENTAGE + "%",
                                "GR Winner: " + json.m_cData[0].G_WINNER_FOAL_PERCENTAGE + "%",
                                "B Type: " + json.m_cData[0].B_WINNER_FOAL_PERCENTAGE + "%",
                            ],

                        };
                        setStatistic2Data(statisctic2Data)


                        const statisctic3Data = {
                            datasets: [
                                {
                                    data: [(parseInt(json.m_cData[0].EARN / json.m_cData[0].FOAL, 10)), (parseInt(json.m_cData[0].EARN / json.m_cData[0].RACE_FOAL, 10)), (parseInt(json.m_cData[0].EARN / json.m_cData[0].WINNER_FOAL, 10))]
                                }
                            ],
                            labels: [
                                "Earning Foal",
                                "Earning Race Foal",
                                "Earning Winner Foal",
                            ],

                        };
                        setStatistic3Data(statisctic3Data)


                        const statisctic4Data = {
                            datasets: [
                                {
                                    data: [(json.m_cData[0].TOP4 / json.m_cData[0].FOAL).toString().substring(0, 4), (json.m_cData[0].TOP4 / json.m_cData[0].RACE_FOAL).toString().substring(0, 4), (json.m_cData[0].TOP4 / json.m_cData[0].WINNER_FOAL).toString().substring(0, 4)]
                                }
                            ],
                            labels: [
                                "Top4/Foal",
                                "Top4/Race Foal",
                                "Top4/Winner Foal",
                            ],

                        };
                        setStatistic4Data(statisctic4Data)

                        setProgressChartRaceFoals([(parseInt(json.m_cData[0].RACE_FOAL_PERCENTAGE, 10)) / 100])
                        setProgressChartWinnerFoals([(parseInt(json.m_cData[0].WINNER_FOAL_PERCENTAGE, 10)) / 100])
                        setProgressChartGroupWinnerFoals([(parseInt(json.m_cData[0].G_WINNER_FOAL_PERCENTAGE, 10)) / 100])
                        setProgressChartBlackTypeFoals([(parseInt(json.m_cData[0].B_WINNER_FOAL_PERCENTAGE, 10)) / 100])
                        setProgressChartWinnerFoalRaceFoal([json.m_cData[0].WINNER_FOAL / json.m_cData[0].RACE_FOAL])
                        setProgressChartGroupWinnerFoalRaceFoal([json.m_cData[0].G_WINNER_FOAL / json.m_cData[0].RACE_FOAL])
                        setProgressChartBlackTypeRaceFoal([json.m_cData[0].B_WINNER_FOAL / json.m_cData[0].RACE_FOAL])
                        setProgressChartGroupWinnerRaceWinner([json.m_cData[0].G_WINNER_FOAL / json.m_cData[0].WINNER_FOAL])
                        setProgressChartBlackTypeRaceWinner([json.m_cData[0].B_WINNER_FOAL / json.m_cData[0].WINNER_FOAL])
                        setProgressChartBlackTypeGroupRaceWinner([json.m_cData[0].B_WINNER_FOAL / json.m_cData[0].G_WINNER_FOAL])


                        const statisctic5Data = {
                            datasets: [
                                {
                                    data:
                                        [
                                            json.m_cData[0].STALLION_SEASON_LIST[0].MARE_COUNT,
                                            json.m_cData[0].STALLION_SEASON_LIST[0].PREGNANT_COUNT,
                                            json.m_cData[0].STALLION_SEASON_LIST[0].EMPTY_COUNT,
                                            json.m_cData[0].STALLION_SEASON_LIST[0].UNCHECKED_COUNT,
                                            json.m_cData[0].STALLION_SEASON_LIST[0].DEAD_MARE_COUNT,
                                            json.m_cData[0].STALLION_SEASON_LIST[0].ALIVE_COUNT
                                        ]
                                }
                            ],
                            labels: [
                                "Mare",
                                "Pregnant",
                                "Empty",
                                "Unchecked",
                                "Dead Mare",
                                "Alive Foal"
                            ],

                        };
                        setLastStatData(statisctic5Data)
                        setLastProgressData([(parseInt(json.m_cData[0].STALLION_SEASON_LIST[0].MARE_PERCENTAGE, 10)) / 100])

                        setStallionByLinkData(json.m_cData[0]);

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
        readGetStallionPageByLink();
    }, [])

    return (
        <View>
            {getStallionByLinkData !== undefined &&

                <View style={styles.StatisticContainer}>
                    <View>
                        <BarChart
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            showBarTops={true}
                            showValuesOnTopOfBars={true}
                            withInnerLines={true}
                            segments={3}
                            data={getStatistic1Data}
                            width={Dimensions.get('window').width - 10}
                            height={350}
                            chartConfig={
                                {
                                    backgroundGradientFrom: '#Ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    barPercentage: 1,
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => "#333",
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                                    fillShadowGradient: '#07BBA1', // THIS
                                    fillShadowGradientOpacity: 2, // THIS
                                    style: {
                                        borderRadius: 16,
                                        fontFamily: 'Bogle-Regular',
                                    },
                                    propsForBackgroundLines: {
                                        strokeWidth: 1,
                                        stroke: '#efefef',
                                        strokeDasharray: '0',

                                    },
                                    propsForLabels: {
                                        fontFamily: 'Bogle-Regular',
                                        fontSize: 7,

                                    },
                                }
                            }
                            fromZero={true}
                            labelStyle={{ height: 500, window: 10 }}

                        />
                    </View>

                    <View>
                        <BarChart
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            showBarTops={true}
                            showValuesOnTopOfBars={true}
                            withInnerLines={true}
                            segments={3}
                            data={getStatistic2Data}
                            width={Dimensions.get('window').width - 10}
                            height={350}
                            chartConfig={
                                {
                                    backgroundGradientFrom: '#Ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    barPercentage: 1,
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => "#333",
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                                    fillShadowGradient: '#FB0E0E', // THIS
                                    fillShadowGradientOpacity: 2, // THIS
                                    style: {
                                        borderRadius: 16,
                                        fontFamily: 'Bogle-Regular',
                                    },
                                    propsForBackgroundLines: {
                                        strokeWidth: 1,
                                        stroke: '#efefef',
                                        strokeDasharray: '0',

                                    },
                                    propsForLabels: {
                                        fontFamily: 'Bogle-Regular',
                                        fontSize: 7,

                                    },
                                }
                            }
                            fromZero={true}
                            labelStyle={{ height: 500, window: 10 }}

                        />
                    </View>

                    <View>
                        <BarChart
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            showBarTops={true}
                            showValuesOnTopOfBars={true}
                            withInnerLines={true}
                            segments={3}
                            data={getStatistic3Data}
                            width={Dimensions.get('window').width - 10}
                            height={350}
                            chartConfig={
                                {
                                    backgroundGradientFrom: '#Ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    barPercentage: 1,
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => "#333",
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                                    fillShadowGradient: '#50E115', // THIS
                                    fillShadowGradientOpacity: 2, // THIS
                                    style: {
                                        borderRadius: 16,
                                        fontFamily: 'Bogle-Regular',
                                    },
                                    propsForBackgroundLines: {
                                        strokeWidth: 1,
                                        stroke: '#efefef',
                                        strokeDasharray: '0',

                                    },
                                    propsForLabels: {
                                        fontFamily: 'Bogle-Regular',
                                        fontSize: 10,

                                    },
                                }
                            }
                            fromZero={true}
                            labelStyle={{ height: 500, window: 10 }}

                        />
                    </View>

                    <View>
                        <BarChart
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            showBarTops={true}
                            showValuesOnTopOfBars={true}
                            withInnerLines={true}
                            segments={3}
                            data={getStatistic4Data}
                            width={Dimensions.get('window').width - 10}
                            height={350}
                            chartConfig={
                                {
                                    backgroundGradientFrom: '#Ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    barPercentage: 1,
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => "#333",
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                                    fillShadowGradient: '#F49516', // THIS
                                    fillShadowGradientOpacity: 2, // THIS
                                    style: {
                                        borderRadius: 16,
                                        fontFamily: 'Bogle-Regular',
                                    },
                                    propsForBackgroundLines: {
                                        strokeWidth: 1,
                                        stroke: '#efefef',
                                        strokeDasharray: '0',

                                    },
                                    propsForLabels: {
                                        fontFamily: 'Bogle-Regular',
                                        fontSize: 10,

                                    },
                                }
                            }
                            fromZero={true}
                            labelStyle={{ height: 500, window: 10 }}

                        />
                    </View>

                    <List.AccordionGroup>
                        <List.Accordion
                            id="2"
                            title="Statics"
                            theme={{ colors: { primary: '#2169ab' } }}
                            left={props => <Icon name="chart-line" size={20} color="#000"  {...props} />}>
                            <View>
                                <Text style={styles.ProgressBarTitle}>Race Foal</Text>
                                <ProgressChart
                                    data={getProgressChartRaceFoals}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Winner Foal</Text>
                                <ProgressChart
                                    data={getProgressChartWinnerFoals}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Group Winner Foal</Text>
                                <ProgressChart
                                    data={getProgressChartGroupWinnerFoals}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Black Type Foal</Text>
                                <ProgressChart
                                    data={getProgressChartBlackTypeFoals}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Winner Foal / Race Foal</Text>
                                <ProgressChart
                                    data={getProgressChartWinnerFoalRaceFoal}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Group Winner Foal / Race Foal</Text>
                                <ProgressChart
                                    data={getProgressChartGroupWinnerFoalRaceFoal}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Black Type / Race Foal</Text>
                                <ProgressChart
                                    data={getProgressChartBlackTypeRaceFoal}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Group Winner / Race Winner</Text>
                                <ProgressChart
                                    data={getProgressChartGroupWinnerRaceWinner}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Black Type / Race Winner</Text>
                                <ProgressChart
                                    data={getProgressChartBlackTypeRaceWinner}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                                <Text style={styles.ProgressBarTitle}>Black Type / Group Winner</Text>
                                <ProgressChart
                                    data={getProgressChartBlackTypeGroupRaceWinner}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />
                            </View>

                        </List.Accordion>
                        <List.Accordion
                            id="3"
                            title={getAccordingTitle}
                            titleNumberOfLines={2}
                            theme={{ colors: { primary: '#2169ab' } }}
                            left={props => <Icon name="chart-line" size={20} color="#000" {...props} />}>

                            <View >
                                <BarChart
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                    showBarTops={true}
                                    showValuesOnTopOfBars={true}
                                    withInnerLines={true}
                                    segments={2}
                                    data={getLastStatData}
                                    width={Dimensions.get('window').width}
                                    height={250}
                                    chartConfig={
                                        {
                                            backgroundGradientFrom: '#Ffffff',
                                            backgroundGradientTo: '#ffffff',
                                            barPercentage: 0.5,
                                            decimalPlaces: 0, // optional, defaults to 2dp
                                            color: (opacity = 1) => "#333",
                                            labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                                            fillShadowGradient: '#07BBA1', // THIS
                                            fillShadowGradientOpacity: 2, // THIS
                                            style: {
                                                borderRadius: 16,
                                                fontFamily: 'Bogle-Regular',
                                            },
                                            propsForBackgroundLines: {
                                                strokeWidth: 1,
                                                stroke: '#efefef',
                                                strokeDasharray: '0',

                                            },
                                            propsForLabels: {
                                                fontFamily: 'Bogle-Regular',
                                                fontSize: 7,

                                            },
                                        }
                                    }
                                    fromZero={true}
                                    labelStyle={{ height: 500, window: 10 }}

                                />
                                <ProgressChart
                                    data={[0.0]}
                                    width={Dimensions.get('window').width - 20}
                                    height={200}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#fff',
                                        backgroundGradientTo: '#fff',
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(30, 204, 241, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                />

                            </View>

                        </List.Accordion>
                    </List.AccordionGroup>

                </View>

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
        marginTop: 10,
    },
    HeaderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '80%'
    },
    ShowHeaderButtonContainer: {
        backgroundColor: '#2169ab',
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center',
    },
    HeaderShortContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    TabNavigationContainer: {
        padding: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    TabNavigationItem: {
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        paddingBottom: 15,
        flexDirection: 'row',
        borderBottomWidth: 1
    },
    TabNavigationItemText: {
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 5,
        padding: 5,
    },
    StatisticContainer: {
        marginTop: 20
    },
    ProgressBarTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        marginRight: 30,
        color: "#2169ab"
    }
})