import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View,FlatList,TouchableOpacity,Text,Image } from "react-native";
import { ListItem, Input, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";



export function SearchScreen() {

    const [searchText, setSearchText] = React.useState("");
    const [HorseList, setHorseList] = useState([]);
    const [isHorse, setHorse] = useState([]);
    const [isLoading, SetisLoading] = React.useState(true);

    const renderItem = ({ item }) => {
        return (
          <Item
            item={item}
            onPress={() => {
                setHorse(item.COUNTRY_EN)}}
            
          />
        );
      };
    const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.FlatListItemView}>
        <Text style={styles.title}>{item.COUNTRY_EN}</Text>
    </TouchableOpacity>
    );

    useEffect(() => {
        fetch('http://api.pedigreeall.com/Country/Get')
          .then((response) => response.json())
          .then(function (json) {
            setHorseList(json.m_cData);
          })
          .catch((error) => console.error(error))
          .finally(() => SetisLoading(false));
      }, []);

    return (
        <View style={styles.Container}>
             <SearchBar
                lightTheme={true}
                placeholder="Type Here..."
                containerStyle={{ backgroundColor: "#fff" }}
                inputContainerStyle={{ backgroundColor: "#fff" , width:'100%' }}
                value={searchText}
                onChangeText={(e) => {
                setSearchText(e);
                }}
            />

            {isLoading && (
                    <View style={{ width: "100%", justifyContent: "center", position:'absolute', zIndex: 1 }}>
                    <ActivityIndicator
                        style={{ height: 100, top: 150 }}
                        color="#3F51B5"
                        size="large"
                    />
                    </View>
                )}

            <ScrollView style={styles.ScrollViewContainer}>
                    {HorseList.filter((x) => x.COUNTRY_EN.includes(searchText)).map(
                    (item, i) => (
                        <ListItem
                        key={i}
                        bottomDivider
                        button
                        >
                        <Image
                            source={{
                                uri:
                                'https://images.unsplash.com/photo-1566251037378-5e04e3bec343?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                            }}
                            style={{width:100,height:100}} 
                            resizeMode='contain'
                            transition={false}/>
                        <ListItem.Content>
                            <ListItem.Title>{item.COUNTRY_EN}</ListItem.Title>
                            <ListItem.Subtitle>{item.COUNTRY_TR}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                        </ListItem>
                    )
                    )}
                </ScrollView>
                
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#fff',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    ScrollViewContainer:{
        width:'100%',
        top: 0, 
        margin: 0, 
        backgroundColor: "#fff"
    },
    FlatListItemView:{
        width:'100%',
        paddingTop:20,
        borderBottomWidth:0.2
      },
})