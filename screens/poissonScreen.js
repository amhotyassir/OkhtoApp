import * as React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity ,ActivityIndicator} from 'react-native';
import { NativeBaseProvider,Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calls } from '../call';

import { storeData } from './dataFunctions';

export default function PoissonsScreen({navigation,route}) {
    const [All, setAll] = React.useState(null)
    const ways = ['Frit', 'Grillé', 'Sauce Ajio', 'Sauce Regamonte']
    const [totalP,setTotalP]=React.useState(0)
    const [totalE,setTotalE]=React.useState(0)
    const [totalB,setTotalB]=React.useState(0)
    const [lang,setLang]=React.useState('ar')
    const [totalD,setTotalD]=React.useState(0)
    // const [firsVisit,setFirstVisit]=React.useState(true)
    const translate=(str)=>{
        if (str==='Frit'){
            // console.log('fritoo')
            return 'مقلي'
        }if(str==='Grillé'){
            return 'مشوي'
        }
        if(str==='Sauce Ajio'){
            return 'صلصة الثوم'
        }if (str==='Sauce Regamonte'){
            return 'صلصة الفلفل'
        }
    }
    React.useEffect(()=>{
        // console.log('again')
        async function getData(){
            try {
                await AsyncStorage.getItem('All').then((value)=>{
                    // console.log(JSON.parse(value).Poissons)
                    if (value){
                        // console.log(JSON.parse(value))
                        setAll(JSON.parse(value))
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
            await AsyncStorage.getItem('lang').then((value)=>{
                if (value){
                    // console.log(JSON.parse(value))
                    setLang(JSON.parse(value))
                    // console.log(lang)
                    }
            })
            return null
            } catch(e) {
                console.log(e)
            }
        }
        // console.log('Done')
        getData()},[])
    if (!All){
        // console.log(All)
        return  <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>}
    //   console.log(lang)
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList data={All.Poissons}  renderItem={({ item, index }) => {

            return <View><View style={[styles.btn,{height:380, margin: 25,justifyContent:'flex-start'}]}>
                <View style={styles.btn}>
                    <View>
                        {item.url?<Image style={{ alignSelf: 'center', width: "100%", height: "100%", borderRadius: 15, alignItems: "center", justifyContent: "center" }} source={item.url&&{uri:item.url}}/>:<ActivityIndicator style={{ alignSelf: 'center', width: "100%", height: "100%", borderRadius: 15, alignItems: "center", justifyContent: "center" }} size="large" color="#00ff00" /> }
                        
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", flexDirection: 'column', alignItems: "center", width: "100%", marginTop: -100, backgroundColor: 'white', opacity: 0.75, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }} />
                    <View style={{ flex: 1, justifyContent: "center", flexDirection: 'column', alignItems: "center", width: "100%", marginTop: -100 }}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', width: "100%" }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <TouchableOpacity onPress={() => {
                                let x ={...All}

                                x.Poissons[index].quantity = x.Poissons[index].quantity + 1
                                storeData('totalP',{data:totalP+x.Poissons[index].unitPrice*1})
                                setTotalP(totalP+x.Poissons[index].unitPrice*1)
                                
                                storeData('All',x)
                                setAll(x)
                            }} style={{ backgroundColor: '#00cc00', borderRadius: 10, width: 40, height: 40, alignItems: 'center', margin: 15, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', alignSelf: 'center' }}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                let x = {...All}
                                if (x.Poissons[index].quantity>0){
                                    storeData('totalP',{data:totalP-x.Poissons[index].unitPrice*1})
                                    setTotalP(totalP-x.Poissons[index].unitPrice*1)}
                                x.Poissons[index].quantity = Number(Math.max(x.Poissons[index].quantity - 1, 0))
                                storeData('All',x)
                                setAll(x)

                            }} style={{ backgroundColor: 'red', borderRadius: 10, width: 40, height: 40, alignItems: 'center', margin: 15, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', alignSelf: 'center' }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}    x {item.unitPrice}</Text>
                    </View>
                </View>
            
                {item.name==='Poulpe'?<View style={{flex:1,alignItems:'center',justifyContent:'space-between',flexDirection:"row",height:"100%"}}><View style={{flexDirection:'column',justifyContent:'space-between',height:"65%",width:"35%",alignItems:'flex-start',margin:15}}>
                    <TouchableOpacity onPress={()=>{
                        let x={...All}
                        x.Poissons[index].way='Gallega'
                        storeData('All',x)
                        setAll(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:All.Poissons[index].way==='Gallega'&&All.Poissons[index].quantity>0?'underline':'none',color:(All.Poissons[index].way==='Gallega'&&All.Poissons[index].quantity>0)?'black':'lightgray'}}>Gallega</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>{
                        let x={...All}
                        x.Poissons[index].way='Escabeche'
                        storeData('All',x)
                        setAll(x)
                    }} >
                        <Text style={{fontWeight:'bold',fontSize:17,textDecorationLine:All.Poissons[index].way==='Escabeche'&&All.Poissons[index].quantity>0?'underline':'none',color:(All.Poissons[index].way==='Escabeche'&&All.Poissons[index].quantity>0)?'black':'lightgray'}}>Escabeche</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'column',justifyContent:'space-between',height:"65%",margin:15}}>
                    <TouchableOpacity onPress={()=>{
                        let x={...All}
                        x.Poissons[index].way='Ajio'
                        storeData('All',x)
                        setAll(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:(All.Poissons[index].way==='Ajio'&&All.Poissons[index].quantity>0)?'underline':'none',color:(All.Poissons[index].way==='Ajio'&&All.Poissons[index].quantity>0)?'black':'lightgray'}}>Ajio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        let x={...All}
                        x.Poissons[index].way='Brasa'
                        storeData('All',x)
                        setAll(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:All.Poissons[index].way==='Brasa'&&All.Poissons[index].quantity>0?'underline':'none',color:(All.Poissons[index].way==='Brasa'&&All.Poissons[index].quantity>0)?'black':'lightgray'}}>Brasa</Text>
                    </TouchableOpacity>
                </View></View>:<View style={{flex:1,alignItems:'center',justifyContent:'space-between',flexDirection:"row",height:"100%"}}><View style={{flexDirection:'column',justifyContent:'space-between',height:"65%",width:"26%",alignItems:'flex-start',margin:15}}>
                    <TouchableOpacity onPress={()=>{
                        let x={...All}
                        x.Poissons[index].way=ways[0]
                        storeData('All',x)
                        setAll(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:All.Poissons[index].way===ways[0]&&All.Poissons[index].quantity>0?'underline':'none',color:(All.Poissons[index].way===ways[0]&&All.Poissons[index].quantity>0)?'black':'lightgray'}}>{lang==='fr'?ways[0]:translate(ways[0])}</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>{
                        let x={...All}
                        x.Poissons[index].way=ways[1]
                        storeData('All',x)
                        setAll(x)
                    }} >
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:All.Poissons[index].way===ways[1]&&All.Poissons[index].quantity>0?'underline':'none',color:(All.Poissons[index].way===ways[1]&&All.Poissons[index].quantity>0)?'black':'lightgray'}}>{lang==='fr'?ways[1]:translate(ways[1])}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'column',justifyContent:'space-between',height:"65%",margin:15}}>
                    <TouchableOpacity onPress={()=>{
                        let x={...All}
                        x.Poissons[index].way=ways[2]
                        storeData('All',x)
                        setAll(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:(All.Poissons[index].way===ways[2]&&All.Poissons[index].quantity>0)?'underline':'none',color:(All.Poissons[index].way===ways[2]&&All.Poissons[index].quantity>0)?'black':'lightgray'}}>{lang==='fr'?ways[2]:translate(ways[2])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        let x={...All}
                        x.Poissons[index].way=ways[3]
                        storeData('All',x)
                        setAll(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:All.Poissons[index].way===ways[3]&&All.Poissons[index].quantity>0?'underline':'none',color:(All.Poissons[index].way===ways[3]&&All.Poissons[index].quantity>0)?'black':'lightgray'}}>{lang==='fr'?ways[3]:translate(ways[3])}</Text>
                    </TouchableOpacity>
                </View></View>}
                
            
            
        
        </View>
        {index===All.Poissons.length-1?<View style={{height:60}}></View>:null}
        </View>
        }} />
        
        <NativeBaseProvider>

        <View style={styles.scrol}>

            <TouchableOpacity onPress={calls} style={[styles.call,{margin:25}]}>
                <Icon as={Ionicons} color='black' name="call" size={5}/>
                <Text style={{fontSize:17,fontWeight:'bold',margin:8}}>{lang==='fr'?'Réserver':'حجز'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.panier,{margin:25}]} onPress={()=>{
                    navigation.navigate('panier')
                }}>
                <Icon as={Ionicons} name="cart"  size={5}/>
                <Text style={{fontSize:12,fontWeight:'900',margin:8}}>{(totalB+totalD+totalE+totalP)>0?(totalB+totalD+totalE+totalP).toString()+ 'DHs':'Panier'} </Text>
            </TouchableOpacity>

            </View>
    </NativeBaseProvider>
    </View>
}
const styles = StyleSheet.create({
    btn: {
        width: 280,
        backgroundColor: "white",
        borderWidth: 0.4,
        borderColor: 'gray',
        zIndex: 1,
        borderRadius: 15,
        height: 280,
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
        marginRight: 5

    }, scrol: {
        flexDirection: 'row-reverse',
        justifyContent:'space-between',
        height:0
    },
    call: {
        width: 170,
        backgroundColor: '#00cc00',
        height: 50,
        borderRadius: 25,
        margin: 10,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        borderWidth: 0.65,
        borderColor: '#577557',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 2,

    },
    container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      },
    panier: {
        width: 140,
        backgroundColor: 'white',
        height: 50,
        borderRadius: 25,
        margin: 10,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        borderWidth: 0.65,
        borderColor: '#577557',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 3,
        marginLeft: 15

    }
})