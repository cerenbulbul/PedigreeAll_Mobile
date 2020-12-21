import React, { useState,useEffect,useRef } from "react";
import { StyleSheet, 
  View, 
  Text, 
  StatusBar, 
  Button , 
  TouchableOpacity,
  Platform, 
  Dimensions, 
  FlatList,
  Image,
  ScrollView,
  TextInput ,
  Alert ,
  Modal,
  LayoutAnimation,
  UIManager,
  Animated,
  Switch} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchBar } from "react-native-elements";
import { MyStatusBar } from "../components/StatusBar";
import { TopBarView } from "../View/TopBarView";
import {Card} from 'react-native-elements';
import Flag from "react-native-flags";
import { SwipeablePanel } from "rn-swipeable-panel";

import Preview from '../components/FlatList/Preview';
import FlatListSlider from '../components/FlatList/FlatListSlider';
import Indicator from '../components/FlatList/Indicator';
const Drawer = createDrawerNavigator();
const API_URL = "http://api.pedigreeall.com/";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function MainScreen({ navigation }) {

  const DATA = [
    {
      id: "1",
      title: "Generation 1",
    },
    {
      id: "2",
      title: "Generation 2",
    },
    {
      id: "3",
      title: "Generation 3",
    },
    {
      id: "4",
      title: "Generation 4",
    },
    {
      id: "5",
      title: "Generation 5",
    },
  ];
  
  const [images, setimages] = useState([
    {
      title: "Standard Thoroughbred Analysis",
      src: 'https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
      text: "Standard Thoroughbred Analysis Report (by The PedigreeA..",
      key:1},
    {
      title: "Horse 2",
      src: 'https://images.unsplash.com/flagged/photo-1557296126-ae91316e5746?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
      text: "deneme2",
      key:2},
    {
      title: "Horse 3",
      src: 'https://images.unsplash.com/photo-1593179449458-e0d43d512551?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=630&q=80', 
      text: "deneme3",
      key:3},
    {
      title: "Horse 4",
      src: 'https://images.unsplash.com/flagged/photo-1557296126-ae91316e5746?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
      text: "deneme4",
      key:4},
    {
      title: "Horse 5",
      src: 'https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
      text: "deneme5",
      key:5}
  ]);
  const [isGeneration, setIsGeneration] = React.useState(false);
  const [isSireName, setSireName] = useState(false);
  const [isMareName, setMareName] = useState(false);
  const [GenerationTitle, setGenerationTitle] = React.useState("Generation 5");
  const [isSearch, setIsSearch] = React.useState(false);
  const [isHypothetical, setHypothetical] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [expanded, setExpanded] = useState(false);

  
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
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setGenerationTitle(item.title),
          setIsGeneration(!isGeneration)}}
        
      />
    );
  };
  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.FlatListItemView}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

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


  const [reportPanel, setReportPanel] = useState({
    openLarge: true,
    fullWidth:true,
    showCloseButton: true,
    
    onClose: () => closeReport(),
    onPressCloseButton: () => closeReport(),
    // ...or any prop you want
  });
  const [isReportActive, setIsReportActive] = useState(false);
  const openReport = () => {
    setIsReportActive(true);
  };
  
  const closeReport = () => {
    setIsReportActive(false);
  };

  

  return (
    
    <View style={styles.container}>

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

      <SwipeablePanel
        {...reportPanel}
        isActive={isReportActive}
        style={styles.swipeContainer}>
          <View>
            <Text>At Title</Text>
          </View>
      </SwipeablePanel>

      <View>
        <Text style={styles.Title}>Thoroughbred Horse Pedigree</Text>
        <Text style={styles.Subtitle}>Genetic Analysis and Reporting Portal</Text>
        <View style={styles.SearchButtonContainer}>
          <TouchableOpacity
            onPress={()=>{
              setIsSearch(true) , 
              setHypothetical(false)
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setExpanded(!expanded)}} 
            style={styles.SearchButtons}>
            <Text style={styles.SearchButtonsText}>Seach</Text>
          </TouchableOpacity>
          <TouchableOpacity 
             onPress={()=>{
               setHypothetical(true) , 
               setIsSearch(false)
               LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
               setExpanded(!expanded);}} 
            style={styles.SearchButtons}>
            <Text style={styles.SearchButtonsText}>Hypothetical</Text>
          </TouchableOpacity>
        </View>
        {isSearch ? 

        <Card>
          <Card.Title>Search</Card.Title>
          
          <View style={styles.SeacrhContainer}>
           <SearchBar
          lightTheme={true}
          placeholder="Please type name"
          containerStyle={{ backgroundColor: "#fff" }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          value={searchText}
          onChangeText={(e) => {
            setSearchText(e);
          }}
        /> 
          <TouchableOpacity 
          onPress={()=>{setIsGeneration(!isGeneration)}}
          style={styles.GenerationContainer}>
            <View style={styles.GenerationView}>
              <Icon name="bars" size={16} color="#adb5bd" />
              <Text style={{marginLeft:10}}>{GenerationTitle}</Text>
            </View>
            <Icon name="caret-down" size={16} color="#adb5bd" />
          </TouchableOpacity>
          {isGeneration ?  
            <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            extraData={GenerationTitle}
          />
            :null}
        <Card.Divider/>
        <TouchableOpacity style={styles.SearchButton}>
          <Icon name="search" size={16} color="#fff" />
        </TouchableOpacity>
        </View>
        </Card>
        : null}

       {isHypothetical?
        <Card>
        <Card.Title>Hypothetical Search</Card.Title>
        
        <View style={styles.SeacrhContainer}>
         <View style={styles.HypotheticalTitlesContainer}>
           <TouchableOpacity 
            onPress={()=>{ 
            if(isMareName === true) {
              setMareName(false)
            }
              setSireName(!isSireName)
          }}
            style={styles.HypotheticalTitles}>
              <Icon name="question-circle" size={16} color="#adb5bd" />
              <Text style={styles.HypotheticalTitlesText}>Sire Name</Text>
           </TouchableOpacity>

           <TouchableOpacity
           onPress={()=> {
             if(isSireName=== true){
               setSireName(false)
             }
             setMareName(!isMareName)
            }} 
            style={styles.HypotheticalTitles}>
              <Icon name="question-circle" size={16} color="#adb5bd" />
              <Text  style={styles.HypotheticalTitlesText}>Mare Name</Text>
           </TouchableOpacity>
           
         </View>
         <Card.Divider/>
         {isSireName? 
              <SearchBar
                lightTheme={true}
                placeholder="Sire Name"
                containerStyle={{ backgroundColor: "#fff" }}
                inputContainerStyle={{ backgroundColor: "#fff" }}
                value={searchText}
                onChangeText={(e) => {
                  setSearchText(e);
                }}
              /> 
          :null}

          {isMareName? 
              <SearchBar
                lightTheme={true}
                placeholder="Mare Name"
                containerStyle={{ backgroundColor: "#fff" }}
                inputContainerStyle={{ backgroundColor: "#fff" }}
                value={searchText}
                onChangeText={(e) => {
                  setSearchText(e);
                }}
              /> 
          :null}
        <TouchableOpacity 
        onPress={()=>{setIsGeneration(!isGeneration)}}
        style={styles.GenerationContainer}>
          <View style={styles.GenerationView}>
            <Icon name="bars" size={16} color="#adb5bd" />
            <Text style={{marginLeft:10}}>{GenerationTitle}</Text>
          </View>
          <Icon name="caret-down" size={16} color="#adb5bd" />
        </TouchableOpacity>
        {isGeneration ?  
          <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          extraData={GenerationTitle}
        />
          :null}
      <Card.Divider/>
      <TouchableOpacity style={styles.SearchButton}>
        <Icon name="search" size={16} color="#fff" />
      </TouchableOpacity>
      </View>
      </Card>
      :null}

        
        
        </View>

        
        

    </View>
  );

  
}




