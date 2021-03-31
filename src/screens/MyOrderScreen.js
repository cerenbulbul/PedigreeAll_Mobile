import React from 'react'
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import { SearchBar, ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage'
import Icon from "react-native-vector-icons/FontAwesome5";
import Title from '../components/Title';
import RBSheet from "react-native-raw-bottom-sheet";
import { DataTable } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ToastAndroid } from 'react-native';
import { Global } from '../Global';



const PageCountData = [
    {
        id: 1,
        pageCount: 25
    },
    {
        id: 2,
        pageCount: 50
    },
    {
        id: 3,
        pageCount: 100
    },
    {
        id: 4,
        pageCount: 200
    },
    {
        id: 5,
        pageCount: 500
    },

]

export function MyOrderScreen() {

    const BottomSheetSmall = React.useRef();
    const BottomSheetLong = React.useRef();

    const [getTotalCost, setTotalCost] = React.useState(0);

    const [getMyOrders, setMyOrders] = React.useState()
    const [getMyOrdersDetail, setMyOrdersDetail] = React.useState()
    const [searchValue, setSearchValue] = React.useState()
    const [getPageCount, setPageCount] = React.useState(25);

    const readGetMyOrders = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/Order/GetMyOrders?p_iPageNo=' + 0 + '&p_iPageCount=' + getPageCount, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setMyOrders(json.m_cData)
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

    const readGetMyOrdersDetail = async (orderID) => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                fetch('https://api.pedigreeall.com/OrderDetail/GetMyOrdersDetails?p_iOrderId=' + orderID, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + token,
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        setMyOrdersDetail(json.m_cData)
                        let TotalCost = 0;
                        for(let i=0; i<json.m_cData.length; i++) {
                            TotalCost += json.m_cData[i].COST_USD
                        }
                        console.log(TotalCost)
                        setTotalCost(TotalCost)
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
        readGetMyOrders();
    }, [])


    return (
        <View style={styles.Container}>
            {Global.Language===1?
            <Title text="Siparişlerim" />
            :
            <Title text="My Orders" />
            }
            
            <RBSheet
                ref={BottomSheetSmall}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={300}
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
                        BottomSheetSmall.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>

                    <ScrollView>
                        {PageCountData.map((item, index) => (
                            <ListItem
                                key={index}
                                bottomDivider
                                onPress={() => {
                                    BottomSheetSmall.current.close()
                                    setPageCount(item.pageCount)
                                    readGetMyOrders();
                                }}>
                                <ListItem.Content>
                                    <ListItem.Title>{item.pageCount}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </ScrollView>

                </View>
            </RBSheet>

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
                        BottomSheetLong.current.close()
                    }}
                    style={styles.SwipableCloseIcon}>
                    <Icon name="times" size={20} color="#adb5bd" />
                </TouchableOpacity>
                <View>
                    {console.log(getMyOrdersDetail)}
                    {getMyOrdersDetail !== undefined &&
                    
                    <ScrollView>
                        {getMyOrdersDetail.map((item,index)=>(
                            <View
                                style={styles.MyOrderDetailContainer} 
                                key={index}>
                                <Text style={styles.MyOrderText}>{item.PRODUCT.PRODUCT_EN}</Text>
                                <Text style={styles.MyOrderText}>{item.INFO}</Text>
                                <Text style={styles.MyOrderText}>{item.COST_TL} TL</Text>
                                <Text style={styles.MyOrderText}>{item.COST_USD} USD</Text>
                            </View>
                        ))}
                    </ScrollView>
                    }
                    
                    <View style={styles.TotalCostContainer}>
                        <Text style={styles.TotalCostText}>Total Cost: {getTotalCost} USD</Text>
                    </View>
                    
                   

                </View>
            </RBSheet>

            <View style={styles.SortTypeContainer}>
                <TouchableOpacity
                    style={styles.SortTypeButton}
                    onPress={() => {
                        BottomSheetSmall.current.open();
                    }}>
                    <Icon name="caret-down" size={16} color="#fff" style={{ alignSelf: 'center', marginRight: 5 }} />
                    <Text style={styles.SortTypeButtonText}>{getPageCount}</Text>
                </TouchableOpacity>
            </View>

            <SearchBar
                placeholder={searchValue}
                lightTheme
                platform="ios"
                cancelButtonTitle=""
                inputStyle={{ fontSize: 12, minHeight: 'auto', height: 36 }}
                containerStyle={{ backgroundColor: 'transparent', }}
                inputContainerStyle={{ backgroundColor: 'rgb(232, 237, 241)', minHeight: 'auto', height: 'auto' }}
                rightIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                leftIconContainerStyle={{ margin: 0, padding: 0, minHeight: 'auto', height: 'auto' }}
                value={searchValue}
                onChangeText={setSearchValue}
                onSubmitEditing={() => {
                    //SetisLoading(true);
                    readGetMyOrders();
                }}
                showLoading={true}
            />

            <ScrollView>
                <ScrollView horizontal={true}>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{ width: 120 }}>Detay</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>Sipariş No</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>Toplam</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>Oluşturma Tarihi</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>Ödeme Tarihi</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>Ödeme Şekli</DataTable.Title>
                            <DataTable.Title style={{ width: 120 }}>Durum</DataTable.Title>
                        </DataTable.Header>

                        {getMyOrders !== undefined &&

                            <>
                                {getMyOrders.map((item, i) => (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell
                                            onPress={() => {
                                                readGetMyOrdersDetail(item.ORDER_ID)
                                                BottomSheetLong.current.open()
                                            }}
                                            style={{ width: 120 }}>
                                            <Icon name="caret-right" size={16} color="#000"
                                            />
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ width: 120 }}># {item.ORDER_ID}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 120 }}>{item.COST_TL} {item.CURRENCY.ICON}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 120 }}>{item.CREATE_DATE.substring(0, 10)}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 120 }}>{item.PAYMENT_DATE.substring(0, 10)}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 120 }}>{item.PAYMENT_TYPE.PAYMENT_TYPE_EN}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 120 }}>{item.ORDER_STATUS.ORDER_STATUS_EN}</DataTable.Cell>

                                    </DataTable.Row>
                                )
                                )}
                            </>

                        }
                    </DataTable>

                </ScrollView>
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
    SwipableCloseIcon: {
        width: '100%',
        flexDirection: 'row-reverse',
        marginRight: -25,
    },
    SortTypeContainer: {
        width: '100%',
        padding: 10,
        paddingRight: 15,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    SortTypeButton: {
        flexDirection: 'row',
        backgroundColor: '#2169ab',
        padding: 10,
        borderRadius: 6,
        elevation: 10,
        width: '20%'
    },
    SortTypeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    MyOrderDetailContainer:{
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        alignSelf:'center',
        borderBottomWidth:0.5,
        borderColor:'silver'
        
    },
    MyOrderText:{
        width:'24%',
        textAlign:'center',
        
    },
    TotalCostContainer:{
        width:'100%',
        marginVertical:10,
        
    },
    TotalCostText:{
        fontWeight:'700',
        fontSize:16,
        alignSelf:'flex-end',
        marginRight:20
    }
})