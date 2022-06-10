import * as React from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text,View,TouchableOpacity,ScrollView,Image,ActivityIndicator,StyleSheet} from 'react-native';
import { NativeBaseProvider,Icon,Toast } from 'native-base';
import { getDatabase, ref, onValue,set,onChildAdded } from 'firebase/database';

Notifications.setNotificationHandler({
handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
}),
});
async function sendNotif(admins,data){
    let pdata=data.Poissons.map((item)=>{
        return item.slice(0,item.length-1)
    })
    let ddata=data.Dessert.map((item)=>{
        return item.slice(0,item.length-1)
    })
    let bdata=data.Boissons.map((item)=>{
        return item.slice(0,item.length-1)
    })
    let edata=data.Entrees.map((item)=>{
        return item.slice(0,item.length-1)
    })
    
    admins.map(async function(expoPushToken){
    // console.log('token=',expoPushToken)
    sendSpecificNotificiation(expoPushToken,{Poissons:pdata,Boissons:bdata,Entrees:edata,Dessert:ddata})})
}
async function sendSpecificNotificiation(expoPushToken,data) {
    const message = {
      to: `ExponentPushToken[${expoPushToken}]`,
      sound: 'default',
      title: 'Original Title',
      body: 'Nouvelle ordre',
      data: data,
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

export default function Panier({navigation,route}){
    
    const [Poissons,setPoissons]=React.useState([])
    const [Boissons,setBoissons]=React.useState([])
    const [Entrees,setEntrees]=React.useState([])
    const [Dessert,setDessert]=React.useState([])
    const [All,setAll]=React.useState(null)
    const [totalP,setTotalP]=React.useState(0)
    const [totalE,setTotalE]=React.useState(0)
    const [totalB,setTotalB]=React.useState(0)
    const [totalD,setTotalD]=React.useState(0)
    const [lang,setLang]=React.useState('')
    const [num,setNum]=React.useState('')
    const [admins,setAdmins]=React.useState([])
    const [credit,setCredit]=React.useState(null)
    const [sent, setSent] = React.useState(false);
    React.useEffect(()=>{
        
        const setupHighscoreListener=() =>{const db = getDatabase();
            
            const reference = ref(db, 'Admins/' );
            onValue(reference, (snapshot) => {
              const Admins = snapshot.val();
            //   console.log('en',Object.entries(Admins))
              let x=Object.entries(Admins).forEach(item => {
                setAdmins([...admins,item[1]])
              })
            });
          }
          setupHighscoreListener()
    },[])
    
    
    React.useEffect(()=>{
        async function getData(){
            try {
                await AsyncStorage.getItem('All').then((value)=>{
                    if (value){
                        // console.log(JSON.parse(value))
                        setAll(JSON.parse(value))
                        setPoissons(JSON.parse(value).Poissons)
                        setBoissons(JSON.parse(value).Boissons)
                        setEntrees(JSON.parse(value).Entrees)
                        setDessert(JSON.parse(value).Dessert)
                        
                        }
                })
                await AsyncStorage.getItem('num').then((value)=>{
                    if (value){
                        // console.log(JSON.parse(value))
                        setNum(JSON.parse(value))
                        }
                })
                await AsyncStorage.getItem('totalE').then((value)=>{
                    if (value){
                        // console.log(JSON.parse(value))
                        setTotalE(JSON.parse(value).data)
                        }
                })
                await AsyncStorage.getItem('lang').then((value)=>{
                    if (value){
                        // console.log(JSON.parse(value))
                        setLang(JSON.parse(value))
                        }
                })
                await AsyncStorage.getItem('credit').then((value)=>{
                    if (value){
                        // console.log(JSON.parse(value))
                        setCredit(JSON.parse(value))
                        }
                })
            await AsyncStorage.getItem('totalB').then((value)=>{
                if (value){
                    // console.log(JSON.parse(value))
                    setTotalB(JSON.parse(value).data)
                    }
            })
            await AsyncStorage.getItem('totalD').then((value)=>{
                if (value){
                    // console.log(JSON.parse(value))
                    setTotalD(JSON.parse(value).data)
                    }
            })
            await AsyncStorage.getItem('totalP').then((value)=>{
                if (value){
                    // console.log(JSON.parse(value))
                    setTotalP(JSON.parse(value).data)
                    }
            })
            return null
            } catch(e) {
            console.log(e)
            }
            
        }
        getData()},[])
    if (!All){
        // console.log(All)
        return  <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
        </View>}
    // else{
        // console.log(Poissons)
        // console.log(All)
        let BoissonsArray=Boissons.map((item,ind)=>{
            if (item.quantity>0){
                // if (!showB){setShowB(true)}
                return<View key={ind} style={{height:110,margin:15,flexDirection:'row',borderWidth:0.5,justifyContent:'flex-start',alignItems:'center'}}>
                <View>
                    <Image source={item.pic} style={{width:100,height:100,margin:6}} />
                </View>
                <View style={{flexDirection:'column',margin:20, flex:1}}>
                    <Text style={{fontWeight:"bold",fontSize:22,marginBottom:10,maxWidth:200}}>{item.quantity}x  {item.name}</Text>
                    
                    <Text style={{fontWeight:"bold",fontSize:18,textAlign:'right'}}> = {item.quantity*item.unitPrice} Dh</Text>
                </View>
            </View>
            }
            return null
        
    })
    let EntreeArray=Entrees.map((item,ind)=>{
        if (item.quantity>0){
            // if (!showE){setShowE(true)}
            return<View key={ind} style={{height:110,margin:15,flexDirection:'row',borderWidth:0.5,justifyContent:'flex-start',alignItems:'center'}}>
            <View>
                <Image source={item.pic} style={{width:100,height:100,margin:6}} />
            </View>
            <View style={{flexDirection:'column',margin:20, flex:1}}>
                <Text style={{fontWeight:"bold",fontSize:22,marginBottom:10,maxWidth:200}}>{item.quantity}x  {item.name}</Text>
                
                <Text style={{fontWeight:"bold",fontSize:18, textDecorationLine:'underline'}}>{item.unitPrice.length>1?'Petite'.repeat(item.isSmall)+'Moyenne'.repeat(!item.isSmall):''}</Text>
                <Text style={{fontWeight:"bold",fontSize:18,textAlign:'right'}}> = {item.quantity*item.unitPrice[Number(!item.isSmall)]} Dh</Text>
            </View>
        </View>
        }
        return null
    
})
let PoissonsArray=Poissons.map((item,ind)=>{
    if (item.quantity>0){
        // if (!showP){setShowP(true)}
        return<View key={ind} style={{height:110,margin:15,flexDirection:'row',borderWidth:0.5,justifyContent:'flex-start',alignItems:'center'}}>
        <View>
            <Image source={item.pic} style={{width:100,height:100,margin:6}} />
        </View>
        <View style={{flexDirection:'column',margin:20, flex:1}}>
            <Text style={{fontWeight:"bold",fontSize:22,marginBottom:10,maxWidth:200}}>{item.quantity} Kg - {item.name}</Text>
            <Text style={{fontWeight:"bold",fontSize:18, textDecorationLine:'underline'}}>{item.way}</Text>
            <Text style={{fontWeight:"bold",fontSize:18,textAlign:'right'}}> = {item.quantity*item.unitPrice} Dh</Text>
        </View>
    </View>
    }
    return null

})
let DessertArray=Dessert.map((item,ind)=>{
    if (item.quantity>0){
        // if (!showD){setShowD(true)}
        
        return<View key={ind} style={{height:110,margin:15,flexDirection:'row',borderWidth:0.5,justifyContent:'flex-start',alignItems:'center'}}>
        <View>
            <Image source={item.pic} style={{width:100,height:100,margin:6}} />
        </View>
        <View style={{flexDirection:'column',margin:20, flex:1}}>
            <Text style={{fontWeight:"bold",fontSize:22,marginBottom:10,maxWidth:200}}>{item.quantity}x  {item.name}</Text>
            {/* <Text style={{fontWeight:"bold",fontSize:18, textDecorationLine:'underline'}}>{item.way}</Text> */}
            <Text style={{fontWeight:"bold",fontSize:18,textAlign:'right'}}> = {item.quantity*item.unitPrice} Dh</Text>
        </View>
    </View>
    }
    return null

})
// }

    return<ScrollView>
        <NativeBaseProvider>
            <Text style={{fontWeight:'bold',fontSize:25,margin:10}}>{'Poissons :'.repeat(totalP>0)}</Text>
            <View>{PoissonsArray}</View>

            <Text style={{fontWeight:'bold',fontSize:25,margin:10}}>{'Entrées :'.repeat(totalE>0)}</Text>
            <View>{EntreeArray}</View>

            <Text style={{fontWeight:'bold',fontSize:25,margin:10}}>{'Boissons :'.repeat(totalB>0)}</Text>
            <View>{BoissonsArray}</View>

            <Text style={{fontWeight:'bold',fontSize:25,margin:10}}>{'Dessert :'.repeat(totalD>0)}</Text>
            <View>{DessertArray}</View>

            <View style={{width:'100%', marginTop:30}}>
                <Text style={{textAlign:'center',fontWeight:'bold',fontSize:40}}>{totalB+totalE+totalD+totalP>0?`Total = ${totalB+totalE+totalD+totalP} Dhs`:'Panier vide'}</Text>
            </View>

           {totalB+totalE+totalD+totalP>0? <View style={styles.scrol}>

        <TouchableOpacity onPress={async function(){
            const netObj=await Network.getNetworkStateAsync();
            if(netObj.isConnected&&netObj.isInternetReachable){
                if (num===''){
                navigation.navigate('Sign up')
            }else{

                if (!sent){
                    sendNotif(admins,{...All,num:num})
                    setSent(true)
                    // Toast.show({})
                    AsyncStorage.removeItem('All')
                    navigation.navigate('Home')
                }
            
            }
            }else{
                Alert.alert(lang==='fr'?'Erreur Internet':'مشكلة انترنيت',lang==='fr'?"Il y'avais une problème de connexion Internet":" توجد مشكلة انترنيت")
            }
            
            }}
        style={[styles.call,{margin:25,alignSelf:'center'}]}>
            <Text style={{fontSize:17,fontWeight:'bold',margin:8}}> ✔ Réserver</Text>
        </TouchableOpacity></View>:null}


        
        </NativeBaseProvider>
    </ScrollView>
}


const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      },call:{
        width:170,
        backgroundColor:'#00cc00',
        height:50,
        borderRadius:25,
        margin:10,
        justifyContent:"center",
        alignItems:'center',
        flexDirection:'row',
        alignSelf:'flex-end',
        borderWidth:0.65,
        borderColor:'#577557',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        }}
})