import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import { PricingCard, Card } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Global } from '../Global';

const Tab = createMaterialTopTabNavigator();
let EffectiveNick_Code_Global;

export function ThoroughbredAnalysisPriceScreen({ route, navigation: { goBack } }) {
    const { EffectiveNick_Code, EffectiveNick_Name } = route.params;
    EffectiveNick_Code_Global = EffectiveNick_Name;
    return (
        <View style={styles.Container}>
            <View>
                <TouchableOpacity
                    style={styles.BackButton}
                    onPress={() => {
                        goBack()
                    }}>
                    <Icon name="chevron-left" size={24} color="silver" style={{ alignSelf: 'center' }} />
                    {Global.Language === 1 ?
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>Geri</Text>
                        :
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
                    }

                </TouchableOpacity>

            </View>
            <View>
                {EffectiveNick_Name === "Thoroughbred" &&
                    <>
                        {Global.Language === 1 ?
                            <Text style={styles.Title}>Safkan Analizleri</Text>
                            :
                            <Text style={styles.Title}>Thoroughbred Analysis</Text>
                        }
                    </>

                    ||
                    EffectiveNick_Name === "Mare" &&
                    <>
                        {Global.Language === 1 ?
                            <Text style={styles.Title}>Kısrak Analizleri</Text>
                            :
                            <Text style={styles.Title}>Mare Analysis</Text>
                        }
                    </>

                    ||
                    EffectiveNick_Name === "Stallion" &&
                    <>
                        {Global.Language === 1 ?
                            <Text style={styles.Title}>Aygır Kayıtları</Text>
                            :
                            <Text style={styles.Title}>Stallion Registration</Text>
                        }
                    </>

                }


            </View>
            <MyTabs EffectiveNick_Code={EffectiveNick_Code} />
        </View>
    )
}

function MyTabs({ EffectiveNick_Code }) {

    const [getStandardName, setStandardName] = React.useState("")
    const [getAdvancedName, setAdvancedName] = React.useState("")
    const [getProfessionelName, setProfessionalName] = React.useState("")

    React.useEffect(() => {
        if (Global.Language === 1) {
            setStandardName("Standart")
            setAdvancedName("Gelişmiş")
            setProfessionalName("Profesyonel")
        }
        else {
            setStandardName("Standard")
            setAdvancedName("Advanced")
            setProfessionalName("Professional")
        }
    }, [])

    return (
        <Tab.Navigator
            initialRouteName="Advanced"
            removeClippedSubviews={true}
            sceneContainerStyle={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
            }}
            tabBarOptions={{
                activeTintColor: '#000',
                inactiveTintColor: '#b5b5b5',
                indicatorStyle: {
                    backgroundColor: '#2169ab'
                },
                labelStyle: {
                    fontSize: 13,
                },
                style: {
                    backgroundColor: 'white', //e8edf1
                    height: (Platform.OS === 'ios') ? 48 : 50,
                    overflow: "hidden"
                },
            }}
        >
            <Tab.Screen
                name="Standard"
                component={StandardPriceScreen}
                options={{ tabBarLabel: getStandardName }}
            />
            <Tab.Screen
                name="Advanced"
                component={AdvancedPriceScreen}
                options={{ tabBarLabel: getAdvancedName }}
            />
            <Tab.Screen
                name="Professional"
                component={ProfessionalPriceScreen}
                options={{ tabBarLabel: getProfessionelName }}
            />
        </Tab.Navigator>
    );
}

