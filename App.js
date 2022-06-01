import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';
import PoissonsScreen from './screens/poissonScreen';
import EntreesScreen from './screens/entreesScreen';
import BoissonsScreen from './screens/BoissonScreen';
import DessertScreen from './screens/dessertScreen';
import HomeScreen from './screens/homeScreen';

const Stack = createStackNavigator();
function App() {
  global.ref = React.useRef(null);
  const [total,setTotal]=React.useState(0)
  // global.total=0
  NavigationBar.setVisibilityAsync('hidden')
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={ref}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerTitle: '',
          headerBackTitle:false,
          headerTransparent:true }} component={()=><HomeScreen total={total} setTotal={setTotal} />} />
          <Stack.Screen name="Poissons" component={()=><PoissonsScreen total={total} setTotal={setTotal} />} />
          <Stack.Screen name="Entrées" component={()=><EntreesScreen total={total} setTotal={setTotal} />} />
          <Stack.Screen name="Boissons" component={()=><BoissonsScreen total={total} setTotal={setTotal} />} />
          
          <Stack.Screen name="Dessert" component={()=><DessertScreen total={total} setTotal={setTotal} />} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;

