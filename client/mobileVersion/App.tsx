import React from 'react';
import { Text, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

const YourApp = () => {
  return (
   <>
    <ScrollView contentContainerStyle={styles.topNav}>
    </ScrollView>
    <ScrollView contentContainerStyle={styles.bottomNav}>
      
    </ScrollView>
   </>
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
  bottomNav: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#5ADBFF',
  },
});

export default YourApp;
