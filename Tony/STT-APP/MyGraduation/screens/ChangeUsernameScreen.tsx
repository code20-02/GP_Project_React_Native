import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ChangeUsernameScreen: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');

  const handleChangeUsername = () => {
    Alert.alert('Username Changed', `New username: ${newUsername}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Username</Text>
      <TextInput
        style={styles.input}
        placeholder="New Username"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleChangeUsername}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    alignItems: 'center',
    top: 25
  },
  title: {
    fontSize: 32,
    color: '#6200ee',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#6200ee',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangeUsernameScreen;
