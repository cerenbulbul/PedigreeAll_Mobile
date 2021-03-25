import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  LayoutAnimation,
  UIManager,
  Image,
  Linking,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ListItem, Input, SearchBar } from "react-native-elements";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { MainScreen } from "../screens/MainScreen";
import AsyncStorage from '@react-native-community/async-storage'
import { Global } from "../Global";


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
  default: "#2e3f6e"
})

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function CustomDrawerContent(props, navigation) {

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );

  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [GenerationTitle, setGenerationTitle] = React.useState("Generation 5");
  const [GenerationTitle2, setGenerationTitle2] = React.useState("Generation 5");
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openSubPage, setSubPage] = React.useState(false);
  const [subPageTitle, setSubPageTitle] = useState();
  const [iconColor, setIconColor] = useState("#fff");
  const [openSubSubPage, setSubSubPage] = React.useState(false);
  const [subSubPageTitle, setSubSubPageTitle] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [SlideInLeft, setSlideInLeft] = useState(0)
  const [firstBoxPosition, setFirstBoxPosition] = useState("left");
  const [secondBoxPosition, setSecondBoxPosition] = useState("left");
  const [thirdBoxPosition, setThirdBoxPosition] = useState("left");

  const toggleFirstBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFirstBoxPosition(firstBoxPosition === "left" ? "right" : "left");
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const readData = async () => {
    try {
      const userKey = await AsyncStorage.getItem('USER')
      if (userKey !== null) {
        Global.IsLogin = true
        setUser(userKey)
        const user = JSON.parse(userKey)[0].PAGE_LIST
        setUserData(user);
      }
      else {
        Global.IsLogin = false
        setUser(null)
      }
    } catch (e) {
    }
  }

  React.useEffect(() => {
    readData();
  }, [])


  if (Global.IsLogin) {
    if (userData === undefined) {
      readData();
    }
  }

  if (Global.IsLogin === false) {
    if (userData !== undefined) {
      readData();
    }
  }



  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('USER')
      await AsyncStorage.removeItem('TOKEN')
      //console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to remove user')
    }
  }

  return (

    <View
      style={{ flex: 1 }}>
      <MyStatusBar backgroundColor={StatusBarColor} barStyle="light-content" />
      <View style={styles.ProfileContainer}>

      <TouchableOpacity
        style={{width:'80%', height:40}}
        onPress={()=>{
          props.navigation.navigate('SearchScreen')
        }}>
        <Image
          resizeMode={'contain'}
          style={{ width: "100%", height: "100%", marginTop: 20 }}
          source={require('../../assets/logo.png')}>
        </Image>
      </TouchableOpacity>
        
        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <Icon name="times" size={26} color="#96999c" />
        </TouchableOpacity>
      </View>

      <DrawerContentScrollView>
        <View forceInset={{ top: 'always', horizontal: 'never' }}>
          {openSubSubPage ?
            <ScrollView style={{ top: 0, margin: 0, backgroundColor: "#fff" }}>
              <View>
                <TouchableOpacity
                  onPress={() => { setSubSubPage(false) }}
                  style={styles.SideBarTopBackIcon}>
                  <Icon name="chevron-left" size={20} color="#222" />
                  {Global.Language === 1 ?
                  <Text style={styles.SideBarBackText}>Geri</Text>
                  :
                  <Text style={styles.SideBarBackText}>Back</Text>
                  }
                  
                </TouchableOpacity>

              </View>
              {subSubPageTitle.filter((x) => x.PAGE_EN).map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.SideBarMenuContainer}
                  onPress={() => {
                    switch (item.PAGE_EN) {
                      case 'Standard Thoroughbred Analysis':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "StandardThoroughbred",
                            EffectiveNick_Name: "Thoroughbred"
                          })
                        break;
                      case 'Advanced Thoroughbred Analysis':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "AdvancedThoroughbred",
                            EffectiveNick_Name: "Thoroughbred"
                          })
                        break;
                      case 'Professional Thoroughbred Analysis':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "ProfessionalThoroughbred",
                            EffectiveNick_Name: "Thoroughbred"
                          })
                        break;
                      case 'Standard Mare Analysis':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "StandardMare",
                            EffectiveNick_Name: "Mare"
                          })
                        break;
                      case 'Advanced Mare Analysis':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "AdvancedMare",
                            EffectiveNick_Name: "Mare"
                          })
                        break;
                      case 'Professional Mare Analysis':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "ProfessionalMare",
                            EffectiveNick_Name: "Mare"
                          })
                        break;
                      case 'Standart Stallion Registration':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "StandartStallion",
                            EffectiveNick_Name: "Stallion"
                          })
                        break;
                      case 'Advanced Stallion Registration':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "AdvancedStallion",
                            EffectiveNick_Name: "Stallion"
                          })
                        break;
                      case 'Professional Stallion Registration':
                        props.navigation.navigate('StandardThoroughbredAnalysis',
                          {
                            EffectiveNick_Code: "ProfessionalStallion",
                            EffectiveNick_Name: "Stallion"
                          })
                        break;
                      default:
                        props.navigation.navigate('MainStack')
                    }
                  }}>
                    {Global.Language === 1 ?
                     <Text style={styles.SideBarMenuText}>{item.PAGE_TR}</Text>
                    :
                    <Text style={styles.SideBarMenuText}>{item.PAGE_EN}</Text>
                    }
                 
                  <Icon name="angle-right" size={16} color="#7b7373" style={styles.SideBarMenuIcon} />
                </TouchableOpacity>

              ))}
            </ScrollView>
            : openSubPage ?
              <ScrollView style={{ top: 0, margin: 0, backgroundColor: "#fff" }}>
                <View>
                  <TouchableOpacity
                    onPress={() => { setSubPage(false) }}
                    style={styles.SideBarTopBackIcon}>
                    <Icon name="chevron-left" size={20} color="#222" />
                    {Global.Language === 1 ?
                  <Text style={styles.SideBarBackText}>Geri</Text>
                  :
                  <Text style={styles.SideBarBackText}>Back</Text>
                  }
                  </TouchableOpacity>

                </View>
                {subPageTitle.filter((x) => x.PAGE_EN).map((item, j) => (
                  <TouchableOpacity
                    key={j}
                    style={styles.SideBarMenuContainer}
                    onPress={() => {
                      if (item.SUB_PAGE.length > 0) {
                        setSubSubPage(true)
                        setSubSubPageTitle(item.SUB_PAGE)
                      }

                      else {
                        switch (item.PAGE_EN) {
                          case 'Add A Horse':
                            props.navigation.navigate('AddAHorse')
                            break;
                          case 'My Adding Request':
                            props.navigation.navigate('MyAddingRequestScreen')
                            break;
                          case 'My Edit Requests':
                            props.navigation.navigate('EditRequest')
                            break;
                          case 'Delete A Horse':
                            props.navigation.navigate('DeleteAHorse')
                            break;
                          case 'My Delete Requests':
                            props.navigation.navigate('MyDeleteRequest')
                            break;
                          case 'Edit A Horse':
                            props.navigation.navigate('RequestsEditAHorse')
                            break;
                          case 'My Orders':
                            props.navigation.navigate('MyOrder')
                            break;
                          case 'Races':
                            props.navigation.navigate('Races')
                            break;
                          case 'Compare Horses':
                            props.navigation.navigate('CompareHorse')
                            break;
                          case 'Create Match Report':
                            props.navigation.navigate('EffectiveNickScreen');
                            break;
                          case 'Search':
                            props.navigation.navigate('ThoroughhbredsSearch');
                            break;
                          case 'Stallions':
                            props.navigation.navigate('ThoroughbredStallionsSearch');
                            break;
                          case 'Ads':
                            props.navigation.navigate('ThoroughbredStallionsSearch');
                            break;
                          case 'PedigreePlan':
                            props.navigation.navigate('ManagementPedigreePlan');
                            break;
                          case 'Members':
                            props.navigation.navigate('ManagementMember');
                            break;
                          case 'Add Requests':
                            props.navigation.navigate('ManagementAddRequest');
                            break;
                          case 'Edit Requests':
                            props.navigation.navigate('ManagementEditRequest');
                            break;
                          case 'Delete Requests':
                            props.navigation.navigate('ManagementDeleteRequest');
                            break;
                          case 'Blog':
                            props.navigation.navigate('ManagementBlog');
                            break;
                          case 'Stallion | Mare Statistics':
                            props.navigation.navigate('ManagementStallionsMareStatistics');
                            break;
                          case 'Stallion Ads':
                            props.navigation.navigate('ManagementStallionAds');
                            break;
                          case 'Report':
                            props.navigation.navigate('ManagementReport');
                            break;
                          case 'Orders':
                            props.navigation.navigate('ThoroughbredStallionsSearch');
                            break;
                          case 'Hypo Mating':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "HypoMatingScreen",
                            });
                            Global.BreedingContentScreenName = "Hypo Mating"
                            break;
                          case 'Siblings (Mare)':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TableReportScreen",
                            });
                            Global.BreedingContentScreenName = "Siblings (Mare)"
                            break;
                          case 'Siblings (Sire)':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TableReportScreen",
                            });
                            Global.BreedingContentScreenName = "Siblings (Sire)"
                            break;
                          case 'Tail Female':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TableReportScreen",
                            });
                            Global.BreedingContentScreenName = "Tail Female"
                            break;
                          case 'Progeny':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TableReportScreen",
                            });
                            Global.BreedingContentScreenName = "Progeny"
                            break;
                          case 'Profile':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TableReportScreen",
                            });
                            Global.BreedingContentScreenName = "Profile"
                            break;
                          case 'Linebreeding':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TreeViewScreen",
                            });
                            Global.BreedingContentScreenName = "Linebreeding"
                            break;
                          case 'Female Family':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TreeViewScreen",
                            });
                            Global.BreedingContentScreenName = "Female Family"
                            break;
                          case 'Foals  As Brood Mare Sire':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TableReportScreen",
                            });
                            Global.BreedingContentScreenName = "Foals  As Brood Mare Sire"
                            break;
                          case 'Siblings (Broodmare Sire)':
                            props.navigation.navigate('Breeders', {
                              ScreenName: "TableReportScreen",
                            });
                            Global.BreedingContentScreenName = "Siblings (Broodmare Sire)"
                            break;
                          default:
                            props.navigation.navigate('MainStack')

                        }
                      }
                    }}>
                      {Global.Language === 1 ?
                      <Text style={styles.SideBarMenuText}>{item.PAGE_TR}</Text>
                      :
                      <Text style={styles.SideBarMenuText}>{item.PAGE_EN}</Text>
                      }
                    
                    <Icon name="angle-right" size={16} color="#7b7373" style={styles.SideBarMenuIcon} />
                  </TouchableOpacity>


                ))}
              </ScrollView>
              :
              <View>
                {userData ? (
                  <ScrollView style={{ top: 0, margin: 0, backgroundColor: "#fff" }}>
                    {userData.filter((x) => x.PAGE_EN).map((item, z) => (
                      <TouchableOpacity
                        key={z}
                        style={styles.SideBarMenuContainer}
                        onPress={() => {
                          if (item.SUB_PAGE.length > 0) {
                            setSubPage(true)
                            setSubPageTitle(item.SUB_PAGE)
                          }
                        }}>
                          {Global.Language === 1 ?
                          <Text style={styles.SideBarMenuText}>{item.PAGE_TR}</Text>
                          :
                          <Text style={styles.SideBarMenuText}>{item.PAGE_EN}</Text>
                          }
                        
                        <Icon name="angle-right" size={16} color="#7b7373" style={styles.SideBarMenuIcon} />
                      </TouchableOpacity>

                    ))}
                    <TouchableOpacity
                      style={styles.SideBarMenuContainer}
                      onPress={() => {
                        props.navigation.navigate('Blog')
                      }}>
                      <Text style={styles.SideBarMenuText}>Blog</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.SideBarMenuContainer}
                      onPress={() => {
                        props.navigation.navigate('Contact')
                      }}>
                        {Global.Language === 1?
                        <Text style={styles.SideBarMenuText}>İletişim</Text>
                        :
                        <Text style={styles.SideBarMenuText}>Contact</Text>
                        }
                      
                    </TouchableOpacity>

                  </ScrollView>) : null}
              </View>

          }


          {Global.IsLogin ?

            <View style={styles.UserContainer}>
              <TouchableOpacity
                style={[styles.MyButton, { backgroundColor: "#e54f4f" }]}
                onPress={() => {
                  props.navigation.navigate('LoginScreen');
                  removeData();
                  setUser(null)
                  readData();
                  Global.IsLogin = false
                }}>
                  {Global.Language === 1?
                  <Text style={[styles.MyButtonText, { color: "#fff" }]}>Çıkış</Text>
                  :
                  <Text style={[styles.MyButtonText, { color: "#fff" }]}>Logout</Text>
                  }
                
              </TouchableOpacity>
            </View>

            : <View
              id="vvlogin"
              style={styles.UserContainer}>
              <View style={{ width: '100%' }}>
                <TouchableOpacity
                  style={styles.MyButton}
                  onPress={() => {
                    props.navigation.navigate('LoginScreen');
                  }}>
                    {Global.Language === 1?
                    <Text style={styles.MyButtonText}>Giriş Yap</Text>
                    :
                    <Text style={styles.MyButtonText}>Login</Text>
                    }
                  
                </TouchableOpacity>
              </View>

              <View style={{ width: '100%', }}>
                <TouchableOpacity
                  style={styles.MyButton}
                  onPress={() => {
                    props.navigation.navigate("Register", {
                      headerTitle: "abc",
                      countryID: 0,
                      countryCode: "",
                      countryName: "Select a country",
                      countryIcon: "flag",
                    });
                  }}>
                     {Global.Language === 1?
                    <Text style={styles.MyButtonText}>Üye Ol</Text>
                    :
                    <Text style={styles.MyButtonText}>Register</Text>
                    }
                  
                </TouchableOpacity>
              </View>
            </View>

          }



          <View style={styles.SocialIconContainer}>
            <TouchableOpacity
              onPress={() => { Linking.openURL('https://www.facebook.com/pedigreeallcom'); }}
              style={styles.SocialMediaItems}>
              <Icon name="facebook" size={32} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { Linking.openURL('https://twitter.com/pedigreeall'); }}
              style={styles.SocialMediaItems}>
              <Icon name="twitter" size={32} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { Linking.openURL('https://www.instagram.com/pedigreeallcom/'); }}
              style={styles.SocialMediaItems}>
              <Icon name="instagram" size={32} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { Linking.openURL('https://www.linkedin.com/company/pedigreeall'); }}
              style={styles.SocialMediaItems}>
              <Icon name="linkedin" size={32} color="#222" />
            </TouchableOpacity>
          </View>

        </View>
      </DrawerContentScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  SocialIconContainer: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: "row",
    marginVertical: 8,
  },
  SideBarBottomElement: {
    height: '100%',
    marginBottom: 0
  },
  UserContainer: {
    marginVertical: 20,
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
  ProfileContainer: {
    width: '100%',
    marginTop: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Exit: {
    backgroundColor: '#fff',
    padding: 10,
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
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: 'white',
    paddingBottom: 15,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    marginLeft: 10,
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
  ListView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ListViewItem: {
    flexDirection: 'row',
  },
  ListViewItemIcon: {
    justifyContent: 'center',
    paddingTop: 13
  },
  AuthenticationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Authentication: {
    justifyContent: 'center',
    marginRight: 5,
    padding: 5,
    borderRadius: 6,
    backgroundColor: '#2e3f6e'
  },
  SocialMediaItems: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: '#e0e1e2'
  },
  SideBarMenuContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#eaeaea',
    padding: 15
  },
  SideBarMenuText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500'
  },
  SideBarMenuIcon: {
    marginRight: 10
  },
  MyButton: {
    backgroundColor: 'rgb(232, 237, 241)',
    borderRadius: 6,
    margin: 10,
    padding: 10
  },
  MyButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#352c2a'
  }

});

