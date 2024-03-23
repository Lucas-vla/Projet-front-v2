import { useState } from 'react';
import {
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';



export default function NouveauMessageScreen({ navigation }) {



  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.blochaut}>

        <View style={styles.blocfleche}>

          <TouchableOpacity onPress={() => navigation.navigate("Message")}>
            <FontAwesome name="arrow-left" size={30} color="#553DED" style={styles.fleche} />
          </TouchableOpacity>
        </View>
        <View style={styles.blocquestion}>
          <Text style={styles.titre}>Nouveau Message</Text>
        </View>
        <View style={styles.blocQcm}>
          <TextInput
            placeholder="nouveau message"
            style={styles.input}
            placeholderTextColor="#BDBDBD" />
            </View>
      </View>

    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },

  blochaut: {
    padding: '2%',
    marginTop: '10%',
    width: '100%',
    height: '20%',
    alignItems: 'space-around',
  },


  blocfleche: {
    width: '100%',
    height: '40%',
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    backgroundColor: 'white',
  },

  blocquestion: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',

  },

  titre: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
    fontSize: 20,
  },



});