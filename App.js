import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Switch, NativeModules, Platform , Image, ScrollView, ActivityIndicator} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Flag from "react-native-flags";
import AsyncStorage from '@react-native-community/async-storage'
import RBSheet from "react-native-raw-bottom-sheet";

import { SplashScreen } from './src/screens/SplashScreen';
import { AuthContext } from "./src/context/AuthContext";
import { MainScreen } from "./src/screens/MainScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { RegistrationScreen } from "./src/screens//RegistrationScreen";
import { ForgotPassword } from "./src/screens/ForgotPassword";
import { Country } from "./src/screens/Country"
import { ContactScreen } from "./src/screens/ContactScreen"
import { BlogScreen } from "./src/screens/BlogScreen"
import { AddAHorse } from "./src/screens/AddAHorse"
import { DeleteAHorseScreen } from './src/screens/DeleteAHorseScreen'
import { MyDeleteRequestScreen } from './src/screens/MyDeleteRequestScreen'
import { RacesScreen } from './src/screens/RacesScreen'
import { CompareHorsesScreen } from './src/screens/CompareHorsesScreen'
import CustomDrawerContent from "./src/CustomContent/CustomDrawerContent";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ReportScreen } from './src/screens/ReportScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { MyAddingRequestScreen } from './src/screens/MyAddingRequestScreen';
import { MyEditRequestsScreen } from './src/screens/MyEditRequestsScreen';
import { BlogItemScreen } from './src/screens/BlogItemScreen';
import { StandardThoroughbredAnalysisScreen } from './src/screens/StandardThoroughbredAnalysisScreen';
import { HorseDetailScreen } from './src/screens/HorseDetailScreen'
import { HypotheticalSearchScreen } from './src/screens/HypotheticalSearchScreen'
import { ThoroughbredAnalysisPriceScreen } from './src/screens/ThoroughbredAnalysisPriceScreen'
import { EffectivenickSearchReportScreen } from './src/screens/EffectivenickSearchReportScreen';
import { ThoroughhbredsSearchScreen } from './src/screens/ThoroughhbredsSearchScreen'
import { ThoroughbredStallionsSearchScreen } from './src/screens/ThoroughbredStallionsSearchScreen'
import { RequestsEditAHorse } from './src/screens/RequestsEditAHorse'
import { MyOrderScreen } from './src/screens/MyOrderScreen'
import { ManagementPedigreePlanScreen } from './src/screens/ManagementPedigreePlanScreen'
import { ManagementMemberScreen } from './src/screens/ManagementMemberScreen'
import { ManagementAddRequestScreen } from './src/screens/ManagementAddRequestScreen'
import { ManagementEditRequestScreen } from './src/screens/ManagementEditRequestScreen'
import { ManagementDeleteRequestScreen } from './src/screens/ManagementDeleteRequestScreen'
import { ManagementBlogScreen } from './src/screens/ManagementBlogScreen'
import { ManagementStallionsMareStatisticsScreen } from './src/screens/ManagementStallionsMareStatisticsScreen'
import { ManagementStallionAdsScreen } from './src/screens/ManagementStallionAdsScreen'
import { ManagementReportScreen } from './src/screens/ManagementReportScreen'
import { MareAnalysisReportScreen } from './src/screens/MareAnalysisReportScreen'
import { BreedersScreen } from './src/screens/BreedersScreen'
import { BasketScreen } from './src/screens/BasketScreen'
import {StallionsSearchLinkScreen} from './src/screens/StallionsSearchLinkScreen'

import { HorseDetailSiblingMareScreen } from './src/screens/HorseDetailSiblingMareScreen'
import { HorseDetailSiblingSireScreen } from './src/screens/HorseDetailSiblingSireScreen'
import { HorseDetailTailFemaleScreen } from './src/screens/HorseDetailTailFemaleScreen'
import { HorseDetailProgencyScreen } from './src/screens/HorseDetailProgencyScreen'
import { HorseDetailSiblingBroodmareSireScreen } from './src/screens/HorseDetailSiblingBroodmareSireScreen'
import { HorseDetailPRofileScreen } from './src/screens/HorseDetailPRofileScreen'
import { HorseDetailLinebreedingScreen } from './src/screens/HorseDetailLinebreedingScreen'
import { HorseDetailScreenFemaleFamily } from './src/screens/HorseDetailScreenFemaleFamily'
import { BreedingFoalsAsBroodMareSireScreen } from './src/screens/BreedingFoalsAsBroodMareSireScreen'
import { Global } from './src/Global';

