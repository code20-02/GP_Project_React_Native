import React, { useState } from 'react';
import { View, Button, Image, Platform, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Ask for permission to access the camera roll
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
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
});

export default ImagePickerComponent;
