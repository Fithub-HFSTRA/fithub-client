import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, router, Stack } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import React from 'react';

import { useApiContext } from '../../api/ApiContext';
import { useTheme } from '../utility/ThemeContext';


export default () => {
  const { theme } = useTheme();
  return (
    <Tabs screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        // Icon List
        //sss
        if (route.name === 'shop') iconName = 'bag';
        else if (route.name === 'plans') iconName = 'newspaper';
        else if (route.name === 'workout') iconName = 'barbell';
        else if (route.name === 'friends') iconName = 'people';
        else if (route.name === 'account') iconName = 'person';
        else iconName = 'help';
        // If icon isn't selected
        if (!focused) iconName += "-outline"
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: theme.colors.primary,

    
      tabBarInactiveTintColor: 'gray'
    })}>

      { /*Order of tabs*/ }
      <Tabs.Screen name="home" options={{href: null}}/>
      <Tabs.Screen name="about" options={{title: "About"}}/> 
      <Tabs.Screen name="plans" options={{title: "Plans"}}/>
      <Tabs.Screen name="workout" options={{title: "Workout"}}/>
      <Tabs.Screen name="friends" options={{title: "Friends"}}/>
      <Tabs.Screen name="profile" options={{title: "Profile"}}/>

    </Tabs>
  );
}