function StandardPriceScreen({ navigation }) {
    return (
        <>
            {EffectiveNick_Code_Global === "Thoroughbred" &&
                <>
                    {Global.Language === 1 ?
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#9451DA"
                            title="Standart"
                            price="$9"
                            info={[
                                'Detaylı Safkan Profili',
                                '5x Pedigree | Soyağacı',
                                'Familya Özeti',
                                '5x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Top 5 Safkan',
                                '4 Farklı Dosaj İndeks ve Mesafe Analizi']}
                            button={{ title: 'SEÇ' }}
                        />
                        : <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#9451DA"
                            title="Standard"
                            price="$9"
                            info={[
                                'Detailed Thoroughbred Profile',
                                '5x Pedigree',
                                'Family Summary',
                                '5x Linebreeding',
                                'Top 5 Horses Bred On This Cross',
                                '4 Different Dosage Index and Distance Analysis']}
                            button={{ title: 'SELECT' }}
                        />}
                </>
                ||
                EffectiveNick_Code_Global === "Mare" &&
                <>
                    {Global.Language === 1 ?
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#9451DA"
                            title="Standart"
                            price="$19"
                            info={[
                                'Detaylı Safkan Profili',
                                '5x Pedigree | Soyağacı',
                                'Familya Özeti',
                                '5x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Top 5 Safkan',
                                '4 Farklı Dosaj İndeks ve Mesafe Analizi']}
                            button={{ title: 'SEÇ' }}
                        />
                        :
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#9451DA"
                            title="Standard"
                            price="$19"
                            info={[
                                'Detailed Thoroughbred Profile',
                                '5x Pedigree',
                                'Family Summary',
                                '5x Linebreeding',
                                'Top 5 Horses Bred On This Cross',
                                '4 Different Dosage Index and Distance Analysis']}
                            button={{ title: 'SELECT' }}
                        />}
                </>
                ||
                EffectiveNick_Code_Global === "Stallion" &&
                <>
                    {Global.Language === 1 ?
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#9451DA"
                            title="Standart"
                            price="$299"
                            info={[
                                'Sınırsız Standart Rapor',
                                '1 Yıllık Ücretsiz Detaylı Aygır Aşım İlanı',
                                'Sonraki Yıllar için Yıllık Aşım İlanı 99 USD',
                                'Detaylı Safkan Profili',
                                '5x Pedigree | Soyağacı',
                                'Familya Özeti',
                                '5x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Top 5 Safkan',
                                '4 Farklı Dosaj İndeks ve Mesafe Analizi']}
                            button={{ title: 'SEÇ' }}
                        />
                        :
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#9451DA"
                            title="Standard"
                            price="$299"
                            info={[
                                'Unlimited Standard Reports',
                                '1 Year Free Detailed Stallion Ad',
                                'For Next Years Detailed Stallion Ad Fee 99 USD',
                                'Detailed Thoroughbred Profile',
                                '5x Pedigree',
                                'Family Summary',
                                '5x Linebreeding',
                                'Top 5 Horses Bred On This Cross',
                                '4 Different Dosage Index and Distance Analysis']}
                            button={{ title: 'SELECT' }}
                        />}
                </>
            }
        </>

    );
}

function AdvancedPriceScreen({ navigation }) {
    return (
        <>
            {EffectiveNick_Code_Global === "Thoroughbred" &&
                <>
                    {Global.Language === 1 ?
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#6FCFFD"
                            title="Gelişmiş"
                            price="$19"
                            info={[
                                'Standart Raporun Tamamı ile Birlikte',
                                '7x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Top 15 Safkan',
                                'Kısrak Kardeşleri',
                                'Dişi Soy | Tail Female',
                                'Taylar | Progeny']}
                            button={{ title: 'SEÇ' }}
                        />
                        :

                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#6FCFFD"
                            title="Advanced"
                            price="$19"
                            info={[
                                'Full Standard Report',
                                '7x Linebreeding',
                                'Top 15 Horses Bred On This Cross',
                                'Siblings From Mare',
                                'Tail Female',
                                'Progeny']}
                            button={{ title: 'SELECT' }}
                        />
                    }


                </>
                ||
                EffectiveNick_Code_Global === "Mare" &&
                <>
                    {Global.Language === 1 ?
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#6FCFFD"
                            title="Gelişmiş"
                            price="$29"
                            info={[
                                'Standart Raporun Tamamı ile Birlikte',
                                '7x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Top 15 Safkan',
                                'Kısrak Kardeşleri',
                                'Dişi Soy | Tail Female',
                                'Taylar | Progeny']}
                            button={{ title: 'SEÇ' }}
                        />
                        : <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#6FCFFD"
                            title="Advanced"
                            price="$29"
                            info={[
                                'Full Standard Report',
                                '7x Linebreeding',
                                'Top 15 Horses Bred On This Cross',
                                'Siblings From Mare',
                                'Tail Female',
                                'Progeny']}
                            button={{ title: 'SELECT' }}
                        />
                    }



                </>
                ||
                EffectiveNick_Code_Global === "Stallion" &&
                <>
                    {Global.Language === 1 ?
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#6FCFFD"
                            title="Gelişmiş"
                            price="$599"
                            info={[
                                'Sınırsız Gelişmiş Rapor',
                                '1 Yıllık Ücretsiz Detaylı Aygır Aşım İlanı',
                                'Sonraki Yıllar için Yıllık Aşım İlanı 199 USD',
                                'Standart Raporun Tamamı ile Birlikte',
                                '7x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Top 15 Safkan',
                                'Kısrak Kardeşleri',
                                'Dişi Soy | Tail Female',
                                'Taylar | Progeny']}
                            button={{ title: 'SEÇ' }}
                        />
                        :
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#6FCFFD"
                            title="Advanced"
                            price="$599"
                            info={[
                                'Unlimited Advanced Reports',
                                '1 Year Free Detailed Stallion Ad',
                                'For Next Years Detailed Stallion Ad Fee 199 USD',
                                'Full Standard Report',
                                '7x Linebreeding',
                                'Top 15 Horses Bred On This Cross',
                                'Siblings From Mare',
                                'Tail Female',
                                'Progeny']}
                            button={{ title: 'SELECT' }}
                        />}
                </>
            }
        </>

    );
}

