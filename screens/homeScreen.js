import * as React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, FlatList, ImageBackground, StatusBar,Linking } from 'react-native';
import { NativeBaseProvider, Icon } from 'native-base';
import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calls } from '../call';
import { Ionicons } from '@expo/vector-icons';



export default function HomeScreen({navigation,route}) {
    NavigationBar.setVisibilityAsync('hidden')
    

//    if (first){
//     var font = require('font');
//     font.loadFont('../assests/NexaBold.ttf')
//     setFirst(false)
//    }
const [Poissons,setPoissons]=React.useState(null)
const [totalP,setTotalP]=React.useState(0)
const [totalE,setTotalE]=React.useState(0)
const [totalB,setTotalB]=React.useState(0)
const [totalD,setTotalD]=React.useState(0)

// console.log('Home')

React.useEffect(()=>{
    async function getData(){
        try {
            await AsyncStorage.getItem('All').then((value)=>{
                // console.log(JSON.parse(value).Poissons)
                if (value){
                    setPoissons(JSON.parse(value).Poissons)
                    }
            })
            await AsyncStorage.getItem('totalE').then((value)=>{
                if (value){
                    // console.log(JSON.parse(value))
                    setTotalE(JSON.parse(value).data)
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
    const titles = [
        {
            key: 0,
            title: "Poissons"
        },
        {
            key: 1,
            title: "Entrées"
        },
        {
            key: 2,
            title: "Boissons"
        },
        {
            key: 3,
            title: "Dessert"
        },

    ]
    // console.log(Poissons)
    return <View style={{ flex: 1, justifyContent: "center" }}>
<NativeBaseProvider>
        <View style={{ marginBottom: 0, marginTop: StatusBar.currentHeight ,}}>
            {/* <View style={{}}> */}
                <Image style={styles.image} source={require('../pics/ensalada-de-pulpo.jpg')} />

            {/* </View> */}
            <View style={styles.headerView}>
                <Text style={styles.headerTitle}>
                    Bienvenue à
                </Text>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    position: "absolute",
                    marginTop: 85,
                    
                }}>
                    AL-Okhtobout
                </Text>
                {/* <Image style={[styles.okhto,{
        transform: [{ rotate: "-10deg" }],
        borderRadius:20
      }]} source={require('./Capture.jpg')} /> */}
            </View>
        </View>
        <FlatList horizontal={true} data={titles} style={{ marginBottom: 40 }} keyExtractor={item => item.key} contentContainerStyle={{ padding: 20 }} renderItem={({ item, ind }) => {
            let target=null
            switch (item.title){
                case 'Poissons':
                    target=require('../pics/poisson.jpg')
                break
                case 'Entrées':
                    target=require('../pics/entrées.jpg')
                break
                case 'Boissons':
                    target=require('../pics/boissons.jpeg')
                break
                case 'Dessert':
                    target=require('../pics/dessert.jpg')
                break
                
            }
            return <View style={styles.btn}>
                <View>
                    <Image style={{ alignSelf: 'center', width: "100%", height: "100%", borderRadius: 15, alignItems: "center", justifyContent: "center" }} source={target} />
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", marginTop: -100, backgroundColor: 'white', opacity: 0.75, borderBottomLeftRadius:15,borderBottomRightRadius:15 }} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", marginTop: -100 }}>
                    <Text style={styles.title}>{item.title}</Text>


                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(item.title)
                }}  >
                    
                        <View style={styles.btnImg} >

                            <Icon  size={8} as={Ionicons} name="arrow-forward" />


                        </View>
                </TouchableOpacity>
            </View>
        }} />
        
        </NativeBaseProvider>
        <View style={styles.scrol}>

            <TouchableOpacity onPress={calls} style={[styles.call,{margin:25}]}>
                <Icon as={Ionicons} color='black' name="call" size={5}/>
                <Text style={{fontSize:17,fontWeight:'bold',margin:8}}>Réserver</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.panier} onPress={()=>{
                    navigation.navigate('panier')
                }}>
                <Icon as={Ionicons} name="cart"  size={5}/>
                <Text style={{fontSize:12,fontWeight:'900',margin:8}}>{(totalB+totalD+totalE+totalP)>0?(totalB+totalD+totalE+totalP).toString()+ 'DHs':'Panier'} </Text>
            </TouchableOpacity> */}

        </View>
    </View>
}
const styles = StyleSheet.create({
    all: {
        flex: 1
    },
    image: {
        width: "98%",
        alignSelf: "center",
        borderRadius: 6,
        height: 250,
        
        borderBottomWidth:0.5

        
    },
    headerView: {
        width: '70%',
        height: 200,
        alignSelf: "center",
        backgroundColor: "white",

        borderRadius: 15,
        alignItems: 'center',
        marginTop: -130,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    headerTitle: {
        fontSize: 20,
        marginTop: 25
    },
    okhto: {
        position: "absolute",
        marginTop: 85,
        marginLeft:10,
        width:"100%",
        fontFamily:'AbrilFatface-Regular'
    },
    
    btn: {
        flex: 1,
        width: 280,
        backgroundColor: "white",
        borderWidth: 0.4,
        borderColor: 'gray',
        zIndex: 1,
        borderRadius: 15,
        height: 280,
        margin: 25,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 3,

    },
    title: {
        fontWeight: "bold",
        fontSize: 27,
        margin: 15,

    },
    btnImg: {
        width: 78,
        borderRadius: 39,
        height: 78,
        marginTop: -150,
        alignSelf: "flex-end",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginRight:5

    },scrol: {
        flexDirection: 'row',
        justifyContent:'center',
        height:0
    },
    call:{
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
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 2,

    },
    panier:{
        width:140,
        backgroundColor:'white',
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
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 3,
        marginLeft:15

    }
})