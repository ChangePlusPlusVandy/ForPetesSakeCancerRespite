import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomRouter from "./src/CustomRouter";

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <CustomRouter />
      </NavigationContainer>
    );
  }
};

export default App;