const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  Title:{
    paddingTop:40,
    fontSize:24,
    fontWeight:'bold',
    textTransform:'uppercase',
    textAlign:'center',
    textDecorationLine:'underline'
  },
  Subtitle:{
    paddingTop:20,
    fontSize:18,
    fontWeight:'200',
    textAlign:'center'
  },
  LatestViewItem:{
    width:'100%',
    flex:1,
    flexDirection:'row',
  },
  LatestCardTitle:{
    marginLeft:5,
    fontWeight:'500',
    fontSize:18
  },
  LatestCardItemTitle:{
    fontSize:14,
    fontWeight:'500'
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
  SearchButtonContainer:{
    marginTop:20,
    padding:10,
    flexDirection:'row',
    width:'100%'
  },
  SearchButtons:{
    backgroundColor:"#fff",
    width:'50%',
    padding:15,
    borderWidth:0.5,
    borderColor:'#2e3f6e'
  },
  SearchButtonsText:{
    textAlign:'center',
    fontSize:18,
    fontWeight:'500'
  },
  SeacrhContainer:{
    width:'100%',
    paddingBottom:10,
    padding:10
  },
  SearchButton:{
    width:'100%',
    padding:10,
    backgroundColor:'#2e3f6e',
    alignItems:'center'
  },
  GenerationContainer:{
    flexDirection:'row',
    padding:20,
    justifyContent:'space-between'
  },
  GenerationView:{
  flexDirection:'row',
  alignItems:'center'
  },
  HypotheticalTitlesContainer:{
    flexDirection:'row',
    justifyContent:'flex-start'
  },
  HypotheticalTitles:{
    flexDirection:'row',
    width:'50%',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  HypotheticalTitlesText:{
    marginLeft:10,
    fontSize:16
  },
  FlatListItemView:{
    paddingTop:15,
    borderBottomWidth:0.2
  },
});




