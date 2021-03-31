import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ListItem, Input, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Flag from "react-native-flags";
import { Global } from '../Global';

export function Country({ navigation }) {
  const API_URL = "http://api.pedigreeall.com/";
  const [Countrylist, setCountryData] = useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [isLoading, SetisLoading] = React.useState(true);
  //const customData = require('./customData.json');
  useEffect(() => {
    fetch('http://api.pedigreeall.com/Country/Get')
      .then((response) => response.json())
      .then(function (json) {
        setCountryData(json.m_cData);
      })
      .catch((error) => console.error(error))
      .finally(() => SetisLoading(false));
  }, []);

  const [getSearchPlaceholderText, setSearchPlaceholderText] = React.useState("")
  React.useEffect(() => {
    if (Global.Language === 1) {
      setSearchPlaceholderText("Buraya Yazınız")
    }
    else {
      setSearchPlaceholderText("Type Here")
    }
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        margin: 0,
        width: "100%",
        height: "100%",
      }}
    >

      <SearchBar
        lightTheme={true}
        placeholder={getSearchPlaceholderText}
        containerStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
        value={searchText}
        onChangeText={(e) => {
          setSearchText(e);
        }}
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

      <ScrollView style={{ top: 0, margin: 0, backgroundColor: "#fff" }}>
        {Global.Language === 1 ?
          <>
            {Countrylist.filter((x) => x.COUNTRY_TR.includes(searchText)).map(
              (item, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  button
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Register', {
                      countryID: item.COUNTRY_ID,
                      countryCode: item.ABBREVIATION,
                      countryName: item.COUNTRY_TR,
                      countryIcon: item.ICON.toUpperCase(),
                    });
                  }}
                >

                  <Flag code={item.ICON.toUpperCase()} size={24} />
                  <ListItem.Content>
                    <ListItem.Title>{item.COUNTRY_TR}</ListItem.Title>
                    <ListItem.Subtitle>{item.COUNTRY_EN}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              )
            )}
          </>
          :
          <>
            {Countrylist.filter((x) => x.COUNTRY_EN.includes(searchText)).map(
              (item, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  button
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Register', {
                      countryID: item.COUNTRY_ID,
                      countryCode: item.ABBREVIATION,
                      countryName: item.COUNTRY_EN,
                      countryIcon: item.ICON.toUpperCase(),
                    });
                  }}
                >

                  <Flag code={item.ICON.toUpperCase()} size={24} />
                  <ListItem.Content>
                    <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                    <ListItem.Subtitle>{item.COUNTRY_TR}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              )
            )}
          </>
        }

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  Indicator: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});


/*

 <SearchBar
        lightTheme={true}
        placeholder="Type Here..."
        containerStyle={{ backgroundColor: "#fff" }}
        inputContainerStyle={{ backgroundColor: "#fff" }}
        value={searchText}
        onChangeText={(e) => {
          setSearchText(e);
        }}
      />

      */


/*

  <ScrollView style={{ top: 0, margin: 0, backgroundColor: "#fff" }}>
  {Countrylist.filter((x) => x.COUNTRY_EN.includes(searchText)).map(
    (item, i) => (
      <ListItem
        key={i}
        bottomDivider
        button
        onPress={() => {
          navigation.navigate('Register', {
            countryID: item.COUNTRY_ID,
            countryCode: item.ABBREVIATION,
            countryName: item.COUNTRY_EN,
            countryIcon: item.ICON.toUpperCase(),
        });
          }}
        >
          <Flag code={item.ICON.toUpperCase()} size={24} />
          <ListItem.Content>
            <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
            <ListItem.Subtitle>{item.COUNTRY_TR}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )
    )}
  </ScrollView>

 */