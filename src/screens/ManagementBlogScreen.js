import React from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity, TextInput, Platform, Image, Alert, Modal, Dimensions, ActivityIndicator
} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import { BlueButton } from '../components/BlueButton';
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { SearchBar, ListItem } from "react-native-elements";


const Tab = createMaterialTopTabNavigator();

export function ManagementBlogScreen() {
    return (
        <View style={styles.Container}>
            <Tab.Navigator
                initialRouteName="AddBlog"
                removeClippedSubviews={true}
                sceneContainerStyle={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                }}
                tabBarOptions={{
                    activeTintColor: '#000',
                    inactiveTintColor: '#b5b5b5',
                    showIcon: true,
                    indicatorStyle: {
                        backgroundColor: '#2169ab'
                    },
                    labelStyle: {
                        fontSize: 14,
                    },
                    style: {
                        backgroundColor: 'white', //e8edf1
                        //height: (Platform.OS === 'ios') ? 48 : 50,
                        //overflow: "hidden"
                    },
                    tabStyle: {
                        marginTop: (Platform.OS === 'ios') ? 0 : 0,
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    },
                }}
            >

                <Tab.Screen
                    name="AddBlog"
                    component={AddBlogScreen}
                    options={{
                        tabBarLabel: 'Add Blog'
                    }}
                />
                <Tab.Screen
                    name="BlogList"
                    component={BlogListScreen}
                    options={{
                        tabBarLabel: 'Blog',
                    }}
                />

                <Tab.Screen
                    name="CategoryList"
                    component={CategoryList}
                    options={{
                        tabBarLabel: 'Category',
                    }}
                />
            </Tab.Navigator>

        </View>
    )
}

