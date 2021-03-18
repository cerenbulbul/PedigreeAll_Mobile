import React, { useCallback, useState, useRef, Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Switch,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { WebView } from 'react-native-webview';
import { Card, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";
import { SwipeablePanel } from "rn-swipeable-panel";
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { SettingBottomSheet } from '../components/SettingBottomSheet'
import { BlueButton } from '../components/BlueButton';
import { Title } from '../components/Title'
import { ListItem, Input, SearchBar } from "react-native-elements";
import Moment from 'react-moment';
import 'moment-timezone';
import HTML from "react-native-render-html";


export function BlogScreen({ navigation }) {
  const BottomSheetCategory = useRef();
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [BlogList, setBlogList] = useState()
  const [CategoryList, setCategoryList] = useState()
  const { width: windowWidth } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState()
  const [selectedCategoryID, setSelectedCategoryID] = useState()
  const [BlogIsAvaible, setBlogIsAvaible] = useState()
 

  const readDataBlogList = async (data) => {
    fetch('https://api.pedigreeall.com/Blog/Get?p_iBlogCategoryId=' + -1 + '&p_iSelection=' + 1, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setBlogList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }
  const readDataCategoryList = async (data) => {
    fetch('https://api.pedigreeall.com/BlogCategory/Get?p_iSelection=' + 1, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCategoryList(json.m_cData)
      })
      .catch((error) => {
        console.error(error);
      })
  }
  React.useEffect(() => {
    readDataBlogList();
    readDataCategoryList();

  }, [])

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);

  const webviewRef = React.useRef(null);
  function onMessage(data) {
    alert(data.nativeEvent.data);
    props.navigation.navigate("Home");
  }

  return (

    <View style={styles.Container}>

      <RBSheet
        ref={BottomSheetCategory}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height - 50}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <TouchableOpacity
          onPress={() => { BottomSheetCategory.current.close() }}
          style={styles.SwipableCloseIcon}>
          <Icon name="times" size={20} color="#adb5bd" />
        </TouchableOpacity>
        <View>
          {CategoryList !== undefined &&
            <ScrollView style={{ marginBottom: 40 }}>
              {CategoryList.filter((x) => x.BLOG_CATEGORY_ID).map(
                (item, i) => (
                  <ListItem
                    key={i}
                    bottomDivider
                    button
                    onPress={() => {
                      setBlogIsAvaible(false)
                      setSelectedCategory(true);
                      setSelectedCategoryID(item.BLOG_CATEGORY_ID);
                      BottomSheetCategory.current.close();
                      BlogList.map((i) => {
                        if (i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_ID === item.BLOG_CATEGORY_ID) {
                          setBlogIsAvaible(true)
                        }
                      })
                    }} >
                    <ListItem.Content>
                      <ListItem.Title>{item.BLOG_CATEGORY_EN}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))}
            </ScrollView>
          }
        </View>
      </RBSheet>

      <TouchableOpacity
        style={styles.CategoriesContainer}
        onPress={() => { BottomSheetCategory.current.open(); }}>
        <Icon name="filter" size={16} color="#fff" style={{ justifyContent: 'center' }} />
      </TouchableOpacity>

      {BlogIsAvaible === false ?

        <View style={styles.ErrorMessageContainer}>
          <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
          <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
          <Text style={styles.ErrorMessageText}>The Category has not data. You can choose another category or see the Blog Screen.</Text>
          <View style={styles.ErrorMessageButtonContainer}>
            <TouchableOpacity
              style={styles.ErrorMessageButton}
              onPress={() => { BottomSheetCategory.current.open(); }}
            >
              <Text style={styles.ErrorMessageButtonText}>Go Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ErrorMessageButton, { backgroundColor: '#2169ab' }]}
              onPress={() => {
                setSelectedCategory(false);
                setBlogIsAvaible(true)
              }}
            >
              <Text style={[styles.ErrorMessageButtonText, { color: 'rgb(232, 237, 241)' }]}>Go Blog</Text>
            </TouchableOpacity>
          </View>
        </View>

        :
        <>

          {BlogList !== undefined ?
            <ScrollView style={{ marginTop: 20, marginBottom: 10 }}>
              {BlogList.map((i) => {
                return (
                  <View key={i.BLOG_ID}>
                    {selectedCategory ?
                      <>
                        {selectedCategoryID === i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_ID &&
                          <>
                            <View style={[styles.IconsContainer, { marginTop: 10 }]}>
                              <Text style={{ fontSize: 18, margin: 10, textAlign: 'center', fontWeight: '500' }}>{i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                              //BottomSheetBlogSelected.current.open();
                              console.log('asama1')
                              navigation.navigate('BlogItem', {
                                selectedBlog: i
                              })
                              setSelectedBlog(i)
                            }}>
                              <Card containerStyle={{ borderRadius: 10 }}>
                                <Card.Title> {i.HEADER_EN}</Card.Title>
                                <Card.Image
                                  style={{ borderRadius: 3, }}
                                  source={{ uri: 'https://www.pedigreeall.com/blog/' + i.IMAGE }} />

                                <Text
                                  style={{ marginBottom: 10, marginTop: 10 }}
                                  onTextLayout={onTextLayout}
                                  numberOfLines={textShown ? undefined : 3}>
                                  {i.SUMMARY_EN}
                                </Text>
                                <Card.Divider />
                                <View style={styles.ButtonContainer}>
                                  <View style={styles.IconsContainer}>
                                    <Icon name="calendar" size={15} color="#000" />
                                    <Moment style={{ marginLeft: 5, }} element={Text} format="YYYY/MM/DD"><Text>{i.DATE}</Text></Moment>

                                  </View>
                                  <View style={styles.IconsContainer}>
                                    <Icon name="eye" size={15} color="#000" />
                                    <Text style={styles.IconText}>{i.COUNTER}</Text>
                                  </View>
                                </View>
                              </Card>
                            </TouchableOpacity>
                          </>
                        }
                      </>

                      :
                      <View
                        style={{ width: windowWidth }}>
                        <TouchableOpacity onPress={() => {
                          //BottomSheetBlogSelected.current.open();
                          setSelectedBlog(i)
                          navigation.navigate('BlogItem', {
                            selectedBlog: i
                          })

                        }}>
                          <Card containerStyle={{ borderRadius: 10 }}>
                            <Card.Title> {i.HEADER_EN}</Card.Title>
                            <Card.Image
                              style={{ borderRadius: 3, resizeMode:"contain" }}
                              source={{ uri: 'https://www.pedigreeall.com/blog/' + i.IMAGE }} />
                            <View style={[styles.IconsContainer, { marginTop: 10 }]}>
                              <Icon name="tags" size={15} color="#000" />
                              <Text style={styles.IconText}>{i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN}</Text>
                            </View>

                            <Text
                              style={{ marginBottom: 10, marginTop: 10 }}
                              onTextLayout={onTextLayout}
                              numberOfLines={textShown ? undefined : 3}>
                              {i.SUMMARY_EN}
                            </Text>

                            <Card.Divider />

                            <View style={styles.ButtonContainer}>

                              <View style={styles.IconsContainer}>
                                <Icon name="calendar" size={15} color="#000" />
                                <Moment style={{ marginLeft: 5, }} element={Text} format="YYYY/MM/DD"><Text>{i.DATE}</Text></Moment>

                              </View>

                              <View style={styles.IconsContainer}>
                                <Icon name="eye" size={15} color="#000" />
                                <Text style={styles.IconText}>{i.COUNTER}</Text>
                              </View>


                            </View>

                          </Card>
                        </TouchableOpacity>

                      </View>
                    }
                  </View>


                );
              })}
            </ScrollView>
            :
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />
          }
        </>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  Title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
    textTransform: 'uppercase'
  },
  ButtonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexDirection: 'row'
  },
  ReadMoreButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2169ab',
    marginVertical: 20
  },
  ButtonText: {
    color: 'white',
  },
  IconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  IconText: {
    paddingLeft: 5,
  },
  swipeContainer: {
    width: "100%",
  },
  SwipeablePanelContainer: {
    padding: 20,
  },
  SwipeablePanelItem: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  SwipeablePanelText: {
    fontSize: 18,
  },
  FlagContainer: {
    flexDirection: 'row',
  },
  ScrollViewContainer: {
    marginBottom: 40
  },
  SwipableCloseIcon: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginRight: -25
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: 'cover'
  },
  textContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 5,
    padding: 10
  },
  infoText: {
    marginVertical: 8,
    width: Dimensions.get('screen').width - 50,
    color: "black",
    fontSize: 16,
    fontWeight: 'normal'
  },
  CategoriesContainer: {
    position: 'absolute',
    padding: 20,
    backgroundColor: '#2169ab',
    borderBottomWidth: 0.5,
    borderColor: 'silver',
    flexDirection: 'row',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    zIndex: 1
  },
  CategoriesText: {
    fontSize: 16,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  CategoryDataNotFound: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'pink'
  },
  BottomSheetBlogImageContainer: {
    marginTop: 10
  },
  BottomSheetTitleContainer: {
    marginTop: 20,
    margin: 5
  },
  ErrorMessageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  ErrorMessageTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  ErrorMessageText: {
    fontSize: 16,
    color: '#c7c1c1',
    textAlign: 'center',
    marginTop: 5
  },
  ErrorMessageButtonContainer: {
    width: '80%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ErrorMessageButton: {
    backgroundColor: 'rgb(232, 237, 241)',
    width: '40%',
    padding: 10,
    borderRadius: 8
  },
  ErrorMessageButtonText: {
    textAlign: 'center',
    color: '#2169ab',
    fontSize: 14,
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
})

