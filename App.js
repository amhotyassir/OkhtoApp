import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
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
import Test2  from './screens/test';
import Test from './screens/signin';
import { storeData } from './screens/dataFunctions';


const Stack = createStackNavigator();

function ScreenP({ navigation, route }) { return <PoissonsScreen navigation={navigation} /> }
function ScreenB({ navigation, route }) { return <BoissonsScreen navigation={navigation} /> }
function ScreenD({ navigation, route }) { return <DessertScreen navigation={navigation} /> }
function ScreenE({ navigation, route }) { return <EntreesScreen navigation={navigation} /> }
function Ppanier({ navigation, route }) { return <Panier navigation={navigation} /> }
function Home({ navigation, route }) { return <HomeScreen navigation={navigation} /> }
function TestScreen2({navigation}){return <Test2 navigation={navigation}/>}
function TestScreen({navigation}){return <Test navigation={navigation} />}



function App() {
  // const [All,setAll]=React.useState(null)
  // const [initial,setInitial]=React.useState('Sign up')
  const [lang,setLang]=React.useState('ar')
  React.useEffect(() => {
    
    async function getData() {
      storeData('All', {
        Poissons: [
          { name: 'Calamar', quantity: 0, unitPrice: 140, way: 'Frit', pic: require('./screens/types/calamar.jpg') },
          { name: 'Crevettes', quantity: 0, unitPrice: 140, way: 'Grillé', pic: require('./screens/types/gamba.jpg') },
          { name: 'Sol', quantity: 0, unitPrice: 140, way: 'Grillé', pic: require('./screens/types/calamar.jpg') },
          { name: 'Pescadia', quantity: 0, unitPrice: 140, way: 'Grillé', pic: require('./screens/types/calamar.jpg') },
          { name: 'Borasi', quantity: 0, unitPrice: 140, way: 'Grillé', pic: require('./screens/types/calamar.jpg') },
          { name: 'Rapi', quantity: 0, unitPrice: 140, way: 'Grillé', pic: require('./screens/types/calamar.jpg') },
          { name: 'Rougi', quantity: 0, unitPrice: 140, way: 'Grillé', pic: require('./screens/types/calamar.jpg') },

        ], Boissons: [
          { name: 'Orange', quantity: 0, unitPrice: 20, pic: require('./screens/types/Orange.jpg') },
          { name: 'Limon', quantity: 0, unitPrice: 20, pic: require('./screens/types/limon.jpg') },
          { name: 'Eau', quantity: 0, unitPrice: 10, pic: require('./screens/types/Eau.jpg') },
          { name: 'Thé', quantity: 0, unitPrice: 10, pic: require('./screens/types/Thé.jpg') },
          { name: 'Café', quantity: 0, unitPrice: 12, pic: require('./screens/types/Café.jpg') },
          { name: 'Panaché', quantity: 0, unitPrice: 20, pic: require('./screens/types/Jus.jpeg') },
  
      ], Entrees: [
        { name: 'Salade Variée', quantity: 0, unitPrice: [20,30], isSmall:true, pic: require('./screens/types/vaiee.jpg') },
        { name: 'Salade Mixte', quantity: 0, unitPrice: [15,25], isSmall:true, pic: require('./screens/types/mixte.jpeg') },
        { name: 'Salade Russe', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Russe.jpg') },
        { name: 'Salade Pulpo', quantity: 0, unitPrice: [35,45], isSmall:true, pic: require('./screens/types/Salade.jpg') },
        { name: 'Frit', quantity: 0, unitPrice: [10,10], isSmall:true, pic: require('./screens/types/Frit.jpg') },
        { name: 'Paella', quantity: 0, unitPrice: [20,50], isSmall:true, pic: require('./screens/types/paella.jpg') },
        { name: 'Pulpo Gallega', quantity: 0, unitPrice: [80,100], isSmall:true, pic: require('./screens/types/Gallega.jpg') },
        { name: 'Pulpo Brasa', quantity: 0, unitPrice: [80,100], isSmall:true, pic: require('./screens/types/Brasa.jpg') },
        { name: 'Pulpo Escabishi', quantity: 0, unitPrice: [80,100], isSmall:true, pic: require('./screens/types/Frit.jpg') },
        { name: 'Pulpo Ajio', quantity: 0, unitPrice: [80,100], isSmall:true, pic: require('./screens/types/ajio.jpg') },
        { name: 'Conchas', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Conchas.jpg') },
        { name: 'croquettes', quantity: 0, unitPrice: [20,20], isSmall:true, pic: require('./screens/types/Conchas.jpg') },
        { name: 'Pilpil', quantity: 0, unitPrice: [50,50], isSmall:true, pic: require('./screens/types/pilpil.jpg') },

    ], Dessert: [
          { name: 'Flan sec', quantity: 0, unitPrice: [15], isSmall:true, pic: require('./screens/types/Flan.jpg') },
          { name: 'Flan Fruit', quantity: 0, unitPrice: [30], isSmall:true, pic: require('./screens/types/Flanfruit.jpg') },
          { name: 'Fruits variés', quantity: 0, unitPrice: [20], isSmall:true, pic: require('./screens/types/Fruits.jpg') },
          { name: 'Teramiso', quantity: 0, unitPrice: [20], isSmall:true, pic: require('./screens/types/Teramiso.jpg') },
      ]
      })

      storeData('totalP', { data: 0 })
      storeData('totalD', { data: 0 })
      storeData('totalB', { data: 0 })
      storeData('totalE', { data: 0 })
      return null
    }
    getData()
    // AsyncStorage.removeItem('num')
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
          <Stack.Screen name='test' component={TestScreen2}/>

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