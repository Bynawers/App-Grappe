import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../views/main/Home.js';
import Search from '../views/main/Search.js';
import Casier from '../views/main/Casier.js';
import Profile from '../views/main/Profile.js';
import Scan from '../views/main/Scan.js';

import Reward from '../views/secondary/Reward.js';
import Notification from '../views/secondary/Notification.js';
import NotificationAdvance from "../views/secondary/NotificationAdvance.js";
import Evaluation from "../views/secondary/Evaluation.js";

const Stack = createStackNavigator();

const screenOptionStyle = {
	headerShown: false,
  reactNativeScreen: false,
  animationEnabled: true,
  animationTypeForReplace: 'pop',
  gestureEnabled: true
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="HomeStack" component={Home}/>
      <Stack.Screen name="RewardStack" component={Reward}/>
      <Stack.Screen name="NotificationStack" component={Notification}/>
      <Stack.Screen name="NotificationAdvanceStack" component={NotificationAdvance}/>
      <Stack.Screen name="EvaluationStack" component={Evaluation}/>
    </Stack.Navigator>
  );
}

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SearchStack" component={Search}/>
    </Stack.Navigator>
  );
}

const ScanStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ScanStack" component={Scan}/>
    </Stack.Navigator>
  );
}

const CasierStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="CasierStack" component={Casier}/>
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ProfileStack" component={Profile}/>
    </Stack.Navigator>
  );
}

export { SearchStackNavigator, HomeStackNavigator, ScanStackNavigator, CasierStackNavigator, ProfileStackNavigator };