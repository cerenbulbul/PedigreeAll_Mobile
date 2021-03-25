import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  ScrollView,
  UIManager,
  ActivityIndicator,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchBar, Tabs, Card, CheckBox, ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { decode as atob, encode as btoa } from 'base-64'


import { SettingBottomSheet } from '../components/SettingBottomSheet'
import RBSheet from "react-native-raw-bottom-sheet";
import Preview from '../components/FlatList/Preview';
import FlatListSlider from '../components/FlatList/FlatListSlider';
import Indicator from '../components/FlatList/Indicator';
import { Global } from "../Global";
import { FilledButton } from "../components/FilledButton";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { ErrorMessage } from '../components/ErrorMessage'

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
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

export function MainScreen({ navigation }) {
  React.useEffect(() => {
    Global.getUser();
    Global.getToken();
  }, [])

  React.useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      Global.getBasket();

    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  return (
    <MyTabs />
  );

}

function SearchScreen({ navigation }) {
  const refRBSheetGeneration = useRef();
  const BottomSheetSearchNavigation = useRef();
  const [GenerationTitle, setGenerationTitle] = React.useState("Gen 5");
  const [state, setState] = React.useState({ checked: [] });
  const [chekedItem, setChekedItem] = React.useState(5)
  const [searchValue, setSearchValue] = React.useState("SEFIR")
  const [userData, setUserData] = useState();
  const [HorseData, setHorseData] = useState([]);
  const [loader, setLoader] = useState(false)

  const [getSearchTitle, setSearchTitle] = React.useState();

  const readUser = async () => {
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
            setHorseData(json)
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
    setState({ checked: [state, 4] })
    if (Global.Language === "TR") {
      setSearchTitle("Lütfen bir isim yazıp gönder tuşuna basınız")
    }
    else {
      setSearchTitle("Please type name and press enter..")
    }
  }, [])

  return (
    <View style={styles.ScreensContainer}>
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
                    setState({ checked: [state, item.id] });
                    setChekedItem(item.id)
                    setGenerationTitle("Gen " + item.id)
                    refRBSheetGeneration.current.close();

                  }}
                >
                  <ListItem.CheckBox
                    checked={state.checked.includes(item.id)}
                    checkedIcon='circle'
                    uncheckedIcon='circle'
                    center={true}
                    checkedColor='#2169ab'
                    uncheckedColor='rgb(232, 237, 241)'
                    onPress={() => {
                      setState({ checked: [state, item.id] });
                      setChekedItem(item.id)
                      setGenerationTitle("Gen " + item.id)
                      refRBSheetGeneration.current.close();
                    }} >
                  </ListItem.CheckBox>
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
              readUser();
            }}
            showLoading={true}
          />
          {HorseData.m_cData !== undefined &&
            <ScrollView style={{ marginBottom: 30 }}>
              {HorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                (item, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    button
                    onPress={() => {
                      BottomSheetSearchNavigation.current.close();
                      navigation.navigate('HorseDetail', {
                        HorseData: item,
                        Generation: chekedItem
                      });
                      if (item.HORSE_ID !== undefined) {
                        Global.Horse_ID = item.HORSE_ID;
                      }


                    }} >
                    <Image
                      style={{  width: 70, height: 70, justifyContent:'center', resizeMode:'contain' }}
                      source={{ uri: 'https://www.pedigreeall.com//upload/150/' + item.IMAGE }}
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
          {HorseData.m_cDetail !== undefined &&
            <>
              {HorseData.m_cDetail.m_eProcessState < 0 &&
                <>
                  {loader === false &&
                    <View style={styles.ErrorMessageContainer}>
                      <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                      {Global.Language === "TR" ?
                        <>
                          <Text style={styles.ErrorMessageTitle}>Veriler Bulunamadı !</Text>
                          <Text style={styles.ErrorMessageText}>Hiçbir At Verisi Bulunmamaktadır.</Text>
                          <Text style={styles.ErrorMessageText}>Tekrar Arama Yapabilirsiniz.</Text>
                        </>
                        :
                        <>
                          <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                          <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                          <Text style={styles.ErrorMessageText}>You can search again.</Text>
                        </>
                      }

                      <View style={styles.ErrorMessageButtonContainer}>
                      </View>
                    </View>
                  }
                </>

              }
            </>}


          {loader ?
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />

            : null}



        </View>
      </RBSheet>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SearchBar
            placeholder={getSearchTitle}
            lightTheme
            platform="ios"
            cancelButtonTitle=""
            inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
            containerStyle={{ backgroundColor: 'transparent', width: '70%' }}
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
        </View>
        <TouchableOpacity
          style={styles.SearchButtonStyle}
          onPress={() => {
            BottomSheetSearchNavigation.current.open();
            readUser();
            setLoader(true)
          }}>
          {Global.Language === "TR" ?
            <Text style={styles.SearchButtonText}>Arama Yap</Text>
            :
            <Text style={styles.SearchButtonText}>Search</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HypotheticalScreen({ navigation }) {

  const refRBSheetGeneration = useRef();
  const BottomSheetSearchNavigation = useRef();
  const [GenerationTitle, setGenerationTitle] = React.useState("Gen 5");
  const [state, setState] = React.useState({ checked: [] });
  const [chekedItem, setChekedItem] = React.useState(5)
  const [searchValue, setSearchValue] = React.useState("")
  const [SireMareHorseData, setSireMareHorseData] = React.useState();
  const [SireMareHorseName, setSireMareHorseName] = React.useState();
  const [SireData, setSireData] = React.useState();
  const [MareData, setMareData] = React.useState();
  const [SireText, setSireText] = React.useState("Sire");
  const [MareText, setMareText] = React.useState("Mare");
  const [loader, setLoader] = useState(false)

  const [getSelectedSire, setSelectedSire] = React.useState();
  const [getSelectedMare, setSelectedMare] = React.useState();

  const readUser = async () => {
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
            setSireMareHorseData(json)
            setLoader(false);
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
    Global.Hypothetical_Search_View = true;
  }, [])

  return (
    <View style={styles.ScreensContainer}>
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
        }}>
        <TouchableOpacity
          onPress={() => {
            refRBSheetGeneration.current.close();
            setGenerationTitle("Gen " + chekedItem);
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
                    setState({ checked: [state, item.id] });
                    setChekedItem(item.id)
                    setGenerationTitle("Gen " + item.id);
                    refRBSheetGeneration.current.close();

                  }}
                >
                  <ListItem.CheckBox
                    checked={state.checked.includes(item.id)}
                    checkedIcon='circle'
                    uncheckedIcon='circle'
                    center={true}
                    checkedColor='#2169ab'
                    uncheckedColor='rgb(232, 237, 241)'
                    onPress={() => {
                      setState({ checked: [state, item.id] });
                      setChekedItem(item.id)
                      setGenerationTitle("Gen " + item.id);
                      refRBSheetGeneration.current.close();
                    }} />
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
        }}>
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
              readUser();
            }}
            showLoading={true}
          />
          {SireMareHorseData !== undefined &&
            <>
              {SireMareHorseData.m_cData !== undefined &&

                <ScrollView style={{ marginBottom: 30 }}>
                  {SireMareHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                    (item, i) => (
                      <ListItem
                        key={i}
                        bottomDivider
                        button
                        onPress={() => {
                          BottomSheetSearchNavigation.current.close();
                          if (SireMareHorseName === 'Sire') {
                            setSireText(item.HORSE_NAME);
                            setSireData(item);
                            setSelectedSire(item.HORSE_ID);
                            Global.Horse_First_ID = item.HORSE_ID
                          }
                          else if (SireMareHorseName === 'Mare') {
                            setMareText(item.HORSE_NAME);
                            setMareData(item);
                            setSelectedMare(item.HORSE_ID);
                            Global.Horse_Second_ID = item.HORSE_ID
                          }
                        }} >
                        <Image
                          style={{  width: 70, height: 70, justifyContent:'center', resizeMode:'contain' }}
                          source={{ uri: 'https://www.pedigreeall.com//upload/150/' + item.IMAGE }}
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
            </>
          }

          {SireMareHorseData !== undefined &&
            <>
              {SireMareHorseData.m_cDetail !== undefined &&
                <>
                  {SireMareHorseData.m_cDetail.m_eProcessState < 0 &&
                    <>
                      {loader === false &&
                        <View style={styles.ErrorMessageContainer}>
                          <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                          {Global.Language === "TR" ?
                            <>
                              <Text style={styles.ErrorMessageTitle}>Veriler Bulunamadı !</Text>
                              <Text style={styles.ErrorMessageText}>Hiçbir At Verisi Bulunmamaktadır.</Text>
                              <Text style={styles.ErrorMessageText}>Tekrar Arama Yapabilirsiniz.</Text>
                            </>
                            :
                            <>
                              <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                              <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                              <Text style={styles.ErrorMessageText}>You can search again.</Text>
                            </>
                          }
                          <View style={styles.ErrorMessageButtonContainer}>
                          </View>
                        </View>
                      }
                    </>

                  }
                </>
              }

            </>}


          {loader ?
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />

            : null}

        </View>
      </RBSheet>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => {
              BottomSheetSearchNavigation.current.open();
              setSireMareHorseName('Sire');
              setLoader(true);
            }}
            style={styles.SireMareButtonContainer}>
            <Text>{SireText.substring(0, 6)}...</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              BottomSheetSearchNavigation.current.open();
              setSireMareHorseName('Mare');
            }}
            style={styles.SireMareButtonContainer}>
            <Text>{MareText.substring(0, 6)}...</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { refRBSheetGeneration.current.open() }}
            style={styles.GenerationButtonContainer}>
            <Text>{GenerationTitle}</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>

        </View>
        <TouchableOpacity
          style={[styles.SearchButtonStyle, { marginVertical: 34 }]}
          onPress={() => {
            if (getSelectedSire === undefined || getSelectedMare === undefined) {
              Alert.alert(
                "Searching Error",
                "You have to fill spaces",
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
              Global.Generation_Hypothetical = chekedItem;
              Global.Horse_First_ID = SireData.HORSE_ID;
              Global.Horse_Second_ID = MareData.HORSE_ID;
              navigation.navigate('HypotheticalSearch');
            }


          }}>
          {Global.Language === "TR" ?
            <Text style={styles.SearchButtonText}>Arama Yap</Text>
            :
            <Text style={styles.SearchButtonText}>Search</Text>
          }

        </TouchableOpacity>
      </View>
    </View>
  );
}

