import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
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

function ScreenP({ navigation, route }) { return <PoissonsScreen navigation={navigation} /> }
function ScreenB({ navigation, route }) { return <BoissonsScreen navigation={navigation} /> }
function ScreenD({ navigation, route }) { return <DessertScreen navigation={navigation} /> }
function ScreenE({ navigation, route }) { return <EntreesScreen navigation={navigation} /> }
function Ppanier({ navigation, route }) { return <Panier navigation={navigation} /> }
function Home({ navigation, route }) { return <HomeScreen navigation={navigation} /> }



function App() {
  const [All,setAll]=React.useState(null)
  React.useEffect(() => {
    async function getData() {
      storeData('All', {
        Poissons: [
          { name: 'Calamar', quantity: 0, unitPrice: 140, way: 'Frit', pic: require('./screens/types/calamar.jpg') },
          { name: 'Crevettes', quantity: 0, unitPrice: 140, way: 'Plancha', pic: require('./screens/types/calamar.jpg') },
          { name: 'Sol', quantity: 0, unitPrice: 140, way: 'Plancha', pic: require('./screens/types/calamar.jpg') },
          { name: 'Pescadia', quantity: 0, unitPrice: 140, way: 'Plancha', pic: require('./screens/types/calamar.jpg') },
          { name: 'Borasi', quantity: 0, unitPrice: 140, way: 'Plancha', pic: require('./screens/types/calamar.jpg') },
          { name: 'Rapi', quantity: 0, unitPrice: 140, way: 'Plancha', pic: require('./screens/types/calamar.jpg') },
          { name: 'Rougi', quantity: 0, unitPrice: 140, way: 'Plancha', pic: require('./screens/types/calamar.jpg') },

        ], Boissons: [
          { name: 'orange', quantity: 0, unitPrice: 20, pic: require('./screens/types/Jus.jpeg') },
          { name: 'Jus limon', quantity: 0, unitPrice: 20, pic: require('./screens/types/Jus.jpeg') },
          { name: 'Eau', quantity: 0, unitPrice: 10, pic: require('./screens/types/Jus.jpeg') },
          { name: 'Thé', quantity: 0, unitPrice: 10, pic: require('./screens/types/Jus.jpeg') },
          { name: 'Café', quantity: 0, unitPrice: 12, pic: require('./screens/types/Jus.jpeg') },
          { name: 'Panaché', quantity: 0, unitPrice: 20, pic: require('./screens/types/Jus.jpeg') },
  
      ], Entrees: [
        { name: 'Salade', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Salade.jpg') },
        { name: 'Frit', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Frit.jpg') },
        { name: 'Paella', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Frit.jpg') },
        { name: 'Pulpo G', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Frit.jpg') },
        { name: 'Pulpo B', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Frit.jpg') },
        { name: 'Pulpo', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Frit.jpg') },
        // { name: 'Rougi', quantity: 0, unitPrice: [30,40], isSmall:true, pic: require('./screens/types/Frit.jpg') },

    ], Dessert: [
          { name: 'Flan sec', quantity: 0, unitPrice: [15], isSmall:true, pic: require('./screens/types/Flan.jpg') },
          { name: 'Flan Fruit', quantity: 0, unitPrice: [30], isSmall:true, pic: require('./screens/types/Flan.jpg') },
          { name: 'Fruits variés', quantity: 0, unitPrice: [20], isSmall:true, pic: require('./screens/types/Flan.jpg') },
          { name: 'Teramiso', quantity: 0, unitPrice: [20], isSmall:true, pic: require('./screens/types/Flan.jpg') },
      ]
      })

      storeData('totalP', { data: 0 })
      storeData('totalD', { data: 0 })
      storeData('totalB', { data: 0 })
      storeData('totalE', { data: 0 })
      // await AsyncStorage.removeItem('All');
      return null
    }
    getData()

  }, [])


  NavigationBar.setVisibilityAsync('hidden')
  const ref = React.useRef(null)
  return (<NativeBaseProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={ref}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{
            headerTitle: '',
            headerBackTitle: false,
            headerTransparent: true
          }} component={Home} />
          <Stack.Screen name="Poissons" component={ScreenP} />
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