import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';

const YourApp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        {/* TopNav Content */}
      </View>
      <ScrollView contentContainerStyle={styles.middleNav}>
        <View style={styles.cardContainer}>
         <View style={styles.card}></View>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        {/* BottomNav Content */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topNav: {
    height: 100,
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    height: 100,
    width: '100%',
    backgroundColor: '#5ADBFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleNav: {
    paddingLeft: '5%',
    paddingBottom: '11%',
    backgroundColor: 'yellow',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  card: {
    height: 200,
    width: 140,
    backgroundColor: 'yellowgreen',
    marginTop: 30,
    marginLeft: 9,
    marginRight: 35,
    borderRadius: 20,
    opacity: 0.93,
  },
});

export default YourApp;
