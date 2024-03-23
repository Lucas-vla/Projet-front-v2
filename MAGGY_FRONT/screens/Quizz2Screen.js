import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';


export default function Quizz2Screen({ navigation }) {
 return (
   <View>
     <View style={styles.blocfleche}>
                 <TouchableOpacity onPress={() => navigation.navigate("Quizz1")}>
                    <FontAwesome name="arrow-left" size={30} color="#553DED" style={styles.fleche} />
                </TouchableOpacity>
                </View>
     <Text>Quizz 2</Text>
     <TouchableOpacity onPress={() => navigation.navigate('Quizz3')} style={styles.btnsuivant}>
          <Text style={styles.buttonText}>Let's gooooo</Text>
        </TouchableOpacity>
   </View>
 );
}

const styles = StyleSheet.create({

    background: {
        backgroundColor: '#3A9D38',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonInscription: {
        backgroundColor: "#553DED",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
      },
      blocfleche: {
        margin: '10%',
        paddingLeft: '5%',
          width: '100%',
          flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
      },
});