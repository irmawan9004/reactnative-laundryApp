import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Home';
import Cuci from './src/Cuci';
import Admin from './src/Admin';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cuci" component={Cuci} />
        <Stack.Screen name="Admin" component={Admin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
