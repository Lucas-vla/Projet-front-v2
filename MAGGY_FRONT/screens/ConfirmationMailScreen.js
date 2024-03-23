import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ConfirmationMailScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/etoile.png')}
        style={styles.bulle}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Check tes mails</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
  },
  bulle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60, 
  },
  text: {
    fontSize: 20,
  },
});

export default ConfirmationMailScreen;
