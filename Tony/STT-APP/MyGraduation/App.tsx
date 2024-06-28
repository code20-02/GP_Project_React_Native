import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChangeUsernameScreen from './screens/ChangeUsernameScreen';
import ChangeEmailScreen from './screens/ChangeEmailScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import { ThemeProvider } from './ThemeContext';
import OCRScreen from './screens/OCRScreen';


export type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  Settings: undefined;
  ChangeUsername: undefined;
  ChangeEmail: undefined;
  ChangePassword: undefined;
  OCR: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="ChangeUsername" component={ChangeUsernameScreen} />
          <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="OCR" component={OCRScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
