import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList,ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';
import { NativeBaseProvider, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import PoissonsScreen from './screens/poissonScreen'
import EntreesScreen from './screens/entreesScreen';
import BoissonsScreen from './screens/BoissonScreen';
import DessertScreen from './screens/dessertScreen';
import HomeScreen from './screens/homeScreen';
import Panier from './screens/panier';
import Test from './screens/signin';
import { storeData } from './screens/dataFunctions';
import * as firebaseStorage  from "firebase/storage";
import * as firebase from 'firebase/app';
import { getDatabase,ref ,onValue} from 'firebase/database';
import { getAuth, PhoneAuthProvider, signInWithCredential ,} from 'firebase/auth';

const Stack = createStackNavigator();

function ScreenP({ navigation, route }) { return <PoissonsScreen navigation={navigation} /> }
function ScreenB({ navigation, route }) { return <BoissonsScreen navigation={navigation} /> }
function ScreenD({ navigation, route }) { return <DessertScreen navigation={navigation} /> }
function ScreenE({ navigation, route }) { return <EntreesScreen navigation={navigation} /> }
function Ppanier({ navigation, route }) { return <Panier navigation={navigation} /> }
function Home({ navigation, route }) { return <HomeScreen navigation={navigation} /> }
function TestScreen2({navigation}){return <Test2 navigation={navigation}/>}
function TestScreen({navigation}){return <Test navigation={navigation} />}

try {
  firebase.initializeApp({
    apiKey: "AIzaSyB69Np-K-toJHI2hYJAHQFhEFFvICFiYLI",
    authDomain: "okhtoapp.firebaseapp.com",
    projectId: "okhtoapp",
    storageBucket: "okhtoapp.appspot.com",
    messagingSenderId: "317798037204",
    appId: "1:317798037204:web:cdccc81b36eb4bf40c6d41",
    measurementId: "G-MTHZRVBZHH"
  });
} catch (err) {
  // ignore app already initialized error in snack
  console.log(err)
}
// Firebase references
const app = firebase.getApp();
const db=getDatabase()
// const transformMenu=(menu)=>{
//   console.log('here')
//   for (let key in Object.keys(menu)) {
//     console.log('type= ',key);
//   }
//   return men
// }
const storage=firebaseStorage.getStorage()

function App() {
  // const [All,setAll]=React.useState(null)
  // const [initial,setInitial]=React.useState('Sign up')
  const [lang,setLang]=React.useState('ar')
  const [menu,setMenu]=React.useState({})
  
  React.useEffect(() => {
    // var x={}
    try {
      onValue(ref(db,'menu'),(snapshot)=>{
        // console.log('snapshot= ',snapshot.val().Poissons)
        setMenu(snapshot.val())
        // console.log(JSON.parse( '{"name": "Calamar", "quantity": 0, "unitPrice": 140, "way": "Frit"}'))
        var x
        // console.log(Object.values( snapshot.val().test).map(item=>item))
        x={Poissons:Object.values( snapshot.val().Poissons).map(item=>typeof(item)==='object'? item: JSON.parse(item)),
            Boissons:Object.values( snapshot.val().Boissons),
            Entrees:Object.values( snapshot.val().Entrees).map(item=>JSON.parse(item)),
            Dessert:Object.values( snapshot.val().Dessert).map(item=>JSON.parse(item))
          }
        storeData('All',x)
        storeData('staticAll',x)
        storeData('totalD',{data:0})
        storeData('totalE',{data:0})
        storeData('totalP',{data:0})
        storeData('totalB',{data:0})
        console.log('All = ',x)
        
      })
      // console.log(ref(db,'menu'))
    }catch(e){
      Alert.alert(e)
    }
      
  }, [])
  NavigationBar.setVisibilityAsync('hidden')
  return (<NativeBaseProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='test2'>
          <Stack.Screen name="Home" options={{
            headerTitle: '',
            headerBackTitle: false,
            headerTransparent: true
          }} component={Home} />
          <Stack.Screen options={{
            headerTitleAlign:'center'
          }} name="Poissons" component={ScreenP} />
          <Stack.Screen options={{
            headerTitleAlign:'center'
          }} name="Entrées" component={ScreenE} />
          <Stack.Screen options={{
            headerTitleAlign:'center'
          }} name="Boissons" component={ScreenB} />
          <Stack.Screen options={{
            headerTitleAlign:'center'
          }}  name="Dessert" component={ScreenD} />
          <Stack.Screen options={{
            headerTitleAlign:'center'
          }} name="panier" component={Ppanier} />
          <Stack.Screen options={{
            headerTitleAlign:'center'
          }} name='Sign up' component={TestScreen} />

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
    justifyContent: 'space-between',
    height: 0
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

    //   fontFamily:'AbrilFatface-Regular',
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