import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import axios from 'axios';

interface GoogleCloudVisionResponse {
  responses: {
    fullTextAnnotation?: {
      text?: string;
    };
  }[];
}

const OCRScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      processImage(result.assets[0].uri);
    }
  };

  const processImage = async (imageUri: string) => {
    setLoading(true);
    setText('');

    try {
      const base64 = await fetch(imageUri)
        .then(res => res.blob())
        .then(blob => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }));

      const response = await axios.post<GoogleCloudVisionResponse>(
        `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAzBpeTI6QVomRZ5aoiwKaopBnAhNSwzGg`,
        {
          requests: [
            {
              image: {
                content: base64.split(',')[1],
              },
              features: [{ type: 'TEXT_DETECTION' }],
            },
          ],
        }
      );

      const detectedText = response.data.responses[0].fullTextAnnotation?.text;
      setText(detectedText || 'No text detected');
    } catch (error) {
      console.error(error);
      setText('Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  if (cameraPermission === null) {
    return <View />;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  text: {
    marginTop: 20,
    padding: 10,
    fontSize: 16,
  },
});

export default OCRScreen;