function AddBlogScreen() {

    const BottomSheetLong = React.useRef();

    const [image1, setImage1] = React.useState(null);
    const [getIsLoading, setIsLoading] = React.useState(true)
    const [getBlogCategoryList, setBlogCategoryList] = React.useState()
    const [getBlogCategoryName, setBlogCategoryName] = React.useState()

    const [getBlogCategoryID, setBlogCategoryID] = React.useState("1003")
    const [getBlogEN, setBlogEN] = React.useState("")
    const [getBlogTR, setBlogTR] = React.useState("")
    const [getHeaderEN, setHeaderEN] = React.useState("")
    const [getHeaderTR, setHeaderTR] = React.useState("")
    const [getImage, setImage] = React.useState("")
    const [getSummaryEN, setSummaryEN] = React.useState("")
    const [getSummaryTR, setSummaryTR] = React.useState("")


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            if (image1 === null) {
                setImage1(result.uri);
            }
        }
    };

    const alertDialog = (messageTitle, message) =>
        Alert.alert(
            messageTitle,
            message,
            [
                {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );

    const readGetBlogCategory = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/BlogCategory/Get?p_iSelection=' + 1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setBlogCategoryList(json.m_cData)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
        }
    }

    const readBlogInsert = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Blog/Insert', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "BLOG_CATEGORY_OBJECT": {
                            "BLOG_CATEGORY_ID": getBlogCategoryID
                        },
                        "BLOG_EN": '<p>' + getBlogEN + '</p>',
                        "BLOG_TR": '<p>' + getBlogTR + '</p>',
                        "HEADER_EN": getHeaderEN,
                        "HEADER_TR": getHeaderTR,
                        "IMAGE": getImage,
                        "SUMMARY_EN": getSummaryEN,
                        "SUMMARY_TR": getSummaryTR
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setBlogCategoryID("1003")
                            setBlogEN("")
                            setBlogTR("")
                            setHeaderEN("")
                            setHeaderTR("")
                            setImage("")
                            setSummaryEN("")
                            setSummaryTR("")
                        }
                        else {
                            alertDialog("Error", json.m_lUserMessageList[1])
                        }


                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
            console.log(e)
        }
    }


    React.useEffect(() => {
        readGetBlogCategory()
    }, [])

    return (
        <View>
            <RBSheet
                ref={BottomSheetLong}
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
                    onPress={() => {
                        BottomSheetLong.current.close();
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    {getIsLoading && (
                        <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                            <ActivityIndicator
                                style={{ height: 100, top: 150 }}
                                color="#000"
                                size="large"
                            />
                        </View>
                    )}
                    {getBlogCategoryList !== undefined &&

                        <>
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getBlogCategoryList.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            setBlogCategoryID(item.BLOG_CATEGORY_ID.toString())
                                            setBlogCategoryName(item.BLOG_CATEGORY_EN)
                                            BottomSheetLong.current.close()
                                        }}
                                    >
                                        <ListItem.Content>
                                            <ListItem.Title>{item.BLOG_CATEGORY_EN}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                )
                                )}
                            </ScrollView>
                        </>
                    }

                </View>
            </RBSheet>
            <ScrollView style={{ padding: 10 }}>

                <View style={[styles.RequestStatusConatiner, { marginTop: 20 }]}>
                    <TouchableOpacity
                        onPress={() => {
                            BottomSheetLong.current.open()
                        }}
                        style={styles.OneValueInLineButton}>
                        <Icon name="horse" size={20} color="#2169ab" />
                        {getBlogCategoryName !== undefined ?
                            <Text style={styles.InformationText}>{getBlogCategoryName}</Text>
                            :
                            <>
                                {getBlogCategoryList !== undefined &&
                                    <Text style={styles.InformationText}>{getBlogCategoryList[0].BLOG_CATEGORY_EN}</Text>
                                }
                            </>
                        }


                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                    </TouchableOpacity>
                </View>


                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                    <Text style={styles.TextInputHeader}>Header Turkish: </Text>
                    <TextInput
                        style={styles.HalfInputStyle}
                        placeholder={"Header Turkish"}
                        name={"HeaderTurkish"}
                        value={getHeaderTR}
                        onChangeText={setHeaderTR}
                    />
                </View>

                <View style={[styles.TextInputContainer]}>
                    <Text style={styles.TextInputHeader}>Header English: </Text>
                    <TextInput
                        style={styles.HalfInputStyle}
                        placeholder={"Header English"}
                        name={"HeaderEnglish"}
                        value={getHeaderEN}
                        onChangeText={setHeaderEN}
                    />
                </View>

                {image1 ?
                    <View style={styles.ImagePickerContainer}>
                        <Image
                            source={{ uri: image1 }}
                            style={styles.ImagePickerImage} />
                        <TouchableOpacity
                            style={{}}
                            onPress={() => {
                                setImage1(null);
                            }}>
                            <Icon name="times-circle" size={24} color="silver" />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: '#e8edf1', padding: 10, borderRadius: 8, elevation: 8, marginVertical: 20 }}
                        onPress={pickImage}>
                        <Text style={{ color: '#000', textAlign: 'center', fontSize: 16 }}>Upload Image</Text>
                    </TouchableOpacity>
                }

                <View style={[styles.TextInputContainer, { marginTop: 30, height: 120 }]}>
                    <Text style={styles.TextInputHeader}>Summary Turkish: </Text>
                    <TextInput
                        style={[styles.HalfInputStyle, { width: '55%' }]}
                        placeholder={"Summary Turkish"}
                        name={"SummaryTurkish"}
                        multiline={true}
                        value={getSummaryTR}
                        onChangeText={setSummaryTR}
                    />
                </View>

                <View style={[styles.TextInputContainer, { height: 120 }]}>
                    <Text style={styles.TextInputHeader}>Summary English: </Text>
                    <TextInput
                        style={[styles.HalfInputStyle, { width: '55%' }]}
                        placeholder={"Summary English"}
                        name={"SummaryEnglish"}
                        multiline={true}
                        value={getSummaryEN}
                        onChangeText={setSummaryEN}
                    />
                </View>

                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                    <Text style={styles.TextInputHeader}>Explation Turkish: </Text>
                    <TextInput
                        style={[styles.HalfInputStyle, { width: '55%' }]}
                        placeholder={"Explation Turkish"}
                        name={"ExplationTurkish"}
                        multiline={true}
                        value={getBlogTR}
                        onChangeText={setBlogTR}
                    />
                </View>

                <View style={[styles.TextInputContainer]}>
                    <Text style={styles.TextInputHeader}>Explation English: </Text>
                    <TextInput
                        style={[styles.HalfInputStyle, { width: '55%' }]}
                        placeholder={"Explation English"}
                        name={"ExplationEnglish"}
                        multiline={true}
                        value={getBlogEN}
                        onChangeText={setBlogEN}
                    />
                </View>

                <BlueButton
                    onPress={() => {
                        readBlogInsert()
                    }}
                    style={{ marginVertical: 40 }}
                    title="Save Now"
                />

            </ScrollView>
        </View>
    )
}

