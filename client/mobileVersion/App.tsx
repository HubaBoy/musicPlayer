import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';

const YourApp = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.topNav} style={styles.scrollView}>
        {/* TopNav Content */}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.middleNav} style={styles.scrollView}>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.bottomNav} style={styles.scrollView}>
        {/* BottomNav Content */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    margin: 0,
  },
  topNav: {
    position: 'absolute',
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
    marginBottom: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#5ADBFF',
  },
  middleNav: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '5%',
    paddingBottom: '11%',
    minHeight: '69%',
  },
});

export default YourApp;
