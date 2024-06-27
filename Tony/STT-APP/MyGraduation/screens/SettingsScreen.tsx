import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { lightTheme, darkTheme } from '../themeStyles';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const styles = theme === 'dark' ? darkTheme : lightTheme;

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', onPress: () => {
          Alert.alert('Signed Out');
          navigation.navigate('Home');
        }
      },
    ]);
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangeUsername')}>
          <Text style={styles.optionText}>Change Username</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangeEmail')}>
          <Text style={styles.optionText}>Change Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleTheme}
            value={theme === 'dark'}
          />
        </View>
      </View>

     

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>App Version                                                        1.0.0</Text>
        </View>
        <TouchableOpacity style={styles.option} onPress={() => Alert.alert('Contact Us')}>
          <Text style={styles.optionText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default SettingsScreen;
