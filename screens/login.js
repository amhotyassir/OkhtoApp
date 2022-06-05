import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TouchableOpacity, Text, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as React from 'react';


export default function Login() {
    const [data, setData] = React.useState({ langue: 'ar', num: '' })


    return <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.3 }}><View style={{ height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.3 }} /></TouchableWithoutFeedback>
        <View style={{ position: 'absolute', flex: 1, width: '80%', backgroundColor: "white", borderRadius: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%', alignSelf: 'center',marginTop:15,marginBottom:12 }}>
                <TouchableOpacity style={{
                    backgroundColor: data.langue === 'fr' ? '#00b8e6' : '#ccf5ff', margin: 15, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,

                    elevation: 7,
                    borderRadius:7
                }}
                    onPress={() => {
                        setData({ langue: 'fr', num: data.num })
                    }}>
                    <Text style={{ fontSize: 17, margin: 5, fontWeight: data.langue === 'fr' ? 'bold' : 'normal' }}>Français</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: data.langue === 'ar' ? '#00b8e6' : '#ccf5ff', margin: 15, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,

                    elevation: 7,
                    borderRadius:7
                }}
                    onPress={() => {
                        setData({ langue: 'ar', num: data.num })
                    }}>
                    <Text style={{ fontSize: 17, margin: 5, fontWeight: data.langue === 'ar' ? 'bold' : 'normal' }}>العربية</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ flex: 1, justifyContent: data.langue === 'ar' ? 'flex-end' : 'flex-start', fontSize: 20, margin: 10, fontWeight: 'bold' }}>{data.langue == 'fr' ? "Veillez d'entrer votre numéro de téléphone :" : ' من فضلكم ادخلوا رقم هاتفكم :'}</Text>
                <View style={{ flexDirection: 'row', margin: 12, alignItems: 'center' ,alignSelf:'center'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 5 }}>+212</Text>
                    <View style={{ borderWidth: 0.8, minWidth: 150, margin: 5 }}>
                        <TextInput style={{ flex: 1, marginLeft: 8, textAlign: 'left',fontSize:17 }} keyboardType='phone-pad' placeholder='*********' value={data.num} onChangeText={(text) => setData({ langue: data.langue, num: text })} />
                    </View>
                </View>
            </View>
            <View style={{flex:1,margin:35,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#39e600',borderRadius:10,shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,

                    elevation: 7,}}>
                    <Text style={{margin:7,fontWeight:'bold',fontSize:20}}>{data.langue === 'ar' ?'حفظ':'Enregistrer'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}