function ProfessionalPriceScreen({ navigation }) {
    return (
        <>
            {EffectiveNick_Code_Global === "Thoroughbred" &&
                <>
                    {Global.Language === 1 ?

                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#5ECFB1"
                            title="Profesyonel"
                            price="$29"
                            info={[
                                'Gelişmiş Raporun Tamamı ile Birlikte',
                                '9x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Bütün Safkanlar',
                                'Aygır Kardeşleri',
                                'Kısrak Babasından Kardeşleri',
                                'Kısrak Babası Olarak Tayları']}
                            button={{ title: 'SEÇ' }}
                        />
                        :

                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#5ECFB1"
                            title="Professional"
                            price="$29"
                            info={[
                                'Full Advanced Report',
                                '9x Linebreeding',
                                'All Horses Bred On This Cross',
                                'Siblings From Sire',
                                'Siblings From Broodmare Sire',
                                'Foals As Broodmare Sire']}
                            button={{ title: 'SELECT' }}
                        />
                    }
                </>
                ||
                EffectiveNick_Code_Global === "Mare" &&
                <>
                    {Global.Language === 1 ?
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#5ECFB1"
                            title="Profesyonel"
                            price="$59"
                            info={[
                                'Gelişmiş Raporun Tamamı ile Birlikte',
                                '9x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Bütün Safkanlar',
                                'Aygır Kardeşleri',
                                'Kısrak Babasından Kardeşleri',
                                'Kısrak Babası Olarak Tayları']}
                            button={{ title: 'SEÇ' }}
                        />
                        :
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#5ECFB1"
                            title="Professional"
                            price="$59"
                            info={[
                                'Full Advanced Report',
                                '9x Linebreeding',
                                'All Horses Bred On This Cross',
                                'Siblings From Sire',
                                'Siblings From Broodmare Sire',
                                'Foals As Broodmare Sire']}
                            button={{ title: 'SELECT' }}
                        />}
                </>
                ||
                EffectiveNick_Code_Global === "Stallion" &&
                <>
                    {Global.Language === 1 ?
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#5ECFB1"
                            title="Profesyonel"
                            price="$999"
                            info={[
                                'Sınırsız Profesyonel Rapor',
                                '1 Yıllık Ücretsiz Detaylı Aygır Aşım İlanı',
                                'Sonraki Yıllar için Yıllık Aşım İlanı 299 USD',
                                'Aygırınıza Özel Alan Adı İle Web Sitesi',
                                '9x Linebreeding | Eş Soyluluk',
                                'Benzer Nickten Bütün Safkanlar',
                                'Aygır Kardeşleri',
                                'Kısrak Babasından Kardeşleri',
                                'Kısrak Babası Olarak Tayları']}
                            button={{ title: 'SEÇ' }}
                        />
                        :
                        <PricingCard
                            containerStyle={styles.PriceContainer}
                            color="#5ECFB1"
                            title="Professional"
                            price="$999"
                            info={[
                                'Unlimited Professional Reports',
                                '1 Year Free Detailed Stallion Ad',
                                'For Next Years Detailed Stallion Ad Fee 299 USD',
                                'Website with a Domain Name for Your Stallion',
                                '9x Linebreeding',
                                'All Horses Bred On This Cross',
                                'Siblings From Sire',
                                'Siblings From Broodmare Sire',
                                'Foals As Broodmare Sire']}
                            button={{ title: 'SELECT' }}
                        />}
                </>
            }
        </>

    );
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    PriceContainer: {
        height: '90%',
        width: '90%',
        justifyContent: 'center'
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
    Title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: "#2e3f6e"
    }
})