function EffectiveNickSearchScreen({ navigation }) {
  const OpenFullBottomSheet = useRef();
  const OpenSmallBottomSheet = useRef();
  const [loader, setLoader] = useState(false)
  const [loaderRegistration, setLoaderRegistration] = React.useState(false);
  const [state, setState] = React.useState({ checked: [] });
  const [chekedItem, setChekedItem] = React.useState()
  const [getRegisteredStallions, setRegisteredStallions] = React.useState();
  const [getRegisteredStallionsItemData, setRegisteredStallionsItemData] = React.useState();
  const [getRegisteredStallionsName, setRegisteredStallionsName] = React.useState("Stallions");
  const [getSireData, setSireData] = React.useState();
  const [getSearchHorseData, setSearchHorseData] = React.useState();
  const [getSireName, setSireName] = React.useState("Sire Name");
  const [getStallionCodeData, setStallionCodeData] = React.useState();
  const [getStallionCode, setStallionCode] = React.useState("-");
  const [getBottomSheetText, setBottomSheetText] = React.useState();
  const [searchValue, setSearchValue] = React.useState()
  const [getSelectedHorseID, setSelectedHorseID] = React.useState();

  const [getFirstHorseID, setFirstHorseID] = React.useState();
  const [getSecondHorseID, setSecondHorseID] = React.useState();
  const [getRegistrationID, setRegistrationID] = React.useState();
  const readRegisteredStallions = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
        fetch('https://api.pedigreeall.com/StallionPage/GetLastSeasonRegisteredStallions?p_iRaceId=' + 1, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },

        })
          .then((response) => response.json())
          .then((json) => {
            setRegisteredStallions(json.m_cData)
            setLoader(false);
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
  const readHorseData = async () => {
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
            setSearchHorseData(json)
            setLoader(false);
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
  const readGetAsNameIdForStallion = async (ID) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Registration/GetAsNameIdForStallion?p_iHorseId=' + ID + '&p_iLanguage=' + 2, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setStallionCodeData(json.m_cData)
            setLoader(false);
            setLoaderRegistration(true);
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
    readRegisteredStallions();
    readHorseData();
  }, [])
  return (
    <View>
      <RBSheet
        ref={OpenFullBottomSheet}
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
        }}>
        <TouchableOpacity
          onPress={() => {
            OpenFullBottomSheet.current.close();
          }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>
          {
            getBottomSheetText === "Sire" &&
            <>
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
                  readHorseData();
                }}
                showLoading={true}
              />
              {getSearchHorseData !== undefined &&
                <>
                  {getSearchHorseData.m_cData !== undefined &&

                    <ScrollView style={{ marginBottom: 30 }}>
                      {getSearchHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                        (item, i) => (
                          <ListItem
                            key={i}
                            bottomDivider
                            button
                            onPress={() => {
                              OpenFullBottomSheet.current.close();
                              setSireName(item.HORSE_NAME);
                              setSecondHorseID(item.HORSE_ID);
                              setSireData(item);
                              

                            }} >
                            <Image
                              style={{  width: 70, height: 70, justifyContent:'center', resizeMode:'contain'  }}
                              source={{ uri: 'https://www.pedigreeall.com//upload/150/' + item.IMAGE }}
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
                </>
              }
              {getSearchHorseData !== undefined &&
                <>
                  {getSearchHorseData.m_cDetail !== undefined &&
                    <>
                      {getSearchHorseData.m_cDetail.m_eProcessState < 0 &&
                        <>
                          {loader === false &&
                            <View style={styles.ErrorMessageContainer}>
                              <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                              {Global.Language === "TR" ?
                                <>
                                  <Text style={styles.ErrorMessageTitle}>Veriler Bulunamadı !</Text>
                                  <Text style={styles.ErrorMessageText}>Hiçbir At Verisi Bulunmamaktadır.</Text>
                                  <Text style={styles.ErrorMessageText}>Tekrar Arama Yapabilirsiniz.</Text>
                                </>
                                :
                                <>
                                  <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                  <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                  <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                </>
                              }
                              <View style={styles.ErrorMessageButtonContainer}>
                              </View>
                            </View>
                          }
                        </>

                      }
                    </>
                  }

                </>}
            </>
            ||
            getBottomSheetText === "RegisteredStallions" &&
            <>
              {getRegisteredStallions !== undefined ?
                <ScrollView style={{ marginBottom: 30 }}>
                  {getRegisteredStallions.filter((x) => x.HORSE_NAME).map(
                    (item, i) => (
                      <ListItem
                        key={i}
                        bottomDivider
                        button
                        onPress={() => {
                          OpenFullBottomSheet.current.close();
                          setRegisteredStallionsName(item.HORSE_NAME);
                          setRegisteredStallionsItemData(item);
                          setFirstHorseID(item.HORSE_ID);
                          readGetAsNameIdForStallion(item.HORSE_ID);
                        }} >
                        <Image
                          style={{ width: 70, height: 70, justifyContent:'center', resizeMode:'contain' }}
                          source={{ uri: 'https://www.pedigreeall.com//upload/150/' + item.IMAGE }}
                        />
                        <ListItem.Content>
                          <ListItem.Title>{item.HORSE_NAME}</ListItem.Title>
                          {item.REGISTRATION_ID === 3 &&
                            <ListItem.Subtitle>
                              <View style={{backgroundColor:'#21ba45', width:25,height:25,}}>
                                <Text style={{color:'#fff', fontWeight:'700', alignSelf:'center', margin:'auto'}}>P</Text>
                              </View>
                            </ListItem.Subtitle>
                          }
                          {item.REGISTRATION_ID === 2 &&
                            <ListItem.Subtitle>
                              <View style={{backgroundColor:'#fbbd08',width:25,height:25,}}>
                                <Text style={{color:'#fff', fontWeight:'700', alignSelf:'center', margin:'auto'}}>A</Text>
                              </View>
                            </ListItem.Subtitle>
                          }
                          {item.REGISTRATION_ID === 1 &&
                            <ListItem.Subtitle>
                              <View style={{backgroundColor:'#db2828',width:25,height:25,}}>
                                <Text style={{color:'#fff', fontWeight:'700', alignSelf:'center', margin:'auto'}}>S</Text>
                              </View>
                            </ListItem.Subtitle>
                          }
                          
                        </ListItem.Content>
                        <ListItem.Chevron />
                      </ListItem>
                    ))}
                </ScrollView>
                :
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                  <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                  <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                  <View style={styles.ErrorMessageButtonContainer}>
                  </View>
                </View>
              }
            </>
          }
          {loader ?
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />

            : null}
        </View>
      </RBSheet>
      <RBSheet
        ref={OpenSmallBottomSheet}
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
        }}>
        <TouchableOpacity
          onPress={() => {
            OpenSmallBottomSheet.current.close();
            setStallionCode(chekedItem);
          }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>
          <ScrollView style={{ marginBottom: 50 }}>
            {getStallionCodeData !== undefined &&

              <>
                {
                  getStallionCodeData.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      onPress={() => {
                        setState({ checked: [state, item.NAME] });
                        setChekedItem(item.NAME)
                        setStallionCode(item.NAME)
                        setRegistrationID(item.ID)
                        setStallionCode(item.NAME);
                        OpenSmallBottomSheet.current.close();

                      }}
                    >
                      <ListItem.CheckBox
                        checked={state.checked.includes(item.NAME)}
                        checkedIcon='circle'
                        uncheckedIcon='circle'
                        center={true}
                        checkedColor='#2169ab'
                        uncheckedColor='rgb(232, 237, 241)'
                        onPress={() => {
                          setState({ checked: [state, item.NAME] });
                          setChekedItem(item.NAME)
                          setStallionCode(item.NAME)
                          setRegistrationID(item.ID)
                          setStallionCode(item.NAME);
                          OpenSmallBottomSheet.current.close();
                        }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.NAME}</ListItem.Title>
                      </ListItem.Content>

                    </ListItem>
                  ))
                }
              </>
            }

          </ScrollView>

        </View>
      </RBSheet>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => {
              setBottomSheetText("RegisteredStallions");
              OpenFullBottomSheet.current.open();
            }}
            style={styles.SireMareButtonContainer}>
            <Text>{getRegisteredStallionsName.substring(0, 10)} ...</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setBottomSheetText("Sire");
              OpenFullBottomSheet.current.open();
            }}
            style={styles.SireMareButtonContainer}>
            <Text>{getSireName.substring(0, 10)} ...</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setBottomSheetText("StallionsCode");
              OpenSmallBottomSheet.current.open();
            }}
            style={styles.GenerationButtonContainer}>
            <Text>{getStallionCode}</Text>
            <Icon name="chevron-down" size={16} color="#5f6368" />
          </TouchableOpacity>

        </View>
        <TouchableOpacity
          onPress={() => {
            if (getFirstHorseID === undefined || getSecondHorseID === undefined || getRegistrationID === undefined) {
              Alert.alert(
                "Searching Error",
                "You have to fill spaces",
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
              navigation.navigate('EffectivenickSearchReport', {
                FirstHorseID: getFirstHorseID,
                SecondHorseID: getSecondHorseID,
                RegistrationID: getRegistrationID,
                BackButtonVisible: false
              });
            }

          }}
          style={[styles.SearchButtonStyle, { marginVertical: 34 }]}>
          {Global.Language === "TR" ?
            <Text style={styles.SearchButtonText}>Arama Yap</Text>
            :
            <Text style={styles.SearchButtonText}>Search</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {

  const [getSearchName, setSearchName] = React.useState()
  const [getHypotheticalName, setHypotheticalName] = React.useState()
  const [getEffectiveNickName, setEffectiveNickName] = React.useState()

  React.useEffect(() => {

    if (Global.Language === "TR") {
      setSearchName("Arama")
      setHypotheticalName("Varsayımsal Eşleştirme")
      setEffectiveNickName("EffectiveNick")
    }
    else {
      setSearchName("Search")
      setHypotheticalName("Hypothetical")
      setEffectiveNickName('EffectiveNick')
    }

  });
  return (
    <>
      <View>
        <Image
          style={{ resizeMode: 'stretch', height: 200, }}
          source={{
            uri:
              'https://images.unsplash.com/photo-1450052590821-8bf91254a353?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
          }}
        />
      </View>

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
          name="SearchScreen"
          component={SearchScreen}
          options={{ tabBarLabel: getSearchName }}
        />
        <Tab.Screen
          name="HypotheticalScreen"
          component={HypotheticalScreen}
          options={{ tabBarLabel: getHypotheticalName }}
        />
        <Tab.Screen
          name="EffectiveNickScreen"
          component={EffectiveNickSearchScreen}
          options={{ tabBarLabel: getEffectiveNickName }}
        />
      </Tab.Navigator>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  ScreensContainer: {
    width: '100%',
    height: '100%',
    //backgroundColor:'white'
  },
  SeacrhScreenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  SearchButtonStyle: {
    width: '92%',
    padding: 15,
    marginVertical: 20,
    borderColor: '#2e3f6e',
    borderRadius: 8,
    elevation: 8,
    shadowColor: 'silver',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    backgroundColor: "#2169ab"

  },
  SearchButtonText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontSize: 16,
    color: "#fff",
    fontWeight: '500'
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
  buttonContainer: {
    flex: 1,
  },
  TabBarContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  Title: {
    paddingTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  Subtitle: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center'
  },
  LatestViewItem: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  LatestCardTitle: {
    marginLeft: 5,
    fontWeight: '500',
    fontSize: 18
  },
  LatestCardItemTitle: {
    fontSize: 14,
    fontWeight: '500'
  },
  swipeContainer: {
    width: "100%",
  },
  SwipeablePanelContainer: {
    padding: 20,
  },
  SwipeablePanelItem: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SwipeablePanelText: {
    fontSize: 18,
  },
  FlagContainer: {
    flexDirection: 'row',
  },
  SearchButtonContainer: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  SearchButtons: {
    width: '45%',
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#2e3f6e',
    borderRadius: 10,
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: 'silver',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    backgroundColor: "#2169ab"
  },
  SearchButtonsText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontSize: 16,
    color: "#fff",
    fontWeight: '500'
  },
  SeacrhContainer: {
    width: '100%',
    paddingBottom: 10,
    padding: 10
  },
  SearchButton: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: '#2169ab',
    alignItems: 'center'
  },
  GenerationContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
  },
  GenerationView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  HypotheticalTitlesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  HypotheticalTitles: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  HypotheticalTitlesText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'silver'
  },
  FlatListItemView: {
    paddingTop: 15,
    borderBottomWidth: 0.2
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  ActivityIndicatorStyle: {
    zIndex: 1,
    width: '100%',
    height: '60%',
    alignContent: 'center'
  },
  ErrorMessageContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  ErrorMessageTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  ErrorMessageText: {
    fontSize: 16,
    color: '#c7c1c1',
    textAlign: 'center',
    marginTop: 5
  },
  ErrorMessageButtonContainer: {
    width: '80%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ErrorMessageButton: {
    backgroundColor: 'rgb(232, 237, 241)',
    width: '40%',
    padding: 10,
    borderRadius: 8
  },
  ErrorMessageButtonText: {
    textAlign: 'center',
    color: '#2169ab',
    fontSize: 14,
  },

});




