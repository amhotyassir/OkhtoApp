import * as React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeBaseProvider,Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { BackHandler } from 'react-native';
import { storeData } from './dataFunctions';

export default function EntreesScreen({navigation,route}) {
    const [Entrees, setEntrees] = React.useState([
        { name: 'Salade', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./types/Salade.jpg') },
        { name: 'Frit', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./types/Frit.jpg') },
        { name: 'Paella', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./types/Frit.jpg') },
        { name: 'Pulpo G', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./types/Frit.jpg') },
        { name: 'Pulpo B', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./types/Frit.jpg') },
        { name: 'Pulpo', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./types/Frit.jpg') },
        { name: 'Rougi', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./types/Frit.jpg') },

    ])
    const [totalP,setTotalP]=React.useState(0)
    const [totalE,setTotalE]=React.useState(0)
    const [totalB,setTotalB]=React.useState(0)
    const [totalD,setTotalD]=React.useState(0)
    const [firsVisit,setFirstVisit]=React.useState(true)
    
    React.useEffect(()=>{
        storeData('Entrees',{data:Entrees})
        },[Entrees])
    
    React.useEffect(()=>{
        if(!firsVisit){storeData('totalP',{data:totalP})}
        },[totalP])


        React.useEffect(() => {
            const backAction = () => {
                navigation.navigate('Home',{totalP})
                return true;
            };
        
            const backHandler = BackHandler.addEventListener(
              "hardwareBackPress",
              backAction 
            );
        
            return () => backHandler.remove();
          }, [])

    React.useEffect(()=>{
        setFirstVisit(false)
        async function getData(){
            try {
                await AsyncStorage.getItem('totalE').then((value)=>{
                    if (value){
                        console.log(JSON.parse(value))
                        setTotalE(JSON.parse(value).data)
                        }
                })
            await AsyncStorage.getItem('totalB').then((value)=>{
                if (value){
                    console.log(JSON.parse(value))
                    setTotalB(JSON.parse(value).data)
                    }
            })
            await AsyncStorage.getItem('totalD').then((value)=>{
                if (value){
                    console.log(JSON.parse(value))
                    setTotalD(JSON.parse(value).data)
                    }
            })
            await AsyncStorage.getItem('totalP').then((value)=>{
                if (value){
                    console.log(JSON.parse(value))
                    setTotalP(JSON.parse(value).data)
                    }
            })
            return null
            } catch(e) {
            }
        }
        
        getData()},[])
    
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList data={Entrees} renderItem={({ item, index }) => {

            return <View><View style={[styles.btn,{height:380, margin: 25,justifyContent:'flex-start'}]}>
                <View style={styles.btn}>
                    <View>
                        <Image style={{ alignSelf: 'center', width: "100%", height: "100%", borderRadius: 15, alignItems: "center", justifyContent: "center" }} source={item.pic} />
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", flexDirection: 'column', alignItems: "center", width: "100%", marginTop: -100, backgroundColor: 'white', opacity: 0.75, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }} />
                    <View style={{ flex: 1, justifyContent: "center", flexDirection: 'column', alignItems: "center", width: "100%", marginTop: -100 }}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', width: "100%" }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <TouchableOpacity onPress={() => {
                                let x =[...Entrees]

                                x[index].quantity = x[index].quantity + 1
                                storeData('totalE',{data:totalE+x[index].unitPrice[Number(!item.isSmall)]})
                                setTotalE(totalE+x[index].unitPrice[Number(!item.isSmall)])
                                setEntrees(x)
                            }} style={{ backgroundColor: '#00cc00', borderRadius: 10, width: 40, height: 40, alignItems: 'center', margin: 15, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', alignSelf: 'center' }}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                let x = [ ...Entrees] 
                                if (x[index].quantity>0){
                                    storeData('totalE',{data:totalE-x[index].unitPrice[Number(!item.isSmall)]})
                                    setTotalE(totalE-x[index].unitPrice[Number(!item.isSmall)])}
                                x[index].quantity = Number(Math.max(x[index].quantity - 1, 0))
                                setEntrees(x)
                            }} style={{ backgroundColor: 'red', borderRadius: 10, width: 40, height: 40, alignItems: 'center', margin: 15, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', alignSelf: 'center' }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</Text>
                    </View>
                </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'space-between',margin:17,flexDirection:"row",height:(100*(item.name!=='Frit')).toString()+'%'}}>
                {/* <View style={{flexDirection:'column',justifyContent:'space-between',height:"100%",width:"100%",alignItems:'flex-start',margin:15}}> */}
                    <TouchableOpacity onPress={()=>{
                        let x=[...Entrees]
                        x[index].isSmall=true
                        setEntrees(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:Entrees[index].isSmall&&Entrees[index].quantity>0?'underline':'none',color:(Entrees[index].isSmall&&Entrees[index].quantity>0)?'black':'lightgray'}}>Petite</Text>
                        <Text style={{fontSize:11,textAlign:'center',color:(Entrees[index].isSmall&&Entrees[index].quantity>0)?'black':'lightgray'}}>{item.unitPrice[0]}</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>{
                        let x=[...Entrees]
                        x[index].isSmall=false
                        setEntrees(x)
                    }} >
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:!Entrees[index].isSmall&&Entrees[index].quantity>0?'underline':'none',color:(!Entrees[index].isSmall&&Entrees[index].quantity>0)?'black':'lightgray'}}>Moyenne</Text>
                        <Text style={{fontSize:11,textAlign:'center',color:(!Entrees[index].isSmall&&Entrees[index].quantity>0)?'black':'lightgray'}}>{item.unitPrice[1]}</Text>
                    </TouchableOpacity>
                {/* </View> */}
                
            </View>
            
        
        </View>
        {index===Entrees.length-1?<View style={{height:60}}></View>:null}
        </View>
        }} />
        <NativeBaseProvider>
        <View style={styles.scrol}>

            <TouchableOpacity style={[styles.call,{margin:25}]}>
                <Icon as={Ionicons} color='black' name="call" size={5}/>
                <Text style={{fontSize:17,fontWeight:'bold',margin:8}}>Commander</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.panier} onPress={()=>{
                    navigation.navigate('panier')
                }}>
                <Icon as={Ionicons} name="cart"  size={5}/>
                <Text style={{fontSize:12,fontWeight:'900',margin:8}}>{(totalB+totalD+totalE+totalP)>0?(totalB+totalD+totalE+totalP).toString()+ 'DHs':'Panier'} </Text>
            </TouchableOpacity> */}

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