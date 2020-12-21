import React ,{useState} from 'react'
import { View,Text,StyleSheet , Image, Dimensions,Switch,TouchableOpacity} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Input } from "../components/Input";
import { Error } from "../components/Error";
import Icon from "react-native-vector-icons/FontAwesome5";
import { FilledButton } from "../components/FilledButton";
import { Root, Popup,Toast } from "../components/Popup";
import Flag from "react-native-flags";
import { SwipeablePanel } from "rn-swipeable-panel";



export function ContactScreen({navigation}) {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");
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
    
      const [isEnabled, setIsEnabled] = useState(false);
      const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    
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
        <Root>
        <View style={styles.Container}>
             
            

            <View style={styles.ContactContainer}>

            <View style={{marginVertical:40, paddingLeft:10,paddingRight:10}}>

            

            <Text style={styles.Title}>Contact</Text>

            <View style={styles.ButtonsContainer}>

            <Input
            style={styles.Input}
            placeholder={"Name"}
            name={"username"}
            value={name}
            onChangeText={setName}
          />

            <Input
            style={styles.Input}
            placeholder={"Email"}
            keyboardType={"email-address"}
            name={"mail"}
            value={email}
            onChangeText={setEmail}
          />

            <Input
            style={styles.Input}
            placeholder={"Phone"}
            keyboardType={"phone-pad"}
            name={"phone"}
            value={phone}
            onChangeText={setPhone}
          />


        <Input
            style={styles.InputMessage}
            placeholder={"Message"}
            name={"message"}
            value={message}
            onChangeText={setMessage}
          />

        <FilledButton
          title="Submit"
          style={styles.SubmitButton}
          onPress={async(e) =>
            {
                if(name === ''){
                    Toast.show({
                        type: 'Danger',
                        title: 'Name is undefined',
                        text: 'You have to type your name',
                        color: '#e74c3c',
                    })
                }
                else if(email === ''){
                    Toast.show({
                        type: 'Danger',
                        title: 'Email is undefined',
                        text: 'You have to type your email',
                        color: '#e74c3c',
                    })
                }
                else if(phone === ''){
                    Toast.show({
                        type: 'Danger',
                        title: 'Phone is undefined',
                        text: 'You have to type your phone',
                        color: '#e74c3c',
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
                      setEmail('')
                      setPhone('')
                      setMessage('')
                }
            }
        }
          
        />

        <Text style={styles.ThankfullText}>Thank You For Contacting Us.</Text>
            </View>
            </View>

           
            </View>
            

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

</Root>
    )
}


const styles = StyleSheet.create({
    Container:{
        bottom: 0,
        top: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
    },
    ContactContainer:{
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
  });
