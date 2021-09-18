import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';

const AppStack = createStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Onboarding'}
      >
        <AppStack.Screen
          name='Onboarding' component={OnboardingScreen}
        />
        <AppStack.Screen
          name='Login' component={LoginScreen}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App;
