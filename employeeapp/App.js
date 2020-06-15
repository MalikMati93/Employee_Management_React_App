import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducers/reducer'

const store  = createStore(reducer)
const Stack = createStackNavigator();
const myoptions={ 
  headerTintColor:"white",
  headerStyle:{backgroundColor:"#0033ff"}}

 function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen  name="Home" component={Home}
        options={myoptions}
       />
      <Stack.Screen style={styles.hdstyle}  name="Profile" component={Profile}
         options={myoptions}
      />
      <Stack.Screen style={styles.hdstyle}  name="CreateEmployee" component={CreateEmployee} 
         options={myoptions}
      />
    </Stack.Navigator>
    </View>
  );
}

export default ()=>{
return( 

<Provider store={store}>
 <NavigationContainer>
    <App/>
  </NavigationContainer>
</Provider>

 )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
   // justifyContent: 'center',
  },
  hdstyle:{
    color:"#4e30e6"

  },
});
