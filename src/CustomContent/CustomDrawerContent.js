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
    SafeAreaView,
  LayoutAnimation,
  UIManager,
  Image, } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
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
  android: StatusBar.currentHeight,
  default: 0
})

const StatusBarColor = Platform.select({
  ios: "#2e3f6e",
  android: "#26345a",
  default:"#2e3f6e"
})

export default function CustomDrawerContent(props,navigation) {


  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );

    return (
        
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor={StatusBarColor} barStyle="light-content" />
        <View style={styles.ProfileContainer}>
          <Image 
          resizeMode={'contain'}
          style={{width: "65%", height: "90%", }}
          source={require('../../assets/logo.png')}></Image>
          <TouchableOpacity
          style={{padding:10}}
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
            <Icon  name="times" size={26} color="#96999c" />
          </TouchableOpacity>
        </View>

        <DrawerContentScrollView>
          <View forceInset={{ top: 'always', horizontal: 'never' }}>
          <SideBarToggleList props = {props} navigation={navigation}/>

          <View style={{justifyContent:'center',alignItems:'center'}}>
          <View style={{width:'100%', paddingRight:2, paddingLeft:2, paddingVertical:5}}>
            <TouchableOpacity 
            style={{padding:5, backgroundColor:'#e0e1e2',borderRadius:6}}
            onPress={() => {
              props.navigation.navigate('Login');
            }}>
              <Text style={{textAlign:'center', fontSize:16,fontWeight:'500'}}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{width:'100%', paddingRight:2, paddingLeft:2, paddingVertical:5}}>
            <TouchableOpacity 
            style={{padding:5, backgroundColor:'#e0e1e2',borderRadius:6}}
            onPress={() => {
              props.navigation.navigate("Register", {
                headerTitle: "abc",
                countryID: 0,
                countryCode: "",
                countryName: "Select a country",
                countryIcon: "flag",
              });
            }}>
            <Text style={{textAlign:'center', fontSize:16,fontWeight:'500'}}>Register</Text>
            </TouchableOpacity>
          </View>
          </View>
          

            <View style={styles.SocialIconContainer}>
              <TouchableOpacity style={styles.SocialMediaItems}>
              <Icon name="facebook" size={32} color="#222" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.SocialMediaItems}>
              <Icon name="twitter" size={32} color="#222" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.SocialMediaItems}>
              <Icon  name="instagram" size={32} color="#222" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.SocialMediaItems}>
              <Icon  name="linkedin" size={32} color="#222" />
              </TouchableOpacity>
            </View>
          </View>
        </DrawerContentScrollView>

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
    if(index=== 6) {
      props.navigation.navigate('Contact')
    }
    if(index=== 5) {
      props.navigation.navigate('Blog')
    }
    if(index ===1 || index ===2 || index===3 || index===4) {
      array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] =
           !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false),
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
          || item.category_name === 'Reports || EfectiveNick' ? <Icon name="caret-down" size={20} color="#adb5bd" style={{marginRight:10}}/>: null}

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
              () => {
                if(item.id === 1){
                  props.navigation.navigate('AddAHorse')
                }
                
              }
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
    marginVertical:20,
  },
  ProfileContainer:{
    width:'100%',
    marginTop:40,
    backgroundColor: '#fff',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
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
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth:1,
    borderColor:'#e8e8e8',
    backgroundColor: 'white',
    paddingBottom:15,
    paddingTop:15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom:5,
    marginLeft:10,
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
    justifyContent:'space-between',
  },
  ListViewItem:{
    flexDirection:'row',
  },
  ListViewItemIcon:{
    justifyContent:'center',
    paddingTop:13
  },
  AuthenticationContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  Authentication:{
    justifyContent:'center',
    marginRight:5,
    padding:5,
    borderRadius:6,
    backgroundColor:'#2e3f6e'
  },
  SocialMediaItems:{
   borderWidth:1,
   padding:10,
   borderRadius:6, 
   borderColor:'#e0e1e2'
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