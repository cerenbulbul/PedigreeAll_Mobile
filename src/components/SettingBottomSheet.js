import React, {useState, useRef} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Switch,RefreshControl } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import Flag from "react-native-flags";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Global } from '../Global';
import { ScrollView } from 'react-native-gesture-handler';

export function SettingBottomSheet(props,refRBSheet) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(500).then(() => setRefreshing(false));
    }, []);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //const refRBSheet = useRef();
    return (
        <RBSheet
        ref={props.refRBSheet}
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
          onPress={()=>{props.refRBSheet.current.close()}}
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
                  Global.Language=2;
                }}
                style={{marginRight:5}}>
                <Flag code='US' size={24} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>{
                  Global.Language=1;
                }}
                style={{marginRight:5}} >
                <Flag code='TR' size={24} />
              </TouchableOpacity>
            </View>

          </View>
          
        </ScrollView>
      </RBSheet>
    )
}

const styles = StyleSheet.create({
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
})