/*

<FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={images}
            pagingEnabled={true}
            renderItem={ ({ item, index }) => (
              <Card containerStyle= {{borderRadius:8, shadowColor:'#000',elevation: 10, width:380}}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Image
                style={{resizeMode:'contain'}}
                source={{uri: item.src }} />
                <Text>{item.text}</Text>

                <Indicator
                itemCount={images.length}
                currentIndex={index % images.length}
                indicatorActiveColor= '#3498db'
                indicatorInActiveColor='#bdc3c7'
                indicatorActiveWidth={6}
                />
               </Card>


            )}
          />

*/


/*


        <FlatListSlider
              data={images}
              imageKey={'src'}
              textKey = {'text'}
              title= {'title'}
              local={false}
              width={Dimensions.get('window').width}
              separator={100}
              autoscroll={true}
              currentIndexCallback={index => console.log('Index', index)}
              onPress={item => alert(JSON.stringify(item))}
              indicator
              animation
            />

*/



/*

     <View style={styles.NewsContainer}>
        <Text style={{textAlign:'center', fontWeight:'500',textTransform: 'uppercase'}}>Latest News</Text>


          <FlatListSlider
            data={images}
            imageKey={'src'}
            width={275}
            component={<Preview />}
            onPress={item => alert(JSON.stringify(item))}
            indicatorActiveWidth={40}
            contentContainerStyle={styles.contentStyle}
          />

      </View>

*/



