import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from './src/hooks/useAuth';
import { SplashScreen } from './src/screens/SplashScreen';
import { AuthContext } from "./src/context/AuthContext";
import { MainScreen } from "./src/screens/MainScreen";
import { ForgotPassword } from "./src/screens/ForgotPassword";
import CustomDrawerContent from "./src/CustomContent/CustomDrawerContent";
import Icon from "react-native-vector-icons/FontAwesome5";

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
export const BASE_URL = 'http://api.pedigreeall.com/';



export default function App() {

  const {state} = useAuth();
  const auth = React.useMemo(() => ({
    login:(email,password) => {
      console.log('login',email,password);
    },
    logout:() => {
      console.log('logout');
    },
    
  }),
   [],

  )

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
   
  }


  return (
    <AuthContext.Provider value={auth}>

  <NavigationContainer>
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
          name="Main"
          component={MainScreen}
          options={{
            drawerIcon: () => <Icon name="home" size={16} color="#5f6368" />
          }}
           />
        <Drawer.Screen 
          name="My Requests" 
          children={ForgotPassword}
          options={{
            drawerIcon: () => <Icon name="home" size={16} color="#5f6368" />
          }}  />
        <Drawer.Screen 
          name="Analysis For Breeder" 
          component={MainScreen}
          options={{
            drawerIcon: () => <Icon name="home" size={16} color="#5f6368" />
          }} />
        <Drawer.Screen 
          name="Reports" 
          component={MainScreen}
          options={{
            drawerIcon: () => <Icon name="home" size={16} color="#5f6368" />
          }} />
        <Drawer.Screen 
          name="Blog" 
          component={MainScreen}
          options={{
            drawerIcon: () => <Icon name="home" size={16} color="#5f6368" />
          }} />
        <Drawer.Screen 
          name="Contact" 
          component={MainScreen}
          options={{
            drawerIcon: () => <Icon name="home" size={16} color="#5f6368" />
          }} />
        
      </Drawer.Navigator>
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
  SideNavigationContainer:{
    borderTopRightRadius:8,
    borderBottomRightRadius:8

  },
});
