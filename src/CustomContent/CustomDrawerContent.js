import React, { useState,useEffect } from "react";
import { 
    ScrollView, 
    View,  
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    StatusBar,
    TouchableNativeFeedback,
    SafeAreaView,
  LayoutAnimation,
  UIManager,
    SectionList,
    FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {Avatar} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { MainScreen } from "../screens/MainScreen";

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const { height, width } = Dimensions.get('window');
export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;
export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 50 : 20,
    android: StatusBar.currentHeight,
    default: 0
})
const SideNavBarContainerHeight = Platform.select({
  ios: isIPhoneX() ? 70 : 20,
  android: 20,
})


const DATA = [
  {
    id: '0',
    title: 'First Item',
    data: ['asd','sadsd']
  },
  {
    id: '1',
    title: 'Second Item',
  },
  {
    id: '2',
    title: 'Third Item',
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);



export default function CustomDrawerContent(props,navigation) {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    
    if(selectedId === 0) {
      
    }
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );



    return (
        
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor="#2e3f6e" barStyle="light-content" />
        <View style={styles.ProfileContainer}>
        
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 60 }} />
                <Text style={{ color: '#f9f9f9'}}>Name</Text>
                <Text style={{ color: '#f9f9f9'}}>Surname</Text>
              </View>
            </View>

        <DrawerContentScrollView>
          <View forceInset={{ top: 'always', horizontal: 'never' }}>
          <SideBarToggleList props = {props} navigation={navigation}/>

            <View style={styles.SocialIconContainer}>
              <TouchableOpacity style={{ marginTop: '2%' }}>
              <Icon name="facebook" size={20} color="#2e3f6e" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: '3%' }}>
              <Icon name="instagram" size={20} color="#2e3f6e" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: '5%' }}>
              <Icon  name="twitter" size={20} color="#2e3f6e" />
              </TouchableOpacity>
            </View>
          </View>
        </DrawerContentScrollView>

        <View style={styles.AuthenticationContainer}>

        <View onPress ={() => {
          navigation.navigate('Login')
        }} style={styles.Exit}>
          <TouchableNativeFeedback >
            <View>
            <Icon name="sign-out-alt" size={20} color="#2e3f6e" />
              <Text style={{ color: 'black' }}>Logout</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

          <View style={{justifyContent:'center',flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
            <TouchableOpacity style={styles.Authentication}>
            <Text style={{color:'white'}}>Login</Text>
          </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center'}}>
          <TouchableOpacity style={styles.Authentication}>
            <Text style={{color:'white'}}>Register</Text>
          </TouchableOpacity>
            </View>
          
          </View>
          
       
          

        </View>

        

      </View>
    )
}

export function SideBarToggleList({ props, navigation }) {
  const [listDataSource, setListDataSource] = useState(CONTENT);
const [multiSelect, setMultiSelect] = useState(false);

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const updateLayout = (index) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  const array = [...listDataSource];
  if (multiSelect) {
    array[index]['isExpanded'] = !array[index]['isExpanded'];
  } else {
    if(index === 0){
      props.navigation.navigate('Main')
    }
    if(index ===1 || index ===2 || index===3 || index===4) {
      array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] =
           !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false),
        console.log(index)
    );
  }
    }
    
  setListDataSource(array);
};

  return (
      <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <ScrollView>
      {listDataSource.map((item, key) => (
          <ExpandableComponent
            props= {props}
            navigation={navigation}
            key={item.category_name}
            onClickFunction={() => {
              updateLayout(key);
              
            }}
            item={item}
          >
      
          </ExpandableComponent>
        ))}
      </ScrollView>
    </View>
  </SafeAreaView>
      
  );
}

function ExpandableComponent({item, onClickFunction, props, navigation}){
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        onPress={onClickFunction}
        style={styles.header}>
          <View style={styles.ListView}>

          <Text style={styles.headerText}>
          {item.category_name}
        </Text>

       
        {item.category_name === 'My Request'
          || item.category_name === 'Analysis For Breeder'
          || item.category_name === 'Race Analysis'
          || item.category_name === 'Reports || EfectiveNick' ? <Icon name="caret-down" size={20} color="#adb5bd" />: null}

          </View>
        
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.subcategory.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={
              () => {props.navigation.navigate('Main')}
              //alert('Id: ' + item.id + ' val: ' + item.val)
          }>
            <View style={styles.ListViewItem}>
            <Icon style={styles.ListViewItemIcon} name="arrow-right" size={16} color="#adb5bd" />
            <Text style={styles.text}>
              {item.val}
            </Text>

            </View>
            
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  SocialIconContainer:{
    width:'100%',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection: "row",
  },
  ProfileContainer:{
    backgroundColor: '#2e3f6e',
    padding:SideNavBarContainerHeight,
  },
  Exit:{
    backgroundColor: '#fff',
    padding:10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 30,
    backgroundColor: '#fff',
  },
  ListView:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  ListViewItem:{
    flexDirection:'row',
  },
  ListViewItemIcon:{
    paddingTop:12,
  },
  AuthenticationContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  Authentication:{
    justifyContent:'center',
    marginRight:5,
    padding:5,
    borderRadius:8,
    backgroundColor:'#2e3f6e'
  }
});

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Main',
    subcategory: [
      {id: 0, val: 'Sub Cat 1'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'My Request',
    subcategory: [
      {id: 1, val: 'Add A Horse'},
      {id: 2, val: 'Edit A Horse'},
      {id: 3, val: 'Edit A Horse'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Analysis For Breeder',
    subcategory: [
      {id: 4, val: 'Pedigree Query'},
      {id: 5, val: 'Hypo Mating'},
      {id: 6, val: 'Siblings (Mare)'},
      {id: 7, val: 'Siblings (Sire)'},
      {id: 8, val: 'Tail Female'},
      {id: 9, val: 'Progeny'},
      {id: 10, val: 'Profile'},
      {id: 11, val: 'Line Breeding'},
      {id: 12, val: 'Female Family'},
      {id: 13, val: 'Foals As Brood Mare Sire'},
      {id: 14, val: 'Siblings (Broodmare Sire)'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Race Analysis',
    subcategory: [
      {id: 15, val: 'Compare Horses'},
      {id: 16, val: 'Races'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Reports || EfectiveNick',
    subcategory: [
      {id: 17, val: 'Standard Thoroughbred Analysis'},
      {id: 18, val: 'Advanced Thoroughbred Analysis'},
      {id: 19, val: 'Professional Thoroughbred Analysis'},
      {id: 20, val: 'Standard Mare Analysis'},
      {id: 21, val: 'Advanced Mare Analysis'},
      {id: 22, val: 'Standard Important Ancestors Analysis'},
      {id: 23, val: 'Advanced Important Ancestors Analysis'},
      {id: 24, val: 'Professional Mare Analysis'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Blog',
    subcategory: [
      {id: 17, val: 'Sub Cat 17'},
      {id: 18, val: 'Sub Cat 8'},
    ],
  },
  {
    isExpanded: false,
    category_name: 'Contact',
    subcategory: [{id: 20, val: 'Sub Cat 20'}],
  },
];