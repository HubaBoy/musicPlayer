import React from 'react';
import { Text, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

const YourApp = () => {
  return (
    <ScrollView contentContainerStyle={styles.topNav}>
      {/* No content */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topNav: {
    height: 100, 
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YourApp;