/*

Seacrh

<SearchBar
          lightTheme={true}
          placeholder="Please type name and press enter"
          containerStyle={{ backgroundColor: "#fff" }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          value={searchText}
          onChangeText={(e) => {
            setSearchText(e);
          }}
        />
*/




/*

Reports and last added


<ScrollView style={{marginBottom:20}}>

            <View>

            <Text style={styles.Title}>Reports</Text>

            <FlatListSlider
              data={images}
              imageKey={'src'}
              textKey = {'text'}
              title= {'title'}
              local={false}
              width={Dimensions.get('window').width}
              autoscroll={true}
              currentIndexCallback={index => console.log('Index', index)}
              onPress={()=> {setIsReportActive(!isReportActive)}} //item => alert(JSON.stringify(item))
              indicator
              animation
            />


            <View>
              <Text style={styles.Title}>Last Added</Text>

              <Card>
                <Card.Title>
                  <View style={{flexDirection:'row'}}>
                    <Flag code='TR' size={24} />
                    <Text style={styles.LatestCardTitle}>Serenissima (1957) (TR) (2b)</Text>
                    </View></Card.Title>
                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.LatestCardItemTitle}>Sire</Text>
                    <View style={{flexDirection:'row',marginLeft:40}}>
                      <Flag code='US' size={24} />
                      <Text>Leading Question (1947) (4k)</Text>
                    </View>
                    </View>

                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>
                </View>


                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>Dam</Text>
                  <View style={{flexDirection:'row',marginLeft:35}}>
                    <Flag code='TR' size={24} />
                    <Text>Serenade (1953)</Text>
                  </View>
                  </View>

                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>


                </View>

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>BM Sire</Text>
                  <View style={{flexDirection:'row',marginLeft:15}}>
                    <Flag code='UNK' size={24} />
                    <Text>Wings of Song (1942) (14c)</Text>
                  </View>
                  </View>
                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>


                </View>



                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={styles.LatestCardItemTitle}>Records</Text>
                  <View style={{flexDirection:'row',marginLeft:15}}>
                    <Text>0-0-0-0-0</Text>
                  </View>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.LatestCardItemTitle}>Sex</Text>
                    <Text style={{marginLeft:80}}>Mare</Text>
                  </View>
                </View>



                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.LatestCardItemTitle}>Earning</Text>
                      <Text style={{marginLeft:17}}>0,00 ₺</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                      <Text style={styles.LatestCardItemTitle}>Class</Text>
                      <Text style={{marginLeft:50}} >Unknown</Text>
                      </View>

                </View>

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>Point</Text>
                    <Text style={{marginLeft:35}}>0</Text>
                    </View>
                  <View>
                    <TouchableOpacity style={{padding:10,backgroundColor:'#2169ab', borderRadius:6}}>
                      <Icon name="arrow-circle-right" size={16} color="white" />
                    </TouchableOpacity>
                  </View>


                </View>



              </Card>

            </View>


            </View>

        </ScrollView>


*/


