import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import themeContext  from '../../config/themeContext';

import { SearchStackNavigator, HomeStackNavigator, ScanStackNavigator, CasierStackNavigator, ProfileStackNavigator } from '../containers/StackNavigation.js'

const Tab = createBottomTabNavigator();

export default function MyTabs() {

  const theme = useContext(themeContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) =>({

        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === "Search") {
              iconName = focused ? 'ios-search' : 'search-outline';

            } else if (rn === "Scan") {
              iconName = focused ? 'camera' : 'camera-outline';

            } else if (rn === "Casier") {
              iconName = focused ? 'wine' : 'wine-outline';

            } else if (rn === "Profile") {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={35} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: theme.textOnLight,
        tabBarInactiveTintColor: theme.textOnLight,
        tabBarShowLabel: false,
        tabBarStyle: { 
          backgroundColor: theme.surface,
          height: '10%',
          borderTopWidth: 1,
          position: 'absolute',
          overflow:'hidden',
        },
        
        })}>

      <Tab.Screen
        name="Home"
        component={ HomeStackNavigator }
      />
      <Tab.Screen
        name="Search"
        component={ SearchStackNavigator }
      />
      <Tab.Screen
        name="Scan"
        component={ ScanStackNavigator }
      />
      <Tab.Screen
        name="Casier"
        component={ CasierStackNavigator }
      />
      <Tab.Screen
        name="Profile"
        component={ ProfileStackNavigator }
      />
    </Tab.Navigator>
  );
}

