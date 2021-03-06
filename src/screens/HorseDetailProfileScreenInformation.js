import React, { useRef } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    Animated,
    Dimensions,
    useWindowDimensions,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Platform
} from 'react-native'
import { Global } from '../Global'
import AsyncStorage from '@react-native-community/async-storage'
import Flag from "react-native-flags";
import Icon from "react-native-vector-icons/FontAwesome5";
import NumberFormat from 'react-number-format';

export function HorseDetailProfileScreenInformation({ navigation }) {
    const [ImageInfo, setImageInfo] = React.useState();
    const [getHorseInfoByID, setHorseInfoByID] = React.useState();
    const [ReadMore, setReadMore] = React.useState(false);
    const [time, setTime] = React.useState(true);

    const readHorseInfoByID = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/HorseInfo/GetById?p_iId=' + Global.Horse_ID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        //setHorsePedigree(json)
                        if (json !== null) {
                            setHorseInfoByID(json.m_cData);
                            setTime(false);
                            if (json.m_cData[0] !== undefined) {
                                Global.TJK_ID = json.m_cData[0].REF1
                            }
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        }
        catch (e) {
            console.log("GetHorseInfoByID Error")
        }
    };


    const readImageInfo = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/ImageInfo/GetById?p_iHorseId=' + Global.Horse_ID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        //console.log(json)
                        setImageInfo(json.m_cData);
                        //setHorsePedigree(json)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
            else {
                console.log("Basarisiz")
            }
        }
        catch (e) {
            console.log(e)
        }

    }
    React.useEffect(() => {
        readImageInfo();
        readHorseInfoByID();
        //readHorseInfo();
    }, [])

    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();
    const [getOpenModal, setOpenModal] = React.useState(false)
    const [getSelectedItem, setSelectedItem] = React.useState();
    const [webViewHeight, setWebViewHeight] = React.useState(null);
    const onMessage = (event) => {
        setWebViewHeight(parseInt(event.nativeEvent.data));
    }

    return (
        <ScrollView
            style={[styles.Container]}
            contentContainerStyle={{
                flexGrow: 1,
            }}>

            <Modal
                animationType="fade"
                transparent={true}
                visible={getOpenModal}>
                <View style={styles.centeredView}>
                    <View style={[styles.FullScreenContainer]}>
                        <View style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={{ padding: 10 }}
                                onPress={() => {
                                    setOpenModal(false);
                                }}>
                                <Icon name="times" size={26} color="silver" />
                            </TouchableOpacity>
                        </View>
                        <>

                        </>

                    </View>
                </View>
            </Modal>



            {time ?
                <ActivityIndicator size="large" color="000" />

                :

                <>
                    {getHorseInfoByID !== undefined &&
                        <>

                            {getHorseInfoByID[0] !== undefined &&
                                <>
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
                                        ], { useNativeDriver: false }
                                        )}
                                        scrollEventThrottle={1}>

                                        {getHorseInfoByID[0].IMAGE_LIST.map((item, index) => {
                                            return (
                                                <View
                                                    style={{ width: Dimensions.get('window').width, height: 250 }}
                                                    key={index}
                                                >
                                                    <ImageBackground source={{ uri: item }} style={styles.card}>
                                                        <View>
                                                        </View>
                                                    </ImageBackground>
                                                </View>


                                            );
                                        })}
                                    </ScrollView>
                                    <View style={styles.indicatorContainer}>
                                        {getHorseInfoByID[0].IMAGE_LIST.map((image, imageIndex) => {
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
                                                    key={imageIndex}
                                                    style={[styles.normalDot, { width }]}
                                                />
                                            );
                                        })}
                                    </View>

                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>İsim:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Name:</Text>
                                        }

                                        <View style={styles.ItemFlexRowContainer}>
                                            <View style={styles.ItemFlagNameContainer}>
                                                <Flag code="TR" size={24} />
                                                <Text style={styles.ItemNameText}>{getHorseInfoByID[0].HORSE_NAME}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Aygır:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Sire:</Text>
                                        }
                                        <View style={styles.ItemFlexRowContainer}>
                                            <View style={styles.ItemFlagNameContainer}>
                                                <Flag code="TR" size={24} />
                                                <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FATHER_NAME}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Kısrak:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Dam:</Text>
                                        }
                                        <View style={styles.ItemFlexRowContainer}>
                                            <View style={styles.ItemFlagNameContainer}>
                                                <Flag code="TR" size={24} />
                                                <Text style={styles.ItemNameText}>{getHorseInfoByID[0].MOTHER_NAME}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Kısrak Babası:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>BroodMare Sire:</Text>
                                        }
                                        <View style={styles.ItemFlexRowContainer}>
                                            <View style={styles.ItemFlagNameContainer}>
                                                <Flag code="TR" size={24} />
                                                <Text style={styles.ItemNameText}>{getHorseInfoByID[0].BM_SIRE_NAME}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Sınıf:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Class:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Cinsiyet:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Sex:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].SEX_OBJECT.SEX_EN}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Kazanç:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Earning:</Text>
                                        }
                                        <View style={styles.ItemFlagNameContainer}>
                                            <NumberFormat
                                                value={getHorseInfoByID[0].EARN}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={getHorseInfoByID[0].EARN_ICON}
                                                renderText={value => <Text style={styles.ItemNameText}>{value}</Text>}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Familya:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Family:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FAMILY_TEXT}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Renk:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Color:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].COLOR_TEXT}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Doğum Tarihi:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Birth Date:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].HORSE_BIRTH_DATE_TEXT}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Koşu:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Start:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].START_COUNT}</Text>
                                    </View>
                                    <View style={styles.ItemContainerForRanking}>
                                        <View style={styles.ItemRankingContainer}>
                                            {Global.Language === 1 ?
                                                <Text style={styles.ItemTitleText}>1. :</Text>
                                                :
                                                <Text style={styles.ItemTitleText}>1st :</Text>
                                            }
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FIRST}</Text>
                                        </View>
                                        <View style={styles.ItemRankingContainer}>
                                            {Global.Language === 1 ?
                                                <Text style={styles.ItemTitleText}>1. %:</Text>
                                                :
                                                <Text style={styles.ItemTitleText}>1st %:</Text>
                                            }
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FIRST_PERCENTAGE}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainerForRanking}>
                                        <View style={styles.ItemRankingContainer}>
                                            {Global.Language === 1 ?
                                                <Text style={styles.ItemTitleText}>2. :</Text>
                                                :
                                                <Text style={styles.ItemTitleText}>2st :</Text>
                                            }
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].SECOND}</Text>
                                        </View>
                                        <View style={styles.ItemRankingContainer}>
                                            {Global.Language === 1 ?
                                                <Text style={styles.ItemTitleText}>2. %:</Text>
                                                :
                                                <Text style={styles.ItemTitleText}>2nd %:</Text>
                                            }
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].SECOND_PERCENTAGE}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainerForRanking}>
                                        <View style={styles.ItemRankingContainer}>
                                            {Global.Language === 1 ?
                                                <Text style={styles.ItemTitleText}>3. :</Text>
                                                :
                                                <Text style={styles.ItemTitleText}>3rd :</Text>
                                            }
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].THIRD}</Text>
                                        </View>
                                        <View style={styles.ItemRankingContainer}>
                                            {Global.Language === 1 ?
                                                <Text style={styles.ItemTitleText}>3. %:</Text>
                                                :
                                                <Text style={styles.ItemTitleText}>3rd %:</Text>
                                            }
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].THIRD_PERCENTAGE}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainerForRanking}>
                                        <View style={styles.ItemRankingContainer}>
                                            {Global.Language === 1 ?
                                                <Text style={styles.ItemTitleText}>4. :</Text>
                                                :
                                                <Text style={styles.ItemTitleText}>4th :</Text>
                                            }
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FOURTH}</Text>
                                        </View>
                                        <View style={styles.ItemRankingContainer}>
                                            {Global.Language === 1 ?
                                                <Text style={styles.ItemTitleText}>4. :</Text>
                                                :
                                                <Text style={styles.ItemTitleText}>4th %:</Text>
                                            }
                                            <Text style={styles.ItemNameText}>{getHorseInfoByID[0].FOURTH_PERCENTAGE}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Fiyat:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Price:</Text>
                                        }
                                        <View style={styles.ItemFlagNameContainer}>
                                            <NumberFormat
                                                value={getHorseInfoByID[0].PRICE}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={getHorseInfoByID[0].EARN_ICON}
                                                renderText={value => <Text style={styles.ItemNameText}>{value}</Text>}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        <Text style={styles.ItemTitleText}>Dr. Roman Miller:</Text>
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].RM}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        <Text style={styles.ItemTitleText}>ANZ:</Text>
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].ANZ}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        <Text style={styles.ItemTitleText}>PedigreeAll.com:</Text>
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].PA}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Sahip:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Owner:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].OWNER}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Yetiştirici:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Breeder:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].BREEDER}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Antrenör:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Coach:</Text>
                                        }
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].COACH}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Ölü:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Dead:</Text>
                                        }
                                        {getHorseInfoByID.IS_DEAD ?
                                            <>
                                                {Global.Language === 1 ?
                                                    <Text style={styles.ItemNameText}>Ölü</Text>
                                                    :
                                                    <Text style={styles.ItemNameText}>Dead</Text>
                                                }

                                            </>

                                            :
                                            <>
                                                {Global.Language === 1 ?
                                                    <Text style={styles.ItemNameText}>Sağ</Text>
                                                    :
                                                    <Text style={styles.ItemNameText}>Alive</Text>
                                                }
                                            </>
                                        }

                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Puan:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Point:</Text>
                                        }

                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].POINT}</Text>
                                    </View>
                                    <View style={styles.ItemContainer}>
                                        {Global.Language === 1 ?
                                            <Text style={styles.ItemTitleText}>Güncellenme Tarihi:</Text>
                                            :
                                            <Text style={styles.ItemTitleText}>Update Date:</Text>
                                        }
                                        
                                        <Text style={styles.ItemNameText}>{getHorseInfoByID[0].EDIT_DATE_TEXT}</Text>
                                    </View>


                                </>}



                        </>

                    }
                </>

            }




        </ScrollView>

    )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#fff',
    },
    scrollContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    ItemContainer: {
        padding: 5,
        marginTop: 5,
        borderBottomWidth: 0.5,
        borderColor: 'silver',

    },
    ItemContainerForRanking: {
        padding: 5,
        paddingTop: 5,
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10
    },
    ItemFlexRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        width: '100%'
    },
    ItemFlagNameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%'
    },
    ItemNameText: {
        marginLeft: 10,
        fontSize: 14
    },
    ItemIconContainer: {
        flexDirection: 'row',
        width: '20%',
    },
    ItemTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    ReadMoreButtonContainer: {
        padding: 10,
        backgroundColor: '#2169ab',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 8,
        marginLeft: 10,
        width: 100
    },
    ReadMoreText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    BackButton: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        padding: 10,
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: 'silver',
        marginBottom: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    ModalItemContainer: {
        width: '100%',
        height: '95%',

    },
    ModalContainer: {
        width: '95%',
        height: '95%',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    FullScreenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#6c6c6ca8'
    },
})