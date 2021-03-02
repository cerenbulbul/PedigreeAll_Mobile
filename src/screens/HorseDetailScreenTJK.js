import React from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity, Modal, Linking } from 'react-native'
import { Global } from '../Global'
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import WebView from 'react-native-webview';


export function HorseDetailScreenTJK({navigation}) {
  const [getTJKReport, setTJKReport] = React.useState();
  const [time, setTime] = React.useState(true);
  const [moreDetail, setMoreDetail] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(false);
  const [videoURL, setVideoURL] = React.useState();
  const [imageURL, setImageURL] = React.useState();

  const readTJKReport = async () => {
    try {
      if (Global.Token !== null) {
        fetch('https://api.pedigreeall.com/Tjk/Get?p_iTjkId=' + Global.TJK_ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + Global.Token,
          },
        }).then((response) => response.json())
          .then((json) => {
            if (json !== null) {
              setTJKReport(json)
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
      console.log("setTJKReport Error")
    }
  };
  React.useEffect(() => {
    readTJKReport();
  }, [])

  const OpenURLButton = ({ url }) => {
    const handlePress = React.useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Icon onPress={handlePress} name="video" size={20} color="#000" />;
  };




  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showImage}>
        <View style={styles.centeredView}>
          <View style={[styles.FullScreenContainer]}>
            <View style={{ width: '100%', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setShowImage(false);
                }}>
                <Icon name="times" size={26} color="silver" />
              </TouchableOpacity>
            </View>
            {imageURL !== undefined ?
              <Image style={styles.HorseImage} source={{ uri: imageURL }} />
              :
              <Text>No Image</Text>}


          </View>
        </View>
      </Modal>

      <>
        {moreDetail ?
          <>
            <TouchableOpacity
              onPress={() => {
                setMoreDetail(false);
              }}
              style={styles.BackButton}>
              <Icon name="chevron-left" size={24} color="silver" style={{ alignSelf: 'center' }} />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>Back</Text>
            </TouchableOpacity>

            <ScrollView>
              {getTJKReport !== undefined &&

                <ScrollView horizontal>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Video</DataTable.Title>
                      <DataTable.Title>Image</DataTable.Title>
                      <DataTable.Title>Date</DataTable.Title>
                      <DataTable.Title>City</DataTable.Title>
                      <DataTable.Title>Distance</DataTable.Title>
                      <DataTable.Title>Runway</DataTable.Title>
                      <DataTable.Title>S</DataTable.Title>
                      <DataTable.Title>Degree</DataTable.Title>
                      <DataTable.Title>Kg</DataTable.Title>
                      <DataTable.Title>Taki</DataTable.Title>
                      <DataTable.Title>Jockey</DataTable.Title>
                      <DataTable.Title>St</DataTable.Title>
                      <DataTable.Title>Gny</DataTable.Title>
                      <DataTable.Title>Group</DataTable.Title>
                      <DataTable.Title>K.No-K.Adı</DataTable.Title>
                      <DataTable.Title>K. Cinsi</DataTable.Title>
                      <DataTable.Title>Coach</DataTable.Title>
                      <DataTable.Title>Owner</DataTable.Title>
                      <DataTable.Title>	HP</DataTable.Title>
                      <DataTable.Title>Bonus</DataTable.Title>
                      <DataTable.Title>S20</DataTable.Title>
                    </DataTable.Header>

                    {getTJKReport[0].HORSE_TABLE.map((item, index) => (
                      <DataTable.Row key={index}>
                        <DataTable.Cell
                          style={styles.TableCellStyle}
                          onPress={() => {
                            const supported = Linking.canOpenURL(item.VIDEO.replace('amp;', ''));
                            if (supported) {
                              Linking.openURL(item.VIDEO.replace('amp;', ''));
                            } else {
                              Alert.alert(`Don't know how to open this URL: ${item.VIDEO.replace('amp;', '')}`);
                            }
                          }}>
                          <Icon name="video" size={20} color="#000" />

                        </DataTable.Cell>
                        <DataTable.Cell
                          onPress={() => {
                            setImageURL(item.FOTO)
                            setShowImage(true);
                          }}
                          style={styles.TableCellStyle}>
                          <Icon name="image" size={20} color="#000" />
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.TARIH}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.SEHIR}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.MESAFE}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.PIST}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.S}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.DERECE}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.KG}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.TAKI}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.JOKEY}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.ST}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.GNY}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.GRUP}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.K_NO_K_ADI}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.K_CINS}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.ANTRENOR}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.SAHIP}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.HP}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.IKRAMIYE}</DataTable.Cell>
                        <DataTable.Cell style={styles.TableCellStyle}>{item.S_20}</DataTable.Cell>
                      </DataTable.Row>
                    ))}



                  </DataTable>

                </ScrollView>



              }
            </ScrollView>



          </>
          :

          <>
            <Image style={styles.TJKImage} source={{ uri: 'https://medya-cdn.tjk.org/medyaftp/site_img/logo-tjk.png' }} />

            {time ?
              <ActivityIndicator size="large" color="#000" />

              :
              <ScrollView>
                {getTJKReport !== undefined &&

                  <ScrollView horizontal>

                    <View style={styles.rowView}>

                      <View style={styles.columnView}>
                        <Text style={styles.TableTitle}> </Text>
                        {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                          <Text key={index} style={styles.TableTitle}>{item.BASLIK}</Text>
                        ))}
                      </View>
                      <View style={styles.columnView}>
                        <Text style={styles.TableTitle}>K.</Text>
                        {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                          <Text key={index} style={styles.TableText}>{item.K}</Text>
                        ))}
                      </View>
                      <View style={styles.columnView}>
                        <Text style={styles.TableTitle}>1st</Text>
                        {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                          <Text key={index} style={styles.TableText}>{item.BIRINCILIK}</Text>
                        ))}
                      </View>
                      <View style={styles.columnView}>
                        <Text style={styles.TableTitle}>2nd</Text>
                        {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                          <Text key={index} style={styles.TableText}>{item.IKINCILIK}</Text>
                        ))}
                      </View>
                      <View style={styles.columnView}>
                        <Text style={styles.TableTitle}>3rd</Text>
                        {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                          <Text key={index} style={styles.TableText}>{item.UCUNCULUK}</Text>
                        ))}
                      </View>
                      <View style={styles.columnView}>
                        <Text style={styles.TableTitle}>4th</Text>
                        {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                          <Text key={index} style={styles.TableText}>{item.DORDUNCULUK}</Text>
                        ))}
                      </View>
                      <View style={styles.columnView}>
                        <Text style={styles.TableTitle}>Earn</Text>
                        {getTJKReport[0].HORSE_HEADER.map((item, index) => (
                          <Text key={index} style={styles.TableText}>{item.KAZANC}</Text>
                        ))}
                      </View>
                    </View>

                  </ScrollView>

                }

                <TouchableOpacity
                  onPress={() => {
                    setMoreDetail(true);
                  }}
                  style={styles.MoreDetailButton}>
                  <Text style={styles.MoreDetailButtonText}>More Detail ...</Text>
                </TouchableOpacity>
              </ScrollView>
            }
          </>
        }
      </>


    </View >
  )
}

const styles = StyleSheet.create({
  TableTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  TableText: {
    textAlign: 'center',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 20,
  },
  columnView: {
    flexDirection: 'column',
    margin: 12
  },
  TJKImage: {
    width: 150,
    height: 150,
    alignSelf: 'center'
  },
  MoreDetailButton: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#2169ab',
    borderRadius: 10,
    marginVertical: 20
  },
  MoreDetailButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
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
  TableCellStyle: {
    width: 90,
  },
  FullScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: "#000",
  },
  HorseImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
    marginBottom: 20
  }
})