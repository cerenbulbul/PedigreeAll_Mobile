import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Linking,
  Text,
  StyleSheet,
  Platform,
  Animated,
  ActivityIndicator,
  Dimensions,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SearchBar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RBSheet from "react-native-raw-bottom-sheet";

import { Global } from '../Global'
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
import { HorseDetailScreenNick } from './HorseDetailScreenNick';
import { HorseDetailFamilyaScreen } from './HorseDetailFamilyaScreen'

import WebView from 'react-native-webview';
const Tab = createMaterialTopTabNavigator();

const REMOTE_IMAGE_PATH = 'https://www.pedigreeall.com//pdf/Pedigree.ashx?FIRST_ID=' + Global.Horse_ID + '&SECOND_ID=-1'

const GenerationData = [
  {
    id: "4",
    title: "Gen 4",
  },
  {
    id: "5",
    title: "Gen 5",
  },
  {
    id: "6",
    title: "Gen 6",
  },
  {
    id: "7",
    title: "Gen 7",
  },
  {
    id: "8",
    title: "Gen 8",
  },
  {
    id: "9",
    title: "Gen 9",
  },
];


export function HorseDetailScreen({ route, navigation }) {
  const { HorseData, Generation } = route.params;
  const [HorseInformationData, setSearchHorseData] = useState();
  const [getHorseData, setHorseData] = React.useState(HorseData)
  const [getGenerationData, setGenerationData] = React.useState(Generation)
  Global.Generation = Generation;

  const HEADER_MIN_HEIGHT = 0;
  const HEADER_MAX_HEIGHT = 350;
  const [showHeader, setShowHeader] = useState(false)
  const refBottomSheet = useRef();
  const [ModalText, setModalText] = useState();
  const [HorseInfo, setHorseInfo] = React.useState();
  const [getFoalInfo, setFoalInfo] = React.useState();
  const [getFoalNum, setFoalNum] = React.useState(1);
  const [getStatisticInfo, setStatisticInfo] = React.useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [FullScreenVisible, setFullScreenVisible] = useState(false);
  const [time, setTime] = React.useState(true);
  const scrollY = new Animated.Value(
    Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
  )
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [getScreenName, setScreenName] = React.useState("Pedigree")

  const [getPedigreeLineColor, setPedigreeLineColor] = React.useState("#2169ab");
  const [getPedigreeColor, setPedigreeColor] = React.useState("#2169ab");
  const [getPedigreeFontWeight, setPedigreeFontWeight] = React.useState("700")
  const [getPedigreeFontSize, setPedigreeFontSize] = React.useState(18)

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

  const [getFamilyLineColor, setFamilyLineColor] = React.useState("#fff");
  const [getFamilyColor, setFamilyColor] = React.useState("#000");
  const [getFamilyFontWeight, setFamilyFontWeight] = React.useState("500")
  const [getFamilyFontSize, setFamilyFontSize] = React.useState(16)

  const refRBSheetGeneration = useRef();
  const BottomSheetSearchNavigation = useRef();
  const [GenerationTitle, setGenerationTitle] = React.useState("");
  const [state, setState] = React.useState({ checked: [] });
  const [chekedItem, setChekedItem] = React.useState(5)
  const [searchValue, setSearchValue] = React.useState("")
  const [getHorseGetByName, setHorseGetByName] = useState();
  const [loader, setLoader] = useState(false)
  const [getSearchTitle, setSearchTitle] = React.useState();

  const [getTimeForRefresh, setTimeForRefresh] = React.useState(false);
  const [getOnScroll, setOnScroll] = React.useState(false)
  const scrollRef = useRef(ScrollView);

  const [isTJK, setIsTJK] = React.useState(false);
  const [isProgency, setIsProgency] = React.useState(false);
  const [isNick, setIsNick] = React.useState(false);
  const [isFamilya, setIsFamilya] = React.useState(false);
  const [isBroodmareSire, setIsBroodmareSire] = React.useState(false);


  const readUser = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
        if (getHorseData.HORSE_ID !== undefined) {
          fetch('https://api.pedigreeall.com/Pedigree/GetPedigree?p_iGenerationCount=' + Global.Generation + "&p_iFirstId=" + Global.Horse_ID + "&p_iSecondId=" + -1, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Basic " + token,
            },
          })
            .then((response) => response.json())
            .then((json) => {
              setSearchHorseData(json)
              if (json.m_cData.HEADER_OBJECT.REF1 > 0) {
                setIsTJK(true)
              }
              else {
                setIsTJK(false)
              }
              if (json.m_cData.HEADER_OBJECT.IS_FATHER === true) {
                setIsProgency(true);
                setIsNick(true);
                setIsFamilya(true);
                setIsBroodmareSire(true);
              }
              else if (json.m_cData.HEADER_OBJECT.IS_MOTHER === true) {
                setIsProgency(true);

              }
              else {
                setIsProgency(false);
                setIsBroodmareSire(false);
                setIsNick(false);
                setIsFamilya(false)
              }
            })
            .catch((error) => {
              console.error(error);
            })
        }
      }
      else {
        console.log("Basarisiz")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const readHorseInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/ImageInfo/GetById?p_iHorseId=' + Global.Horse_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            //console.log(json);
            setHorseInfo(json.m_cData);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }
  const readFoalInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/ParentPage/GetByIdAsNameAndId?p_iHorseId=' + Global.Horse_ID + "&p_iLanguageId=" + Global.Language, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setFoalInfo(json.m_cData);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }
  const readStatisticInfo = async (FoalNum) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/HorseInfo/GetFoals?p_iHorseId=' + Global.Horse_ID + "&p_iTypeId=" + FoalNum, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        }).then((response) => response.json())
          .then((json) => {
            setStatisticInfo(json.m_cData);
            setTime(false)
          })
          .catch((error) => {
            console.error(error);
          })
      }
      else { console.log("Basarisiz") }
    }
    catch (e) { console.log(e) }
  }

  const readHorseGetByName = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
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
            setHorseGetByName(json.m_cData)
            setLoader(false)
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
    readUser();
    readHorseInfo();
    readFoalInfo();
    readStatisticInfo(1);
    readHorseGetByName()
    setState({ checked: [state, 4] })
    setGenerationTitle("Gen " + Global.Generation)

    if (Global.Language === 1) {
      setSearchTitle("Lütfen bir isim yazıp gönder tuşuna basınız..")
    }
    else {
      setSearchTitle("Please type name and press enter..")
    }

  }, [])




  return (
    <View
      style={styles.Container}>
      <RBSheet
        ref={refRBSheetGeneration}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        animationType='fade'
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
            refRBSheetGeneration.current.close();
            setGenerationTitle("Gen " + chekedItem)
          }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>
          <ScrollView style={{ marginBottom: 50 }}>
            {
              GenerationData.map((item, i) => (

                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => {
                    readUser();
                    setState({ checked: [state, item.id] });
                    setChekedItem(item.id)
                    Global.Generation = item.id
                    setGenerationData(item.id)
                    setGenerationTitle("Gen " + item.id)
                    refRBSheetGeneration.current.close();
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>

                </ListItem>


              ))
            }
          </ScrollView>
        </View>
      </RBSheet>
      <RBSheet
        ref={BottomSheetSearchNavigation}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height - 50}
        animationType='fade'
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
            BottomSheetSearchNavigation.current.close();
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
              setLoader(true);
              readHorseGetByName();
            }}
            showLoading={true}
          />
          {getHorseGetByName !== undefined &&
            <ScrollView style={{ marginBottom: 30 }}>
              {getHorseGetByName.filter((x) => x.HORSE_NAME).map(
                (item, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    button
                    onPress={() => {
                      BottomSheetSearchNavigation.current.close();
                      setHorseData(item)
                      setGenerationData(chekedItem)
                      setIsProgency(false);
                      setIsNick(false);
                      setIsBroodmareSire(false);

                      readUser();
                      readHorseInfo();
                      readFoalInfo();
                      readStatisticInfo(1);
                      readHorseGetByName()

                      setPedigreeLineColor("#2169ab")
                      setPedigreeColor("#2169ab")
                      setPedigreeFontWeight("700")
                      setPedigreeFontSize(18)

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

                      setNickLineColor("#fff")
                      setNickColor("#222")
                      setNickFontWeight("500")
                      setNickFontSize(16)

                      setScreenName("Pedigree")

                      console.log(getGenerationData)
                      scrollRef.current?.scrollTo({
                        y: 0,
                        animated: true
                      });
                      if (item.HORSE_ID !== undefined) {
                        Global.Horse_ID = item.HORSE_ID;
                      }

                    }} >
                    <Image
                      style={{ width: 70, height: 70, borderRadius: 50 }}
                      source={{ uri: item.IMAGE }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                      <ListItem.Subtitle>{item.FATHER_NAME}</ListItem.Subtitle>
                      <ListItem.Subtitle>{item.MOTHER_NAME}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))}
            </ScrollView>
          }

          {loader ?
            <ActivityIndicator
              color="#000"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />

            : null}



        </View>
      </RBSheet>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.FullScreenContainer}>
            <View style={{ width: '100%', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Icon name="times" size={26} color="silver" />
              </TouchableOpacity>
            </View>
            {ModalText === "Information" &&
              <>
                {HorseInfo !== undefined ?
                  <View style={styles.ModalItemContainer}>
                    <WebView
                      source={{ html: "<body class='scrollHeight'>" + HorseInfo[0].INFO + "</body>" }}
                      startInLoadingState={true}
                      bounces={true}
                      style={{ width: '100%', height: '100%' }}
                      automaticallyAdjustContentInsets={true}
                      javaScriptEnabledAndroid={true}
                      scrollEnabled={false}
                      renderLoading={() => (
                        <ActivityIndicator
                          color='black'
                          size='large'
                        />)} />
                  </View>
                  : <Text>There is no information</Text>
                }
              </>
              || ModalText === "Image" &&

              <>
                <Image style={styles.HorseImage} source={{ uri: HorseInfo[0].IMAGE_LIST[0] }} />
              </>

              || ModalText === "Statistics" &&

              <>
                {getFoalInfo !== undefined &&
                  <>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal>
                      <View style={styles.StatisticFoalContainer}>
                        {getFoalInfo.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.StatisticFoalButton}
                            onPress={() => {
                              setFoalNum();
                              setStatisticInfo()
                              setTime(true);
                              setFoalNum(item.ID)
                              readStatisticInfo(item.ID);
                            }}>
                            <Text style={styles.StatisticFoalButtonText}>{item.NAME}</Text>
                          </TouchableOpacity>

                        ))}
                      </View>

                    </ScrollView>
                    {time ?
                      <ActivityIndicator color="#000" size="large" />
                      :
                      <ScrollView style={{ height: "100%" }}>
                        {getStatisticInfo !== undefined &&

                          <ScrollView horizontal>
                            <DataTable>
                              {Global.Language === 1 ?
                                <DataTable.Header>
                                  <DataTable.Title style={{ width: 350 }}>İsim</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Sınıf</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Puan</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Kazanç</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Fam</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Renk</DataTable.Title>
                                  <DataTable.Title style={{ width: 400 }}>Kısrak</DataTable.Title>
                                  <DataTable.Title style={{ width: 400 }}>Kısrak Babası</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Goğum T.</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Koşu</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>1.</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>1. %</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>2.</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>2. %</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>3.</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>3. %</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>4.</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>4. %</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Fiyat</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Dr. RM</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>ANZ</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>PedigreeAll</DataTable.Title>
                                  <DataTable.Title style={{ width: 150 }}>Sahip</DataTable.Title>
                                  <DataTable.Title style={{ width: 150 }}>Yetiştirici</DataTable.Title>
                                  <DataTable.Title style={{ width: 150 }}>Antrenör</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Ölü</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Güncellenme T.</DataTable.Title>
                                </DataTable.Header>
                                :
                                <DataTable.Header>
                                  <DataTable.Title style={{ width: 350 }}>Name</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Class</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Point</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Earning</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Fam</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Color</DataTable.Title>
                                  <DataTable.Title style={{ width: 400 }}>Dam</DataTable.Title>
                                  <DataTable.Title style={{ width: 400 }}>BroodMare Sire</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Birth D.</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Start</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>1st</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>1st %</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>2nd</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>2nd %</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>3rd</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>3rd %</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>4th</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>4th %</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Price</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Dr. RM</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>ANZ</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>PedigreeAll</DataTable.Title>
                                  <DataTable.Title style={{ width: 150 }}>Owner</DataTable.Title>
                                  <DataTable.Title style={{ width: 150 }}>Breeder</DataTable.Title>
                                  <DataTable.Title style={{ width: 150 }}>Coach</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Dead</DataTable.Title>
                                  <DataTable.Title style={styles.DataTableText}>Update D.</DataTable.Title>
                                </DataTable.Header>
                              }


                              {getStatisticInfo.map((item, index) => (
                                <DataTable.Row centered={true} key={index}>
                                  <DataTable.Cell
                                    onPress={() => { alert(item.HORSE_NAME) }}
                                    style={{ width: 350 }}>
                                    {item.HORSE_NAME}
                                  </DataTable.Cell>
                                  {Global.Language === 1 ?
                                    <DataTable.Cell style={styles.DataTableText}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_TR}</DataTable.Cell>
                                    :
                                    <DataTable.Cell style={styles.DataTableText}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                                  }

                                  <DataTable.Cell style={styles.DataTableText}>{item.POINT}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.FAMILY_TEXT}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.COLOR_TEXT}</DataTable.Cell>
                                  <DataTable.Cell
                                    onPress={() => { alert(item.MOTHER_NAME) }}
                                    style={{ width: 400 }}>
                                    {item.MOTHER_NAME}
                                  </DataTable.Cell>
                                  <DataTable.Cell
                                    onPress={() => { alert(item.BM_SIRE_NAME) }}
                                    style={{ width: 400 }}>
                                    {item.BM_SIRE_NAME}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.START_COUNT}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.FIRST}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.SECOND}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.THIRD}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.FOURTH}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.RM}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.ANZ}</DataTable.Cell>
                                  <DataTable.Cell style={styles.DataTableText}>{item.PA}</DataTable.Cell>
                                  <DataTable.Cell
                                    onPress={() => { alert(item.OWNER) }}
                                    style={{ width: 150 }}>
                                    {item.OWNER}
                                  </DataTable.Cell>
                                  <DataTable.Cell
                                    onPress={() => { alert(item.BREEDER) }}
                                    style={{ width: 150 }}>
                                    {item.BREEDER}
                                  </DataTable.Cell>
                                  <DataTable.Cell
                                    onPress={() => { alert(item.COACH) }}
                                    style={{ width: 150 }}>
                                    {item.COACH}
                                  </DataTable.Cell>
                                  {item.IS_DEAD ?
                                    <>
                                      {Global.Language === 1 ?
                                        <DataTable.Cell style={styles.DataTableText}>Ölü</DataTable.Cell>
                                        :
                                        <DataTable.Cell style={styles.DataTableText}>DEAD</DataTable.Cell>
                                      }

                                    </>

                                    :
                                    <>
                                      {Global.Language === 1 ?
                                        <DataTable.Cell style={styles.DataTableText}>Sağ</DataTable.Cell>
                                        :
                                        <DataTable.Cell style={styles.DataTableText}>ALIVE</DataTable.Cell>
                                      }

                                    </>

                                  }
                                  <DataTable.Cell style={styles.DataTableText}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                                </DataTable.Row>

                              ))}
                            </DataTable>

                          </ScrollView>}
                      </ScrollView>}
                  </>}
              </>

            }

          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={FullScreenVisible}>
        <View style={styles.centeredView}>
          <View style={[styles.FullScreenContainer]}>
            <View style={{ width: '100%', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setFullScreenVisible(false);
                }}>
                <Icon name="times" size={26} color="silver" />
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </Modal>

      <ScrollView style={{ width: '100%', height: '100%' }}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SearchBar
            placeholder={getSearchTitle}
            lightTheme
            platform="ios"
            cancelButtonTitle=""
            inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
            containerStyle={{ backgroundColor: 'transparent', width: '60%' }}
            inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
            rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
            leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <TouchableOpacity
            onPress={() => { refRBSheetGeneration.current.open() }}
            style={styles.GenerationButtonContainer}>
            <Text>{GenerationTitle}</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.SearchButtonStyle}
            onPress={() => {
              readHorseGetByName();
              setLoader(true)
              setScreenName("NoScreen")
              BottomSheetSearchNavigation.current.open();
            }}>
            <Icon name="search" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.MainHeaderContainer}>
          <View style={styles.HeaderShortContainer}>
            {HorseInformationData !== undefined ?
              <Text style={styles.HeaderTitle}>{HorseInformationData.m_cData.HEADER_OBJECT.ROW1_GENERAL}</Text>
              : null}
            <TouchableOpacity
              style={styles.ShowHeaderButtonContainer}
              onPress={() => { setShowHeader(!showHeader) }}>
              {showHeader ?
                <Icon name="minus" size={14} color="#fff" />
                : <Icon name="plus" size={14} color="#fff" />}

            </TouchableOpacity>
          </View>


          <View style={styles.StabilInformationButtonContainer3Value}>
            <TouchableOpacity
              onPress={() => {
                setModalText("Information");
                setModalVisible(true);
              }}
              style={styles.StabilInformationButton}>
              <Icon name="exclamation-circle" size={16} color="#fff"></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalText("Statistics")
                setModalVisible(true);
              }}
              style={styles.StabilInformationButton}>
              <Icon name="chart-line" size={16} color="#fff"></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalText("Image");
                setModalVisible(true);
              }}
              style={styles.StabilInformationButton}>
              <Icon name="image" size={16} color="#fff"></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const supported = Linking.canOpenURL('https://www.pedigreeall.com//pdf/Pedigree.ashx?FIRST_ID=' + Global.Horse_ID + '&SECOND_ID=-1');
                if (supported) {
                  Linking.openURL('https://www.pedigreeall.com//pdf/Pedigree.ashx?FIRST_ID=' + Global.Horse_ID + '&SECOND_ID=-1');
                } else {
                  Alert.alert(`Don't know how to open this URL: ${'https://www.pedigreeall.com//pdf/Pedigree.ashx?FIRST_ID=' + Global.Horse_ID + '&SECOND_ID=-1'}`);
                }
              }}
              style={styles.StabilInformationButton}>
              <Icon name="file-pdf" size={16} color="#fff"></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //checkPermission();
              }}
              style={styles.StabilInformationButton}>
              <Icon name="image" size={16} color="#fff"></Icon>
            </TouchableOpacity>
          </View>

        </View>
        {
          showHeader ?
            <View>
              {HorseInformationData !== undefined ?
                <View style={styles.StabilInformationContainer}>
                  <View style={styles.StabilInformationItem}>
                    <Icon name="chart-line" size={16} color="#222"></Icon>
                    <Text style={styles.StabilInformationText}>Dr. Roman Miller: {HorseInformationData.m_cData.HEADER_OBJECT.ROW2_RM} </Text>
                  </View>
                  <View style={styles.StabilInformationItem}>
                    <Icon name="chart-line" size={16} color="#222"></Icon>
                    <Text style={styles.StabilInformationText}>ANZ: {HorseInformationData.m_cData.HEADER_OBJECT.ROW3_ANZ}</Text>
                  </View>
                  <View style={styles.StabilInformationItem}>
                    <Icon name="chart-line" size={16} color="#222"></Icon>
                    <Text style={styles.StabilInformationText}>BM-PedigreeAll.com: {HorseInformationData.m_cData.HEADER_OBJECT.ROW4_BM_PA}</Text>
                  </View>
                  <View style={styles.StabilInformationItem}>
                    <Icon name="chart-line" size={16} color="#222"></Icon>
                    <Text style={styles.StabilInformationText}>PedigreeAll.com: {HorseInformationData.m_cData.HEADER_OBJECT.ROW5_PA}</Text>
                  </View>

                  <View style={styles.Line} />
                </View>
                :
                <ActivityIndicator
                  color="#000"
                  size="large"
                  style={styles.ActivityIndicatorStyle}
                />
              }
            </View>
            : null
        }

        <ScrollView
          ref={scrollRef}
          style={{ height: 30 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>

          <View style={styles.TabNavigationContainer}>
            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getPedigreeLineColor }]}
              onPress={() => {
                setScreenName("Pedigree")
                setPedigreeLineColor("#2169ab")
                setPedigreeColor("#2169ab")
                setPedigreeFontWeight("700")
                setPedigreeFontSize(18)

                setNickLineColor("#fff")
                setNickColor("#222")
                setNickFontWeight("500")
                setNickFontSize(16)

                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setFamilyFontWeight("500")
                setFamilyFontSize(16)

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
              style={[styles.TabNavigationItem, { borderColor: getProfileLineColor }]}
              onPress={() => {
                setScreenName("Profile")

                setPedigreeLineColor("#fff")
                setPedigreeColor("#222")
                setPedigreeFontWeight("500")
                setPedigreeFontSize(16)

                setNickLineColor("#fff")
                setNickColor("#222")
                setNickFontWeight("500")
                setNickFontSize(16)

                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setFamilyFontWeight("500")
                setFamilyFontSize(16)

                setProfileLineColor("#2169ab")
                setProfileColor("#2169ab")
                setProfileFontWeight("700")
                setProfileFontSize(18)

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
              <Icon name="id-card" size={16} color={getProfileColor} style={{ alignSelf: 'center' }} />
              {Global.Language === 1 ?
                <Text style={[styles.TabNavigationItemText, { color: getProfileColor, fontWeight: getProfileFontWeight, fontSize: getProfileFontSize }]}>Profil</Text>
                :
                <Text style={[styles.TabNavigationItemText, { color: getProfileColor, fontWeight: getProfileFontWeight, fontSize: getProfileFontSize }]}>Profile</Text>
              }
            </TouchableOpacity>

            {isProgency ?
              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getProgencyLineColor }]}
                onPress={() => {
                  setScreenName("Progency")

                  setProgencyLineColor("#2169ab")
                  setProgencyColor("#2169ab")
                  setProgencyFontWeight("700")
                  setProgencyFontSize(18)


                  setNickLineColor("#fff")
                  setNickColor("#222")
                  setNickFontWeight("500")
                  setNickFontSize(16)

                  setFamilyLineColor("#fff")
                  setFamilyColor("#222")
                  setFamilyFontWeight("500")
                  setFamilyFontSize(16)

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
                {Global.Language === 1 ?
                  <Text style={[styles.TabNavigationItemText, { color: getProgencyColor, fontWeight: getProgencyFontWeight, fontSize: getProgencyFontSize }]}>Taylar</Text>

                  :
                  <Text style={[styles.TabNavigationItemText, { color: getProgencyColor, fontWeight: getProgencyFontWeight, fontSize: getProgencyFontSize }]}>Progency</Text>
                }
              </TouchableOpacity>
              :
              null}

            {isNick ?
              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getNickLineColor }]}
                onPress={() => {
                  setScreenName("Nick")

                  setNickLineColor("#2169ab")
                  setNickColor("#2169ab")
                  setNickFontWeight("700")
                  setNickFontSize(18)

                  setFamilyLineColor("#fff")
                  setFamilyColor("#222")
                  setFamilyFontWeight("500")
                  setFamilyFontSize(16)

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
              :
              null}

            {isNick ?
              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getFamilyLineColor }]}
                onPress={() => {
                  setScreenName("Family")


                  setFamilyLineColor("#2169ab")
                  setFamilyColor("#2169ab")
                  setFamilyFontWeight("700")
                  setFamilyFontSize(18)

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
                <Icon name="cloudsmith" size={16} color={getFamilyColor} style={{ alignSelf: 'center' }} />
                {Global.Language === 1 ?
                  <Text style={[styles.TabNavigationItemText, { color: getFamilyColor, fontWeight: getFamilyFontWeight, fontSize: getFamilyFontSize }]}>Familya</Text>

                  :
                  <Text style={[styles.TabNavigationItemText, { color: getFamilyColor, fontWeight: getFamilyFontWeight, fontSize: getFamilyFontSize }]}>Family</Text>

                }
              </TouchableOpacity>
              :
              null}


            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getSiblingsMareLineColor }]}
              onPress={() => {
                setScreenName("SiblingMare")

                setSiblingsMareLineColor("#2169ab")
                setSiblingsMareColor("#2169ab")
                setSiblingsMareFontWeight("700")
                setSiblingsMareFontSize(18)

                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setFamilyFontWeight("500")
                setFamilyFontSize(16)

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
              {Global.Language === 1 ?
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsMareColor, fontWeight: getSiblingsMareFontWeight, fontSize: getSiblingsMareFontSize }]}>Kardeş (Anne)</Text>
                :
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsMareColor, fontWeight: getSiblingsMareFontWeight, fontSize: getSiblingsMareFontSize }]}>Siblings (Mare)</Text>

              }
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getSiblingsSireLineColor }]}
              onPress={() => {
                setScreenName("SiblingSire")

                setSiblingsSireLineColor("#2169ab")
                setSiblingsSireColor("#2169ab")
                setSiblingsSireFontWeight("700")
                setSiblingsSireFontSize(18)

                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setFamilyFontWeight("500")
                setFamilyFontSize(16)

                setNickLineColor("#fff")
                setNickColor("#222")
                setNickFontWeight("500")
                setNickFontSize(16)

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
              <Icon name="cloudsmith" size={16} color={getSiblingsSireColor} style={{ alignSelf: 'center' }} />
              {Global.Language === 1 ?
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsSireColor, fontWeight: getSiblingsSireFontWeight, fontSize: getSiblingsSireFontSize }]}>Kardeş (Baba)</Text>
                :
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsSireColor, fontWeight: getSiblingsSireFontWeight, fontSize: getSiblingsSireFontSize }]}>Siblings (Sire)</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getSiblingsBroodmareSireLineColor }]}
              onPress={() => {
                setScreenName("SiblingBroodmareSire")

                setSiblingsBroodmareSireLineColor("#2169ab")
                setSiblingsBroodmareSireColor("#2169ab")
                setSiblingsBroodmareSireFontWeight("700")
                setSiblingsBroodmareSireFontSize(18)

                setNickLineColor("#fff")
                setNickColor("#222")
                setNickFontWeight("500")
                setNickFontSize(16)

                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setFamilyFontWeight("500")
                setFamilyFontSize(16)

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
              <Icon name="cloudsmith" size={16} color={getSiblingsBroodmareSireColor} style={{ alignSelf: 'center' }} />
              {Global.Language === 1 ?
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsBroodmareSireColor, fontWeight: getSiblingsBroodmareSireFontWeight, fontSize: getSiblingsBroodmareSireFontSize }]}>Kardeş (Kısrak Babası )</Text>
                :
                <Text style={[styles.TabNavigationItemText, { color: getSiblingsBroodmareSireColor, fontWeight: getSiblingsBroodmareSireFontWeight, fontSize: getSiblingsBroodmareSireFontSize }]}>Siblings (Broodmare Sire)</Text>

              }
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getTailFemaleLineColor }]}
              onPress={() => {
                setScreenName("TailFemale")

                setTailFemaleLineColor("#2169ab")
                setTailFemaleColor("#2169ab")
                setTailFemaleFontWeight("700")
                setTailFemaleFontSize(18)

                setSiblingsBroodmareSireLineColor("#fff")
                setSiblingsBroodmareSireColor("#222")
                setSiblingsBroodmareSireFontWeight("500")
                setSiblingsBroodmareSireFontSize(16)

                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setFamilyFontWeight("500")
                setFamilyFontSize(16)

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
              {Global.Language === 1 ?
                <Text style={[styles.TabNavigationItemText, { color: getTailFemaleColor, fontWeight: getTailFemaleFontWeight, fontSize: getTailFemaleFontSize }]}>Dişi Soy</Text>
                :
                <Text style={[styles.TabNavigationItemText, { color: getTailFemaleColor, fontWeight: getTailFemaleFontWeight, fontSize: getTailFemaleFontSize }]}>Tail Female</Text>
              }
            </TouchableOpacity>

            {isBroodmareSire ?
              <TouchableOpacity
                style={[styles.TabNavigationItem, { borderColor: getBroodmareSireLineColor }]}
                onPress={() => {
                  setScreenName("BroodmareSire")

                  setBroodmareSireLineColor("#2169ab")
                  setBroodmareSireColor("#2169ab")
                  setBroodmareSireFontWeight("700")
                  setBroodmareSireFontSize(18)

                  setFamilyLineColor("#fff")
                  setFamilyColor("#222")
                  setFamilyFontWeight("500")
                  setFamilyFontSize(16)

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
                {Global.Language === 1 ?
                  <Text style={[styles.TabNavigationItemText, { color: getBroodmareSireColor, fontWeight: getBroodmareSireFontWeight, fontSize: getBroodmareSireFontSize }]}>Annenin Babası</Text>
                  :
                  <Text style={[styles.TabNavigationItemText, { color: getBroodmareSireColor, fontWeight: getBroodmareSireFontWeight, fontSize: getBroodmareSireFontSize }]}>Broodmare Sire</Text>
                }
              </TouchableOpacity>
              :
              null}


            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getLinebreedingLineColor }]}
              onPress={() => {
                setScreenName("Linebreeding")

                setLinebreedingLineColor("#2169ab")
                setLinebreedingColor("#2169ab")
                setLinebreedingFontWeight("700")
                setLinebreedingFontSize(18)

                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setFamilyFontWeight("500")
                setFamilyFontSize(16)

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
              {Global.Language === 1 ?
                <Text style={[styles.TabNavigationItemText, { color: getLinebreedingColor, fontWeight: getLinebreedingFontWeight, fontSize: getLinebreedingFontSize }]}>Eş soyluluk</Text>
                :
                <Text style={[styles.TabNavigationItemText, { color: getLinebreedingColor, fontWeight: getLinebreedingFontWeight, fontSize: getLinebreedingFontSize }]}>Linebreeding</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.TabNavigationItem, { borderColor: getFemaleFamilyLineColor }]}
              onPress={() => {
                setScreenName("FemaleFamily")

                setFemaleFamilyLineColor("#2169ab")
                setFemaleFamilyColor("#2169ab")
                setFemaleFamilyFontWeight("700")
                setFemaleFamilyFontSize(18)

                setFamilyLineColor("#fff")
                setFamilyColor("#222")
                setFamilyFontWeight("500")
                setFamilyFontSize(16)

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
              {Global.Language === 1 ?
                <Text style={[styles.TabNavigationItemText, { color: getFemaleFamilyColor, fontWeight: getFemaleFamilyFontWeight, fontSize: getFemaleFamilyFontSize }]}>Kapsamlı Dişi Doy</Text>
                :
                <Text style={[styles.TabNavigationItemText, { color: getFemaleFamilyColor, fontWeight: getFemaleFamilyFontWeight, fontSize: getFemaleFamilyFontSize }]}>Female Family</Text>

              }
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

                  setFamilyLineColor("#fff")
                  setFamilyColor("#222")
                  setFamilyFontWeight("500")
                  setFamilyFontSize(16)

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

        {getScreenName === "Pedigree" ?
          <View style={{ marginTop: 20, height: 400 }}>
            <HorseDetailScreenPedigree Generation={getGenerationData} navigation={navigation} />
          </View>
          : null
        }


        <View style={{ marginTop: 20 }}>
          {getScreenName === "Profile" &&
            <HorseDetailPRofileScreen BackButton={false} navigation={navigation} />
            || getScreenName === "Progency" &&
            <HorseDetailProgencyScreen BackButton={false} navigation={navigation} />
            || getScreenName === "SiblingMare" &&
            <HorseDetailSiblingMareScreen BackButton={false} navigation={navigation} />
            || getScreenName === "SiblingSire" &&
            <HorseDetailSiblingSireScreen BackButton={false} navigation={navigation} />
            || getScreenName === "SiblingBroodmareSire" &&
            <HorseDetailSiblingBroodmareSireScreen />
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
            || getScreenName === "Family" &&
            <HorseDetailFamilyaScreen />
          }
        </View>




      </ScrollView>






    </View >
  )
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff'
  },
  StabilInformationContainer: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    padding: 10
  },
  StabilInformationItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
    alignItems: 'center'
  },
  StabilInformationText: {
    fontSize: 14,
    marginLeft: 10,
  },
  StabilInformationButtonContainer3Value: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  StabilInformationButton: {
    flexDirection: 'row',
    backgroundColor: '#2169ab',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  StabilInformationButtonText: {
    color: '#fff',
    marginLeft: 10
  },
  Line: {
    borderBottomColor: 'silver',
    borderBottomWidth: 0.5,
    marginTop: 10
  },
  FooterButton: {
    backgroundColor: '#2169ab',
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    zIndex: 99999999,
    bottom: 0,
    right: 0,
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
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25,
    zIndex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: '#6c6c6ca8'
  },
  openButton: {
    backgroundColor: "#2169ab",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  ModalItemContainer: {
    width: '100%',
    height: '95%',

  },
  ModalContainer: {
    width: '95%',
    height: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  FullScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: "#000",
  },
  TableCellStyle: {
    width: 100,
  },
  StatisticFoalContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'baseline',
    padding: 10,
    borderBottomWidth: 0.5,
  },
  StatisticFoalButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    marginLeft: 5,
    backgroundColor: '#2169ab',
    elevation: 2
  },
  StatisticFoalButtonText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff'
  },
  HorseImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
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
  GenerationButtonContainer: {
    backgroundColor: "#e8edf1",
    padding: 9,
    borderRadius: 8,
    height: 36,
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginRight: 7
  },
  SearchButtonStyle: {
    backgroundColor: "#2169ab",
    padding: 10,
    borderRadius: 150,
    height: 36,
    marginTop: 12,
    marginRight: 7
  },
  MainHeaderContainer: {
    marginBottom: 20
  },
  DataTableText: {
    width: 100
  }
})



