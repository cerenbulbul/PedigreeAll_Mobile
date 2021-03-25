import React from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Global } from '../Global'
import Icon from "react-native-vector-icons/FontAwesome5";
import Flag from "react-native-flags";


export function HorseDetailScreenFemaleFamily({ BackButton, navigation }) {


    const [time, setTime] = React.useState(true)
    const [getFemaleFamilyReport, setFemaleFamilyReport] = React.useState();
    const [upward, setUpward] = React.useState(false);

    const readFemaleFamilyReport = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/FemaleFamily/GetFemaleFamilyReport?p_iFirstId=' + Global.Horse_ID + '&p_iSecondId=' + Global.Horse_Second_ID_Female_Family + '&p_iDamCount=' + Global.Generation + '&p_iGenerationCount=' + Global.MinCross_Fename_Family, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Global.Token,
                    },
                }).then((response) => response.json())
                    .then((json) => {
                        if (json !== null) {
                            console.log(json.m_cData)
                            setFemaleFamilyReport(json.m_cData)
                            setTime(false);
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
            console.log("GetFemaleFamilyReport Error")
        }
    };
    React.useEffect(() => {
        readFemaleFamilyReport();
    }, [])


    return (
        <View style={styles.Container}>

            {BackButton?
                <View>
                    <TouchableOpacity
                        style={styles.BackButton}
                        onPress={() => {
                            navigation.navigate('Breeders', {
                                ScreenName: "TreeViewScreen",
                            })
                        }}>
                        <Icon name="chevron-left" size={24} color="silver" style={{ alignSelf: 'center' }} />
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                    </TouchableOpacity>

                </View>
                :
                null}

            {time ?
                <ActivityIndicator size="large" color="#000" />
                :
                <>
                    {getFemaleFamilyReport !== undefined &&
                        <ScrollView>
                            {console.log(getFemaleFamilyReport)}
                            {getFemaleFamilyReport.HORSE_INFO_LIST.map((item, index) => (
                                <View
                                    style={styles.NodeOfTreeContainer}
                                    key={index}>
                                    {item.HORSE_INFO_OBJECT.IS_SIRE ?
                                        <View
                                            style={styles.NodeOfTreeSire}>
                                            <View style={styles.TitleContainer}>
                                                <Flag code={item.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={24} style={styles.IconStyle} />
                                                <Text style={styles.TitleStyle}>{item.HORSE_INFO_OBJECT.HORSE_NAME.replace('<b>', '').replace('</b>', '')}</Text>
                                            </View>
                                            <Text style={styles.TextStyle}>by {item.HORSE_INFO_OBJECT.FATHER_NAME}</Text>
                                            <View style={styles.InformationIconContainer}>
                                                <Icon name="male" size={14} color="#000" style={{ marginRight: 5 }} />
                                                <Icon name="exclamation-circle" size={14} color="#000" style={{ marginRight: 5 }} />
                                                <Icon name="image" size={14} color="#000" style={{ marginRight: 5 }} />
                                                <Icon name="chart-line" size={16} color="#000"></Icon>
                                            </View>
                                        </View>
                                        :
                                        <View
                                            style={styles.NodeOfTreeNotSire}>
                                            <View style={styles.TitleContainer}>
                                                <Flag code={item.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={24} style={styles.IconStyle} />
                                                <Text style={styles.TitleStyle}>{item.HORSE_INFO_OBJECT.HORSE_NAME.replace('<b>', '').replace('</b>', '')}</Text>
                                            </View>
                                            <Text style={styles.TextStyle}>by {item.HORSE_INFO_OBJECT.FATHER_NAME}</Text>
                                            <View style={styles.InformationIconContainer}>
                                                <TouchableOpacity>
                                                    <Icon name="female" size={14} color="#000" style={{ marginRight: 5 }} />
                                                </TouchableOpacity>

                                                <Icon name="exclamation-circle" size={14} color="#000" style={{ marginRight: 5 }} />
                                                <Icon name="image" size={14} color="#000" style={{ marginRight: 5 }} />
                                                <Icon name="chart-line" size={16} color="#000"></Icon>
                                            </View>
                                        </View>

                                    }


                                    {item.CHILDREN_LIST.map((itemChildren, indexChildren) => (
                                        <View
                                            style={styles.LeafOfTreeContainer}
                                            key={indexChildren}>
                                            {itemChildren.HORSE_INFO_OBJECT.IS_SIRE ?
                                                <View style={styles.ChildrenCotainer}>
                                                    <Icon style={styles.icon} name="long-arrow-alt-right" size={16} color="#2e3f6e" style={styles.IconStyle} />
                                                    <View
                                                        style={styles.LeafOfTreeSire}>
                                                        <View style={styles.TitleContainer}>
                                                            <Flag code={itemChildren.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={24} style={styles.IconStyle} />
                                                            <Text style={styles.TitleStyle}>{itemChildren.HORSE_INFO_OBJECT.HORSE_NAME.replace('<b>', '').replace('</b>', '')}</Text>
                                                        </View>
                                                        <Text style={styles.TextStyle}>by {item.HORSE_INFO_OBJECT.FATHER_NAME}</Text>
                                                        <View style={styles.InformationIconContainer}>
                                                            <Icon name="male" size={14} color="#000" style={{ marginRight: 5 }} />
                                                            <Icon name="exclamation-circle" size={14} color="#000" style={{ marginRight: 5 }} />
                                                            <Icon name="image" size={14} color="#000" style={{ marginRight: 5 }} />
                                                            <Icon name="chart-line" size={16} color="#000"></Icon>
                                                        </View>
                                                    </View>
                                                </View>

                                                :
                                                <View style={styles.ChildrenCotainer}>
                                                    <Icon style={styles.icon} name="long-arrow-alt-right" size={16} color="#2e3f6e" style={styles.IconStyle} />
                                                    <View
                                                        style={styles.LeafOfTreeNotSire}>
                                                        <View style={styles.TitleContainer}>
                                                            <Flag code={itemChildren.HORSE_INFO_OBJECT.ICON.toUpperCase()} size={24} style={styles.IconStyle} />
                                                            <Text style={styles.TitleStyle}>{itemChildren.HORSE_INFO_OBJECT.HORSE_NAME.replace('<b>', '').replace('</b>', '')}</Text>
                                                        </View>
                                                        <Text style={styles.TextStyle}>by {item.HORSE_INFO_OBJECT.FATHER_NAME}</Text>
                                                        <View style={styles.InformationIconContainer}>
                                                            <Icon name="female" size={14} color="#000" style={{ marginRight: 5 }} />
                                                            <Icon name="exclamation-circle" size={14} color="#000" style={{ marginRight: 5 }} />
                                                            <Icon name="image" size={14} color="#000" style={{ marginRight: 5 }} />
                                                            <Icon name="chart-line" size={16} color="#000"></Icon>
                                                        </View>
                                                    </View>
                                                </View>

                                            }

                                        </View>
                                    ))}


                                </View>
                            ))}
                        </ScrollView>

                    }
                </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    NodeOfTreeContainer: {
        padding: 20
    },
    NodeOfTreeSire: {
        padding: 20,
        backgroundColor: '#b9cdf5',
        borderRadius: 10,
        width: '100%',
    },
    NodeOfTreeNotSire: {
        padding: 20,
        backgroundColor: '#f8cdff',
        borderRadius: 10,
        width: '100%',
    },
    LeafOfTreeContainer: {
        padding: 5,
        marginLeft: 20,
    },
    ChildrenCotainer: {
        flexDirection: 'row',
    },
    LeafOfTreeSire: {
        padding: 8,
        backgroundColor: '#b9cdf5',
        borderRadius: 10,
        marginLeft: 5,
        width: '95%',
    },
    LeafOfTreeNotSire: {
        padding: 8,
        backgroundColor: '#f8cdff',
        borderRadius: 10,
        marginLeft: 5,
        width: '95%',
    },
    IconStyle: {
        alignSelf: 'center'
    },
    TitleContainer: {
        flexDirection: 'row'
    },
    TitleStyle: {
        marginLeft: 10,
        width: '90%',
        fontSize: 14,
        fontWeight: '700'
    },
    InformationIconContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10
    },
    BackButton:{
        flexDirection:'row',
        alignSelf:'baseline',
        padding:10,
        width:'100%',
        borderBottomWidth:0.5, 
        borderColor:'silver',
        marginBottom:10
      },
})