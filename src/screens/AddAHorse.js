import React, {useState} from 'react'
import { View,Text,StyleSheet,Switch,TouchableOpacity } from 'react-native'
import { Input } from "../components/Input";
import { Root, Popup,Toast } from "../components/Popup";
import { SearchBar } from "react-native-elements";
import { FilledButton } from "../components/FilledButton";
import Flag from "react-native-flags";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SwipeablePanel } from "rn-swipeable-panel";

export function AddAHorse({navigation}) {
    const [name, setName] = React.useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [sireText, setSireText] = React.useState("");
    const [mareText, setMareText] = React.useState("");
    const [date, setDate] = React.useState("");

    const [panelProps, setPanelProps] = useState({
        openLarge: false,
        onlySmall:true,
        showCloseButton: true,
        
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
      });
      const [isPanelActive, setIsPanelActive] = useState(false);
      const openPanel = () => {
        setIsPanelActive(true);
      };
      
      const closePanel = () => {
        setIsPanelActive(false);
      };
    
      const [isDetail, setIsDetail] = useState(false);
      const detailSwitch = () => setIsDetail(previousState => !previousState);
    
    
      React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight:20}}
              onPress={()=>{
                setIsPanelActive(!isPanelActive)
              }}>
                <Icon  name="cogs" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        });
      }, [navigation]);
    return (
        <View style={styles.Container}>
            <Root>
                <View style={styles.AddAHorseContainer}>
                <View style={{marginVertical:40, paddingLeft:10,paddingRight:10}}>
                    <Text style={styles.Title}>Add A Horse</Text>

                    <View style={styles.ButtonsContainer}>

                    <Input
                    style={styles.Input}
                    placeholder={"Name"}
                    name={"username"}
                    value={name}
                    onChangeText={setName}
                    />
                    
                    <SearchBar
                        lightTheme={true}
                        placeholder="Sire"
                        containerStyle={{ backgroundColor: "#fff",marginVertical:8, }}
                        inputContainerStyle={{ backgroundColor: "#fff" }}
                        value={sireText}
                        onChangeText={(e) => {
                            setSireText(e);
                        }}
                    />

                    <SearchBar
                        lightTheme={true}
                        placeholder="Mare"
                        containerStyle={{ backgroundColor: "#fff" ,marginVertical:8}}
                        inputContainerStyle={{ backgroundColor: "#fff" }}
                        value={mareText}
                        onChangeText={(e) => {
                            setMareText(e);
                        }}
                    />

                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                        <Text>Details</Text>

                        <Switch
                            style={{marginLeft:10}}
                            trackColor={{ false: "#a3a3a3", true: "#2f406f" }}
                            thumbColor={isDetail ? "#fff" : "#fff"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={detailSwitch}
                            value={isDetail}
                            />
                    </View>

                   
                   
                   {isDetail ? 
                        <View style={{marginVertical:8}}>
                            <Input
                                style={styles.Input}
                                placeholder={"01.01.2021"}
                                keyboardType={"number-pad"}
                                autoCompleteType={"cc-exp"}
                                name={"date"}
                                value={date}
                                onChangeText={setDate}
                            />
                        </View> 
                        : null}

                    <FilledButton
                    title="Add"
                    style={styles.SubmitButton}
                    onPress={async(e) =>
                    {
                        if(name === ''){
                            Popup.show({
                                type: 'Danger',
                                title: 'Name is undefined',
                                textBody: 'You have to type your name',
                                button: true,
                                buttonText: 'Ok',
                                callback: () => Popup.hide()
                            })
                        }
                       
                        else{
                            Popup.show({
                                type: 'Success',
                                title: 'Sent',
                                button: true,
                                textBody: 'Congrats! You submitted successfully.',
                                buttonText: 'Ok',
                                callback: () => Popup.hide()
                            })

                            setName('')
                        }
                    }
                    }

                    />
                    </View>
                    </View>


                </View>
            </Root>

            <SwipeablePanel
        {...panelProps}
        isActive={isPanelActive}
        style={styles.swipeContainer}>
        <View style={styles.SwipeablePanelContainer}>
          <View style={styles.SwipeablePanelItem}>
            <Text style={styles.SwipeablePanelText}>Notifications:</Text>
            <Switch
              trackColor={{ false: "#a3a3a3", true: "#2f406f" }}
              thumbColor={isEnabled ? "#fff" : "#fff"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled} 
            />
          </View>

          <View style={styles.SwipeablePanelItem}>
            <Text style={styles.SwipeablePanelText}>Languages:</Text>
            
            <View style={styles.FlagContainer}>
              <TouchableOpacity style={{marginRight:5}}>
                <Flag code='US' size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight:5}} >
                <Flag code='TR' size={24} />
              </TouchableOpacity>
            </View>

          </View>
          
        </View>
      </SwipeablePanel>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    },
    AddAHorseContainer:{
        position:"absolute",
        height: "100%",
        width: "100%",
    },
    Title:{
        fontSize:24,
        fontWeight:'500',
        textAlign:'center',
        textTransform:'uppercase'
    },
    ButtonsContainer:{
        marginVertical:20
    },
    Input:{
        width:'100%',
        padding:10,
        marginVertical:5
    },
    InputMessage:{
        marginVertical:20,
        padding:70,
    },
    SubmitButton:{
        marginVertical:15
    },
    ThankfullText:{
        textAlign:'center',
        marginVertical:5,
        fontSize:16,

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
      }
})