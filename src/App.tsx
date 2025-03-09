import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { HelloWidget } from './HelloWidget';
import BackgroundFetch from "react-native-background-fetch";


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

  useEffect(() => {
    updateSentence();
    initBackgroundFetch(); // ✅ Start background updates
  }, []);

  const updateSentence = async () => {
    const newSentence = getRandomSentence();
    setSentence(newSentence);
    requestWidgetUpdate({
      widgetName: 'Hello',
      renderWidget: () => <HelloWidget sentence={newSentence} />,
      widgetNotFound: () => {
        // Called if no widget is present on the home screen
      }
    });
  };

  const initBackgroundFetch = async () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 30, // ⏰ Every 30 minutes
        stopOnTerminate: false, // ✅ Keeps running when app is closed
        enableHeadless: true,
        startOnBoot: true, // ✅ Runs after device reboots
      },
      async (taskId) => {
        console.log("[BackgroundFetch] Task started:", taskId);
        await updateSentence();
        BackgroundFetch.finish(taskId);
      },
      async (taskId: string) => {
        console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
        BackgroundFetch.finish(taskId);
      }
    );
  
    // Start the background task
    BackgroundFetch.start();
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