/*


 <View>
              <Text style={styles.Title}>Last Added</Text>

              <Card>
                <Card.Title>
                  <View style={{flexDirection:'row'}}>
                    <Flag code='TR' size={24} />
                    <Text style={styles.LatestCardTitle}>Serenissima (1957) (TR) (2b)</Text>
                    </View></Card.Title>
                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.LatestCardItemTitle}>Sire</Text>
                    <View style={{flexDirection:'row',marginLeft:40}}>
                      <Flag code='US' size={24} />
                      <Text>Leading Question (1947) (4k)</Text>
                    </View>
                    </View>

                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>
                </View>


                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>Dam</Text>
                  <View style={{flexDirection:'row',marginLeft:35}}>
                    <Flag code='TR' size={24} />
                    <Text>Serenade (1953)</Text>
                  </View>
                  </View>

                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>


                </View>

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>BM Sire</Text>
                  <View style={{flexDirection:'row',marginLeft:15}}>
                    <Flag code='UNK' size={24} />
                    <Text>Wings of Song (1942) (14c)</Text>
                  </View>
                  </View>
                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>


                </View>



                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={styles.LatestCardItemTitle}>Records</Text>
                  <View style={{flexDirection:'row',marginLeft:15}}>
                    <Text>0-0-0-0-0</Text>
                  </View>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.LatestCardItemTitle}>Sex</Text>
                    <Text style={{marginLeft:80}}>Mare</Text>
                  </View>
                </View>



                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.LatestCardItemTitle}>Earning</Text>
                      <Text style={{marginLeft:17}}>0,00 ₺</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                      <Text style={styles.LatestCardItemTitle}>Class</Text>
                      <Text style={{marginLeft:50}} >Unknown</Text>
                      </View>

                </View>

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>Point</Text>
                    <Text style={{marginLeft:35}}>0</Text>
                    </View>
                  <View>
                    <TouchableOpacity style={{padding:10,backgroundColor:'#2169ab', borderRadius:6}}>
                      <Icon name="arrow-circle-right" size={16} color="white" />
                    </TouchableOpacity>
                  </View>


                </View>



              </Card>

            </View>


*/




