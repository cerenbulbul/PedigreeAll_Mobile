
import { createDrawerNavigator } from '@react-navigation/drawer';

import { LoginScreen } from "../screens/LoginScreen";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import { MainScreen } from "../screens/MainScreen";

const Drawer= createDrawerNavigator();

export function AuthDrawerNavigator(){


  return(
    <Drawer.Navigator 
          initialRouteName="Main"
          headerShown= {true}
          headerTitleAlign = "center"
          headerTitle = "PedigreeAll"
          drawerStyle = {styles.SideNavigationContainer}
          drawerContentOptions={{
            activeTintColor: '#2e3f6e',
            itemStyle: { 
              marginVertical: 10 },
            }}
          
          >
        <Drawer.Screen 
          name="Main"
          component={MainScreen} />
        <Drawer.Screen name="My Requests" component={MainScreen} />
        <Drawer.Screen name="Analysis For Breeder" component={MainScreen} />
        <Drawer.Screen name="Reports" component={MainScreen} />
        <Drawer.Screen name="Blog" component={MainScreen} />
        <Drawer.Screen name="Contact" component={MainScreen} />
        <Drawer.Screen name="Login" component={AuthStackNavigator} />
      </Drawer.Navigator>
  )

}