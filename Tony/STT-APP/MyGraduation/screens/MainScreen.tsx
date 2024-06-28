import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import ImagePickerComponent from './ImagePickerComponent';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handlePlayText = async () => {
    try {
      const response = await axios.post('http://192.168.1.11:5000/tts', {
        text: text1,
      });
      const audioData = response.data.audio_data;

      Alert.alert('Play Text', 'Audio data received successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to play text');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Icon name="cog" size={30} color="#000" />
      </TouchableOpacity>
      <View style={styles.splitContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="To write in"
            value={text1}
            onChangeText={setText1}
            multiline
          />
          <TouchableOpacity style={styles.playButton} onPress={handlePlayText}>
            <Icon name="play" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>
            {text2 ? text2 : 'To display detected words'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.recordButton}>
        <Icon name="microphone" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.ocrButton} onPress={() => navigation.navigate('OCR')}>
        <Text style={styles.ocrButtonText}>OCR</Text>
      </TouchableOpacity>
      <ImagePickerComponent /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  splitContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: '80%',
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  displayText: {
    height: '80%',
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    textAlignVertical: 'top',
  },
  playButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    backgroundColor: '#6200ee',
    borderRadius: 50,
    padding: 10,
    elevation: 2,
  },
  recordButton: {
    position: 'absolute',
    bottom: 70,
    right: 50,
    backgroundColor: '#6200ee',
    borderRadius: 50,
    padding: 16,
    elevation: 2,
  },
  ocrButton: {
    position: 'absolute',
    bottom: 70,
    left: 50,
    backgroundColor: '#6200ee',
    borderRadius: 50,
    padding: 16,
    elevation: 2,
  },
  ocrButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainScreen;
