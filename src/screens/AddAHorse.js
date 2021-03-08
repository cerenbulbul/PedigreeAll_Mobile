import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Platform, Button, Image, TextInput, ActivityIndicator } from 'react-native'
import { Root, Popup, Toast } from "../components/Popup";
import { SearchBar, ListItem, Input, CheckBox } from "react-native-elements";
import { FilledButton } from "../components/FilledButton";
import Flag from "react-native-flags";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SwipeablePanel } from "rn-swipeable-panel";
import { SettingBottomSheet } from '../components/SettingBottomSheet'
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { BlueButton } from '../components/BlueButton';
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Alert } from 'react-native';


const RomanMillerData = [
  {
    id: "1",
    title: "B",
  },
  {
    id: "2",
    title: "I",
  },
  {
    id: "3",
    title: "C",
  },
  {
    id: "4",
    title: "S",
  },
  {
    id: "5",
    title: "P",
  },
]


export function AddAHorse({ navigation }) {
  const refRBSheet = useRef();
  const BottomSheetRef = useRef();
  const [isDetail, setIsDetail] = useState(false);
  const [name, setName] = React.useState("");
  const [image1, setImage1] = useState(null);
  const [sexList, setSexList] = useState()
  const [sexText, setSexText] = useState("Select a Sex")
  const [WinnerTypeList, setWinnerTypeList] = useState()
  const [winnerText, setWinnerText] = useState("Select a Class")
  const [CurrencyTypeList, setCurrencyList] = useState()
  const [earningText, setEarningText] = useState("$")
  const [priceText, setPriceText] = useState("$")
  const [isEarning, setEarning] = useState(false)
  const [CounrtyList, setCountryList] = useState()
  const [CounrtyText, setCounrtyText] = useState("Select a Country")
  const [ColorList, setColorList] = useState()
  const [ColorText, setColorText] = useState("Select a Color")
  const [BottomSheet, setBottomSheet] = useState()
  const [searchValue, setSearchValue] = React.useState()
  const [loader, setLoader] = React.useState(false)
  const [getOwnerBreederName, setOwnerBreederName] = React.useState()
  const [getCoachBreederOwner, setCoachBreederOwner] = React.useState();
  const [getOwnerText, setOwnerText] = React.useState('Owner');
  const [getBreederText, setBreederText] = React.useState('Breeder')
  const [getCoachText, setCoachText] = React.useState('Coach')
  const [isLoading, SetisLoading] = React.useState(true);

  const [SireMareHorseData, setSireMareHorseData] = React.useState();
  const [SireMareHorseName, setSireMareHorseName] = React.useState();
  const [getOwnerBreederData, setOwnerBreederData] = React.useState();
  const [getCheckHorseAvaibleData, setCheckHorseAvaibleData] = React.useState();
  const [SireData, setSireData] = React.useState();
  const [MareData, setMareData] = React.useState();
  const [SireText, setSireText] = React.useState("Sire");
  const [MareText, setMareText] = React.useState("Mare");

  const [DeadCheckBox, setDeadCheckBox] = React.useState(false)

  const [getHorseName, setHorseName] = React.useState("");
  const [getFatherObject, setFatherObject] = React.useState([])
  const [getMotherObject, setMotherObject] = React.useState([]);
  const [getHorseBirthDate, setHorseBirthDate] = React.useState("")
  const [getRef1, setRef1] = React.useState("");
  const [getRef2, setRef2] = React.useState("");
  const [getEarn, setEarn] = React.useState("");
  const [getPrice, setPrice] = React.useState("");
  const [getOwner, setOwner] = React.useState("");
  const [getBreeder, setBreeder] = React.useState("");
  const [getCoach, setCoach] = React.useState("");
  const [getHeader, setHeader] = React.useState("");
  const [getInfo, setInfo] = React.useState("");
  const [getStartCount, setStartCount] = React.useState("");
  const [getFirst, setFirst] = React.useState("");
  const [getSecond, setSecond] = React.useState("");
  const [getThird, setThird] = React.useState("");
  const [getFourth, setFourth] = React.useState("");
  const [getImage, setImage] = React.useState("");
  const [getB, setB] = React.useState("");
  const [getI, setI] = React.useState("");
  const [getC, setC] = React.useState("");
  const [getS, setS] = React.useState("");
  const [getP, setP] = React.useState("");
  const [getRmB, setRmB] = React.useState("");
  const [getRmI, setRmI] = React.useState("");
  const [getRmC, setRmC] = React.useState("");
  const [getRmS, setRmS] = React.useState("");
  const [getRmP, setRmP] = React.useState("");
  const [getAnzB, setAnzB] = React.useState("");
  const [getAnzI, setAnzI] = React.useState("");
  const [getAnzC, setAnzC] = React.useState("");
  const [getAnzS, setAnzS] = React.useState("");
  const [getAnzP, setAnzP] = React.useState("");


  const [getFatherID, setFatherID] = React.useState(-1);
  const [getMotherID, setMotherID] = React.useState(-1);
  const [getSexID, setSexID] = React.useState(1);
  const [getCountryID, setCountryID] = React.useState(0);
  const [getEarnCurrencyID, setEarnCurrencyID] = React.useState(1)
  const [getPriceCurrencyID, setPriceCurrencyID] = React.useState(1)
  const [getOwnerSystemUserID, setOwnerSystemUserID] = React.useState(1)
  const [getBreederSystemUserID, setBreederSystemUserID] = React.useState(1)
  const [getCoachSystemUserID, setCoachSystemUserID] = React.useState(1)
  const [getWinnerTypeID, setWinnerTypeID] = React.useState(1)
  const [getFamilyID, setFamilyID] = React.useState(1)
  const [getColorID, setColorID] = React.useState(1)

  const [isLoadingForAdding, setisLoadingForAdding] = React.useState(false)

  const [checkStateMultiRM, setcheckStateMultiRM] = React.useState({ checked: [] });
  const [checkStateMultiANZ, setcheckStateMultiANZ] = React.useState({ checked: [] });
  const [checkStateMultiPA, setcheckStateMultiPA] = React.useState({ checked: [] });

  const pressRM = item => {   // The onPress method
    const { checked } = checkStateMultiRM;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.title)) {
      setcheckStateMultiRM({ checked: [...checked, item.title] });
    } else {
      setcheckStateMultiRM({ checked: checked.filter(a => a !== item.title) });
    }
  }

  const pressANZ = item => {   // The onPress method
    const { checked } = checkStateMultiANZ;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.title)) {
      setcheckStateMultiANZ({ checked: [...checked, item.title] });
    } else {
      setcheckStateMultiANZ({ checked: checked.filter(a => a !== item.title) });
    }
  }

  const pressPA = item => {   // The onPress method
    const { checked } = checkStateMultiPA;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.title)) {
      setcheckStateMultiPA({ checked: [...checked, item.title] });
    } else {
      setcheckStateMultiPA({ checked: checked.filter(a => a !== item.title) });
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      if (image1 === null) {
        setImage1(result.uri);
      }
    }
  };

  const readDataSexList = async (data) => {
    fetch('https://api.pedigreeall.com/Sex/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setSexList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataWinnerList = async (data) => {
    fetch('https://api.pedigreeall.com/WinnerType/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setWinnerTypeList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataCurrencyList = async (data) => {
    fetch('https://api.pedigreeall.com/Currency/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCurrencyList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataCountryList = async (data) => {
    fetch('https://api.pedigreeall.com/Country/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCountryList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataColorList = async () => {
    fetch('https://api.pedigreeall.com/Color/Get', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setColorList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readGetOwnerBreeder = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/SystemUser/GetOwnerBreederByName?p_sName=' + getOwnerBreederName, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setOwnerBreederData(json.m_cData);
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

  const readUser = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
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

  const readAddAHorse = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Horse/Add', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify({
            "HORSE_NAME": getHorseName,
            "FATHER_OBJECT": {
              "HORSE_ID": getFatherID.toString()
            },
            "MOTHER_OBJECT": {
              "HORSE_ID": getMotherID.toString()
            },
            "HORSE_BIRTH_DATE": getHorseBirthDate,
            "SEX_OBJECT": {
              "SEX_ID": getSexID.toString()
            },
            "COUNTRY_OBJECT": {
              "COUNTRY_ID": getCountryID
            },
            "PRICE": getPrice,
            "PRICE_CURRENCY_OBJECT": {
              'CURRENCY_ID': getPriceCurrencyID.toString()
            },
            "OWNER_OBJECT": {
              "SYSTEM_USER_ID": getOwnerSystemUserID.toString()
            },
            "OWNER": getOwner,
            "BREEDER_OBJECT": {
              "SYSTEM_USER_ID": getBreederSystemUserID.toString()
            },
            "BREEDER": getBreeder,
            "COACH_OBJECT": {
              "SYSTEM_USER_ID": getCoachSystemUserID.toString()
            },
            "COACH": getCoach,
            "HEADER": getHeader,
            "INFO": getInfo,
            "START_COUNT": getStartCount,
            "FIRST": getFirst,
            "SECOND": getSecond,
            "THIRD": getThird,
            "FOURTH": getFourth,
            "IS_DEAD_OBJECT": {
              "BOOL_ID": DeadCheckBox ? 1 : 0
            },
            "WINNER_TYPE_OBJECT": {
              "WINNER_TYPE_ID": getWinnerTypeID.toString()
            },
            "REF1": getRef1,
            "REF2": getRef2,
            "EARN": getEarn,
            "EARN_CURRENCY_OBJECT": {
              'CURRENCY_ID': getEarnCurrencyID.toString()
            },
            "IMAGE": getImage,
            "B": getB,
            "I": getI,
            "C": getC,
            "S": getS,
            "P": getP,
            "RM_B": getRmB,
            "RM_I": getRmI,
            "RM_C": getRmC,
            "RM_S": getRmS,
            "RM_P": getRmP,
            "ANZ_B": getAnzB,
            "ANZ_I": getAnzI,
            "ANZ_C": getAnzC,
            "ANZ_S": getAnzS,
            "ANZ_P": getAnzP,
            "FAMILY_OBJECT": {
              "FAMILY_ID": getFamilyID.toString()
            },
            "COLOR_OBJECT": {
              "COLOR_ID": getColorID.toString()
            },
          })
        })
          .then((response) => response.json())
          .then((json) => {
            //setHorseAddRequestData(json.m_cData)
            //setTime(false)
            console.log(json.m_cData)
            setisLoadingForAdding(false)
            alert(json.m_lUserMessageList[0])

            if (json.m_eProcessState === 1) {
              setIsDetail(false)
              setHorseName("")
              setFatherObject([])
              setMotherObject([])
              setHorseBirthDate("")
              setRef1("")
              setRef2("")
              setEarn("")
              setPrice("")
              setOwner("")
              setBreeder("")
              setCoach("")
              setHeader("")
              setInfo("")
              setStartCount("")
              setFirst("")
              setSecond("")
              setThird("")
              setFourth("")
              setImage("")
              setB(0)
              setI(0)
              setC(0)
              setS(0)
              setP(0)
              setRmB(0)
              setRmI(0)
              setRmC(0)
              setRmS(0)
              setRmP(0)
              setAnzB(0)
              setAnzC(0)
              setAnzI(0)
              setAnzP(0)
              setAnzS(0)
              setFatherID(-1)
              setMotherID(-1)
              setSexID(1)
              setCountryID(0)
              setEarnCurrencyID(1)
              setPriceCurrencyID(1)
              setOwnerSystemUserID(1)
              setBreederSystemUserID(1)
              setCoachSystemUserID(1)
              setWinnerTypeID(1)
              setFamilyID(1)
              setColorID(1)
              setSireText("Sire")
              setMareText("Mare")
              setSexText("Select a Sex")
              setCounrtyText("Select a Country")
              setWinnerText("Select a Class")
              setColorText("Select a Color")
              setDeadCheckBox(false)
              setEarningText("$")
              setPriceText("$")
              setOwnerText("Owner")
              setBreederText("Breeder")
              setCoachText("Coach")
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
      console.log(e)
    }
  }

  const readCheckHorseAvaible = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        //console.log(atob('Z2ZydWx1dGFzQGhvdG1haWwuY29tOjEyMw=='))
        fetch('https://api.pedigreeall.com/Horse/CheckHorseAvailable?p_sName=' + getHorseName +
          '&p_iFatherId=' + getFatherObject.HORSE_ID +
          '&p_iMotherId=' + getMotherObject.HORSE_ID
          , {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Basic " + token,
            },
          })
          .then((response) => response.json())
          .then((json) => {
            setCheckHorseAvaibleData(json)
            if (json !== undefined) {
              if (json.m_cDetail.m_eProcessState === -1) {
                readAddAHorse();
              }
              else {
                Alert("Kayit Bulundu")
              }

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
    readDataSexList();
    readDataWinnerList();
    readDataCurrencyList();
    readDataCountryList();
    readDataColorList();
    readUser()
    readGetOwnerBreeder()
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            refRBSheet.current.open()
          }}>
          <Icon name="cogs" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.Container}>
      <RBSheet
        ref={BottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height - 100}
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
            setRmB(0)
            setRmI(0)
            setRmC(0)
            setRmS(0)
            setRmP(0)
            setB(0)
            setI(0)
            setC(0)
            setS(0)
            setP(0)
            setAnzB(0)
            setAnzI(0)
            setAnzC(0)
            setAnzP(0)
            setAnzS(0)

            if (checkStateMultiRM.checked.length > 0) {
              for (let i = 0; i < checkStateMultiRM.checked.length; i++) {
                if (checkStateMultiRM.checked[i] === "B") {
                  setRmB(1)
                }
                if (checkStateMultiRM.checked[i] === "I") {
                  setRmI(1)
                }
                if (checkStateMultiRM.checked[i] === "C") {
                  setRmC(1)
                }
                if (checkStateMultiRM.checked[i] === "S") {
                  setRmS(1)
                }
                if (checkStateMultiRM.checked[i] === "P") {
                  setRmP(1)
                }
              }
            }

            if (checkStateMultiPA.checked.length > 0) {
              for (let i = 0; i < checkStateMultiPA.checked.length; i++) {
                if (checkStateMultiPA.checked[i] === "B") {
                  setB(1)
                }
                if (checkStateMultiPA.checked[i] === "I") {
                  setI(1)
                }
                if (checkStateMultiPA.checked[i] === "C") {
                  setC(1)
                }
                if (checkStateMultiPA.checked[i] === "S") {
                  setS(1)
                }
                if (checkStateMultiPA.checked[i] === "P") {
                  setP(1)
                }
              }
            }

            if (checkStateMultiANZ.checked.length > 0) {
              for (let i = 0; i < checkStateMultiANZ.checked.length; i++) {
                if (checkStateMultiANZ.checked[i] === "B") {
                  setAnzB(1)
                }
                if (checkStateMultiANZ.checked[i] === "I") {
                  setAnzI(1)
                }
                if (checkStateMultiANZ.checked[i] === "C") {
                  setAnzC(1)
                }
                if (checkStateMultiANZ.checked[i] === "S") {
                  setAnzS(1)
                }
                if (checkStateMultiANZ.checked[i] === "P") {
                  setAnzP(1)
                }
              }
            }
            BottomSheetRef.current.close()
          }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>
          {(BottomSheet === "SexList" &&
            <View>
              {sexList !== undefined &&
                <ScrollView>
                  {sexList.filter((x) => x.SEX_EN).map(
                    (item, i) => (
                      <ListItem
                        key={i}
                        bottomDivider
                        button
                        onPress={() => {
                          console.log(item.SEX_EN)
                          setSexText(item.SEX_EN)
                          setSexID(item.SEX_ID)
                          BottomSheetRef.current.close();
                        }} >
                        <ListItem.Content>
                          <ListItem.Title>{item.SEX_EN}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                      </ListItem>
                    ))}
                </ScrollView>
              }
            </View>
          )
            || (BottomSheet === "WinnerList" &&
              <View>
                {WinnerTypeList !== undefined &&
                  <ScrollView>
                    {WinnerTypeList.filter((x) => x.WINNER_TYPE_EN).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            setWinnerText(item.WINNER_TYPE_EN)
                            setWinnerTypeID(item.WINNER_TYPE_ID)
                            BottomSheetRef.current.close()
                          }} >
                          <ListItem.Content>
                            <ListItem.Title>{item.WINNER_TYPE_EN}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      ))}
                  </ScrollView>
                }
              </View>
            )
            || (BottomSheet === "CurrencyList" &&
              <View>
                {CurrencyTypeList !== undefined &&
                  <ScrollView>
                    {CurrencyTypeList.filter((x) => x.ICON).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            if (isEarning === true) {
                              setEarningText(item.ICON)
                              setEarnCurrencyID(item.CURRENCY_ID)
                            }
                            else if (isEarning === false) {
                              setPriceText(item.ICON)
                              setPriceCurrencyID(item.CURRENCY_ID)
                            }
                            BottomSheetRef.current.close()
                          }} >
                          <ListItem.Content>
                            <ListItem.Title>{item.ICON}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      ))}
                  </ScrollView>
                }
              </View>
            )
            || (BottomSheet === "CountryList" &&
              <View>
                {CounrtyList !== undefined &&
                  <ScrollView>
                    {CounrtyList.filter((x) => x.COUNTRY_EN).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            setCounrtyText(item.COUNTRY_EN)
                            setCountryID(item.COUNTRY_ID)
                            BottomSheetRef.current.close()
                          }} >
                          <Flag code={item.ICON.toUpperCase()} size={24} />
                          <ListItem.Content>
                            <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      ))}
                  </ScrollView>
                }
              </View>
            )
            || (BottomSheet === "ColorList" &&
              <View>
                {ColorList !== undefined &&
                  <ScrollView>
                    {ColorList.filter((x) => x.COLOR_TEXT).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            setColorText(item.COLOR_TEXT)
                            setColorID(item.COLOR_ID)
                            BottomSheetRef.current.close();
                          }} >
                          <ListItem.Content>
                            <ListItem.Title>{item.COLOR_TEXT}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      ))}
                  </ScrollView>
                }
              </View>
            )
            || (BottomSheet === "SireMareObject" &&
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
                    readUser();
                    setLoader(true);
                  }}
                  showLoading={true}
                />
                {SireMareHorseData !== undefined ?
                  <ScrollView style={{ marginBottom: 30 }}>
                    {SireMareHorseData.m_cData.filter((x) => x.HORSE_NAME).map(
                      (item, i) => (
                        <ListItem
                          key={i}
                          bottomDivider
                          button
                          onPress={() => {
                            BottomSheetRef.current.close();

                            if (SireMareHorseName === 'Sire') {
                              setSireText(item.HORSE_NAME);
                              setSireData(item);
                              setFatherObject(item)
                              setFatherID(item.HORSE_ID)
                            }
                            else if (SireMareHorseName === 'Mare') {
                              setMareText(item.HORSE_NAME);
                              setMareData(item);
                              setMotherObject(item)
                              setMotherID(item.HORSE_ID)
                            }
                          }} >
                          <Image
                            style={{ width: 70, height: 70, borderRadius: 50 }}
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
                  :
                  <View style={styles.ErrorMessageContainer}>
                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                    <View style={styles.ErrorMessageButtonContainer}>
                    </View>
                  </View>
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
                                <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                <Text style={styles.ErrorMessageText}>You can search again.</Text>
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
              </>
            )
            || (BottomSheet === "Owner" &&

              <>
                <SearchBar
                  placeholder={getOwnerBreederName}
                  lightTheme
                  platform="ios"
                  cancelButtonTitle=""
                  inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                  containerStyle={{ backgroundColor: 'transparent', }}
                  inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                  rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                  leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                  value={getOwnerBreederName}
                  onChangeText={setOwnerBreederName}
                  onSubmitEditing={() => {
                    SetisLoading(true);
                    readGetOwnerBreeder();
                  }}
                  showLoading={true}
                />

                {isLoading && (
                  <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                    <ActivityIndicator
                      style={{ height: 100, top: 150 }}
                      color="#3F51B5"
                      size="large"
                    />
                  </View>
                )}
                <ScrollView style={styles.ScrollViewContainer}>
                  {getOwnerBreederData.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
                      onPress={() => {
                        if (getCoachBreederOwner === "Owner") {
                          setOwnerText(item.NAME)
                          setOwnerSystemUserID(item.ID)
                          setOwner(item.NAME)
                        }
                        else if (getCoachBreederOwner === "Breeder") {
                          setBreederText(item.NAME)
                          setBreederSystemUserID(item.ID)
                          setBreeder(item.NAME)
                        }
                        else if (getCoachBreederOwner === "Coach") {
                          setCoachText(item.NAME)
                          setCoachSystemUserID(item.ID)
                          setCoach(item.NAME)
                        }

                        BottomSheetRef.current.close();
                      }}
                    >

                      <ListItem.Content>
                        <ListItem.Title>{item.NAME}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
              </>

            )

            || BottomSheet === "RomanMiller" &&

            <>
              {RomanMillerData.map((item, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => {
                    pressRM(item)

                  }}
                >
                  <ListItem.CheckBox
                    checked={checkStateMultiRM.checked.includes(item.title)}
                    checkedIcon='circle'
                    uncheckedIcon='circle'
                    center={true}
                    checkedColor='#2169ab'
                    uncheckedColor='rgb(232, 237, 241)'
                    onPress={() => {
                      pressRM(item)
                    }} />
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>

                </ListItem>
              ))}
            </>

            || BottomSheet === "ANZ" &&

            <>
              {RomanMillerData.map((item, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => {
                    pressANZ(item)

                  }}
                >
                  <ListItem.CheckBox
                    checked={checkStateMultiANZ.checked.includes(item.title)}
                    checkedIcon='circle'
                    uncheckedIcon='circle'
                    center={true}
                    checkedColor='#2169ab'
                    uncheckedColor='rgb(232, 237, 241)'
                    onPress={() => {
                      pressANZ(item)
                    }} />
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>

                </ListItem>
              ))}
            </>

            || BottomSheet === "PA" &&

            <>
              {RomanMillerData.map((item, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => {
                    pressPA(item)

                  }}
                >
                  <ListItem.CheckBox
                    checked={checkStateMultiPA.checked.includes(item.title)}
                    checkedIcon='circle'
                    uncheckedIcon='circle'
                    center={true}
                    checkedColor='#2169ab'
                    uncheckedColor='rgb(232, 237, 241)'
                    onPress={() => {
                      pressPA(item)
                    }} />
                  <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                  </ListItem.Content>

                </ListItem>
              ))}
            </>


          }
        </View>
      </RBSheet>

      <Root>
        <View style={styles.AddAHorseContainer}>
          <View style={{ marginVertical: 40, paddingLeft: 10, paddingRight: 10 }}>
            <Text style={styles.Title}>Add A Horse</Text>
            <ScrollView style={{ marginBottom: 150 }}>
              {isLoadingForAdding ?
                <ActivityIndicator color="#000" size="large" style={{ position: 'absolute', alignSelf: 'center', justifyContent: 'center', zIndex: 1 }} />
                :
                null}
              <View style={styles.ButtonsContainer}>

                <View>
                  {isDetail ?
                    <View style={{ marginVertical: 8 }}>

                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            setIsDetail(false)
                          }}
                          style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                          <Icon name="chevron-left" size={24} color="silver" />
                          <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                        </TouchableOpacity>
                      </View>


                      <View style={[styles.TextInputContainerDate]}>
                        <Icon name="calendar-alt" size={20} color="#2169ab" style={{ alignSelf: 'center' }} />
                        <TextInput
                          style={styles.HalfInputStyle}
                          placeholder={"Start Request Date"}
                          name={"StartRequestDate"}
                          keyboardType="numeric"
                          value={getHorseBirthDate}
                          onChangeText={setHorseBirthDate}
                        />
                      </View>

                      <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("SexList")
                            BottomSheetRef.current.open();
                          }}
                          style={styles.InputTouchableContainer}>
                          <Icon name="male" size={20} color="#2169ab" />
                          <Text style={styles.InformationText}>{sexText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          setSexText("Select a Sex")
                        }}>
                          <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("CountryList");
                            BottomSheetRef.current.open();
                          }}
                          style={styles.InputTouchableContainer}>
                          <Icon name="flag" size={20} color="#2169ab" />
                          <Text style={styles.InputText}>{CounrtyText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          setCounrtyText("Select a Country")
                        }}>
                          <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("WinnerList")
                            BottomSheetRef.current.open();
                          }}
                          style={styles.InputTouchableContainer}>
                          <Icon name="horse" size={24} color="#2169ab" />
                          <Text style={styles.InformationText}>{winnerText}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          setWinnerText("Select a Class")
                        }}>
                          <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("ColorList");
                            BottomSheetRef.current.open();
                          }}
                          style={styles.InputTouchableContainer}>
                          <Icon name="palette" size={20} color="#2169ab" />
                          <Text style={styles.InputText}>{ColorText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          setColorText("Select a Color")
                        }}>
                          <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.TextInputContainer}>
                        <View style={styles.TextInputLineContainer}>
                          <Icon name="award" size={20} color="#2169ab" style={{ marginLeft: 5 }} />
                          <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"First Place"}
                            value={getFirst}
                            onChangeText={setFirst}
                          />
                        </View>
                        <View style={styles.TextInputLineContainer}>
                          <Icon name="award" size={20} color="#2169ab" style={{ marginLeft: 5 }} />
                          <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Second Place"}
                            value={getSecond}
                            onChangeText={setSecond}
                          />
                        </View>
                        <View style={styles.TextInputLineContainer}>
                          <Icon name="award" size={20} color="#2169ab" style={{ marginLeft: 5 }} />
                          <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Third Place"}
                            value={getThird}
                            onChangeText={setThird}
                          />
                        </View>

                        <View style={styles.TextInputLineContainer}>
                          <Icon name="award" size={20} color="#2169ab" style={{ marginLeft: 5 }} />
                          <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Fourth Place"}
                            value={getFourth}
                            onChangeText={setFourth}
                          />
                        </View>

                        <View style={styles.TextInputLineContainer}>
                          <Icon name="award" size={20} color="#2169ab" style={{ marginLeft: 5 }} />
                          <TextInput
                            style={styles.HalfInputStyle}
                            placeholder={"Starts Place"}
                            value={getStartCount}
                            onChangeText={setStartCount}
                          />
                        </View>
                      </View>

                      <View style={{ width: "30%" }}>
                        <CheckBox
                          center
                          title="Dead"
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          style={{ margin: 0 }}
                          onPress={() => setDeadCheckBox(!DeadCheckBox)}
                          checked={DeadCheckBox}
                        />
                      </View>

                      <View style={styles.CurrencyContainer}>

                        <View style={styles.EarningPriceItemContainer}>
                          <TextInput
                            style={styles.EarningPriceInput}
                            placeholder={"Earning"}
                            keyboardType="numeric"
                            value={getEarn}
                            onChangeText={setEarn}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setBottomSheet("CurrencyList");
                              BottomSheetRef.current.open();
                              setEarning(true);
                            }}
                            style={styles.EarningPriceButtonContainer}>
                            <Text style={styles.EarningPriceButtonText}>{earningText}</Text>
                            <Icon name="caret-down" size={20} color="silver" />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.EarningPriceItemContainer}>
                          <TextInput
                            style={styles.EarningPriceInput}
                            placeholder={"Price"}
                            keyboardType="numeric"
                            value={getPrice}
                            onChangeText={setPrice}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setBottomSheet("CurrencyList");
                              BottomSheetRef.current.open();
                              setEarning(false);
                            }}
                            style={styles.EarningPriceButtonContainer}>
                            <Text style={styles.EarningPriceButtonText}>{priceText}</Text>
                            <Icon name="caret-down" size={20} color="silver" />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.CoachOwnerContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("Owner")
                            setCoachBreederOwner("Owner")
                            BottomSheetRef.current.open()
                          }}
                          style={styles.ThreeValueInLineButton}>
                          <Text style={styles.InformationText}>{getOwnerText}</Text>
                          <Icon name="plus-circle" size={24} color="silver" />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("Owner")
                            setCoachBreederOwner("Coach")
                            BottomSheetRef.current.open()
                          }}
                          style={styles.ThreeValueInLineButton}>
                          <Text style={styles.InformationText}>{getCoachText}</Text>
                          <Icon name="plus-circle" size={24} color="silver" />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("Owner")
                            setCoachBreederOwner("Breeder")
                            BottomSheetRef.current.open()
                          }}
                          style={styles.ThreeValueInLineButton}>
                          <Text style={styles.InformationText}>{getBreederText}</Text>
                          <Icon name="plus-circle" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>


                      <View style={{ marginVertical: 20 }}>
                        <View style={styles.TextInputContainerDate}>
                          <Text style={styles.TextInputHeader}>Ref1: </Text>
                          <TextInput
                            style={styles.HalfInputStyleNew}
                            placeholder={"Ref1"}
                            name={"Ref1"}
                            value={getRef1}
                            onChangeText={setRef1}
                          />
                        </View>

                        <View style={styles.TextInputContainerDate}>
                          <Text style={styles.TextInputHeader}>Ref2: </Text>
                          <TextInput
                            style={styles.HalfInputStyleNew}
                            placeholder={"Ref2"}
                            name={"Ref2"}
                            value={getRef2}
                            onChangeText={setRef2}
                          />
                        </View>
                      </View>

                      <View style={[styles.OneValueInLine, { marginTop: 30 }]}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("RomanMiller")
                            BottomSheetRef.current.open();
                          }}
                          style={styles.InputTouchableContainer}>
                          {checkStateMultiRM.checked.length === 0 ?
                            <Text style={styles.InformationText}>Roman Miller</Text>
                            :
                            <Text style={styles.InformationText}>{checkStateMultiRM.checked}</Text>
                          }

                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Icon name="caret-down" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("ANZ")
                            BottomSheetRef.current.open();
                          }}
                          style={styles.InputTouchableContainer}>
                          {checkStateMultiANZ.checked.length === 0 ?
                            <Text style={styles.InformationText}>ANZ</Text>
                            :
                            <Text style={styles.InformationText}>{checkStateMultiANZ.checked}</Text>
                          }

                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Icon name="caret-down" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.OneValueInLine}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet("PA")
                            BottomSheetRef.current.open();
                          }}
                          style={styles.InputTouchableContainer}>
                          {checkStateMultiPA.checked.length === 0 ?
                            <Text style={styles.InformationText}>PedigreeAll.com</Text>
                            :
                            <Text style={styles.InformationText}>{checkStateMultiPA.checked}</Text>
                          }

                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Icon name="caret-down" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>

                      <View style={{ marginVertical: 30 }}>
                        <TextInput
                          style={styles.HeaderStyle}
                          placeholder={"Header"}
                          name={"Header"}
                          value={getHeader}
                          onChangeText={setHeader}
                          numberOfLines={1}
                        />

                        <TextInput
                          style={styles.LongImputStyle}
                          placeholder={"Paragraph"}
                          value={getInfo}
                          onChangeText={setInfo}
                        />
                      </View>

                      {image1 ?
                        <View style={styles.ImagePickerContainer}>
                          <Image
                            source={{ uri: image1 }}
                            style={styles.ImagePickerImage} />
                          <TouchableOpacity
                            style={{}}
                            onPress={() => {
                              setImage1(null);
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                          </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity
                          style={{ width: '100%', backgroundColor: '#e8edf1', padding: 10, borderRadius: 8, elevation: 8, marginVertical: 20 }}
                          onPress={pickImage}>
                          <Text style={{ color: '#000', textAlign: 'center', fontSize: 16 }}>Upload Image</Text>
                        </TouchableOpacity>
                      }
                    </View>

                    :
                    <View>
                      <TextInput
                        style={styles.FullInputStyle}
                        placeholder={"Name"}
                        name={"username"}
                        value={getHorseName}
                        onChangeText={setHorseName}
                      />

                      <View style={styles.TwoInformationInLineContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet('SireMareObject')
                            setSireMareHorseName('Sire')
                            BottomSheetRef.current.open();
                          }}
                          style={styles.TwoValueInLineButton}>
                          <Text style={styles.InformationText}>{SireText}</Text>
                          <Icon name="plus-circle" size={24} color="silver" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setBottomSheet('SireMareObject')
                            setSireMareHorseName('Mare')
                            BottomSheetRef.current.open()
                          }}
                          style={styles.TwoValueInLineButton}>
                          <Text style={styles.InformationText}>{MareText}</Text>
                          <Icon name="plus-circle" size={24} color="silver" />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity
                        onPress={() => { setIsDetail(true) }}
                        style={{ width: '100%', backgroundColor: '#e8edf1', padding: 10, borderRadius: 8, elevation: 8, marginVertical: 20 }}>
                        <Text style={{ color: '#000', textAlign: 'center', fontSize: 16, }}>Continue For Details</Text>
                      </TouchableOpacity>

                      <Text style={{ textAlign: 'center', }}>Or</Text>
                    </View>
                  }
                </View>

                <View style={{ width: "100%", alignItems: 'center' }}>
                  <BlueButton
                    title="Add"
                    style={styles.SubmitButton}
                    onPress={async (e) => {
                      if (getFatherID !== -1 && getMotherID !== -1) {
                        setisLoadingForAdding(true)
                        readCheckHorseAvaible()
                      }
                      else {
                        alert("Please fill the required fields.")
                      }


                    }
                    }

                  />
                </View>

              </View>
            </ScrollView>
          </View>
        </View>
      </Root>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  AddAHorseContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  Title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  ButtonsContainer: {
    marginVertical: 20
  },
  OneValueInLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    marginVertical: 7,
    padding: 10
  },
  FullInputStyle: {
    marginVertical: 5,
    width: '100%',
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 18,
    margin: 0,
    padding: 10,
    borderColor: 'silver',
    borderWidth: 0.5,
  },
  HalfInputStyle: {
    //backgroundColor:'#e8e8e8',
    marginVertical: 5,
    width: '100%',
    paddingLeft: 20,
    fontSize: 18,
    margin: 0,
  },
  HalfInputStyleNew: {
    width: '90%',
    paddingLeft: 20,
    fontSize: 16,
    margin: 0,
    alignSelf: 'center'
  },
  LongImputStyle: {
    marginVertical: 5,
    width: '100%',
    height: 100,
    paddingLeft: 20,
    borderRadius: 8,
    fontSize: 18,
    margin: 0,
    padding: 10,
    borderColor: 'silver',
    borderWidth: 0.5,
    lineHeight: 23,
    textAlignVertical: 'top',
  },
  HeaderStyle: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    fontSize: 16,
    paddingLeft: 20
  },
  SubmitButton: {
    marginVertical: 15,
    padding: 10,
    width: '100%',
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  TwoValueInLineButton: {
    width: '47%',
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
  },
  ThreeValueInLineButton: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
  },
  InformationText: {
    fontSize: 16,
    marginLeft: 10
  },
  InputText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5
  },
  InputTouchableContainer: {
    width: '95%',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  EarningPriceItemContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderColor: 'silver',
    borderWidth: 0.5,
    marginVertical: 5
  },
  EarningPriceButtonContainer: {
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderColor: 'silver',
    padding: 5,
    justifyContent: 'space-around',
    width: '40%'
  },
  EarningPriceInput: {
    padding: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: '60%',
    fontSize: 16,
    marginLeft: 10
  },
  EarningPriceButtonText: {
    fontSize: 16,
    marginRight: 5,
  },
  TwoInformationInLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ImagePickerContainer: {
    marginVertical: 8,
    width: "100%",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'silver',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ImagePickerImage: {
    marginLeft: 10,
    width: 300,
    height: 100,
    resizeMode: 'stretch'
  },
  TextInputContainerDate: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 5
  },
  TextInputContainer: {
    marginVertical: 30
  },
  TextInputLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'silver',
    padding: 5,
    borderRadius: 8,
    marginVertical: 5
  },
  CurrencyContainer: {
    marginVertical: 30
  },
  CoachOwnerContainer: {
    marginVertical: 10
  },
  ImageContainer: {
    padding: 10,
    alignItems: 'center'
  },
  TextInputHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

})

