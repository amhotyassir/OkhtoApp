import * as React from 'react';
import { View, Text, Button,StyleSheet,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';
import { NativeBaseProvider, Icon } from 'native-base';
// import * as NavigationBar from 'expo-navigation-bar';
import { Ionicons } from '@expo/vector-icons';

import PoissonsScreen from './screens/poissonScreen';
import EntreesScreen from './screens/entreesScreen';
import BoissonsScreen from './screens/BoissonScreen';
import DessertScreen from './screens/dessertScreen';
import HomeScreen from './screens/homeScreen';

const Stack = createStackNavigator();
function App() {
  global.ref = React.useRef(null);
  const [All,setAll]=React.useState({
    Poissons:[
      {name:'Calamar',quantity:0,unitPrice:140,way:'',pic:require('./screens/types/calamar.jpg')},
      {name:'Crevettes',quantity:0,unitPrice:140,way:'',pic:require('./screens/types/calamar.jpg')},
      {name:'Sol',quantity:0,unitPrice:140,way:'',pic:require('./screens/types/calamar.jpg')},
      {name:'Pescadia',quantity:0,unitPrice:140,way:'',pic:require('./screens/types/calamar.jpg')},
      {name:'Borasi',quantity:0,unitPrice:140,way:'',pic:require('./screens/types/calamar.jpg')},
      {name:'Rapi',quantity:0,unitPrice:140,way:'',pic:require('./screens/types/calamar.jpg')},
      {name:'Salmonete',quantity:0,unitPrice:140,way:'',pic:require('./screens/types/calamar.jpg')},
     
    ],Entrees:[
      {name:'Salade (p)',quantity:0,unitPrice:30,way:'',pic:require('./screens/types/calamar.jpg')},
    ],Boissons:[
    {name:'Jus ',quantity:0,unitPrice:15,way:'',pic:require('./screens/types/calamar.jpg')},
  ],Dessert:[
    {name:'Flan',quantity:0,unitPrice:10,way:'',pic:require('./screens/types/calamar.jpg')},
  ]
})
  const [total,setTotal]=React.useState(0)
  // let xx=All.map((arr)=>{
  //   let x=0
  //   smm=arr.map((obj)=>{
  //     x=x+obj.unitPrice*obj.quantity
  //     return null
  //   })
  //   total=total+x
  //   return null
  // })

  NavigationBar.setVisibilityAsync('hidden')
  return (<NativeBaseProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={ref}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerTitle: '',
          headerBackTitle:false,
          headerTransparent:true }} component={()=><HomeScreen  />} />
          <Stack.Screen name="Poissons" component={()=><PoissonsScreen total={total} setTotal={setTotal}  All={All} setAll={setAll} />} />
          <Stack.Screen name="Entrées" component={()=><EntreesScreen  All={All} setAll={setAll}  />} />
          <Stack.Screen name="Boissons" component={()=><BoissonsScreen   All={All} setAll={setAll}  />} />
          
          <Stack.Screen name="Dessert" component={()=><DessertScreen   All={All} setAll={setAll} />} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    <View style={styles.scrol}>

            <TouchableOpacity style={styles.call}>
                <Icon as={Ionicons} color='black' name="call" size={5}/>
                <Text style={{fontSize:17,fontWeight:'bold',margin:8}}>Commander</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.panier}>
                <Icon as={Ionicons} name="cart"  size={5}/>
                <Text style={{fontSize:12,fontWeight:'900',margin:8}}>Panier : {total} DHs</Text>
            </TouchableOpacity>

        </View>
  </NativeBaseProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  scrol: {
      flexDirection: 'row-reverse',
      justifyContent:'space-between',
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