import {MainSearchScreen} from './src/screens/MainSearchScreen'
import {MainHypotheticalSearchScreen} from './src/screens/MainHypotheticalSearchScreen'
import {MainEffectiveNickSearchScreen} from './src/screens/MainEffectiveNickSearchScreen'

const Drawer = createDrawerNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ContactStack = createStackNavigator();
const BlogStack = createStackNavigator();
const BlogItemStack = createStackNavigator();
const AddAHorseStack = createStackNavigator();
const DeleteAHorseStack = createStackNavigator();
const MyDeleteRequestsStack = createStackNavigator();
const RacesStack = createStackNavigator();
const CompareHorseStack = createStackNavigator();
const StandardThoroughbredAnalysisStack = createStackNavigator();
const EffectivenickSearchReportStack = createStackNavigator();
const ThoroughbredAnalysisPriceScreenStack = createStackNavigator();
const ThoroughhbredsSearchStack = createStackNavigator();
const ThoroughbredStallionsSearchStack = createStackNavigator();
const RequestsEditAHorseStack = createStackNavigator();
const ManagementPedigreePlanStack = createStackNavigator();
const ManagementMemberStack = createStackNavigator();
const MyOrderStack = createStackNavigator();
const HorseDetailStack = createStackNavigator();
const HypotheticalSearchStack = createStackNavigator();
const ManagementAddRequestStack = createStackNavigator();
const ManagementEditRequestStack = createStackNavigator();
const ManagementDeleteRequestStack = createStackNavigator();
const ManagementBlogStack = createStackNavigator();
const ManagementStallionsMareStatisticsStack = createStackNavigator();
const ManagementStallionAdsStack = createStackNavigator();
const ManagementReportStack = createStackNavigator();
const MareAnalysisReportStack = createStackNavigator();
const HorseDetailSiblingMareStack = createStackNavigator();
const HorseDetailSiblingSireStack = createStackNavigator();
const HorseDetailTailFemaleStack = createStackNavigator();
const HorseDetailProgencyStack = createStackNavigator();
const HorseDetailSiblingBroodmareSireStack = createStackNavigator();
const HorseDetailPRofileStack = createStackNavigator();
const HorseDetailLinebreedingStack = createStackNavigator();
const HorseDetailScreenFemaleFamilyStack = createStackNavigator();
const BreedingFoalsAsBroodMareSireStack = createStackNavigator();
const StallionsSearchLinkStack = createStackNavigator();
const BreedersStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const ForgotPasswordStack = createStackNavigator();
const CountryStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



export const BASE_URL = 'http://api.pedigreeall.com/';

export default function App({navigation}) {

  const [isEnglish, setEnglish] = React.useState(true);
  const [EnglishTransparant, setEnglishTransparant] = React.useState('1');
  const [TurkishTransparant, setTurkishTransparant] = React.useState('0.2');
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = useState()
  const [searchValue, setSearchValue] = React.useState()
  const refRBSheet = useRef();

  const [getBottomNavigationMainName, setBottomNavigationMainName] = React.useState();
  const [getBottomNavigationProfileName, setBottomNavigationProfileName] = React.useState()
  const [getBottomNavigationBasketName, setBottomNavigationBasketName] = React.useState()
  const [getBottomNavigationSearchName, setBottomNavigationSearchName] = React.useState()

  const [getLanguageClicking, setLanguageClicking] = React.useState(false)

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [getLanguageLoading, setLanguageLoading] = React.useState(false);

  const [openingScreen, setOpeningScreen] =React.useState("LoginScreen");



  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('USER', data)
      setIsLoading(false)
      console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }



  const readData = async () => {
    try {
      const userKey = await AsyncStorage.getItem('USER')
      if (userKey !== null) {
        const mail = JSON.parse(userKey)[0].EMAIL
        if (mail === "info@pedigreeall.com") {
          Global.IsLogin = false;
          Global.SideNavigationData = JSON.parse(userKey)[0].PAGE_LIST;
          setOpeningScreen("LoginScreen")
        }
        else{
          Global.IsLogin = true;
          Global.SideNavigationData = JSON.parse(userKey)[0].PAGE_LIST;
          setOpeningScreen("Main")
        }
        setIsLoading(false)
      }
      else {
        setOpeningScreen("LoginScreen")
        Global.IsLogin = false
        fetch('https://api.pedigreeall.com/systemuser/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            EMAIL: 'info@pedigreeall.com',
            PASSWORD: 'Ccoft2020'
          })
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.m_cDetail.m_eProcessState > 0) {
              saveData(JSON.stringify(json.m_cData))
            }

          })
          .catch((error) => {
            console.error(error);
          })
      }
    } catch (e) {
    }
  }


  const deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : Platform.OS === 'android' && NativeModules.I18nManager.localeIdentifier


  

  React.useEffect(() => {
    //Global.getBasket();
    //console.log(deviceLanguage)
    readData();

   if (getLanguageClicking === false) {
     changeLanguage();
   }

  
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  
  const changeLanguage = () =>{
    if (deviceLanguage === "tr_TR") {
      Global.Language=1
      setBottomNavigationMainName("Arama")
      setBottomNavigationProfileName("Profil")
      setBottomNavigationBasketName("Varsayımsal Eşleşme")
      setBottomNavigationSearchName("EffectiveNick")
      
    }
    else{
      Global.Language=2
      setBottomNavigationMainName("Search")
      setBottomNavigationProfileName("Profile")
      setBottomNavigationBasketName("Hypothetical Search")
      setBottomNavigationSearchName("EffectiveNick")
      
    }
    setLanguageLoading(false)
  }


  if (isLoading) {
    return <SplashScreen />;
  }


  const TabScreen = () => {
    return (
      <>


            <Tab.Navigator
        initialRouteName="Search"
        barStyle={{
          backgroundColor: '#2e3f6e'
        }}
        options={{
          keyboardHidesTabBar: false,
        }}
      
      >

        

        <Tab.Screen
          name={getBottomNavigationMainName}
          component={AuthStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="search" size={18} color={color} />
            )
          }}
        />


        <Tab.Screen
          name= {getBottomNavigationBasketName}
          component={MainHypotheticalStackScreen}
          options={{
            //tabBarBadge: Global.TabBarBasketNotification ,
            tabBarIcon: ({ color }) => (
              <Icon name="search" size={18} color={color} />
            )
          }}
        />

        <Tab.Screen
          name={getBottomNavigationSearchName}
          component={MainEffectiveStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="search" size={18} color={color} />
            )
          }}
        />
      </Tab.Navigator>
      </>
     
    );
  }

  const ProfileAuthStack = createStackNavigator();
  const ProfileStackScreen = () => (
    <ProfileAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <ProfileAuthStack.Screen
        name={"Profile"}
        component={ProfileScreen}
      />
    </ProfileAuthStack.Navigator>
  );

  const BasketAuthStack = createStackNavigator();
  const BasketStackScreen = () => (
    <BasketAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <BasketAuthStack.Screen
        name={"Profile"}
        component={BasketScreen}
      />
    </BasketAuthStack.Navigator>
  );

  const MainHypotheticalStack = createStackNavigator();
  const MainHypotheticalStackScreen = () => (
    <MainHypotheticalStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <MainHypotheticalStack.Screen
        name={"MainHypothetical"}
        component={MainHypotheticalSearchScreen}
      />
    </MainHypotheticalStack.Navigator>
  );

  const MainEffectiveStack = createStackNavigator();
  const MainEffectiveStackScreen = () => (
    <MainEffectiveStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <MainEffectiveStack.Screen
        name={"MainEffectiveNickSearch"}
        component={MainEffectiveNickSearchScreen}
      />
    </MainEffectiveStack.Navigator>
  );

  const SearchAuthStack = createStackNavigator();
  const SearchStackScreen = () => (
    <SearchAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <SearchAuthStack.Screen
        name={"Search"}
        component={SearchScreen}
      />
    </SearchAuthStack.Navigator>
  );

  const ReportAuthStack = createStackNavigator();
  const ReportStackScreen = () => (
    <ReportAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>
      <ReportAuthStack.Screen
        name={"Report"}
        component={ReportScreen}
      />
    </ReportAuthStack.Navigator>
  );

  const MainAuthStack = createStackNavigator();
  const MainStackScreen = () => (
    <MainAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <MainAuthStack.Screen
        name={"Main"}
        component={MainScreen}
      />
    </MainAuthStack.Navigator>
  );


  const EditRequestssAuthStack = createStackNavigator();
  const EditRequestsStackScreen = () => (
    <EditRequestssAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <EditRequestssAuthStack.Screen
        name={"EditRequest"}
        component={MyEditRequestsScreen}
      />
    </EditRequestssAuthStack.Navigator>
  );


  const MyAddingRequestsAuthStack = createStackNavigator();
  const MyAddingRequestsStackScreen = () => (
    <MyAddingRequestsAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <MyAddingRequestsAuthStack.Screen
        name={"MemberScreen"}
        component={MyAddingRequestScreen}

      />
    </MyAddingRequestsAuthStack.Navigator>
  );

  const LoginAuthStack = createStackNavigator();
  const LoginStackScreen = () => (
    <LoginAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: false,
      }}>

      <LoginAuthStack.Screen
        name={"LoginScreen"}
        component={LoginScreen}

        
      />
    </LoginAuthStack.Navigator>
  );

  const ForgotPasswordAuthStack = createStackNavigator();
  const ForgotPasswordStackScreen = () => (
    <ForgotPasswordAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
        headerShown: true,
      }}>

      <ForgotPasswordAuthStack.Screen
        name={"ForgotPassword"}
        component={ForgotPassword}
        options={({ navigation }) => ({
          headerTitle: "Back",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 20
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate('LoginScreen')
              }}>
              <Icon name="chevron-left" size={24} color="#000" />
            </TouchableOpacity>
          ),

        })}
      />
    </ForgotPasswordAuthStack.Navigator>
  );



  const DrawerScreen = () => (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName={openingScreen}
      drawerStyle={styles.SideNavigationContainer}
      drawerContentOptions={{
        activeTintColor: '#2e3f6e',
        itemStyle: {
          marginVertical: 10
        },
      }}
      drawerType="front"
    >

      <Drawer.Screen
        name="Tab"
        component={TabScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            
            <Image
              style={{ width: "95%", height: 30, resizeMode:"contain" }}
              source={require('./assets/logo.png')}>
            </Image>


          ),
          headerStyle: {
            backgroundColor: '#fff',

          },
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                refRBSheet.current.open()
              }}>
              <Icon name="cog" size={20} color="#000" />
            </TouchableOpacity>
          ),
        }}


      />


      <Drawer.Screen
        name="Auth"
        component={AuthStackScreen}
      />

      <Drawer.Screen
        name="LoginScreen"
        component={LoginStackScreen}
      />

      <Drawer.Screen
        name="Register"
        component={RegistrationScreen}
        options={({ navigation }) => ({
          headerTitle: "Back",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 20
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate('LoginScreen')
              }}>
              <Icon name="chevron-left" size={24} color="#000" />
            </TouchableOpacity>
          ),

        })}
      />

      <Drawer.Screen
        name={"ForgotPassword"}
        component={ForgotPasswordStackScreen}>

      </Drawer.Screen>

      <Drawer.Screen name={"Countries"}>
        {() => (
          <CountryStack.Navigator
            mode={"card"}
            screenOptions={{
              gestureEnabled: false,
            }} >
            <CountryStack.Screen 
              name={"Countries"} 
              component={Country}
              options={({ navigation }) => ({
                headerTitle: "Back",
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontSize: 20
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => {
                      navigation.navigate('LoginScreen')
                    }}>
                    <Icon name="chevron-left" size={24} color="#000" />
                  </TouchableOpacity>
                ),
      
              })} />
          </CountryStack.Navigator>
        )}
      </Drawer.Screen>


    </Drawer.Navigator>
  );


  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator
      mode={"modal"}
      initialRouteName="MainSearch"
      screenOptions={{
        headerShown: false,
      }}>
        
         <AuthStack.Screen
        name="MainSearch"
        component={MainSearchScreen}
      />
      <AuthStack.Screen
        name="MainStack"
        component={MainStackScreen}
      />
      <AuthStack.Screen
        name="Profile"
        component={ProfileStackScreen}
      />
      <AuthStack.Screen
        name="Report"
        component={ReportStackScreen}
      />
      <AuthStack.Screen
        name="EditRequest"
        component={EditRequestsStackScreen}
      />
      <AuthStack.Screen
        name="MyAddingRequestScreen"
        component={MyAddingRequestsStackScreen}
      />
      
      <ContactStack.Screen
        name={"Contact"}
        component={ContactScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />
      <BlogStack.Screen
        name={"Blog"}
        component={BlogScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />
      <BlogItemStack.Screen
        name={"BlogItem"}
        component={BlogItemScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />


      <AddAHorseStack.Screen
        name={"AddAHorse"}
        component={AddAHorse}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <DeleteAHorseStack.Screen
        name={"DeleteAHorse"}
        component={DeleteAHorseScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <MyDeleteRequestsStack.Screen
        name={"MyDeleteRequest"}
        component={MyDeleteRequestScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <RacesStack.Screen
        name={"Races"}
        component={RacesScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <CompareHorseStack.Screen
        name={"CompareHorse"}
        component={CompareHorsesScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <StandardThoroughbredAnalysisStack.Screen
        name={"StandardThoroughbredAnalysis"}
        component={StandardThoroughbredAnalysisScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <EffectivenickSearchReportStack.Screen
        name={"EffectivenickSearchReport"}
        component={EffectivenickSearchReportScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ThoroughbredAnalysisPriceScreenStack.Screen
        name={"ThoroughbredAnalysisPrice"}
        component={ThoroughbredAnalysisPriceScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ThoroughhbredsSearchStack.Screen
        name={"ThoroughhbredsSearch"}
        component={ThoroughhbredsSearchScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ThoroughbredStallionsSearchStack.Screen
        name={"ThoroughbredStallionsSearch"}
        component={ThoroughbredStallionsSearchScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <RequestsEditAHorseStack.Screen
        name={"RequestsEditAHorse"}
        component={RequestsEditAHorse}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementPedigreePlanStack.Screen
        name={"ManagementPedigreePlan"}
        component={ManagementPedigreePlanScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementMemberStack.Screen
        name={"ManagementMember"}
        component={ManagementMemberScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailStack.Screen
        name={"HorseDetail"}
        component={HorseDetailScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HypotheticalSearchStack.Screen
        name={"HypotheticalSearch"}
        component={HypotheticalSearchScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementAddRequestStack.Screen
        name={"ManagementAddRequest"}
        component={ManagementAddRequestScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementEditRequestStack.Screen
        name={"ManagementEditRequest"}
        component={ManagementEditRequestScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementDeleteRequestStack.Screen
        name={"ManagementDeleteRequest"}
        component={ManagementDeleteRequestScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementBlogStack.Screen
        name={"ManagementBlog"}
        component={ManagementBlogScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementStallionsMareStatisticsStack.Screen
        name={"ManagementStallionsMareStatistics"}
        component={ManagementStallionsMareStatisticsScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementStallionAdsStack.Screen
        name={"ManagementStallionAds"}
        component={ManagementStallionAdsScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <ManagementReportStack.Screen
        name={"ManagementReport"}
        component={ManagementReportScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <MareAnalysisReportStack.Screen
        name={"MareAnalysisReport"}
        component={MareAnalysisReportScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <BreedersStack.Screen
        name={"Breeders"}
        component={BreedersScreen}
        options={({ navigation }) => ({
          headerTitle: "deneme",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <MyOrderStack.Screen
        name={"MyOrder"}
        component={MyOrderScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailSiblingMareStack.Screen
        name={"HorseDetailSiblingMare"}
        component={HorseDetailSiblingMareScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailSiblingSireStack.Screen
        name={"HorseDetailSiblingSire"}
        component={HorseDetailSiblingSireScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailTailFemaleStack.Screen
        name={"HorseDetailTailFemale"}
        component={HorseDetailTailFemaleScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailProgencyStack.Screen
        name={"HorseDetailProgency"}
        component={HorseDetailProgencyScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailSiblingBroodmareSireStack.Screen
        name={"HorseDetailSiblingBroodmareSire"}
        component={HorseDetailSiblingBroodmareSireScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailPRofileStack.Screen
        name={"HorseDetailPRofile"}
        component={HorseDetailPRofileScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailLinebreedingStack.Screen
        name={"HorseDetailLinebreeding"}
        component={HorseDetailLinebreedingScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <HorseDetailScreenFemaleFamilyStack.Screen
        name={"HorseDetailScreenFemaleFamily"}
        component={HorseDetailScreenFemaleFamily}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

      <BreedingFoalsAsBroodMareSireStack.Screen
        name={"BreedingFoalsAsBroodMareSire"}
        component={BreedingFoalsAsBroodMareSireScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

<StallionsSearchLinkStack.Screen
        name={"StallionsSearchLink"}
        component={StallionsSearchLinkScreen}
        options={({ navigation }) => ({
          headerTitle: "PedigreeAll",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24
          },
        })} />

    </AuthStack.Navigator>
  );

  const RootStack = createStackNavigator();
  const RootStackScreen = () => (
    <RootStack.Navigator
      headerMode="none"
      gestureDirection='horizontal-inverted'>
      <RootStack.Screen
        name="Draw"
        component={DrawerScreen}
        options={{
          animationEnabled: true,
        }}
      />
    </RootStack.Navigator>
  );

  return (

    <AuthContext.Provider>
      <NavigationContainer>
        <RootStackScreen />

      {getLanguageLoading ?
        <ActivityIndicator size="small" color="#0000ff" />
      :
      null}

        <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container:{
            borderTopLeftRadius:10,
            borderTopRightRadius:10
          },
          draggableIcon: { 
            backgroundColor: "#000"
          }
        }}
      >
        <TouchableOpacity 
          onPress={()=>{refRBSheet.current.close()}}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <ScrollView 
          style={styles.SwipeablePanelContainer}>
          <View style={styles.SwipeablePanelItem}>
            {Global.Language === 1 ?
            <Text style={styles.SwipeablePanelText}>Bildirimler:</Text>
            :
            <Text style={styles.SwipeablePanelText}>Notifications:</Text>
            }
            
            <Switch
              trackColor={{ false: "#a3a3a3", true: "#2f406f" }}
              thumbColor={isEnabled ? "#fff" : "#fff"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled} 
            />
          </View>

          

          <View style={styles.SwipeablePanelItem}>
            {Global.Language === 1 ?
            <Text style={styles.SwipeablePanelText}>Diller:</Text>
            :
            <Text style={styles.SwipeablePanelText}>Languages:</Text>
            }
            
            <View style={styles.FlagContainer}>
              <TouchableOpacity 
                onPress={()=>{
                  setLanguageClicking(true)
                  Global.Language=2;
                  
                  setBottomNavigationMainName("Main")
                  setBottomNavigationProfileName("Profile")
                  setBottomNavigationBasketName("Basket")
                  setBottomNavigationSearchName("Search")
                  
                }}
                style={{marginRight:5}}>
                <Flag code='US' size={24} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>{
                  setLanguageClicking(true)
                  Global.Language=1;
                  
                  setBottomNavigationMainName("Anasayfa")
                  setBottomNavigationProfileName("Profil")
                  setBottomNavigationBasketName("Sepet")
                  setBottomNavigationSearchName("Arama")
                  
                }}
                style={{marginRight:5}} >
                <Flag code='TR' size={24} />
              </TouchableOpacity>
            </View>

          </View>
          
        </ScrollView>
      </RBSheet>
      </NavigationContainer>
    </AuthContext.Provider>


  );


}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: 'center'
  },
  Button: {
    marginTop: 100,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 8
  },
  swipeContainer: {
    width: "100%",
  },
  SwipeablePanelContainer: {
    padding: 20,
  },
  SwipeablePanelItem:{
    marginVertical:15,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  SwipeablePanelText:{
    fontSize:18,
  },
  FlagContainer:{
    flexDirection:'row',
  },
  SwipableCloseIcon:{
    width:'100%',
    flexDirection:'row-reverse',
    marginRight:-25
  }

});


/**
 Nested Navigation
   const TabScreen =() => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        headerShown= {true}
        tabBarOptions={{
          activeTintColor: '#e91e63',
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: 'powderblue',marginTop:20 },
        }}
      >
        <Tab.Screen
          name="Main"
          component={AuthStackScreen}
        />
        <Tab.Screen
          name="Password"
          component={ForgotPassword}
          options={{ tabBarLabel: 'Updates' }}
        />
      </Tab.Navigator>
    );
  }
 */



  /*
  
  <SearchBar
              placeholder="Please type name .. "
              lightTheme
              platform="ios"
              cancelButtonTitle=""
              inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
              containerStyle={{ backgroundColor: 'transparent', width: '96%' }}
              inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
              rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
              leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
              // disabled={true}
              onChangeText={setSearchValue}
              value={searchValue}
              onSubmitEditing={() => {
                navigation.navigate("Profile");
              }}
            />
  
  */