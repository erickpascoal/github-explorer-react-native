import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';
import Issue from '../pages/Issue';


const Routes: React.FC = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Repository" component={Repository} />
        <Stack.Screen name="Issue" component={Issue} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;