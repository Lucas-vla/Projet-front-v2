import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ImageBackground} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

const ValidationInscriptionScreen = ({navigation}) => {


    /*const handleConfirmInscription = () => {
        navigation.navigate('InfoSupp');
      };

      const handleClosePress = () => {
        navigation.navigate('Home');
      };*/




  return (
<ImageBackground source={require('../assets/etoilefondvert.png')} style={styles.background}>

      <View style={styles.container}>
        <Text style={styles.text}>Bienvenue {'\n'}   chez {'\n'} MAGGY</Text>


      <View style={styles.box}>
      <FontAwesome onPress={() => navigation.navigate('TabNavigator')} style={styles.closeButton} name="times" size={24} color="#553DED"/>
      <Text style={styles.textbox}>Pour optimiser ton expérience
        nous avons besoins d'en savoir
        un peu plus sur toi!
        On a 5 questions à te poser sur tes habitudes d'achats.
        Tu peux répondre maintenant ou revenur plus tard.
        </Text>
      <TouchableOpacity title="let's goooo" onPress={() => navigation.navigate('InfoSupp')} style={styles.Button}>
      <Text style={styles.buttonText}>Let's goooo</Text>
      </TouchableOpacity>
      </View>
      </View>
     </ImageBackground>
  );
};





const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  box: {
    width: '90%',
    height: '35%',
    backgroundColor: "orange",
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom:80,
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Futura',
    marginBottom: 20,
  },
  textbox: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"white",
  },

  Button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '20%',
    backgroundColor:"#553DED",
  },

  buttonText: {
    alignItems: 'center',
    color: 'white',
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ValidationInscriptionScreen;