function BlogListScreen({ navigation }) {

    const BottomSheetLong = React.useRef();

    const [image1, setImage1] = React.useState(null);
    const [getIsLoading, setIsLoading] = React.useState(true)
    const [getBlogListData, setBlogListData] = React.useState()
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(true)
    const [isEdit, setIsEdit] = React.useState(false);
    const [getEdittingItem, setEdittingItem] = React.useState()
    const [getBlogCategoryList, setBlogCategoryList] = React.useState()
    const [getBlogCategoryName, setBlogCategoryName] = React.useState()

    const [getBlogID, setBlogID] = React.useState();
    const [getBlogCategoryID, setBlogCategoryID] = React.useState("1003")
    const [getBlogEN, setBlogEN] = React.useState("")
    const [getBlogTR, setBlogTR] = React.useState("")
    const [getHeaderEN, setHeaderEN] = React.useState("")
    const [getHeaderTR, setHeaderTR] = React.useState("")
    const [getImage, setImage] = React.useState("")
    const [getSummaryEN, setSummaryEN] = React.useState("")
    const [getSummaryTR, setSummaryTR] = React.useState("")

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            if (image1 === null) {
                setImage1(result.uri);
            }
        }
    };


    const alertDialog = (messageTitle, message) =>
        Alert.alert(
            messageTitle,
            message,
            [
                {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );

    const readGetBlogListData = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Blog/Get?p_iBlogCategoryId=' + -1 + '&p_iSelection=' + -1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setBlogListData(json.m_cData)
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
        }
    }

    const readGetBlogCategory = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/BlogCategory/Get?p_iSelection=' + 1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setBlogCategoryList(json.m_cData)
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
        }
    }

    const readBlogActivateDeactivate = async (BlogID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Blog/ActivateDeactivate', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "BLOG_ID": BlogID,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            readGetBlogListData();
                        }
                        else {
                            alertDialog("Error", json.m_lUserMessageList[1])
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const readBlogUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Blog/Update', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "BLOG_ID": getBlogID,
                        "BLOG_CATEGORY_OBJECT": {
                            "BLOG_CATEGORY_ID": getBlogCategoryID
                        },
                        "BLOG_EN": '<p>' + getBlogEN + '</p>',
                        "BLOG_TR": '<p>' + getBlogTR + '</p>',
                        "HEADER_EN": getHeaderEN,
                        "HEADER_TR": getHeaderTR,
                        "IMAGE": getImage,
                        "SUMMARY_EN": getSummaryEN,
                        "SUMMARY_TR": getSummaryTR
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setBlogCategoryID("1003")
                            setBlogEN("")
                            setBlogTR("")
                            setHeaderEN("")
                            setHeaderTR("")
                            setImage("")
                            setSummaryEN("")
                            setSummaryTR("")
                            setIsEdit(false)
                            readGetBlogListData()
                        }
                        else {
                            alertDialog("Error", json.m_lUserMessageList[1])
                        }


                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            readGetBlogListData()
        });

        return () => {
            unsubscribe;
        };
    }, [navigation]);

    React.useEffect(() => {
        readGetBlogListData()
        readGetBlogCategory();
    }, [])

    return (
        <View>
            <RBSheet
                ref={BottomSheetLong}
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
                    onPress={() => {
                        BottomSheetLong.current.close();
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    {getIsLoading && (
                        <View style={{ width: "100%", justifyContent: "center", position: 'absolute', zIndex: 1 }}>
                            <ActivityIndicator
                                style={{ height: 100, top: 150 }}
                                color="#000"
                                size="large"
                            />
                        </View>
                    )}
                    {getBlogCategoryList !== undefined &&

                        <>
                            <ScrollView style={styles.ScrollViewContainer}>
                                {getBlogCategoryList.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        button
                                        onPress={() => {
                                            setBlogCategoryID(item.BLOG_CATEGORY_ID.toString())
                                            setBlogCategoryName(item.BLOG_CATEGORY_EN)
                                            BottomSheetLong.current.close()
                                        }}
                                    >
                                        <ListItem.Content>
                                            <ListItem.Title>{item.BLOG_CATEGORY_EN}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Chevron />
                                    </ListItem>
                                )
                                )}
                            </ScrollView>
                        </>
                    }

                </View>
            </RBSheet>

            <ScrollView>
                {isEdit ?

                    <View style={{ padding: 10 }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsEdit(false)
                                }}
                                style={{ width: '100%', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderColor: 'silver', marginBottom: 10 }}>
                                <Icon name="chevron-left" size={24} color="silver" />
                                <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={[styles.RequestStatusConatiner, { marginTop: 20 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    BottomSheetLong.current.open()
                                }}
                                style={styles.OneValueInLineButton}>
                                <Icon name="horse" size={20} color="#2169ab" />
                                {getBlogCategoryName !== undefined ?
                                    <Text style={styles.InformationText}>{getBlogCategoryName}</Text>
                                    :
                                    <>
                                        {getBlogCategoryList !== undefined &&
                                            <Text style={styles.InformationText}>{getBlogCategoryList[0].BLOG_CATEGORY_EN}</Text>
                                        }
                                    </>
                                }

                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="arrow-alt-circle-down" size={24} color="silver" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                            <Text style={styles.TextInputHeader}>Header Turkish: </Text>
                            <TextInput
                                style={styles.HalfInputStyle}
                                placeholder={"Header Turkish"}
                                name={"HeaderTurkish"}
                                value={getHeaderTR}
                                onChangeText={setHeaderTR}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            <Text style={styles.TextInputHeader}>Header English: </Text>
                            <TextInput
                                style={styles.HalfInputStyle}
                                placeholder={"Header English"}
                                name={"HeaderEnglish"}
                                value={getHeaderEN}
                                onChangeText={setHeaderEN}
                            />
                        </View>

                        {image1 ?
                            <View style={styles.ImagePickerContainer}>
                                <Image
                                    source={{ uri: image1 }}
                                    style={styles.ImagePickerImage} />
                                <TouchableOpacity
                                    style={{}}
                                    onPress={() => {
                                        setImage1(null);
                                    }}>
                                    <Icon name="times-circle" size={24} color="silver" />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity
                                style={{ width: '100%', backgroundColor: '#e8edf1', padding: 10, borderRadius: 8, elevation: 8, marginVertical: 20 }}
                                onPress={pickImage}>
                                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16 }}>Upload Image</Text>
                            </TouchableOpacity>
                        }

                        <View style={[styles.TextInputContainer, { marginTop: 30, height: 120 }]}>
                            <Text style={styles.TextInputHeader}>Summary Turkish: </Text>
                            <TextInput
                                style={[styles.HalfInputStyle, { width: '55%' }]}
                                placeholder={"Summary Turkish"}
                                name={"SummaryTurkish"}
                                multiline={true}
                                value={getSummaryTR}
                                onChangeText={setSummaryTR}
                            />
                        </View>

                        <View style={[styles.TextInputContainer, { height: 120 }]}>
                            <Text style={styles.TextInputHeader}>Summary English: </Text>
                            <TextInput
                                style={[styles.HalfInputStyle, { width: '55%' }]}
                                placeholder={"Summary English"}
                                name={"SummaryEnglish"}
                                multiline={true}
                                value={getSummaryEN}
                                onChangeText={setSummaryEN}
                            />
                        </View>

                        <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                            <Text style={styles.TextInputHeader}>Explation Turkish: </Text>
                            <TextInput
                                style={[styles.HalfInputStyle, { width: '55%' }]}
                                placeholder={"Explation Turkish"}
                                name={"ExplationTurkish"}
                                multiline={true}
                                value={getBlogTR}
                                onChangeText={setBlogTR}
                            />
                        </View>

                        <View style={[styles.TextInputContainer]}>
                            <Text style={styles.TextInputHeader}>Explation English: </Text>
                            <TextInput
                                style={[styles.HalfInputStyle, { width: '55%' }]}
                                placeholder={"Explation English"}
                                name={"ExplationEnglish"}
                                multiline={true}
                                value={getBlogEN}
                                onChangeText={setBlogEN}
                            />
                        </View>

                        <BlueButton
                            onPress={() => {
                                readBlogUpdate()
                            }}
                            style={{ marginVertical: 40 }}
                            title="Update"
                        />


                    </View>
                    :
                    <>
                        {loading ?
                            <ActivityIndicator
                                style={{ height: 100, top: 150 }}
                                color="#000"
                                size="large"
                            />
                            :
                            <>
                                {getBlogListData !== undefined ?
                                    <>
                                        {getBlogListData.length === 0 ?
                                            <View style={styles.ErrorMessageContainer}>
                                                <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                                                <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                                <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                                <Text style={styles.ErrorMessageText}>You can search again.</Text>
                                            </View>
                                            :
                                            <ScrollView horizontal={true}>

                                                <DataTable>
                                                    <DataTable.Header>
                                                        <DataTable.Title style={{ width: 150 }}>Category</DataTable.Title>
                                                        <DataTable.Title style={{ width: 150 }}>Turkish</DataTable.Title>
                                                        <DataTable.Title style={{ width: 150 }}>Date</DataTable.Title>
                                                        <DataTable.Title style={{ width: 150 }}>Reading</DataTable.Title>
                                                        <DataTable.Title style={{ width: 150 }}>Edit</DataTable.Title>
                                                        <DataTable.Title style={{ width: 150 }}>Active</DataTable.Title>
                                                    </DataTable.Header>

                                                    {getBlogListData.map((item, i) => (
                                                        <DataTable.Row key={i}>
                                                            <DataTable.Cell
                                                                onPress={() => {
                                                                    alertDialog('Category', item.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN);
                                                                }}
                                                                style={{ width: 150 }} >{item.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN.substring(0, 12)} ...</DataTable.Cell>
                                                            <DataTable.Cell
                                                                onPress={() => {
                                                                    alertDialog('Turkish', item.HEADER_EN);
                                                                }}
                                                                style={{ width: 150 }}>{item.HEADER_EN.substring(0, 12)} ...</DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 150 }}>{item.DATE.substring(0, 10)}</DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 150 }}>{item.COUNTER}</DataTable.Cell>

                                                            <DataTable.Cell style={{ width: 150 }}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setIsEdit(true)
                                                                        setBlogID(item.BLOG_ID)
                                                                        setEdittingItem(item)

                                                                        setBlogCategoryName(item.BLOG_CATEGORY_OBJECT.BLOG_CATEGORY_EN)
                                                                        setHeaderEN(item.HEADER_EN)
                                                                        setHeaderTR(item.HEADER_TR)
                                                                        setImage(item.IMAGE)
                                                                        setSummaryTR(item.SUMMARY_TR)
                                                                        setSummaryEN(item.SUMMARY_EN)
                                                                        setBlogEN(item.BLOG_EN.replace('<p>', '').replace('</p>', ''))
                                                                        setBlogTR(item.BLOG_TR.replace('<p>', '').replace('</p>', ''))
                                                                    }}
                                                                    style={styles.TableActionButtonContainer}>
                                                                    <Text style={styles.TableActionButtonText}>Edit</Text>
                                                                </TouchableOpacity>
                                                            </DataTable.Cell>

                                                            <DataTable.Cell style={{ width: 150 }}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        readBlogActivateDeactivate(item.BLOG_ID);
                                                                    }}
                                                                    style={styles.TableActionButtonContainer}>
                                                                    {item.ACTIVE === 1 ?
                                                                        <Text style={styles.TableActionButtonText}>Deactive</Text>
                                                                        :
                                                                        <Text style={styles.TableActionButtonText}>Active</Text>
                                                                    }

                                                                </TouchableOpacity>
                                                            </DataTable.Cell>

                                                        </DataTable.Row>
                                                    )
                                                    )}
                                                </DataTable>
                                            </ScrollView>

                                        }
                                    </>
                                    :
                                    <ActivityIndicator
                                        style={{ height: 100, top: 150 }}
                                        color="#000"
                                        size="large"
                                    />
                                }
                            </>
                        }
                    </>
                }

            </ScrollView>
        </View>
    )
}

