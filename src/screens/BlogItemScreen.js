import React, { useCallback, useState, useRef, Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import WebView from 'react-native-webview';
import { Card, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { SwipeablePanel } from "rn-swipeable-panel";
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { SettingBottomSheet } from '../components/SettingBottomSheet'
import { BlueButton } from '../components/BlueButton';
import { Title } from '../components/Title'
import { ListItem, Input, SearchBar } from "react-native-elements";
import Moment from 'react-moment';
import 'moment-timezone';

export function BlogItemScreen({ route, navigation }) {
  const { selectedBlog } = route.params;
  return (

    <View style={styles.Container}>
      <TouchableOpacity
        onPress={() => { navigation.navigate('Blog') }}
        style={styles.SideBarTopBackIcon}>
        <Icon name="chevron-left" size={20} color="#222" />
        <Text style={styles.SideBarBackText}>Back</Text>
      </TouchableOpacity>
        {selectedBlog !== undefined &&
            <Card 
              containerStyle={{ elevation: 0, borderWidth: 0, borderRadius: 10, padding: 10 }}
              scrollEnabled={true}
            >

              <View style={styles.ButtonContainer}>
                <View style={styles.IconsContainer}>
                  <Icon name="calendar" size={15} color="#000" />
                  <Moment style={{ marginLeft: 5, }} element={Text} format="YYYY/MM/DD"><Text>{selectedBlog.DATE}</Text></Moment>
                </View>
                <View style={styles.IconsContainer}>
                  <Icon name="eye" size={15} color="#000" />
                  <Text style={styles.IconText}>{selectedBlog.COUNTER}</Text>
                </View>
              </View>
              <View style={[styles.IconsContainer, { marginTop: 10 }]}>
                <Icon name="tags" size={15} color="#000" />
                <Text style={styles.IconText}>{selectedBlog.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN}</Text>
              </View>
              
              <Card.Image
                style={{ borderRadius: 3, resizeMode: 'contain', height: 250, marginTop:10 }}
                source={{ uri: 'https://www.pedigreeall.com/blog/' + selectedBlog.IMAGE }} />


              <View
                style={{ width: '100%', height: '100%', marginTop:10 }} >

                <WebView
                  source={{ html: selectedBlog.BLOG_EN }}
                  startInLoadingState={true}
                  style={{ width: '100%', height: '100%' }}
                  javaScriptEnabledAndroid={true}
                  showsHorizontalScrollIndicator={true}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={true}
                  renderLoading={() => <ActivityIndicator color='#000' size='large' />}
                />

              </View>



            </Card>
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
  Title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
    textTransform: 'uppercase'
  },
  ButtonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexDirection: 'row'
  },
  ReadMoreButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2169ab',
    marginVertical: 20
  },
  ButtonText: {
    color: 'white',
  },
  IconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  IconText: {
    paddingLeft: 5,
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
  ScrollViewContainer: {
    marginBottom: 40
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: 'cover'
  },
  textContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 5,
    padding: 10
  },
  infoText: {
    marginVertical: 8,
    width: Dimensions.get('screen').width - 50,
    color: "black",
    fontSize: 16,
    fontWeight: 'normal'
  },
  CategoriesContainer: {
    position: 'absolute',
    padding: 20,
    backgroundColor: '#2169ab',
    borderBottomWidth: 0.5,
    borderColor: 'silver',
    flexDirection: 'row',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    zIndex: 1
  },
  CategoriesText: {
    fontSize: 16,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  CategoryDataNotFound: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'pink'
  },
  BottomSheetBlogImageContainer: {
    marginTop: 10
  },
  BottomSheetTitleContainer: {
    marginTop: 20,
    margin: 5
  },
  SideBarTopBackIcon: {
    width: '100%',
    marginLeft: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: '#ede7e7',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  SideBarBackText: {
    marginLeft: 5,
    color: '#4f4d4d',
    justifyContent: 'center'
  },
})