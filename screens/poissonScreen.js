import * as React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function PoissonsScreen({ total,setTotal,All, setAll }) {
    const [Poissons, setPoissons] = React.useState([
        { name: 'Calamar', quantity: 0, unitPrice: 140, way: '', pic: require('./types/calamar.jpg') },
        { name: 'Crevettes', quantity: 0, unitPrice: 140, way: '', pic: require('./types/calamar.jpg') },
        { name: 'Sol', quantity: 0, unitPrice: 140, way: '', pic: require('./types/calamar.jpg') },
        { name: 'Pescadia', quantity: 0, unitPrice: 140, way: '', pic: require('./types/calamar.jpg') },
        { name: 'Borasi', quantity: 0, unitPrice: 140, way: '', pic: require('./types/calamar.jpg') },
        { name: 'Rapi', quantity: 0, unitPrice: 140, way: '', pic: require('./types/calamar.jpg') },
        { name: 'Rougi', quantity: 0, unitPrice: 140, way: '', pic: require('./types/calamar.jpg') },

    ])
    const ways = ['Frit', 'Plancha', 'Sauce Ajio', 'Sauce Regamonte']
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList data={Poissons} renderItem={({ item, index }) => {

            return <View style={[styles.btn,{height:380, margin: 25,justifyContent:'flex-start'}]}>
                <View style={styles.btn}>
                    <View>
                        <Image style={{ alignSelf: 'center', width: "100%", height: "100%", borderRadius: 15, alignItems: "center", justifyContent: "center" }} source={item.pic} />
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", flexDirection: 'column', alignItems: "center", width: "100%", marginTop: -100, backgroundColor: 'white', opacity: 0.75, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }} />
                    <View style={{ flex: 1, justifyContent: "center", flexDirection: 'column', alignItems: "center", width: "100%", marginTop: -100 }}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', width: "100%" }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <TouchableOpacity onPress={() => {
                                let x =[...Poissons]
                                x[index].quantity = x[index].quantity + 0.25
                                setPoissons(x)
                                setTotal(total+x[index].unitPrice*0.25)
                            }} style={{ backgroundColor: '#00cc00', borderRadius: 10, width: 40, height: 40, alignItems: 'center', margin: 15, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', alignSelf: 'center' }}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                let x = [ ...Poissons] 
                                x[index].quantity = Number(Math.max(x[index].quantity - 0.250, 0))
                                setPoissons(x)
                            }} style={{ backgroundColor: 'red', borderRadius: 10, width: 40, height: 40, alignItems: 'center', margin: 15, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', alignSelf: 'center' }}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity} Kg</Text>
                    </View>
                </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'space-between',flexDirection:"row",height:"100%"}}>
                <View style={{flexDirection:'column',justifyContent:'space-between',height:"65%",width:"26%",alignItems:'flex-start',margin:15}}>
                    <TouchableOpacity onPress={()=>{
                        let x=[...Poissons]
                        x[index].way=ways[0]
                        setPoissons(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:Poissons[index].way===ways[0]&&Poissons[index].quantity>0?'underline':'none',color:(Poissons[index].way===ways[0]&&Poissons[index].quantity>0)?'black':'lightgray'}}>{ways[0]}</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>{
                        let x=[...Poissons]
                        x[index].way=ways[1]
                        setPoissons(x)
                    }} >
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:Poissons[index].way===ways[1]&&Poissons[index].quantity>0?'underline':'none',color:(Poissons[index].way===ways[1]&&Poissons[index].quantity>0)?'black':'lightgray'}}>{ways[1]}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'column',justifyContent:'space-between',height:"65%",margin:15}}>
                    <TouchableOpacity onPress={()=>{
                        let x=[...Poissons]
                        x[index].way=ways[2]
                        setPoissons(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:(Poissons[index].way===ways[2]&&Poissons[index].quantity>0)?'underline':'none',color:(Poissons[index].way===ways[2]&&Poissons[index].quantity>0)?'black':'lightgray'}}>{ways[2]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        let x=[...Poissons]
                        x[index].way=ways[3]
                        setPoissons(x)
                    }}>
                        <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:Poissons[index].way===ways[3]&&Poissons[index].quantity>0?'underline':'none',color:(Poissons[index].way===ways[3]&&Poissons[index].quantity>0)?'black':'lightgray'}}>{ways[3]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        }} />
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
        justifyContent: 'space-between',
        marginBottom: 18
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