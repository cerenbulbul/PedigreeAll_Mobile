import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text, ActivityIndicator } from 'react-native';
import Title from '../components/Title';
import Icon from "react-native-vector-icons/FontAwesome5";
import { SettingBottomSheet } from '../components/SettingBottomSheet'
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { BlueButton } from '../components/BlueButton';
import { Dimensions } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
import Flag from "react-native-flags";
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';

export function RacesScreen({ navigation }) {
  const BottomSheetRef = useRef();
  const BottomSheetSmall = React.useRef();

  const [showReport, setShowReport] = React.useState(false);
  const [getLoadingForTable, setLoadingForTable] = React.useState(false)
  const [Header, setHeader] = useState("")
  const [PrizeMin, setPrizeMin] = useState()
  const [PrizeMax, setPrizeMax] = useState()
  const [CounrtyText, setCounrtyText] = useState("Select a Country")
  const [CounrtyList, setCountryList] = useState()
  const [CityText, setCityText] = useState("Select a City")
  const [CityList, setCityList] = useState()
  const [RaceText, setRaceText] = useState("Select a Race")
  const [RaceList, setRaceList] = useState()
  const [RaceGroupText, setRaceGroupText] = useState("Select a Race Group")
  const [RaceGroupList, setRaceGroupList] = useState()
  const [DistanceText, setDistanceText] = useState("Select a Distance")
  const [DistanceList, setDistanceList] = useState()
  const [RunwayText, setRunwayText] = useState("Select a Runway")
  const [RunwayList, setRunwayList] = useState()
  const [ClassText, setClassText] = useState("Select a Class")
  const [ClassList, setClassList] = useState()
  const [BottomSheet, setBottomSheet] = useState()
  const [state, setState] = React.useState({ checked: [] });
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [Begindate, setBegindate] = useState('Begin Date')
  const [BeginTime, setBeginTime] = useState('Begin Time')
  const [Enddate, setEnddate] = useState('End Date')
  const [EndTime, setEndTime] = useState('End Time')
  const [dateCount, setDateCount] = useState()
  const [searchValue, setSearchValue] = React.useState()
  const [isLoading, SetisLoading] = React.useState(true);
  const [time, setTime] = React.useState(true);

  const [getHorseGetFilter, setHorseGetFilter] = React.useState();
  const [getRaceCity, setRaceCity] = React.useState();
  const [getRace, setRace] = React.useState();
  const [getGroupRace, setGroupRace] = React.useState();
  const [getRaceDistanceData, setRaceDistanceData] = React.useState();
  const [getRaceRunwayData, setRaceRunwayData] = React.useState();
  const [getRaceClassData, setRaceClassData] = React.useState();

  const [getHorseRaceID, setHorseRaceID] = React.useState('-1');
  const [getHorseRaceTitle, setHorseRaceTitle] = React.useState("")
  const [getCountryID, setCountryID] = React.useState("")
  const [getCityID, setCityID] = React.useState("")
  const [getRaceID, setRaceID] = React.useState("")
  const [getRaceGroupID, setRaceGroupID] = React.useState("")
  const [getRaceDistanceID, setRaceDistanceID] = React.useState("")
  const [getRaceFloorID, setRaceFloorID] = React.useState("")
  const [getRaceTypeID, setRaceTypeID] = React.useState("")
  const [getStartDate, setStartDate] = React.useState("")
  const [getEndDate, setEndDate] = React.useState("")
  const [getMinPrize, setMinPrize] = React.useState()
  const [getMaxPrize, setMaxPrize] = React.useState()
  const [getActive, setActive] = React.useState("")

  const [checkStateMultiCountry, setcheckStateMultiCountry] = React.useState({ checked: [] });
  const [checkStateMultiCountryString, setcheckStateMultiCountryString] = React.useState({ checkedString: [] });
  const [checkStateMultiRaceCity, setcheckStateMultiRaceCity] = React.useState({ checked: [] });
  const [checkStateMultiRaceCityString, setcheckStateMultiRaceCityString] = React.useState({ checkedString: [] });
  const [checkStateMultiRace, setcheckStateMultiRace] = React.useState({ checked: [] });
  const [checkStateMultiRaceString, setcheckStateMultiRaceString] = React.useState({ checkedString: [] });
  const [checkStateMultiGroupRace, setcheckStateMultiGroupRace] = React.useState({ checked: [] });
  const [checkStateMultiGroupRaceString, setcheckStateMultiGroupRaceString] = React.useState({ checkedString: [] });
  const [checkStateMultiRaceDistance, setcheckStateMultiRaceDistance] = React.useState({ checked: [] });
  const [checkStateMultiRaceDistanceString, setcheckStateMultiRaceDistanceString] = React.useState({ checkedString: [] });
  const [checkStateMultiRunway, setcheckStateMultiRunway] = React.useState({ checked: [] });
  const [checkStateMultiRunwayString, setcheckStateMultiRunwayString] = React.useState({ checkedString: [] });
  const [checkStateMultiClass, setcheckStateMultiClass] = React.useState({ checked: [] });
  const [checkStateMultiClassString, setcheckStateMultiClassString] = React.useState({ checkedString: [] });

  const pressCountry = item => {   // The onPress method
    const { checked } = checkStateMultiCountry;
    const { checkedString } = checkStateMultiCountryString;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.COUNTRY_ID)) {
      setcheckStateMultiCountry({ checked: [...checked, item.COUNTRY_ID] });
      setcheckStateMultiCountryString({ checkedString: [...checkedString, item.COUNTRY_EN] })
    } else {
      setcheckStateMultiCountry({ checked: checked.filter(a => a !== item.COUNTRY_ID) });
      setcheckStateMultiCountryString({ checkedString: checkedString.filter(a => a !== item.COUNTRY_EN) });
    }
  }

  const pressRaceCity = item => {   // The onPress method
    const { checked } = checkStateMultiRaceCity;
    const { checkedString } = checkStateMultiRaceCityString;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.RACE_CITY_ID)) {
      setcheckStateMultiRaceCity({ checked: [...checked, item.RACE_CITY_ID] });
      setcheckStateMultiRaceCityString({ checkedString: [...checkedString, item.RACE_CITY_EN] })
    } else {
      setcheckStateMultiRaceCity({ checked: checked.filter(a => a !== item.RACE_CITY_ID) });
      setcheckStateMultiRaceCityString({ checkedString: checkedString.filter(a => a !== item.RACE_CITY_EN) });
    }
  }

  const pressRace = item => {   // The onPress method
    const { checked } = checkStateMultiRace;
    const { checkedString } = checkStateMultiRaceString;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.ID)) {
      setcheckStateMultiRace({ checked: [...checked, item.ID] });
      setcheckStateMultiRaceString({ checkedString: [...checkedString, item.NAME] })
    } else {
      setcheckStateMultiRace({ checked: checked.filter(a => a !== item.ID) });
      setcheckStateMultiRaceString({ checkedString: checkedString.filter(a => a !== item.NAME) });
    }
  }

  const pressGroupRace = item => {   // The onPress method
    const { checked } = checkStateMultiGroupRace;
    const { checkedString } = checkStateMultiGroupRaceString;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.ID)) {
      setcheckStateMultiGroupRace({ checked: [...checked, item.ID] });
      setcheckStateMultiGroupRaceString({ checkedString: [...checkedString, item.NAME] })
    } else {
      setcheckStateMultiGroupRace({ checked: checked.filter(a => a !== item.ID) });
      setcheckStateMultiGroupRaceString({ checkedString: checkedString.filter(a => a !== item.NAME) });
    }
  }

  const pressRaceDistance = item => {   // The onPress method
    const { checked } = checkStateMultiRaceDistance;
    const { checkedString } = checkStateMultiRaceDistanceString;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.RACE_DISTANCE_ID)) {
      setcheckStateMultiRaceDistance({ checked: [...checked, item.RACE_DISTANCE_ID] });
      setcheckStateMultiRaceDistanceString({ checkedString: [...checkedString, item.DISTANCE] })
    } else {
      setcheckStateMultiRaceDistance({ checked: checked.filter(a => a !== item.RACE_DISTANCE_ID) });
      setcheckStateMultiRaceDistanceString({ checkedString: checkedString.filter(a => a !== item.DISTANCE) });
    }
  }

  const pressRunway = item => {   // The onPress method
    const { checked } = checkStateMultiRunway;
    const { checkedString } = checkStateMultiRunwayString;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.ID)) {
      setcheckStateMultiRunway({ checked: [...checked, item.ID] });
      setcheckStateMultiRunwayString({ checkedString: [...checkedString, item.NAME] })
    } else {
      setcheckStateMultiRunway({ checked: checked.filter(a => a !== item.ID) });
      setcheckStateMultiRunwayString({ checkedString: checkedString.filter(a => a !== item.NAME) });
    }
  }

  const pressClass = item => {   // The onPress method
    const { checked } = checkStateMultiClass;
    const { checkedString } = checkStateMultiClassString;
    // These ensures that multiple checkboxes don't all get affected when one is clicked
    if (!checked.includes(item.ID)) {
      setcheckStateMultiClass({ checked: [...checked, item.ID] });
      setcheckStateMultiClassString({ checkedString: [...checkedString, item.NAME] })
    } else {
      setcheckStateMultiClass({ checked: checked.filter(a => a !== item.ID) });
      setcheckStateMultiClassString({ checkedString: checkedString.filter(a => a !== item.NAME) });
    }
  }

  const readHorseRaceGetFilter = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/HorseRace/GetFilter', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
          body: JSON.stringify({
            "HORSE_RACE_ID": getHorseRaceID,
            "HORSE_RACE_TITLE": getHorseRaceTitle,
            "COUNTRY_ID": getCountryID,
            "CITY_ID": getCityID,
            "RACE_ID": getRaceID,
            "RACE_GROUP_ID": getRaceGroupID,
            "RACE_DISTANCE_ID": getRaceDistanceID,
            "RACE_FLOOR_ID": getRaceFloorID,
            "RACE_TYPE_ID": getRaceTypeID,
            "START_DATE": getStartDate,
            "END_DATE": getEndDate,
            "MIN_PRIZE": getMinPrize,
            "MAX_PRIZE": getMaxPrize,
            "ACTIVE": getActive,
            "PAGE_NO": 1,
            "PAGE_COUNT": 100
          })
        })
          .then((response) => response.json())
          .then((json) => {
            setHorseGetFilter(json.m_cData)
            setTime(false)
            console.log(json)
            setLoadingForTable(false)
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

  const readDataCountryList = async () => {
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
        SetisLoading(false)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const readDataRaceCityList = async (CountryID) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/RaceCity/Get?p_sCountryId=' + CountryID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setRaceCity(json.m_cData)
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

  const readDataRaceList = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/Race/GetAsNameId?p_iLanguage=' + 2, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setRace(json.m_cData)
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

  const readDataRaceGroupList = async (RaceID) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/RaceGroup/GetAsNameId?p_iLanguage=' + 2 + "&p_sRaceId=" + RaceID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setGroupRace(json.m_cData)
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

  const readDataDistanceList = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/RaceDistance/Get', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setRaceDistanceData(json.m_cData)
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

  const readDataRunwayList = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/RaceFloor/GetAsNameId?p_iLanguage=' + 2, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setRaceRunwayData(json.m_cData)
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

  const readDataClassList = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN')
      if (token !== null) {
        fetch('https://api.pedigreeall.com/RaceType/GetAsNameId?p_iLanguage=' + 2, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setRaceClassData(json.m_cData)
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
    readDataCountryList();
    readHorseRaceGetFilter();
    readDataRaceList();
    readDataDistanceList();
    readDataRunwayList();
    readDataClassList();
  }, [])

  return (
    <View style={styles.Container}>
      <Title text="Race Analysis" />
      <RBSheet
        ref={BottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height}
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
            BottomSheetRef.current.close();
            let CountryIDString
            if (checkStateMultiCountry.checked.length > 0) {
              for (let i = 0; i < checkStateMultiCountry.checked.length; i++) {
                if (i === 0) {
                  CountryIDString = checkStateMultiCountry.checked[0]
                }
                else {
                  CountryIDString += "," + checkStateMultiCountry.checked[i]
                }
              }
            }
            setCountryID(CountryIDString);
            console.log(CountryIDString)
            readDataRaceCityList(CountryIDString);

            let CityIDString
            if (checkStateMultiRaceCity.checked.length > 0) {
              for (let i = 0; i < checkStateMultiRaceCity.checked.length; i++) {
                if (i === 0) {
                  CityIDString = checkStateMultiRaceCity.checked[0]
                }
                else {
                  CityIDString += "," + checkStateMultiRaceCity.checked[i]
                }
              }
            }
            setCityID(CityIDString);

            let GroupRaceIDString
            if (checkStateMultiGroupRace.checked.length > 0) {
              for (let i = 0; i < checkStateMultiGroupRace.checked.length; i++) {
                if (i === 0) {
                  GroupRaceIDString = checkStateMultiGroupRace.checked[0]
                }
                else {
                  GroupRaceIDString += "," + checkStateMultiGroupRace.checked[i]
                }
              }
            }
            setRaceGroupID(GroupRaceIDString);

            let DistanceIDString
            if (checkStateMultiRaceDistance.checked.length > 0) {
              for (let i = 0; i < checkStateMultiRaceDistance.checked.length; i++) {
                if (i === 0) {
                  DistanceIDString = checkStateMultiRaceDistance.checked[0]
                }
                else {
                  DistanceIDString += "," + checkStateMultiRaceDistance.checked[i]
                }
              }
            }
            setRaceDistanceID(DistanceIDString);

            let ClassIDString
            if (checkStateMultiRunway.checked.length > 0) {
              for (let i = 0; i < checkStateMultiRunway.checked.length; i++) {
                if (i === 0) {
                  ClassIDString = checkStateMultiRunway.checked[0]
                }
                else {
                  ClassIDString += "," + checkStateMultiRunway.checked[i]
                }
              }
            }
            setRaceTypeID(ClassIDString);
          }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>
          {BottomSheet === "RacesList" &&

            <>
              {getHorseGetFilter.length === 0 ?
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                  <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                  <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                  <Text style={styles.ErrorMessageText}>You can search again.</Text>
                </View>
                :
                <ScrollView>
                  {getHorseGetFilter.map((item, index) => (
                    <View
                      key={index}>
                      <Text>{item.HORSE_RACE_ID}</Text>
                    </View>
                  ))}
                </ScrollView>
              }
            </>

            || BottomSheet === "CountryList" &&
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
                  SetisLoading(true);
                  readDataCountryList();
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
              {CounrtyList !== undefined ?
                <ScrollView style={styles.ScrollViewContainer}>
                  {CounrtyList.filter((x) => x.COUNTRY_EN.includes(searchValue)).map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
                      onPress={() => {
                        pressCountry(item)
                      }}
                    >
                      <ListItem.CheckBox
                        checked={checkStateMultiCountry.checked.includes(item.COUNTRY_ID)}
                        checkedIcon='circle'
                        uncheckedIcon='circle'
                        center={true}
                        checkedColor='#2169ab'
                        uncheckedColor='rgb(232, 237, 241)'
                        onPress={() => {
                          pressCountry(item)
                        }} />

                      <Flag code={item.ICON.toUpperCase()} size={24} />
                      <ListItem.Content>
                        <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
                :
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                  <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                  <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                </View>
              }
            </>

            || BottomSheet === "CityList" &&

            <>
              {isLoading && (
                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                  <ActivityIndicator
                    style={{ height: 100, top: 150 }}
                    color="#3F51B5"
                    size="large"
                  />
                </View>
              )}
              {getRaceCity !== undefined ?
                <ScrollView style={styles.ScrollViewContainer}>
                  {getRaceCity.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
                      onPress={() => {
                        pressRaceCity(item)
                      }}
                    >
                      <ListItem.CheckBox
                        checked={checkStateMultiRaceCity.checked.includes(item.RACE_CITY_ID)}
                        checkedIcon='circle'
                        uncheckedIcon='circle'
                        center={true}
                        checkedColor='#2169ab'
                        uncheckedColor='rgb(232, 237, 241)'
                        onPress={() => {
                          pressRaceCity(item)
                        }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.RACE_CITY_EN}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
                :
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                  <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                  <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                </View>
              }
            </>

            || BottomSheet === "RaceGroupList" &&

            <>
              {isLoading && (
                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                  <ActivityIndicator
                    style={{ height: 100, top: 150 }}
                    color="#3F51B5"
                    size="large"
                  />
                </View>
              )}
              {getGroupRace !== undefined ?
                <ScrollView style={styles.ScrollViewContainer}>
                  {getGroupRace.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
                      onPress={() => {
                        pressGroupRace(item)
                      }}
                    >
                      <ListItem.CheckBox
                        checked={checkStateMultiGroupRace.checked.includes(item.ID)}
                        checkedIcon='circle'
                        uncheckedIcon='circle'
                        center={true}
                        checkedColor='#2169ab'
                        uncheckedColor='rgb(232, 237, 241)'
                        onPress={() => {
                          pressGroupRace(item)
                        }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.NAME}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
                :
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                  <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                  <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                </View>
              }
            </>

            || BottomSheet === "DistanceList" &&

            <>
              {isLoading && (
                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                  <ActivityIndicator
                    style={{ height: 100, top: 150 }}
                    color="#3F51B5"
                    size="large"
                  />
                </View>
              )}
              {getRaceDistanceData !== undefined ?
                <ScrollView style={styles.ScrollViewContainer}>
                  {getRaceDistanceData.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
                      onPress={() => {
                        pressRaceDistance(item)
                      }}
                    >
                      <ListItem.CheckBox
                        checked={checkStateMultiRaceDistance.checked.includes(item.RACE_DISTANCE_ID)}
                        checkedIcon='circle'
                        uncheckedIcon='circle'
                        center={true}
                        checkedColor='#2169ab'
                        uncheckedColor='rgb(232, 237, 241)'
                        onPress={() => {
                          pressRaceDistance(item)
                        }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.DISTANCE}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
                :
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                  <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                  <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                </View>
              }
            </>

            || BottomSheet === "ClassList" &&

            <>
              {isLoading && (
                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                  <ActivityIndicator
                    style={{ height: 100, top: 150 }}
                    color="#3F51B5"
                    size="large"
                  />
                </View>
              )}
              {getRaceClassData !== undefined ?
                <ScrollView style={styles.ScrollViewContainer}>
                  {getRaceClassData.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
                      onPress={() => {
                        pressClass(item)
                      }}
                    >
                      <ListItem.CheckBox
                        checked={checkStateMultiClass.checked.includes(item.ID)}
                        checkedIcon='circle'
                        uncheckedIcon='circle'
                        center={true}
                        checkedColor='#2169ab'
                        uncheckedColor='rgb(232, 237, 241)'
                        onPress={() => {
                          pressClass(item)
                        }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.NAME}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
                :
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                  <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                  <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                </View>
              }
            </>

          }
        </View>
      </RBSheet>
      <RBSheet
        ref={BottomSheetSmall}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
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

            let RaceIDString
            if (checkStateMultiRace.checked.length > 0) {
              for (let i = 0; i < checkStateMultiRace.checked.length; i++) {
                if (i === 0) {
                  RaceIDString = checkStateMultiRace.checked[0]
                }
                else {
                  RaceIDString += "," + checkStateMultiRace.checked[i]
                }
              }
              readDataRaceGroupList(RaceIDString)
            }
            setRaceID(RaceIDString);

            let RunwayIDString
            if (checkStateMultiRunway.checked.length > 0) {
              for (let i = 0; i < checkStateMultiRunway.checked.length; i++) {
                if (i === 0) {
                  RunwayIDString = checkStateMultiRunway.checked[0]
                }
                else {
                  RunwayIDString += "," + checkStateMultiRunway.checked[i]
                }
              }
            }
            setRaceFloorID(RunwayIDString);

            BottomSheetSmall.current.close()
          }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>

          {BottomSheet === "RaceList" &&
            <>
              {isLoading && (
                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                  <ActivityIndicator
                    style={{ height: 100, top: 150 }}
                    color="#3F51B5"
                    size="large"
                  />
                </View>
              )}
              {getRace !== undefined ?
                <ScrollView style={styles.ScrollViewContainer}>
                  {getRace.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
                      onPress={() => {
                        pressRace(item)
                      }}
                    >
                      <ListItem.CheckBox
                        checked={checkStateMultiRace.checked.includes(item.ID)}
                        checkedIcon='circle'
                        uncheckedIcon='circle'
                        center={true}
                        checkedColor='#2169ab'
                        uncheckedColor='rgb(232, 237, 241)'
                        onPress={() => {
                          pressRace(item)
                        }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.NAME}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
                :
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                  <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                  <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                </View>
              }
            </>

            || BottomSheet === "RunwayList" &&
            <>
              {isLoading && (
                <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                  <ActivityIndicator
                    style={{ height: 100, top: 150 }}
                    color="#3F51B5"
                    size="large"
                  />
                </View>
              )}
              {getRaceRunwayData !== undefined ?
                <ScrollView style={styles.ScrollViewContainer}>
                  {getRaceRunwayData.map((item, i) => (
                    <ListItem
                      key={i}
                      bottomDivider
                      button
                      onPress={() => {
                        pressRunway(item)
                      }}
                    >
                      <ListItem.CheckBox
                        checked={checkStateMultiRunway.checked.includes(item.ID)}
                        checkedIcon='circle'
                        uncheckedIcon='circle'
                        center={true}
                        checkedColor='#2169ab'
                        uncheckedColor='rgb(232, 237, 241)'
                        onPress={() => {
                          pressRunway(item)
                        }} />
                      <ListItem.Content>
                        <ListItem.Title>{item.NAME}</ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  )
                  )}
                </ScrollView>
                :
                <View style={styles.ErrorMessageContainer}>
                  <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                  <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                  <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                </View>
              }
            </>
          }

        </View>
      </RBSheet>

      <ScrollView style={styles.ScrollViewContainer}>
        {showReport ?
          <>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setShowReport(false)
                }}
                style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                <Icon name="chevron-left" size={24} color="silver" />
                <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
              </TouchableOpacity>
            </View>


            {getLoadingForTable ?
              <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                <ActivityIndicator
                  color="#3F51B5"
                  size="large"
                />
              </View>
              :
              <ScrollView>
                {getHorseGetFilter !== undefined ?
                  <>
                    {getHorseGetFilter.length === 0 ?
                      <View style={styles.ErrorMessageContainer}>
                        <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                        <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                        <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                        <Text style={styles.ErrorMessageText}>You can search again.</Text>
                      </View>
                      :
                      <ScrollView style={styles.ScrollViewContainer}>
                        <ScrollView horizontal={true}>

                          <DataTable>
                            <DataTable.Header>
                              <DataTable.Title >ID</DataTable.Title>
                              <DataTable.Title >Analysis</DataTable.Title>
                              <DataTable.Title >Header</DataTable.Title>
                              <DataTable.Title >Country</DataTable.Title>
                              <DataTable.Title >City</DataTable.Title>
                              <DataTable.Title >Race</DataTable.Title>
                              <DataTable.Title >Race G.</DataTable.Title>
                              <DataTable.Title >Distance</DataTable.Title>
                              <DataTable.Title >Runway</DataTable.Title>
                              <DataTable.Title >Class</DataTable.Title>
                              <DataTable.Title >Prize</DataTable.Title>
                              <DataTable.Title >Date</DataTable.Title>
                              <DataTable.Title >Horse Count</DataTable.Title>
                              <DataTable.Title >Visit. Count</DataTable.Title>
                              <DataTable.Title >Link</DataTable.Title>
                            </DataTable.Header>
                            {getHorseGetFilter.map((item, i) => (
                              <DataTable.Row key={i}>
                                <DataTable.Cell numeric>{item.HORSE_RACE_ID}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 110, justifyContent: 'center' }} >Analysis</DataTable.Cell>
                                <DataTable.Cell style={{ width: 110, justifyContent: 'center' }} >{item.HORSE_RACE_TITLE}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} >{item.RACE_CITY_OBJECT.COUNTRY.COUNTRY_EN}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 100, justifyContent: 'center' }}>{item.RACE_CITY_OBJECT.RACE_CITY_EN}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 60, justifyContent: 'center' }}>{item.RACE_GROUP_OBJECT.RACE_OBJECT.RACE_EN}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 60, justifyContent: 'center' }}>{item.RACE_GROUP_OBJECT.RACE_GROUP_EN}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 60, justifyContent: 'center' }}>{item.RACE_DISTANCE_OBJECT.DISTANCE}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 60, justifyContent: 'center' }}>{item.RACE_FLOOR_OBJECT.RACE_FLOOR_EN}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 60, justifyContent: 'center' }}>{item.RACE_TYPE_OBJECT.RACE_TYPE_EN}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 80, justifyContent: 'center' }}>{item.PRIZE1}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 100, justifyContent: 'center' }}>{item.DATE}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 60, justifyContent: 'center' }}>{item.HORSE_COUNT}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 60, justifyContent: 'center' }}>{item.COUNTER}</DataTable.Cell>
                                <DataTable.Cell style={{ width: 60, justifyContent: 'center' }}>Link</DataTable.Cell>
                              </DataTable.Row>
                            )
                            )}
                          </DataTable>

                        </ScrollView>
                      </ScrollView>}
                  </>
                  :
                  <View style={styles.ErrorMessageContainer}>
                    <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                    <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                    <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                  </View>
                }
              </ScrollView>
            }



          </>

          :

          <>
            <View style={styles.InformationContainer}>
              <View style={styles.TextInputContainer}>
                <Text style={styles.TextInputHeader}>Header: </Text>
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={"Header"}
                  value={Header}
                  onChange={setHeader}
                />
              </View>
              <View style={[styles.BottomSheetInputsContainer, { marginTop: 30 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheet("CountryList");
                    BottomSheetRef.current.open();
                  }}
                  style={styles.OneValueInLineButton}>
                  <Icon name="flag" size={20} color="#2169ab" />
                  {checkStateMultiCountryString.checkedString.length === 0 ?
                    <Text style={styles.InformationText}>Select A Country</Text>
                    :
                    <Text style={styles.InformationText}>{checkStateMultiCountryString.checkedString}</Text>
                  }

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                </TouchableOpacity>
              </View>
              <View style={[styles.BottomSheetInputsContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    BottomSheetRef.current.open();
                    setBottomSheet("CityList");
                  }}
                  style={styles.OneValueInLineButton}>
                  <Icon name="city" size={20} color="#2169ab" />
                  {checkStateMultiRaceCityString.checkedString.length === 0 ?
                    <Text style={styles.InformationText}>Select A City</Text>
                    :
                    <Text style={styles.InformationText}>{checkStateMultiRaceCityString.checkedString}</Text>
                  }

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                </TouchableOpacity>
              </View>
              <View style={[styles.BottomSheetInputsContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    BottomSheetSmall.current.open();
                    setBottomSheet("RaceList");
                  }}
                  style={styles.OneValueInLineButton}>
                  <Icon name="horse" size={20} color="#2169ab" />
                  {checkStateMultiRaceString.checkedString.length === 0 ?
                    <Text style={styles.InformationText}>Select A Race</Text>
                    :
                    <Text style={styles.InformationText}>{checkStateMultiRaceString.checkedString}</Text>
                  }

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                </TouchableOpacity>
              </View>
              <View style={[styles.BottomSheetInputsContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    BottomSheetRef.current.open();
                    setBottomSheet("RaceGroupList");
                  }}
                  style={styles.OneValueInLineButton}>
                  <Icon name="horse" size={20} color="#2169ab" />
                  {checkStateMultiGroupRaceString.checkedString.length === 0 ?
                    <Text style={styles.InformationText}>Select A Group Race</Text>
                    :
                    <Text style={styles.InformationText}>{checkStateMultiGroupRaceString.checkedString}</Text>
                  }

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                </TouchableOpacity>
              </View>
              <View style={[styles.BottomSheetInputsContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    BottomSheetRef.current.open();
                    setBottomSheet("DistanceList");
                  }}
                  style={styles.OneValueInLineButton}>
                  <Icon name="route" size={20} color="#2169ab" />
                  {checkStateMultiRaceDistanceString.checkedString.length === 0 ?
                    <Text style={styles.InformationText}>Select A Distance</Text>
                    :
                    <Text style={styles.InformationText}>{checkStateMultiRaceDistanceString.checkedString}</Text>
                  }

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                </TouchableOpacity>
              </View>
              <View style={[styles.BottomSheetInputsContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheet("RunwayList");
                    BottomSheetSmall.current.open();
                  }}
                  style={styles.OneValueInLineButton}>
                  <Icon name="route" size={20} color="#2169ab" />
                  {checkStateMultiRunwayString.checkedString.length === 0 ?
                    <Text style={styles.InformationText}>Select A Runway</Text>
                    :
                    <Text style={styles.InformationText}>{checkStateMultiRunwayString.checkedString}</Text>
                  }

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                </TouchableOpacity>
              </View>
              <View style={[styles.BottomSheetInputsContainer]}>
                <TouchableOpacity
                  onPress={() => {
                    setBottomSheet("ClassList");
                    BottomSheetRef.current.open();
                  }}
                  style={styles.OneValueInLineButton}>
                  <Icon name="horse" size={20} color="#2169ab" />
                  {checkStateMultiClassString.checkedString.length === 0 ?
                    <Text style={styles.InformationText}>Select A Class</Text>
                    :
                    <Text style={styles.InformationText}>{checkStateMultiClassString.checkedString}</Text>
                  }

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                </TouchableOpacity>
              </View>

              <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                <Text style={styles.TextInputHeader}>Prize Min: </Text>
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={"Prize Min"}
                  keyboardType="numeric"
                  value={getMinPrize}
                  onChange={setMinPrize}
                />
              </View>
              <View style={styles.TextInputContainer}>
                <Text style={styles.TextInputHeader}>Prize Min: </Text>
                <TextInput
                  style={styles.HalfInputStyle}
                  placeholder={"Prize Max"}
                  keyboardType="numeric"
                  value={getMaxPrize}
                  onChange={setMaxPrize}
                />
              </View>

              <View style={{ marginTop: 30 }}>
                <TextInput
                  style={styles.FullInputStyle}
                  placeholder={"Start Date"}
                  name={"StartDate"}
                  value={getStartDate}
                  onChangeText={setStartDate}
                  keyboardType={"numeric"}
                />
                <TextInput
                  style={styles.FullInputStyle}
                  placeholder={"Start Time"}
                  name={"StartDate"}
                  value={getEndDate}
                  onChangeText={setEndDate}
                  keyboardType={"numeric"}
                />
              </View>



            </View>
            <View style={styles.ButtonContainer}>
              <BlueButton
                title="View"
                style={{ width: '95%' }}
                onPress={() => {
                  setLoadingForTable(true)
                  readHorseRaceGetFilter();
                  setShowReport(true)
                }}
              />
            </View>
          </>
        }

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  ScrollViewContainer: {
    backgroundColor: '#fff'
  },
  InformationContainer: {
    padding: 10
  },
  TextInputContainer: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'silver',
    borderRadius: 8,
    flexDirection: 'row',
    marginVertical: 5
  },
  TextInputHeader: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  HalfInputStyle: {
    width: '90%',
    paddingLeft: 20,
    fontSize: 16,
    margin: 0,
  },
  BottomSheetInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    padding: 10,
    marginVertical: 2
  },
  OneValueInLineButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  InformationText: {
    fontSize: 16,
    marginLeft: 5
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  TwoValueInLineButton: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 2,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'silver',
    alignItems: 'center'
  },
  BirthDatePickerButton: {
    width: '80%',
    flexDirection: 'row'
  },
  BirthDateText: {
    marginLeft: 10,
    fontSize: 16
  },
  ButtonContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  ErrorMessageContainer: {
    width: '100%',
    height: '100%',
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
})