/*

<FlatList
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            data={images}
            pagingEnabled={true}
            renderItem={ ({ item, index }) => (
              <Card containerStyle= {{borderRadius:8, shadowColor:'#000',elevation: 10, width:380}}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Image 
                style={{resizeMode:'contain'}}
                source={{uri: item.src }} />
                <Text>{item.text}</Text>

                <Indicator
                itemCount={images.length}
                currentIndex={index % images.length}
                indicatorActiveColor= '#3498db'
                indicatorInActiveColor='#bdc3c7'
                indicatorActiveWidth={6}
                />
               </Card>

                
            )}
          />

*/


/*


        <FlatListSlider
              data={images}
              imageKey={'src'}
              textKey = {'text'}
              title= {'title'}
              local={false}
              width={Dimensions.get('window').width}
              separator={100}
              autoscroll={true}
              currentIndexCallback={index => console.log('Index', index)}
              onPress={item => alert(JSON.stringify(item))}
              indicator
              animation
            />

*/



/*

     <View style={styles.NewsContainer}>
        <Text style={{textAlign:'center', fontWeight:'500',textTransform: 'uppercase'}}>Latest News</Text>


          <FlatListSlider
            data={images}
            imageKey={'src'}
            width={275}
            component={<Preview />}
            onPress={item => alert(JSON.stringify(item))}
            indicatorActiveWidth={40}
            contentContainerStyle={styles.contentStyle}
          />

      </View>

*/



/*

Seacrh 

<SearchBar
          lightTheme={true}
          placeholder="Please type name and press enter"
          containerStyle={{ backgroundColor: "#fff" }}
          inputContainerStyle={{ backgroundColor: "#fff" }}
          value={searchText}
          onChangeText={(e) => {
            setSearchText(e);
          }}
        /> 
*/




/*

Reports and last added


<ScrollView style={{marginBottom:20}}>
            
            <View>

            <Text style={styles.Title}>Reports</Text>

            <FlatListSlider
              data={images}
              imageKey={'src'}
              textKey = {'text'}
              title= {'title'}
              local={false}
              width={Dimensions.get('window').width}
              autoscroll={true}
              currentIndexCallback={index => console.log('Index', index)}
              onPress={()=> {setIsReportActive(!isReportActive)}} //item => alert(JSON.stringify(item))
              indicator
              animation
            />

           
            <View>
              <Text style={styles.Title}>Last Added</Text>
              
              <Card>
                <Card.Title>
                  <View style={{flexDirection:'row'}}>
                    <Flag code='TR' size={24} />
                    <Text style={styles.LatestCardTitle}>Serenissima (1957) (TR) (2b)</Text>
                    </View></Card.Title>
                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.LatestCardItemTitle}>Sire</Text>
                    <View style={{flexDirection:'row',marginLeft:40}}>
                      <Flag code='US' size={24} />
                      <Text>Leading Question (1947) (4k)</Text>
                    </View>
                    </View>

                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>
                </View>
                

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>Dam</Text>
                  <View style={{flexDirection:'row',marginLeft:35}}>
                    <Flag code='TR' size={24} />
                    <Text>Serenade (1953)</Text>
                  </View>
                  </View>

                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>
               

                </View>

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>BM Sire</Text>
                  <View style={{flexDirection:'row',marginLeft:15}}>
                    <Flag code='UNK' size={24} />
                    <Text>Wings of Song (1942) (14c)</Text>
                  </View>
                  </View>
                  <View>
                    <Icon name="female" size={16} color="#5f6368" />
                  </View>
                

                </View>

               

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={styles.LatestCardItemTitle}>Records</Text>
                  <View style={{flexDirection:'row',marginLeft:15}}>
                    <Text>0-0-0-0-0</Text>
                  </View>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.LatestCardItemTitle}>Sex</Text>
                    <Text style={{marginLeft:80}}>Mare</Text>
                  </View>
                </View>

                

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.LatestCardItemTitle}>Earning</Text>
                      <Text style={{marginLeft:17}}>0,00 ₺</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                      <Text style={styles.LatestCardItemTitle}>Class</Text>
                      <Text style={{marginLeft:50}} >Unknown</Text>
                      </View>
                      
                </View>

                <Card.Divider></Card.Divider>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={styles.LatestViewItem}>
                  <Text style={styles.LatestCardItemTitle}>Point</Text>
                    <Text style={{marginLeft:35}}>0</Text>
                    </View>
                  <View>
                    <TouchableOpacity style={{padding:10,backgroundColor:'#2169ab', borderRadius:6}}>
                      <Icon name="arrow-circle-right" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                

                </View>

                
                
              </Card>

            </View>


            </View>

        </ScrollView>


*/