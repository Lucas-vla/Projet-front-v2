
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';


export default function Quizz1Screen({ navigation }) {

  const [recherche, setRecherche] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleCheckbox2 = (item) => { // { key: 'favorite_color' }
    const hasAlreadySavedItemKey = checkedItems.find(checkedItem => checkedItem === item.key)

    if (hasAlreadySavedItemKey) {
      setCheckedItems(
        checkedItems.filter(checkedItem => checkedItem !== item.key)
      )
    } else {
      const newCheckedItemKeys = [...checkedItems, item.key];
      setCheckedItems(newCheckedItemKeys)
    }
  }

  const toggleCheckbox = (index) => {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const items_2 = [
    { key: 'favorite_color', label: 'Ta couleur préférée ?' },
    { key: 'response_1', label: 'Response 1' },
  ]

  // Liste en dur
  const items = [
    'reponse 1',
    'reponse 2',
    'reponse 3',
    'reponse 4',
    'reponse 5',
    'reponse 1',
    'reponse 2',
    'reponse 3',
    'reponse 4',
    'reponse 5',
    'reponse 1',
    'reponse 2',
    'reponse 3',
    'reponse 4',
    'reponse 5',
    'reponse 1',
    'reponse 2',
    'reponse 3',
    'reponse 4',
    'reponse 5',
    'reponse 1',
    'reponse 2',
    'reponse 3',
    'reponse 4',
    'reponse 5',
    'reponse 1',
    'reponse 2',
    'reponse 3',
    'reponse 4',
    'reponse 5',
  ];

  return (

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.blochaut}>

        <View style={styles.blocfleche}>

          <TouchableOpacity onPress={() => navigation.navigate("InfoSupp")}>
            <FontAwesome name="arrow-left" size={30} color="#553DED" style={styles.fleche} />
          </TouchableOpacity>
        </View>
        <View style={styles.blocquestion}>
          <Text style={styles.question}>Quelles sont tes habitudes {"\n"}de consommation?</Text>
        </View>
      </View>

      <View style={styles.blocbas}>

        <View style={styles.blocQcm}>
          <TextInput
            placeholder="Rechercher"
            value={recherche}
            onChangeText={setRecherche}
            style={styles.input}
            placeholderTextColor="#BDBDBD" />
          <ScrollView contentContainerStyle={styles.scrollquestions}>
            {items_2.map((item, index) => (
              <View key={index} style={styles.checkbox}>
                <Checkbox
                  style={styles.checkboxLigne}
                  value={checkedItems.find(checkedItem => checkedItem === item.key) || false}
                  onValueChange={() => toggleCheckbox2(item)}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>

          <TouchableOpacity onPress={() => navigation.navigate('Quizz2')} style={styles.btnsuivant}>
            <Text style={styles.buttonText}>Passer cette étape</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Quizz2')} style={styles.btnpassez}>
            <Text style={styles.buttonText}>Let's goooo</Text>
          </TouchableOpacity>
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
    backgroundColor: '#3A9D38',
  },

  blochaut: {
    padding: '2%',
    marginTop: '10%',
    width: '100%',
    height: '20%',
    alignItems: 'space-around',
  },

  btnsuivant: {
    backgroundColor: "#553DED",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '40%',
    alignItems: 'center',
  },
  btnpassez: {
    backgroundColor: "#553DED",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '40%',
    alignItems: 'center',
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

  question: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 20,
  },

  buttonText: {
    color: 'white',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '10%',
    marginBottom: '4%',

  },

  blocQcm: {
    width: '85%',
    height: '75%',
    backgroundColor: '#F474D0',
    padding: '5%',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  blocbas: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '70%',
  },

  scrollquestions: {
    width: '100%',
  },

  checkbox: {
    width: 280,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  checkboxLigne: {
    margin: 8,
  },

});




/*Et voila ⁠ typescript
// 1 seul "QuizzScreen"
// "QuizzStep" contient toute la logique

const quizzQuestions = {
    // Correspond à chaque page
    habitudes: [
        { key: 'resp_1', label: 'Response 1' },
        { key: 'resp_2', label: 'Response 2' }
    ],
    2: [
        { key: 'resp_3', label: 'Response 3' },
        { key: 'resp_4', label: 'Response 4' }
    ],
    3: [
        { key: 'resp_5', label: 'Response 5' },
        { key: 'resp_6', label: 'Response 6' }
    ],
}

const [page, setPage] = useState(1)
const [allResponses, setAllResponses] = useState([])

return (
    // C'est dans ce composant que "QuizzStep" que vous allez à avoir le listing de vos checkboxes
    // Il faudra, quand vous appuiez sur "Suivant" trigger la fonction "onNext" passée en props
    // Dans "responsesOfThisPage", vous stockerez les
    <QuizzStep
        items={quizzQuestions[page]} // Dès que vous allez changer "setPage(page + 1)", vos questions affichées vont se mettre à jour directement
        onNext={(responsesOfThisPage) => {
            setAllResponses(...allResponses, ...responsesOfThisPage) // On ajoute dans notre tableau de toutes les réponses de chaque étape
            setPage(page + 1) // Attention, quand ça sera la dernière page, il faudra pas faire "setPage(page + 1)", mais envoyer tout le résultat à l'API !
        }}
    />
) */
