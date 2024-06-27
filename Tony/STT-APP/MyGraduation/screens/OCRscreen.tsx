import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Tesseract from 'tesseract.js';

const OCRScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const handleCaptureImage = () => {
    launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
        setImageUri(response.assets[0].uri);
        processImage(response.assets[0].uri);
    });
  };

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
        setImageUri(response.assets[0].uri);
        processImage(response.assets[0].uri);
      
    });
  };

  const processImage = async (uri) => {
    setRecognizedText('Processing...');
    try {
      const result = await Tesseract.recognize(uri, 'eng', {
        logger: (m) => console.log(m),
      });
      setRecognizedText(result.data.text);
    } catch (error) {
      console.error('Error recognizing text:', error);
      setRecognizedText('Failed to recognize text.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCaptureImage}>
        <Text style={styles.buttonText}>Capture Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      {recognizedText ? (
        <Text style={styles.text}>{recognizedText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default OCRScreen;
