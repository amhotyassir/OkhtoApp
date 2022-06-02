import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text,View,TouchableOpacity} from 'react-native'

export default function Panier({navigation,route}){
    
    const [Poissons,setPoissons]=React.useState(null)
    const [totalP,setTotalP]=React.useState(0)
    const [totalE,setTotalE]=React.useState(0)
    const [totalB,setTotalB]=React.useState(0)
    const [totalD,setTotalD]=React.useState(0)
    React.useEffect(()=>{
        async function getData(){
            try {
                await AsyncStorage.getItem('All').then((value)=>{
                    if (value){
                        setPoissons(JSON.parse(value).Poissons)
                        }
                })
                await AsyncStorage.getItem('totalE').then((value)=>{
                    if (value){
                        setTotalE(JSON.parse(value).data)
                        }
                })
            await AsyncStorage.getItem('totalB').then((value)=>{
                if (value){
                    setTotalB(JSON.parse(value).data)
                    }
            })
            await AsyncStorage.getItem('totalD').then((value)=>{
                if (value){
                    setTotalD(JSON.parse(value).data)
                    }
            })
            await AsyncStorage.getItem('totalP').then((value)=>{
                if (value){
                    setTotalP(JSON.parse(value).data)
                    }
            })
            return null
            } catch(e) {
            console.log(e)
            }
            
        }
        getData()},[])
  
    return<View>
    <Text>Panier: {Poissons&&Poissons.length>0?Poissons[0].name:null} + {totalB+totalD+totalE+totalP}</Text>
    <TouchableOpacity onPress={()=>{
        navigation.navigate('Home',{x:'x'})
    }}>
        <Text>{Poissons}</Text>
    </TouchableOpacity>
    </View>
}