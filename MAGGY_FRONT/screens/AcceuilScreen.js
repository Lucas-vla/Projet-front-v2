
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const AcceuilScreen = ({ navigation }) => {


  const handleLoginPress = () => {
    navigation.navigate('Connection');
  };
  

  const handleRegisterPress = () => {
    navigation.navigate('Inscription');
  };


  return (
    <View style={styles.container}>
      <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.logotypo}>MAGGY</Text>

      <Text style={styles.slogan}>La première communauté de gens différents qui se ressemblent</Text>

      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.closeButton}>
          <FontAwesome name="times" size={24} color="#553DED" />
        </TouchableOpacity>
        <Text style={styles.title}>Bienvenue</Text>
        <TouchableOpacity onPress={handleLoginPress} style={styles.buttonConnexion}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterPress} style={styles.buttonInscription}>
          <Text style={styles.buttonText}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A9D38',
  },


  slogan: {
    backgroundColor: "orange",
    marginBotton: 60,
    fontSize: 20,
    color: '#F474D0',
  },

  box: {
    backgroundColor: "orange",
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    width: 200,
    height: 200,
  },

  logotypo: {
    color: '#F474D0',
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Futura',
    marginBottom: 20
  },
  slogan: {
    fontSize: 25,
    color: 'white',
    marginBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  buttonConnexion: {
    backgroundColor: "#553DED",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },

  buttonInscription: {
    backgroundColor: "#553DED",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white"
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default AcceuilScreen;