class RenderHTML extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world</h1>' }}
      />
    );
  }
}


/*

<TouchableOpacity
                            onPress={toggleNumberOfLines}
                            style={styles.ReadMoreButton}>
                            {
                          lengthMore ? <Text
                          style={styles.ButtonText}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                          :null
                        }
                        </TouchableOpacity>


*/




/*


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
          scrollEventThrottle={1}>

          <>
          {BlogList !== undefined &&
          <>
            {BlogList.map((i) => {
                    return (
                      <View key = {i.BLOG_ID}>
                        {selectedCategory ?
                          <>
                          {selectedCategoryID === i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_ID ?
                          <View
                          style={{ width: windowWidth}}>
                            <Card>
                          <Card.Title> {i.HEADER_EN}</Card.Title>
                          <Card.Divider/>
                          <Card.Image
                            source={{uri:'https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'}} />
                            <Text
                            style={{marginBottom: 10,marginTop:10}}
                            onTextLayout={onTextLayout}
                            numberOfLines={textShown ? undefined : 3}>
                            {i.SUMMARY_EN}
                        </Text>
                        <Card.Divider/>
                        <View style={styles.ButtonContainer}>
                        <View>
                            <View style={styles.IconsContainer}>
                                <Icon name="calendar" size={15} color="#000" />
                                <Text style={styles.IconText}>{i.DATE}</Text>
                            </View>
                            <View style={styles.IconsContainer}>
                                <Icon name="eye" size={15} color="#000" />
                                <Text style={styles.IconText}>{i.COUNTER}</Text>
                            </View>
                            <View style={styles.IconsContainer}>
                                <Icon name="tags" size={15} color="#000" />
                                <Text style={styles.IconText}>{i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN}</Text>
                            </View>
                        </View>
                        </View>
                        <TouchableOpacity
                            onPress={toggleNumberOfLines}
                            style={styles.ReadMoreButton}>
                            {
                          lengthMore ? <Text
                          style={styles.ButtonText}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                          :null}
                        </TouchableOpacity>
                        </Card>
                      </View>
                      :null
                      }
                          </>

                        :
                        <View
                          style={{ width: windowWidth}}>
                            <Card>
                          <Card.Title> {i.HEADER_EN}</Card.Title>
                          <Card.Divider/>
                          <Card.Image
                            source={{uri:'https://images.unsplash.com/photo-1553284965-5dd8352ff1bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'}} />
                            <Text
                            style={{marginBottom: 10,marginTop:10}}
                            onTextLayout={onTextLayout}
                            numberOfLines={textShown ? undefined : 3}>
                            {i.SUMMARY_EN}
                        </Text>

                        <Card.Divider/>

                        <View style={styles.ButtonContainer}>
                        <View >

                            <View style={styles.IconsContainer}>
                                <Icon name="calendar" size={15} color="#000" />
                                <Text style={styles.IconText}>{i.DATE}</Text>
                            </View>

                            <View style={styles.IconsContainer}>
                                <Icon name="eye" size={15} color="#000" />
                                <Text style={styles.IconText}>{i.COUNTER}</Text>
                            </View>

                            <View style={styles.IconsContainer}>
                                <Icon name="tags" size={15} color="#000" />
                                <Text style={styles.IconText}>{i.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN}</Text>
                            </View>

                        </View>
                        </View>
                        <TouchableOpacity
                            onPress={toggleNumberOfLines}
                            style={styles.ReadMoreButton}>
                            {
                          lengthMore ? <Text
                          style={styles.ButtonText}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                          :null
                        }
                        </TouchableOpacity>
                        </Card>
                      </View>
                        }
                      </View>


                    );
                })}
                </>
                }
          </>


                <View >

                </View>
                </ScrollView>


*/


/*


        {selectedCategory ? null:

        <>
          {BlogList !== undefined &&
                  <View style={styles.indicatorContainer}>
                  {BlogList.map((i, imageIndex) => {
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
                          key = {i.BLOG_ID}
                          style={[styles.normalDot, { width }]}
                      />
                      );
                  })}
                  </View>
                }
        </>

        }


*/