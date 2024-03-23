import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ImageBackground} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

const EvaluationArticleScreen = ({navigation}) => {

  return (

<ImageBackground source={require('../assets/etoilefondvert.png')} style={styles.background}>

<View style={styles.container}>
  <Text style={styles.titre}>      42{'\n'}COCO'S </Text>


<View style={styles.box}>
<Text style={styles.texte}>FELICITATION ! </Text>
    <Text style={styles.texte}>Ton article à été évalué par MAGGY{'\n'}           et il vaut 42 COCO'S !</Text>
    <Text style={styles.texte}>   Si ça te convient, confirme{'\n'}et ton article sera mis en ligne</Text>
    <View style={styles.buttonBox}>
<TouchableOpacity title="let's goooo" onPress={() => navigation.navigate('AddArticle')} style={styles.Button}>
<Text style={styles.buttonText}>Annuler</Text>
</TouchableOpacity>
<TouchableOpacity title="let's goooo" onPress={() => navigation.navigate('Article')} style={styles.Button}>
<Text style={styles.buttonText}>Confirmer</Text>
</TouchableOpacity>
</View>
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
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom:80,
        justifyContent: 'space-around',
      },

      titre: {
        color: 'white',
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 20,
      },

      texte: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
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
        width: '40%',
        height: '50%',
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

      buttonBox: {
        width: '90%',
        height: '30%',
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-around',
      },
});

export default EvaluationArticleScreen;