function CategoryList() {

    const [getBlogCategoryData, setBlogCategoryData] = React.useState();
    const [getModalVisible, setModalVisible] = React.useState(false);

    const [getBlogCategoryTR, setBlogCategoryTR] = React.useState();
    const [getBlogCategoryEN, setBlogCategoryEN] = React.useState()

    const [isEditting, setIsEditting] = React.useState(false);
    const [getBlogCategoryTRForEditting, setBlogCategoryTRForEditting] = React.useState();
    const [getBlogCategoryENForEditting, setBlogCategoryENForEditting] = React.useState()

    const [getBlogCategoryID, setBlogCategoryID] = React.useState();

    const alertDialog = (messageTitle, message) =>
        Alert.alert(
            messageTitle,
            message,
            [
                {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );

    const readGetBlogCategoryData = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/BlogCategory/Get?p_iSelection=' + -1, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setBlogCategoryData(json.m_cData)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
        }
    }

    const readBlogCategoryActivateDeactivate = async (BlogCategoryID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/BlogCategory/ActivateDeactivate', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "BLOG_CATEGORY_ID": BlogCategoryID,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            readGetBlogCategoryData();
                        }
                        else {
                            alertDialog("Error", json.m_lUserMessageList[1])
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const readBlogCategoryInsert = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/BlogCategory/Insert', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "BLOG_CATEGORY_TR": getBlogCategoryTR,
                        "BLOG_CATEGORY_EN": getBlogCategoryEN,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setModalVisible(false)
                            setBlogCategoryEN("")
                            setBlogCategoryEN("")
                            readGetBlogCategoryData()
                        }
                        else {
                            alertDialog("Error", json.m_lUserMessageList[1])
                        }


                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const readBlogCategoryUpdate = async (BlogCategoryID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/BlogCategory/Update', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                    body: JSON.stringify({
                        "BLOG_CATEGORY_ID": BlogCategoryID,
                        "BLOG_CATEGORY_TR": getBlogCategoryTRForEditting,
                        "BLOG_CATEGORY_EN": getBlogCategoryENForEditting,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {

                        if (json.m_eProcessState === 1) {
                            alertDialog("Congratulations", json.m_lUserMessageList[1])
                            setBlogCategoryTRForEditting("")
                            setBlogCategoryENForEditting("");
                            setIsEditting(false)
                            readGetBlogCategoryData()
                        }
                        else {
                            alertDialog("Error", json.m_lUserMessageList[1])
                        }


                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        readGetBlogCategoryData()
    }, [])

    return (
        <View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={getModalVisible}>
                <View style={styles.centeredView}>
                    <View style={[styles.FullScreenContainer]}>
                        <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => {
                                    setModalVisible(false);
                                }}>
                                <Icon name="times" size={26} color="silver" />
                            </TouchableOpacity>
                        </View>

                        {isEditting ?

                            <>

                                <View style={[styles.TextInputContainer, { marginTop: 30, width: '80%' }]}>
                                    <Text style={styles.TextInputHeader}>Turkish: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Turkish"}
                                        name={"Turkish"}
                                        value={getBlogCategoryTRForEditting}
                                        onChangeText={setBlogCategoryTRForEditting}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer, { marginTop: 30, width: '80%' }]}>
                                    <Text style={styles.TextInputHeader}>English: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"English"}
                                        name={"English"}
                                        value={getBlogCategoryENForEditting}
                                        onChangeText={setBlogCategoryENForEditting}
                                    />
                                </View>

                            </>
                            :
                            <>


                                <View style={[styles.TextInputContainer, { marginTop: 30, width: '80%' }]}>
                                    <Text style={styles.TextInputHeader}>Turkish: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"Turkish"}
                                        name={"Turkish"}
                                        value={getBlogCategoryTR}
                                        onChangeText={setBlogCategoryTR}
                                    />
                                </View>

                                <View style={[styles.TextInputContainer, { marginTop: 30, width: '80%' }]}>
                                    <Text style={styles.TextInputHeader}>English: </Text>
                                    <TextInput
                                        style={styles.HalfInputStyle}
                                        placeholder={"English"}
                                        name={"English"}
                                        value={getBlogCategoryEN}
                                        onChangeText={setBlogCategoryEN}
                                    />
                                </View>


                            </>
                        }

                        <View style={styles.AddCategoryButtonContainer}>
                            <TouchableOpacity
                                style={styles.AddCategoryButton}
                                onPress={() => {
                                    setModalVisible(false)
                                }}>
                                <Text style={[styles.AddCategoryButtonText, { color: '#2169ab' }]} >Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    if(isEditting === true) {
                                        readBlogCategoryUpdate(getBlogCategoryID)
                                    }
                                    else{
                                        readBlogCategoryInsert();
                                    }
                                    setModalVisible(false)
                                    
                                }}
                                style={[styles.AddCategoryButton, { backgroundColor: '#2169ab' }]}
                            >
                                <Text style={[styles.AddCategoryButtonText, { color: 'rgb(232, 237, 241)' }]} >Save</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </Modal>

            <ScrollView>

                <View style={styles.SortTypeContainer}>
                    <TouchableOpacity
                        style={styles.SortTypeButton}
                        onPress={() => {
                            setModalVisible(true);
                        }}>
                        <Icon name="plus-circle" size={16} color="#fff" style={{ alignSelf: 'center', marginRight: 5 }} />
                        <Text style={styles.SortTypeButtonText}>Add Category</Text>
                    </TouchableOpacity>
                </View>

                {getBlogCategoryData !== undefined ?
                    <>
                        {getBlogCategoryData.length === 0 ?
                            <View style={styles.ErrorMessageContainer}>
                                <Icon style={{ marginBottom: 40 }} name="exclamation-circle" size={150} color="#e54f4f" />
                                <Text style={styles.ErrorMessageTitle}>Oh No, Data Not Found !</Text>
                                <Text style={styles.ErrorMessageText}>Could not find any horses.</Text>
                                <Text style={styles.ErrorMessageText}>You can search again.</Text>
                            </View>
                            :
                            <ScrollView horizontal={true}>

                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{ width: 150 }}>ID</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Turkish</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>English</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Edit</DataTable.Title>
                                        <DataTable.Title style={{ width: 150 }}>Active</DataTable.Title>
                                    </DataTable.Header>

                                    {getBlogCategoryData.map((item, i) => (
                                        <DataTable.Row key={i}>
                                            <DataTable.Cell style={{ width: 150 }} >{item.BLOG_CATEGORY_ID}</DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => {
                                                    alertDialog('Turkish', item.BLOG_CATEGORY_TR);
                                                }}
                                                style={{ width: 150 }}>{item.BLOG_CATEGORY_TR.substring(0, 12)} ...</DataTable.Cell>
                                            <DataTable.Cell
                                                onPress={() => {
                                                    alertDialog('English', item.BLOG_CATEGORY_EN);
                                                }}
                                                style={{ width: 150 }}>{item.BLOG_CATEGORY_EN.substring(0, 12)} ...</DataTable.Cell>

                                            <DataTable.Cell style={{ width: 150 }}>
                                                <TouchableOpacity 
                                                    onPress={()=>{
                                                        setBlogCategoryID(item.BLOG_CATEGORY_ID)
                                                        setIsEditting(true)
                                                        setBlogCategoryENForEditting(item.BLOG_CATEGORY_EN.substring(0, 12))
                                                        setBlogCategoryTRForEditting(item.BLOG_CATEGORY_TR.substring(0, 12))
                                                        setModalVisible(true)
                                                    }}
                                                    style={styles.TableActionButtonContainer}>
                                                    <Text style={styles.TableActionButtonText}>Edit</Text>
                                                </TouchableOpacity>
                                            </DataTable.Cell>

                                            <DataTable.Cell style={{ width: 150 }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        readBlogCategoryActivateDeactivate(item.BLOG_CATEGORY_ID);
                                                    }}
                                                    style={styles.TableActionButtonContainer}>
                                                    {item.ACTIVE === 1 ?
                                                        <Text style={styles.TableActionButtonText}>Deactive</Text>
                                                        :
                                                        <Text style={styles.TableActionButtonText}>Active</Text>
                                                    }

                                                </TouchableOpacity>
                                            </DataTable.Cell>

                                        </DataTable.Row>
                                    )
                                    )}
                                </DataTable>

                            </ScrollView>
                        }
                    </>
                    :
                    <View style={styles.ErrorMessageContainer}>
                        <Icon style={{ marginBottom: 40 }} name="wifi" size={150} color="#222" />
                        <Text style={styles.ErrorMessageTitle}>No Internet Connection !</Text>
                        <Text style={styles.ErrorMessageText}>Make sure Wifi or cellular data is turned on and then try again.</Text>
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    RequestStatusConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: 'silver',
        padding: 10,
    },
    InformationText: {
        fontSize: 16,
        marginLeft: 5
    },
    OneValueInLineButton: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    TextInputContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        flexDirection: 'row',
        marginVertical: 5
    },
    TextInputHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    HalfInputStyle: {
        width: '90%',
        paddingLeft: 20,
        fontSize: 16,
        margin: 0,
        alignSelf: 'center'
    },
    ImagePickerContainer: {
        marginVertical: 8,
        width: "100%",
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'silver',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ImagePickerImage: {
        marginLeft: 10,
        width: 300,
        height: 100,
        resizeMode: 'stretch'
    },
    TableActionButtonContainer: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 8,
        backgroundColor: 'rgb(232, 237, 241)'
    },

    TableActionButtonText: {
        color: '#352c2a'
    },
    SortTypeContainer: {
        width: '100%',
        padding: 10,
        paddingRight: 15,
        alignItems: 'flex-end'
    },
    SortTypeButton: {
        flexDirection: 'row',
        backgroundColor: '#2169ab',
        padding: 10,
        borderRadius: 6,
        elevation: 10,
        width: '37%'
    },
    SortTypeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#6c6c6ca8'
    },
    FullScreenContainer: {
        width: '70%',
        height: '50%',
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000",
        borderRadius: 10,
        elevation: 10
    },
    AddCategoryButtonContainer: {
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20
    },
    AddCategoryButton: {
        padding: 10,
        backgroundColor: 'rgb(232, 237, 241)',
        borderRadius: 8,
        elevation: 8
    },
    AddCategoryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
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
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },
})