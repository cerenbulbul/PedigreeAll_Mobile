import React, { useRef,useState }  from 'react'
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    useWindowDimensions,
    TouchableOpacity,
    Switch
 } from 'react-native'
 import Icon from "react-native-vector-icons/FontAwesome5";
 import Flag from "react-native-flags";
 import RBSheet from "react-native-raw-bottom-sheet";
 import Title from  '../components/Title'
import { Dimensions } from 'react-native';
import {SettingBottomSheet} from '../components/SettingBottomSheet'

//const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');


export function ReportScreen({navigation}) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();
    const refRBSheet = useRef();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [images, setimages] = useState([
        {
          key:0,
          title: "Standard Thoroughbred Analysis",
          src: 'https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
          text: "Standard Thoroughbred Analysis Report (by The PedigreeA",
          },
        {
          key:1,
          title: "Horse 2",
          src: 'https://images.unsplash.com/flagged/photo-1557296126-ae91316e5746?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
          text: "deneme2",
          },
        {
          key:2,
          title: "Horse 3",
          src: 'https://images.unsplash.com/photo-1593179449458-e0d43d512551?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=630&q=80', 
          text: "deneme3",
          },
        {
          key:3,
          title: "Horse 4",
          src: 'https://images.unsplash.com/flagged/photo-1557296126-ae91316e5746?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
          text: "deneme4",
          },
        {
          key:4,
          title: "Horse 5",
          src: 'https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
          text: "deneme5",
          }
      ]);

      React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight:20}}
              onPress={()=>{
                refRBSheet.current.open()
              }}>
                <Icon  name="cogs" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        });
      }, [navigation]);

    return (
      <View style={styles.scrollContainer}>
        <SettingBottomSheet refRBSheet={refRBSheet}></SettingBottomSheet>
      <Title text = "Report"/>

      <View>

      <ScrollView
                horizontal={true}
                style={styles.scrollViewStyle}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    {
                    nativeEvent: {
                        contentOffset: {
                        x: scrollX
                        }
                    }
                    }
                ],{useNativeDriver: false}
                )}
                scrollEventThrottle={1}
                >
                {images.map((image) => {
                    return (
                      <View key = {image.key}>
                      <View
                          style={{ width: windowWidth, height: 250 }}>
                          <ImageBackground source={{ uri: image.src }} style={styles.card}>
                          </ImageBackground>
                      </View>
                        <View style={styles.textContainer}>
                        <Text style={styles.infoTitle}>
                          {image.title}
                          </Text>
                          <Text 
                            style={styles.infoText}>
                           {image.text}
                          </Text>
                        </View>
                      </View>
                    );
                })}
                </ScrollView>
                <View style={styles.indicatorContainer}>
                {images.map((image, imageIndex) => {
                    const width = scrollX.interpolate({
                    inputRange: [
                        windowWidth * (imageIndex - 1),
                        windowWidth * imageIndex,
                        windowWidth * (imageIndex + 1)
                    ],
                    outputRange: [8, 16, 8],
                    extrapolate: "clamp"
                    });
                    return (
                    <Animated.View
                        style={[styles.normalDot, { width }]}
                    />
                    );
                })}
                </View>
      </View>

      <View style={styles.createReportContainer}>
      <TouchableOpacity style = {styles.createReportButtonStyle}>
        <Text style={styles.createReportTextStyle}>Create Report</Text>
      </TouchableOpacity>
      </View>
                
            </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer:{
        backgroundColor:'#fff',
        width:'100%',
        height:'100%'
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        resizeMode:'cover'
      },
      textContainer: {
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 5,
        padding:10
      },
      infoTitle: {
        width:'100%',
        color: "black",
        fontSize: 18,
        fontWeight:'500'
      },
      infoText: {
        marginVertical:8,
        width: Dimensions.get('screen').width-50,
        color: "black",
        fontSize: 16,
        fontWeight:'normal'
      },
      normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
      },
      indicatorContainer: {
        marginVertical:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
      },
      createReportContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
      },
      createReportButtonStyle:{
          alignItems: 'center',
          justifyContent: 'center',
          padding:15,
          borderRadius:8,
          backgroundColor:'#2169ab',
          marginVertical:20
      },
      createReportTextStyle:{
        color:'white'
      }
})