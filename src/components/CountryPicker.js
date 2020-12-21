import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View ,ScrollView} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import Flag from "react-native-flags";


export default function CountryPicker() {
    return (
      <ScrollView style={{ top: 0, margin: 0, backgroundColor: "#fff" }}>
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
            });
              }}
            >
              <Flag code={item.ABBREVIATION} size={24} />
              <ListItem.Content>
                <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                <ListItem.Subtitle>{item.COUNTRY_TR}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
        )}
      </ScrollView>
    )
}