/*


 <View>
        <View style={styles.SearchButtonContainer}>
          <TouchableOpacity
            onPress={()=>{
              setIsSearch(true) ,
              setHypothetical(false)
            }}
            style={[styles.SearchButtons]}>
            <Text style={styles.SearchButtonsText}>Seach</Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={()=>{
               setHypothetical(true) ,
               setIsSearch(false)}}
            style={styles.SearchButtons}>
            <Text style={styles.SearchButtonsText}>Hypothetical</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{marginBottom:250}}>
        {isSearch ?

            <Card>
              <Card.Title>Search</Card.Title>

              <View style={styles.SeacrhContainer}>
              <SearchBar
              lightTheme={true}
              placeholder="Please type name"
              containerStyle={{ backgroundColor: "#fff" }}
              inputContainerStyle={{ backgroundColor: "#fff" }}
              value={searchText}
              onChangeText={(e) => {
                setSearchText(e);
              }}
            />
              <TouchableOpacity
              onPress={()=> {refRBSheetGeneration.current.open()}}
              style={styles.GenerationContainer}>
                <View style={styles.GenerationView}>
                  <Icon name="bars" size={16} color="#adb5bd" />
                  <Text style={{marginLeft:10}}>{GenerationTitle}</Text>
                </View>
                <Icon name="caret-down" size={16} color="#adb5bd" />
              </TouchableOpacity>
            <Card.Divider/>
            <TouchableOpacity style={styles.SearchButton}>
              <Icon name="search" size={16} color="#fff" />
            </TouchableOpacity>
            </View>



            </Card>
            : null}

            {isHypothetical?
            <Card>
            <Card.Title>Hypothetical Search</Card.Title>

            <View style={styles.SeacrhContainer}>
            <View style={styles.HypotheticalTitlesContainer}>
              <TouchableOpacity
                onPress={()=>{ refRBSheetSireName.current.open()}}
                style={styles.HypotheticalTitles}>
                  <Icon name="question-circle" size={16} color="#adb5bd" />
                  <Text
                    style={styles.HypotheticalTitlesText}>Sire Name</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={()=> {refRBSheetSireName.current.open()}}
                style={styles.HypotheticalTitles}>
                  <Icon name="question-circle" size={16} color="#adb5bd" />
                  <Text
                    style={styles.HypotheticalTitlesText}>Mare Name</Text>
              </TouchableOpacity>

            </View>
            <Card.Divider/>
            {isSireName?
                  <SearchBar
                    lightTheme={true}
                    placeholder="Sire Name"
                    containerStyle={{ backgroundColor: "#fff" }}
                    inputContainerStyle={{ backgroundColor: "#fff" }}
                    value={searchText}
                    onChangeText={(e) => {
                      setSearchText(e);
                    }}
                  />
              :null}

              {isMareName?
                  <SearchBar
                    lightTheme={true}
                    placeholder="Mare Name"
                    containerStyle={{ backgroundColor: "#fff" }}
                    inputContainerStyle={{ backgroundColor: "#fff" }}
                    value={searchText}
                    onChangeText={(e) => {
                      setSearchText(e);
                    }}
                  />
              :null}
            <TouchableOpacity
            onPress={()=>{{refRBSheetGeneration.current.open()}}}
            style={styles.GenerationContainer}>
              <View style={styles.GenerationView}>
                <Icon name="bars" size={16} color="#adb5bd" />
                <Text style={{marginLeft:10}}>{GenerationTitle}</Text>
              </View>
              <Icon name="caret-down" size={16} color="#adb5bd" />
            </TouchableOpacity>
            <Card.Divider/>
            <TouchableOpacity style={styles.SearchButton}>
            <Icon name="search" size={16} color="#fff" />
            </TouchableOpacity>
            </View>
            </Card>
            :null}
</ScrollView>
</View>


*/




/*
  const [state, setState] = React.useState({checked: []});
  const press = item => {   // The onPress method
    const { checked } = state;
    console.log(checked)
// These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.id)) {
      setState({ checked: [...checked, item.id] });
  } else {
      setState({ checked: checked.filter(a => a !== item.id) });
  }
};
*/


/*

  const press = item => {   // The onPress method
        const { checked } = state;
        console.log(checked)
    // These ensures that multiple checkboxes don't all get affected when one is clicked
        if (!checked.includes(item.id)) {
          setState({ checked: [...checked, item.id] });
      } else {
        setState({ checked: checked.filter(a => a !== item.id) });
      }
    };

*/