/*
 <Tab.Navigator
        initialRouteName="SearchScreen"
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
          scrollEnabled: true,
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
          name="Pedigree"
          component={HorseDetailScreenPedigree}
          options={{
            tabBarLabel: 'Pedigree',
            tabBarIcon: () => (
              <Icon name="network-wired" size={16} color="#222" />
            ),

          }}
        />
        <Tab.Screen
          name="Profile"
          component={HorseDetailPRofileScreen}
          initialParams={{ BackButton: false }}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => (
              <Icon name="id-card" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="Progeny"
          component={HorseDetailProgencyScreen}
          initialParams={{ BackButton: false }}
          options={{
            tabBarLabel: 'Progeny',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="SiblingsMare"
          component={HorseDetailSiblingMareScreen}
          initialParams={{ BackButton: false }}
          options={{
            tabBarLabel: 'Siblings (Mare)',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="SiblingsSire"
          component={HorseDetailSiblingSireScreen}
          initialParams={{ BackButton: false }}
          options={{
            tabBarLabel: 'Siblings (Sire)',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="SiblingBroodmareSire"
          component={HorseDetailSiblingBroodmareSireScreen}
          initialParams={{ BackButton: false }}
          options={{
            tabBarLabel: 'Siblings (BroodMareSire)',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="TailFemale"
          component={HorseDetailTailFemaleScreen}
          initialParams={{ BackButton: false }}
          options={{
            tabBarLabel: 'Tail Female',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="BroodMareSire"
          component={HorseDetailBroodMareSireScreen}
          options={{
            tabBarLabel: 'BroodMare Sire',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="Linebreeding"
          component={HorseDetailLinebreedingScreen}
          initialParams={{ BackButton: false }}
          options={{
            tabBarLabel: 'Linebreeding',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="FemaleFamiliy"
          component={HorseDetailScreenFemaleFamily}
          initialParams={{ BackButton: false }}
          options={{
            tabBarLabel: 'Female Family',
            tabBarIcon: () => (
              <Icon name="cloudsmith" size={16} color="#222" />
            )
          }}
        />
        <Tab.Screen
          name="TJK"
          component={HorseDetailScreenTJK}
          options={{
            tabBarLabel: 'TJK',
            tabBarIcon: () => (
              <Image
                style={{ width: 25, height: 25 }}
                source={{ uri: 'https://medya-cdn.tjk.org/medyaftp/site_img/logo-tjk.png' }}
              />
            )
          }}
        />
      </Tab.Navigator>
*/