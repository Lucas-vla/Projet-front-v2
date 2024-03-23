
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const ChargementScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Acceuil');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A9D38',

  },
  logo: {
    width: 200,
    height: 200,
  },

  titre: {
    marginBotton: 60,
    fontSize: 40,
    color: '#F474D0',
  },
});

export default ChargementScreen;
