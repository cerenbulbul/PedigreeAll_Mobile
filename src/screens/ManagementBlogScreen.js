import React from 'react'
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Platform, Image, Alert, Modal } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';
import { BlueButton } from '../components/BlueButton';
import AsyncStorage from '@react-native-community/async-storage'
import { DataTable } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";


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

    const [image1, setImage1] = React.useState(null);

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

    return (
        <View>
            <ScrollView style={{ padding: 10 }}>

                <View style={[styles.RequestStatusConatiner, { marginTop: 20 }]}>
                    <TouchableOpacity
                        onPress={() => {
                            //setBottomSheetText("RequestStatus")
                            //BottomSheetSmall.current.open()
                        }}
                        style={styles.OneValueInLineButton}>
                        <Icon name="horse" size={20} color="#2169ab" />
                        <Text style={styles.InformationText}>Select A Category</Text>

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
                    />
                </View>

                <View style={[styles.TextInputContainer]}>
                    <Text style={styles.TextInputHeader}>Header English: </Text>
                    <TextInput
                        style={styles.HalfInputStyle}
                        placeholder={"Header English"}
                        name={"HeaderEnglish"}
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
                    />
                </View>

                <View style={[styles.TextInputContainer, { height: 120 }]}>
                    <Text style={styles.TextInputHeader}>Summary English: </Text>
                    <TextInput
                        style={[styles.HalfInputStyle, { width: '55%' }]}
                        placeholder={"Summary English"}
                        name={"SummaryEnglish"}
                        multiline={true}
                    />
                </View>

                <View style={[styles.TextInputContainer, { marginTop: 30 }]}>
                    <Text style={styles.TextInputHeader}>Explation Turkish: </Text>
                    <TextInput
                        style={[styles.HalfInputStyle, { width: '55%' }]}
                        placeholder={"Explation Turkish"}
                        name={"ExplationTurkish"}
                        multiline={true}
                    />
                </View>

                <View style={[styles.TextInputContainer]}>
                    <Text style={styles.TextInputHeader}>Explation English: </Text>
                    <TextInput
                        style={[styles.HalfInputStyle, { width: '55%' }]}
                        placeholder={"Explation English"}
                        name={"ExplationEnglish"}
                        multiline={true}
                    />
                </View>

                <BlueButton
                    style={{ marginVertical: 40 }}
                    title="Save Now"
                />

            </ScrollView>
        </View>
    )
}


function BlogListScreen() {

    const [getBlogListData, setBlogListData] = React.useState()

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


    React.useEffect(() => {
        readGetBlogListData()
    }, [])

    return (
        <View>
            <ScrollView>
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
                                                <TouchableOpacity style={styles.TableActionButtonContainer}>
                                                    <Text style={styles.TableActionButtonText}>Edit</Text>
                                                </TouchableOpacity>
                                            </DataTable.Cell>
                                            {item.ACTIVE === 1 ?
                                                <DataTable.Cell style={{ width: 150 }}>
                                                    <TouchableOpacity style={styles.TableActionButtonContainer}>
                                                        <Text style={styles.TableActionButtonText}>Deactive</Text>
                                                    </TouchableOpacity>
                                                </DataTable.Cell>
                                                :
                                                <DataTable.Cell style={{ width: 150 }}>
                                                    <TouchableOpacity style={styles.TableActionButtonContainer}>
                                                        <Text style={styles.TableActionButtonText}>Active</Text>
                                                    </TouchableOpacity>
                                                </DataTable.Cell>
                                            }

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

function CategoryList() {

    const [getBlogCategoryData, setBlogCategoryData] = React.useState();
    const [getModalVisible, setModalVisible] = React.useState(false);

    const [getBlogCategoryTR , setBlogCategoryTR] = React.useState();
    const [getBlogCategoryEN, setBlogCategoryEN] = React.useState()

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
                        "BLOG_CATEGORY_ID": -1,
                        "BLOG_CATEGORY_TR": getBlogCategoryTR,
                        "BLOG_CATEGORY_EN": getBlogCategoryEN,
                        "ACTIVE": -1,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        // console.log(json.m_cData)
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

                        <View style={styles.AddCategoryButtonContainer}>
                            <TouchableOpacity
                                style={styles.AddCategoryButton}
                                onPress={() => {
                                    setModalVisible(false)
                                }}>
                                <Text style={[styles.AddCategoryButtonText, { color: '#2169ab' }]} >Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
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
                                                <TouchableOpacity style={styles.TableActionButtonContainer}>
                                                    <Text style={styles.TableActionButtonText}>Edit</Text>
                                                </TouchableOpacity>
                                            </DataTable.Cell>
                                            {item.ACTIVE === 1 ?
                                                <DataTable.Cell style={{ width: 150 }}>
                                                    <TouchableOpacity style={styles.TableActionButtonContainer}>
                                                        <Text style={styles.TableActionButtonText}>Deactive</Text>
                                                    </TouchableOpacity>
                                                </DataTable.Cell>
                                                :
                                                <DataTable.Cell style={{ width: 150 }}>
                                                    <TouchableOpacity style={styles.TableActionButtonContainer}>
                                                        <Text style={styles.TableActionButtonText}>Active</Text>
                                                    </TouchableOpacity>
                                                </DataTable.Cell>
                                            }

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
})