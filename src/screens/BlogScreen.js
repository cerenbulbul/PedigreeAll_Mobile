import React, { useCallback, useState} from 'react'
import { View,StyleSheet,Text, Image, Dimensions,Switch,TouchableOpacity } from 'react-native'
import { Card,Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { SwipeablePanel } from "rn-swipeable-panel";
import { ScrollView } from 'react-native-gesture-handler';


export function BlogScreen({navigation}) {

        const [textShown, setTextShown] = useState(false); //To show ur remaining Text
        const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
        const toggleNumberOfLines = () => { //To toggle the show text or hide it
            setTextShown(!textShown);
        }
    
    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
    },[]);

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
        <View style={styles.Container}>

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

        <Text style={styles.Title}>Blog</Text>

        <ScrollView>

                <Card>

                <Card.Title>Safkan Yarış Atı Genetik Analiz ve Raporlama Portalı</Card.Title>
            <Card.Divider/>
            <Card.Image 
                source={{uri:'https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'}} />
            <Text 
                style={{marginBottom: 10,marginTop:10}}
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 4}>
            PedigreeAll.com | Safkan Yarış Atı Genetik Analiz ve Raporlama Portalı uzun zamandır üzerinde çalıştığımız bir ar-ge projesi olup artık siz değerli atçılık sevdalılarının kullanımına açılmıştır. Henüz çalışmalarımız tamamlanmamıştır, raporlar ve veri girişlerimiz devam etmektedir. 29.03.2021 tarihinde ilk sürüm tamamlanmış olacaktır. Bu süreçte olumlu/olumusuz bütün öneri ve isteklerinizi info@pedigreeall.com adresinden bizlere ulaştırmanızı rica ederiz.
            

            </Text>

            <Card.Divider/>
            
            <View style={styles.ButtonContainer}>
            <View >

                    <View style={styles.IconsContainer}>
                        <Icon name="calendar" size={15} color="#000" />
                        <Text style={styles.IconText}> 3 Aralık 2020 Perşembe</Text>
                    </View>
                    
                    <View style={styles.IconsContainer}>
                        <Icon name="eye" size={15} color="#000" />
                        <Text style={styles.IconText}>92</Text>
                    </View>
                    
                    <View style={styles.IconsContainer}>
                        <Icon name="tags" size={15} color="#000" />
                        <Text style={styles.IconText}>PedigreeAll.com</Text>
                    </View>
                    
                </View>

                <View>
                <TouchableOpacity 
                    style={styles.ReadMoreButton}>
                     {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={styles.ButtonText}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
              }
                </TouchableOpacity>

                </View>
            </View>

                </Card>

        </ScrollView>
                

            

        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    },
    Title:{
        fontSize:24,
        fontWeight:'500',
        textAlign:'center',
        marginVertical:30,
        textTransform:'uppercase'
    },
    ButtonContainer:{
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        flexDirection:'row'
    },
    ReadMoreButton:{
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        borderRadius:8,
        backgroundColor:'#2e3f6e',
        marginVertical:20
    },
    ButtonText:{
        color:'white',
    },
    IconsContainer:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    IconText:{
        paddingLeft:5
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


