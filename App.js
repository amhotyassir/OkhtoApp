import * as React from 'react';
import { View, Text, Button,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, Icon } from 'native-base';
// import * as NavigationBar from 'expo-navigation-bar';
import { Ionicons } from '@expo/vector-icons';

import PoissonsScreen from './screens/poissonScreen'
import EntreesScreen from './screens/entreesScreen';
import BoissonsScreen from './screens/BoissonScreen';
import DessertScreen from './screens/dessertScreen';
import HomeScreen from './screens/homeScreen';
import Panier from './screens/panier';
import { storeData } from './screens/dataFunctions';


const Stack = createStackNavigator();

function ScreenP ({navigation,route}){return<PoissonsScreen navigation={navigation}  />}
function ScreenB ({navigation,route}){return<BoissonsScreen   navigation={navigation}  />}
function ScreenD ({navigation,route}){return<DessertScreen   navigation={navigation}  />}
function ScreenE ({navigation,route}){return<EntreesScreen   navigation={navigation}  />}
function Ppanier({navigation,route}){ return <Panier navigation={navigation} />}
function Home({navigation,route}){ return <HomeScreen navigation={navigation} />}

function App() {

    React.useEffect(()=>{
        storeData('All',{Poissons:[
            { name: 'Calamar', quantity: 0, unitPrice: 140, way: '', pic: require('./screens/types/calamar.jpg') },
            { name: 'Crevettes', quantity: 0, unitPrice: 140, way: '', pic: require('./screens/types/calamar.jpg') },
            { name: 'Sol', quantity: 0, unitPrice: 140, way: '', pic: require('./screens/types/calamar.jpg') },
            { name: 'Pescadia', quantity: 0, unitPrice: 140, way: '', pic: require('./screens/types/calamar.jpg') },
            { name: 'Borasi', quantity: 0, unitPrice: 140, way: '', pic: require('./screens/types/calamar.jpg') },
            { name: 'Rapi', quantity: 0, unitPrice: 140, way: '', pic: require('./screens/types/calamar.jpg') },
            { name: 'Rougi', quantity: 0, unitPrice: 140, way: '', pic: require('./screens/types/calamar.jpg') },
        
        ],Boissons:[
            { name: 'Jus', quantity: 0, unitPrice: 20, pic: require('./pics/boissons.jpeg') },

        ],Entrees:[
            { name: 'Salade', quantity: 0, unitPrice: 20, pic: require('./pics/entrées.jpg') },

        ],Dessert:[
            { name: 'Flan', quantity: 0, unitPrice: 20, pic: require('./pics/dessert.jpg') },

        ]

    })
        storeData('totalP',{data:0})
        storeData('totalD',{data:0})
        storeData('totalB',{data:0})
        storeData('totalE',{data:0})
        
        },[])
    

  NavigationBar.setVisibilityAsync('hidden')
  const ref=React.useRef(null)
  return (<NativeBaseProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={ref}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerTitle: '',
          headerBackTitle:false,
          headerTransparent:true }} component={Home} />
          <Stack.Screen name="Poissons"  component={ScreenP} />
          <Stack.Screen name="Entrées" component={ScreenE} />
          <Stack.Screen name="Boissons" component={ScreenB} />
            <Stack.Screen name="Dessert" component={ScreenD} />
            <Stack.Screen name="panier" component={Ppanier} />

          
        </Stack.Navigator>
      </NavigationContainer>
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
      
    //   fontFamily:'AbrilFatface-Regular',
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