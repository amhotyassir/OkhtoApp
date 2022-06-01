import * as React from 'react';
import { View, Text, Button,FlatList } from 'react-native';

export default function PoissonsScreen({total,setTotal}){
    const Poissons=[
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},
        {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./types/calamar.jpg')},

    ]
    return<View style={{flex:1}}>
        <FlatList data={Poissons} renderItem={({item,index})=>{

            return <View key={index} style={{}}>

                </View>

        }}/>
    </View>
}