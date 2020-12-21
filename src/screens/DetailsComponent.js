import React, { useState } from "react";

import { StyleSheet, ScrollView, View, Vibration, Text,Button } from "react-native";

export function DetailsComponent({ route, navigation }) {
    /* 2. Get the param */
    //const [email, setEmail] = React.useState("");
    const { itemId, otherParam } = route.params;
    console.log(itemId)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('DetailsComponent', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }