import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View , Button,TouchableOpacity,Switch} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Flag from "react-native-flags";

import { useAuth } from './src/hooks/useAuth';
import { SplashScreen } from './src/screens/SplashScreen';
import { AuthContext } from "./src/context/AuthContext";
import { MainScreen } from "./src/screens/MainScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { RegistrationScreen } from "./src/screens//RegistrationScreen";
import { ForgotPassword } from "./src/screens/ForgotPassword";
import { Country } from "./src/screens/Country"
import {ContactScreen} from "./src/screens/ContactScreen"
import {BlogScreen} from "./src/screens/BlogScreen"
import {AddAHorse} from "./src/screens/AddAHorse"
import CustomDrawerContent from "./src/CustomContent/CustomDrawerContent";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AuthStackNavigator } from './src/navigation/AuthStackNavigator';
import { ReportScreen } from './src/screens/ReportScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import {SearchScreen} from './src/screens/SearchScreen';

const Drawer = createDrawerNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MainStack = createStackNavigator();
const ContactStack = createStackNavigator();
const BlogStack = createStackNavigator();
const AddAHorseStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const ForgotPasswordStack = createStackNavigator();
const CountryStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const BASE_URL = 'http://api.pedigreeall.com/';

export default function App() {

  const [isEnglish, setEnglish] = React.useState(true);
  const [EnglishTransparant, setEnglishTransparant] = React.useState('1');
  const [TurkishTransparant, setTurkishTransparant] = React.useState('0.2');
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }


  const TabScreen =() => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={{
          backgroundColor:'#2e3f6e'
        }}
        options={{
          keyboardHidesTabBar: false,
        }}
      >
        <Tab.Screen
          name="Main"
          component={AuthStackScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon  name="home" size={18} color={color} />
            )}}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon  name="user" size={18} color={color} />
            )}}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon  name="search" size={18} color={color} />
            )}}
        />
      </Tab.Navigator>
    );
  }

  const ProfileAuthStack = createStackNavigator();
  const ProfileStackScreen = () =>(
    <ProfileAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
      headerShown: true,}}>

        <ProfileAuthStack.Screen
        name={"Profile"} 
        component={ProfileScreen}
        
        options={({navigation}) => ({
          headerTitle:"PedigreeAll",
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize:24
          },
          headerLeft: () => (
            <TouchableOpacity 
              style={{marginLeft:20}}
              onPress={()=>{
                navigation.openDrawer()
              }}>
                <Icon  name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          
        })}
        />
    </ProfileAuthStack.Navigator>
  );


  const SearchAuthStack = createStackNavigator();
  const SearchStackScreen = () =>(
    <SearchAuthStack.Navigator
      mode={"modal"}
      screenOptions={{
      headerShown: true,}}>

        <SearchAuthStack.Screen
        name={"Search"} 
        component={SearchScreen}
        
        options={({navigation}) => ({
          headerTitle:"PedigreeAll",
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize:24
          },
          headerLeft: () => (
            <TouchableOpacity 
              style={{marginLeft:20}}
              onPress={()=>{
                navigation.openDrawer()
              }}>
                <Icon  name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          
        })}
        />
    </SearchAuthStack.Navigator>
  );

  const DrawerScreen = () => (
    <Drawer.Navigator 
            drawerContent ={props => <CustomDrawerContent {...props}/>}
            initialRouteName="Main"
            drawerStyle = {styles.SideNavigationContainer}
            drawerContentOptions={{
              activeTintColor: '#2e3f6e',
              itemStyle: { 
                marginVertical: 10 },
              }}
              drawerType="front"
            >
        
        <Drawer.Screen 
            name="Tab"
            component={TabScreen}
             />

          <Drawer.Screen 
            name="Auth"
            component={AuthStackScreen}
             />
             
        </Drawer.Navigator>
  );
  
  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator
        mode={"modal"}
        screenOptions={{
          headerShown: false,}}>
  
      <AuthStack.Screen name={"Main"}>
          {() => (
            <MainStack.Navigator
              mode={"card"}
              screenOptions={{
                headerShown: true,
              }}>
              <MainStack.Screen 
                name={"Main"} 
                component={MainScreen}
                
                options={({navigation}) => ({
                  headerTitle:"PedigreeAll",
                  headerStyle: {
                    backgroundColor: '#2e3f6e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: '500',
                    fontSize:24
                  },
                  headerLeft: () => (
                    <TouchableOpacity 
                      style={{marginLeft:20}}
                      onPress={()=>{
                        navigation.openDrawer()
                      }}>
                        <Icon  name="bars" size={24} color="#fff" />
                    </TouchableOpacity>
                  ),
                  
                })} />
            </MainStack.Navigator>
          )}
        </AuthStack.Screen>
  
  
        <AuthStack.Screen name={"Login"}>
          {() => (
            <LoginStack.Navigator
              mode={"card"}
              screenOptions={{
                headerShown: true,
              }}>
              <LoginStack.Screen name={"Login"} component={LoginScreen} />
            </LoginStack.Navigator>
          )}
        </AuthStack.Screen>
        <AuthStack.Screen name={"ForgotPassword"}>
          {() => (
            <ForgotPasswordStack.Navigator
              mode={"card"}
              screenOptions={{
                gestureEnabled: false,
              }}>
              <ForgotPasswordStack.Screen
                name={"Reset your password"}
                component={ForgotPassword}
              />
            </ForgotPasswordStack.Navigator>
          )}
        </AuthStack.Screen>
  
        <AuthStack.Screen name={"Countries"}>
          {() => (
            <CountryStack.Navigator
              mode={"card"}
              screenOptions={{
                gestureEnabled: false,
              }} >
              <CountryStack.Screen name={"Countries"} component={Country} />
            </CountryStack.Navigator>
          )}
        </AuthStack.Screen>
  
        <RegisterStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{
            headerTitle: "Register",
            headerShown: true,
          }}
        />
  
  <ContactStack.Screen 
        name={"Contact"} 
        component={ContactScreen}
        options={({navigation}) => ({
          headerTitle:"PedigreeAll",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2e3f6e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize:24
          },
          headerLeft: () => (
            <TouchableOpacity 
              style={{marginLeft:20}}
              onPress={()=>{
                navigation.openDrawer()
              }}>
                <Icon  name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}/>
    <BlogStack.Screen 
      name={"Blog"} 
      component={BlogScreen}
      options={({navigation}) => ({
        headerTitle:"PedigreeAll",
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2e3f6e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize:24
        },
        headerLeft: () => (
          <TouchableOpacity 
            style={{marginLeft:20}}
            onPress={()=>{
              navigation.openDrawer()
            }}>
              <Icon  name="bars" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      })} />

  <AddAHorseStack.Screen 
      name={"AddAHorse"} 
      component={AddAHorse}
      options={({navigation}) => ({
        headerTitle:"PedigreeAll",
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2e3f6e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize:24
        },
        headerLeft: () => (
          <TouchableOpacity 
            style={{marginLeft:20}}
            onPress={()=>{
              navigation.openDrawer()
            }}>
              <Icon  name="bars" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      })} />
  
      </AuthStack.Navigator>
  );
  
  const RootStack = createStackNavigator();
  const RootStackScreen = () => (
    <RootStack.Navigator 
      headerMode="none"
      gestureDirection= 'horizontal-inverted'>
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
        <RootStackScreen/>
      </NavigationContainer>
    </AuthContext.Provider>

    
  );

  
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent:'center'
  },
  Button: {
    marginTop:100,
    padding: 10,
    backgroundColor: "blue",
    borderRadius:8
  },
 
 
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