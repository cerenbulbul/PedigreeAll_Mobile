import React from 'react'
import { View, Text, ScrollView, ActivityIndicator , StyleSheet} from 'react-native'
import { DataTable } from 'react-native-paper';
import { Global } from '../Global';

export function HypotheticalSearchScreenMareSiblings() {
    const [time, setTime] = React.useState(true);
    const [getSiblingMare,setSiblingMare ] =React.useState();
    const readSiblingMare = async () => {
        try {
            if (Global.Token !== null) {
                fetch('https://api.pedigreeall.com/Sibling/GetSiblingFromMother?p_iHorseId=' + -1, {
                method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + Global.Token,
                  },
                }).then((response) => response.json())
                  .then((json) => {
                    if (json !== null) {
                      setSiblingMare(json.m_cData);
                      setTime(false);
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  })
          } 
          else{
            console.log("Basarisiz")
          }
              }
              catch (e) {
                console.log("GetSiblingMare Error")
              }
      };
  
      React.useEffect(() => {
              readSiblingMare();
      }, [])
    return (
        <View>

            <ScrollView showsVerticalScrollIndicator={true}>
            
            {time ?
            <ActivityIndicator size="large" color="#000" />
            :
            <>
               {getSiblingMare !== undefined &&
            
            <ScrollView horizontal={true}>

           
            <DataTable> 
                <DataTable.Header removeClippedSubviews={true}>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title style={{marginLeft:90}}>Class</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Point</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Earning</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Fam</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Color</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Sire</DataTable.Title>
                <DataTable.Title style={{marginLeft:80}}>Birth D.</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Start</DataTable.Title>
                <DataTable.Title style={{marginLeft:40}}>1st</DataTable.Title>
                <DataTable.Title style={{marginLeft:40}}>1st %</DataTable.Title>
                <DataTable.Title style={{marginLeft:40}}>2nd</DataTable.Title>
                <DataTable.Title style={{marginLeft:40}}>2nd %</DataTable.Title>
                <DataTable.Title style={{marginLeft:40}}>3rd</DataTable.Title>
                <DataTable.Title style={{marginLeft:60}}>3rd %</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>4th</DataTable.Title>
                <DataTable.Title style={{marginLeft:50}}>4th %</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Price</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Dr. RM</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>ANZ</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>PedigreeAll</DataTable.Title>
                <DataTable.Title style={{marginLeft:30}}>Owner</DataTable.Title>
                <DataTable.Title style={{marginLeft:50}}>Breeder</DataTable.Title>
                <DataTable.Title style={{marginLeft:80}}>Coach</DataTable.Title>
                <DataTable.Title style={{marginLeft:50}}>Dead</DataTable.Title>
                <DataTable.Title style={{marginLeft:10}}>Update D.</DataTable.Title>
                </DataTable.Header>

                {getSiblingMare.HORSE_INFO_LIST.map((item,index)=>(

                <DataTable.Row centered={true} key={index}>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style={{width:100, height:'auto'}}>{item.HORSE_NAME}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style={{marginLeft:15, width:80, justifyContent:'center'}}>{item.WINNER_TYPE_OBJECT.WINNER_TYPE_EN}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}} >{item.POINT}</DataTable.Cell>
                <DataTable.Cell style ={{marginLeft:0, width:80,justifyContent:'center'}} >{item.EARN} {item.EARN_ICON}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:70, justifyContent:'center'}} >{item.FAMILY_TEXT}</DataTable.Cell>
                <DataTable.Cell style ={{marginLeft:0, width:80,justifyContent:'center'}}>{item.COLOR_TEXT}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style={{width:100, height:'auto',marginLeft:20}}>{item.FATHER_NAME}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:15, width:80, justifyContent:'center'}}>{item.HORSE_BIRTH_DATE_TEXT}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}} >{item.START_COUNT}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}} >{item.FIRST}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}} >{item.FIRST_PERCENTAGE} %</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}} >{item.SECOND}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>{item.SECOND_PERCENTAGE} %</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}} >{item.THIRD}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}} >{item.THIRD_PERCENTAGE} %</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>{item.FOURTH}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>{item.FOURTH_PERCENTAGE} %</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}} >{item.PRICE} {item.PRICE_ICON}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>{item.RM}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>{item.ANZ}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>{item.PA}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}}style={{width:100, height:'auto',marginLeft:20}}>{item.OWNER}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style={{width:100, height:'auto',marginLeft:20}}>{item.BREEDER}</DataTable.Cell>
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style={{width:100, height:'auto',marginLeft:20}}>{item.COACH}</DataTable.Cell>
                {item.IS_DEAD ?
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>DEAD</DataTable.Cell>
                :<DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>ALIVE</DataTable.Cell> }
                <DataTable.Cell onPress={()=>{alert(item.HORSE_NAME)}} style ={{marginLeft:0, width:80, justifyContent:'center'}}>{item.EDIT_DATE_TEXT}</DataTable.Cell>
                </DataTable.Row>

               

                ))}
                
            </DataTable>
            </ScrollView>         
          }
            </>
            }
        

        </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    }
})