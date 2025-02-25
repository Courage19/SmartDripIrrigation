import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Signup from "../screens/Signup"; // Ensure Signup is imported

// ✅ Define type for the navigation stack
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Signup: undefined; // ✅ Add this to avoid type errors
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Signup" component={Signup} /> {/* ✅ Ensure Signup is added */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
