import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity,Dimensions } from 'react-native'
import { PricingCard, Card, ListItem } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Global } from '../Global';

export function StandardThoroughbredAnalysisScreen({ route,navigation }) {
    const { EffectiveNick_Code , EffectiveNick_Name} = route.params;
    const [openModal, setOpenModal] = React.useState(false);
    const readDataPaymentTypeList = async (data) => {
        fetch('https://api.pedigreeall.com/Page/Get', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.m_cData)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const StandardThoroughbredList = [
        {
            text:"Detailed Thoroughbred Profile"
        },
        {
            text:"5x Pedigree"
        },
        {
            text:"Family Summary"
        },
        {
            text:"5x Linebreeding"
        },
        {
            text:"Top 5 Horses Bred On This Cross"
        },
        {
            text:"4 Different Dosage Index and Distance Analysis"
        }
    ]

    const AdvancedThoroughbredList = [
        {
            text:"Full Standard Report"
        },
        {
            text:"Detailed Thoroughbred Profile"
        },
        {
            text:"5x Pedigree"
        },
        {
            text:"7x Linebreeding"
        },
        {
            text:"Top 15 Horses Bred On This Cross"
        },
        {
            text:"Family Summary"
        },
        {
            text:"4 Different Dosage Index and Distance Analysis"
        },
        {
            text:"Siblings From Mare"
        },
        {
            text:"Tail Female"
        },
        {
            text:"Progeny"
        }
    ]
    const ProfessionalThoroughbredList = [
        {
            text:"Full Standard Report"
        },
        {
            text:"Detailed Thoroughbred Profile"
        },
        {
            text:"5x Pedigree"
        },
        {
            text:"9x Linebreeding"
        },
        {
            text:"All Horses Bred On This Cross"
        },
        {
            text:"Family Summary"
        },
        {
            text:"4 Different Dosage Index and Distance Analysis"
        },
        {
            text:"Siblings From Mare"
        },
        {
            text:"Tail Female"
        },
        {
            text:"Progeny"
        },
        {
            text:"Siblings From Sire"
        },
        {
            text:"Siblings From Broodmare Sire"
        },
        {
            text:"Foals As Broodmare Sire"
        }
    ]

    const StandardStallionList = [
        {
            text:"Unlimited Standart Reports"
        },
        {
            text:"1 Year Free Detailed Stallion Ad"
        },
        {
            text:"For Next Years Detailed Stallion Ad Fee 99 USD"
        },
        {
            text:"Detailed Thoroughbred Profile"
        },
        {
            text:"5x Pedigree"
        },
        {
            text:"Family Summary"
        },
        {
            text:"5x Linebreeding"
        },
        {
            text:"Top 5 Horses Bred On This Cross"
        },
        {
            text:"4 Different Dosage Index and Distance Analysis"
        }
    ]
    const AdvancedStallionList = [
        {
            text:"Unlimited Standart Reports"
        },
        {
            text:"1 Year Free Detailed Stallion Ad"
        },
        {
            text:"For Next Years Detailed Stallion Ad Fee 99 USD"
        },
        {
            text:"Detailed Thoroughbred Profile"
        },
        {
            text:"5x Pedigree"
        },
        {
            text:"Family Summary"
        },
        {
            text:"7x Linebreeding"
        },
        {
            text:"Top 15 Horses Bred On This Cross"
        },
        {
            text:"4 Different Dosage Index and Distance Analysis"
        },
        {
            text:"Full Standard Report"
        },
        {
            text:"Siblings From Mare"
        },
        {
            text:"Tail Female"
        },
        {
            text:"Progeny"
        }
    ]

    const ProfessionalStallionList = [
        {
            text:"Unlimited Standart Reports"
        },
        {
            text:"1 Year Free Detailed Stallion Ad"
        },
        {
            text:"For Next Years Detailed Stallion Ad Fee 99 USD"
        },
        {
            text:"Detailed Thoroughbred Profile"
        },
        {
            text:"5x Pedigree"
        },
        {
            text:"Family Summary"
        },
        {
            text:"9x Linebreeding"
        },
        {
            text:"All Horses Bred On This Cross"
        },
        {
            text:"4 Different Dosage Index and Distance Analysis"
        },
        {
            text:"Full Standard Report"
        },
        {
            text:"Siblings From Sire"
        },
        {
            text:"Siblings From Broodmare Sire"
        },
        {
            text:"Foals As Broodmare Sire"
        },
        {
            text:"Website with a Domain Name for Your Stallion"
        }
    
    ]

    React.useEffect(() => {
        readDataPaymentTypeList();
    }, [])



    return (
        <View style={styles.Container}>
            <ScrollView>
                <Card>
                    {EffectiveNick_Code === "StandardThoroughbred" &&
                    <Card.Title style={styles.CardTitle}>Standard Thoroughbred Analysis</Card.Title>
                    || 
                    EffectiveNick_Code === "AdvancedThoroughbred" &&
                    <Card.Title style={styles.CardTitle}>Advanced Thoroughbred Analysis</Card.Title>
                    ||
                    EffectiveNick_Code === "ProfessionalThoroughbred" &&
                    <Card.Title style={styles.CardTitle}>Professional Thoroughbred Analysis</Card.Title>
                    ||
                    EffectiveNick_Code === "StandardMare" &&
                    <Card.Title style={styles.CardTitle}>Standard Mare Analysis</Card.Title>
                    ||
                    EffectiveNick_Code === "AdvancedMare" &&
                    <Card.Title style={styles.CardTitle}>Advanced Mare Analysis</Card.Title>
                    ||
                    EffectiveNick_Code === "ProfessionalMare" &&
                    <Card.Title style={styles.CardTitle}>Professional Mare Analysis</Card.Title>
                    ||
                    EffectiveNick_Code === "StandartStallion" &&
                    <Card.Title style={styles.CardTitle}>Standard Stallion Registration</Card.Title>
                    ||
                    EffectiveNick_Code === "AdvancedStallion" &&
                    <Card.Title style={styles.CardTitle}>Advanced Stallion Registration</Card.Title>
                    ||
                    EffectiveNick_Code === "ProfessionalStallion" &&
                    <Card.Title style={styles.CardTitle}>Professional Stallion Registration</Card.Title>
                    }
                    
                    <View style={styles.PaymentContainer}>
                        <View style={styles.ImageContainer}>
                            <Image
                                style={styles.PaymentBookImage}
                                source={{
                                    uri:
                                        'https://www.pedigreeall.com/images/cover.jpg',
                                }}
                            />
                            
                        </View>
                        
                        <View>
                            {EffectiveNick_Code === "StandardThoroughbred" &&
                                <Text style={styles.PriceText}>$9</Text>
                            ||
                            EffectiveNick_Code === "AdvancedThoroughbred" &&
                                <Text style={styles.PriceText}>$19</Text>
                            ||
                            EffectiveNick_Code === "ProfessionalThoroughbred" &&
                                <Text style={styles.PriceText}>$29</Text>
                            ||
                            EffectiveNick_Code === "StandardMare" &&
                                <Text style={styles.PriceText}>$19</Text>
                            ||
                            EffectiveNick_Code === "AdvancedMare" &&
                                <Text style={styles.PriceText}>$29</Text>
                            ||
                            EffectiveNick_Code === "ProfessionalMare" &&
                                <Text style={styles.PriceText}>$39</Text>
                            ||
                            EffectiveNick_Code === "StandartStallion" &&
                                <Text style={styles.PriceText}>$299</Text>
                            ||
                            EffectiveNick_Code === "AdvancedStallion" &&
                                <Text style={styles.PriceText}>$599</Text>
                            ||
                            EffectiveNick_Code === "ProfessionalStallion" &&
                                <Text style={styles.PriceText}>$999</Text>
                            }
                            
                            <View style={styles.ButtonContainer}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                        navigation.navigate('ThoroughbredStallionsSearch')
                                    }}
                                    style={[styles.Button,{backgroundColor:'#4DB7FE'}]}>
                                    <Icon style={{alignSelf:'center'}} name="eye" size={16} color="#fff" />
                                    <Text style={styles.ButtonText}>View Sample Report</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.Button,{backgroundColor:'#2e3f6e'}]}>
                                    <Icon style={{alignSelf:'center'}} name="shopping-basket" size={16} color="#fff" />
                                    <Text style={styles.ButtonText}>Build Report</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.BoldText,{textAlign:'center'}]}>Available for any horse or hypothetical mating.</Text>
                            <Text style={[styles.Text,{textAlign:'center'}]}>Reports are created after the data of the relevant pedigree are compiled and checked by our data experts.</Text>
                            {EffectiveNick_Code === "StandardThoroughbred" &&
                            <View style={styles.ListViewContainer}>
                                {StandardThoroughbredList.map((item,index)=>(
                                    <View
                                        style={styles.ListItemContainer} 
                                        key={index}>
                                        <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                                        <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                                    </View>
                                ))}
                            </View>
                            ||
                            EffectiveNick_Code === "AdvancedThoroughbred" &&
                            <View style={styles.ListViewContainer}>
                                {AdvancedThoroughbredList.map((item,index)=>(
                                    <View
                                        style={styles.ListItemContainer} 
                                        key={index}>
                                        <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                                        <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                                    </View>
                                ))}
                            </View>
                            ||
                            EffectiveNick_Code === "ProfessionalThoroughbred" &&
                            <View style={styles.ListViewContainer}>
                                {ProfessionalThoroughbredList.map((item,index)=>(
                                    <View
                                        style={styles.ListItemContainer} 
                                        key={index}>
                                        <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                                        <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                                    </View>
                                ))}
                            </View>
                            ||
                            EffectiveNick_Code === "StandardMare" &&
                            <View style={styles.ListViewContainer}>
                                {StandardThoroughbredList.map((item,index)=>(
                                    <View
                                        style={styles.ListItemContainer} 
                                        key={index}>
                                        <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                                        <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                                    </View>
                                ))}
                            </View>
                            ||
                            EffectiveNick_Code === "AdvancedMare" &&
                            <View style={styles.ListViewContainer}>
                                {AdvancedThoroughbredList.map((item,index)=>(
                                    <View
                                        style={styles.ListItemContainer} 
                                        key={index}>
                                        <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                                        <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                                    </View>
                                ))}
                            </View>
                            ||
                            EffectiveNick_Code === "ProfessionalMare" &&
                            <View style={styles.ListViewContainer}>
                                {ProfessionalThoroughbredList.map((item,index)=>(
                                    <View
                                        style={styles.ListItemContainer} 
                                        key={index}>
                                        <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                                        <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                                    </View>
                                ))}
                            </View>
                           ||EffectiveNick_Code === "StandartStallion" &&
                           <View style={styles.ListViewContainer}>
                           {StandardStallionList.map((item,index)=>(
                               <View
                                   style={styles.ListItemContainer} 
                                   key={index}>
                                   <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                                   <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                               </View>
                           ))}
                       </View>
                           || EffectiveNick_Code === "AdvancedStallion" &&
                           <View style={styles.ListViewContainer}>
                           {AdvancedStallionList.map((item,index)=>(
                               <View
                                   style={styles.ListItemContainer} 
                                   key={index}>
                                   <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                                   <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                               </View>
                           ))}
                       </View>
                       || EffectiveNick_Code === "ProfessionalStallion" &&
                       <View style={styles.ListViewContainer}>
                       {ProfessionalStallionList.map((item,index)=>(
                           <View
                               style={styles.ListItemContainer} 
                               key={index}>
                               <Icon style={{alignSelf:'center'}} name="caret-right" size={16} color="#2e3f6e" />
                               <Text style={[styles.Text,{marginLeft:10}]}>{item.text}</Text>
                           </View>
                            ))}
                        </View>
                           }
                        </View>
                    
                        
                    </View>

                </Card>
                
                <View style={styles.OpenPriceBoxButtonContainer}>
                    <TouchableOpacity
                    style={styles.OpenPriceBoxButton}
                    onPress={() => {
                        navigation.navigate('ThoroughbredAnalysisPrice',{
                            EffectiveNick_Code:EffectiveNick_Code,
                            EffectiveNick_Name:EffectiveNick_Name
                        });
                    }}>
                        {EffectiveNick_Name === "Thoroughbred" &&
                            <Text style={styles.OpenPriceBoxButtonText}>Thoroughbred Analysis Price</Text>
                        ||
                        EffectiveNick_Name === "Mare" &&
                        <Text style={styles.OpenPriceBoxButtonText}>Mare Analysis Price</Text>
                        ||
                        EffectiveNick_Name === "Stallion" &&
                        <Text style={styles.OpenPriceBoxButtonText}>Stallion Analysis Price</Text>
                        }
                    
                </TouchableOpacity>
                </View>
                




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
    PaymentContainer: {
        alignSelf:'center',
        alignItems:'center'
    },
    ImageContainer: {
        padding: 5,
        alignItems:'center',
        borderWidth:0.5,
        borderColor:'silver',
        elevation:10
    },
    PaymentBookImage: {
        width: 150,
        height: 200,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: '#6c6c6ca8'
      },
      FullScreenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: "#000",
      },
      PricingCardContainer:{
          width:Dimensions.get('window').width-30,
          height:500
      },
      PriceText:{
          textAlign:'center',
          fontSize:18,
          fontWeight:'700',
          color:'#2e3f6e',
          marginVertical:5,
      },
      CardTitle:{
          fontSize:20,
          color:'#2e3f6e'
      },
      BoldText:{
          marginVertical:5,
          fontWeight:'700'
      },
      ListViewContainer:{
        marginVertical:20
      },
      ListItemContainer:{
          flexDirection:'row',
          marginVertical:10
      },
      ButtonContainer:{
          marginVertical:10,
          flexDirection:'row',
          justifyContent:'space-between'
      },
      Button:{
          padding:10,
          borderWidth:0.5,
          borderColor:'silver',
          borderRadius:8,
          elevation:6,
          flexDirection:'row',
      },
      ButtonText:{
          fontSize:14,
          fontWeight:'700',
          color:'#fff',
          textAlign:'center',
          marginLeft:5
      },
      OpenPriceBoxButtonContainer:{
        marginVertical:10,
        padding:10
      },
      OpenPriceBoxButton:{
          backgroundColor:"#2169ab",
          padding:10,
          borderRadius:8,
          borderWidth:0.5,
          borderColor:'silver',
          elevation:8
      },
      OpenPriceBoxButtonText:{
          color:'#fff',
          fontSize:16,
          fontWeight:'700',
          textAlign:'center'
      }
})