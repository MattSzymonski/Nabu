import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { HelloWidget } from './HelloWidget';



const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "React Native makes app development fun!",
  "Widgets are cool on Android.",
  "Stay positive and keep coding!",
  "Random sentence widget in action!"
];

const getRandomSentence = () => {
  return sentences[Math.floor(Math.random() * sentences.length)];
};

const App = () => {
  const [sentence, setSentence] = useState(getRandomSentence());

  React.useEffect(() => {
    requestWidgetUpdate({
      widgetName: 'Hello',
      renderWidget: () => <HelloWidget sentence={sentence} />,
      widgetNotFound: () => {
        // Called if no widget is present on the home screen
      }
    });
  }, [sentence]);

  useEffect(() => {
    loadSentence();
  }, []);

  const loadSentence = async () => {
    const storedSentence = await AsyncStorage.getItem('randomSentence');
    if (storedSentence) {
      setSentence(storedSentence);
    } else {
      updateSentence();
    }
  };

  const updateSentence = async () => {
    const newSentence = getRandomSentence();
    setSentence(newSentence);
    await AsyncStorage.setItem('randomSentence', newSentence);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sentence}>{sentence}</Text>
      <Button title="Generate New Sentence" onPress={updateSentence} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  sentence: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  }
});

export default App;
