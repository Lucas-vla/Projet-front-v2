import { TouchableOpacity, Image, Text, TextInput, View, Platform, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddArticle from './AddArticleScreen';
import Checkbox from 'expo-checkbox';
import { ScrollView } from 'react-native';

export default function MarqueScreen({ onBack, onValidated}) {
    const [selectedMarque, setSelectedMarque] = useState([])
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
        { key: 'Rayures', label: 'Rayures' },
        { key: 'Carreaux', label: 'Carreaux' },
        { key: 'Pois', label: 'Pois' },
        { key: 'Fleurs', label: 'Fleurs' },
        { key: 'Exotique', label: 'Exotique' },
        { key: 'Animal', label: 'Animal' },
        { key: 'Militaire', label: 'Militaire' },
        { key: 'Tie & Dye', label: 'Tie & Dye' },
        { key: 'Psychédélique', label: 'Psychédélique' },
        { key: 'Wax', label: 'Wax' },
      ]


    return (
    <View style={styles.container}>
         <View style={styles.blocHaut}>
                <View style={styles.fleche}>
                <TouchableOpacity onPress={() => onBack()}>
                <FontAwesome name="arrow-left" size={24} color='#553DED' />
                </TouchableOpacity>
                </View>

                <View style={styles.bloctitre}>
                <Text style={styles.title}>Motif</Text>
                </View>

                <View style={styles.fleche}>
                <TouchableOpacity onPress={() => onBack()}>
                <FontAwesome name="times" size={24} color='#553DED' />
                </TouchableOpacity>
                </View>
          </View>
          <View style={styles.inputBloc}>
                <TextInput
            placeholder="Rechercher"
            style={styles.input}
            placeholderTextColor="#BDBDBD" />
            </View>
          <ScrollView style={styles.blocQcm}>
        <View Style={styles.scrollquestions}>
            {items_2.map((item, index) => (
              <View key={index} style={styles.checkboxLigne}>
                <Checkbox
                  style={styles.checkbox}
                  value={checkedItems.find(checkedItem => checkedItem === item.key) || false}
                  onValueChange={() => toggleCheckbox2(item)}
                />
                <Text style={styles.texte}>{item.label}</Text>
              </View>
            ))}
          </View>
          </ScrollView>

          <View style={styles.blocBas}>
        <TouchableOpacity style={styles.validerBtn} onPress={() => onValidated(selectedCategories)}>
          <Text style={styles.valider}>Valider</Text>
        </TouchableOpacity>
        </View>
    </View>
)
}

const styles = StyleSheet.create({

        container: {
            flex: 1,
            width: '100%',
            height: '100%',
            paddingBottom: '2%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FAF4E3',
          },

          blocHaut:{
            width: '100%',
            height: '10%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '10%',
            paddingLeft: '5%',
            paddingRight: '5%',
          },

          inputBloc: {
            width: '100%',
            height: '10%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2%',
            paddingLeft: '5%',
            paddingRight: '5%',

        },

      title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#3B9D38'
      },

      blocQcm: {
      width: '100%',
      height: '300%',
      paddingBottom: '10%',
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

    texte: {
        color: '#553DED',
        fontWeight: 'bold',
        fontSize: 20,
    },


    checkboxLigne: {
        paddingLeft: '5%',
        paddingRight: '15%',
        marginTop: '2%',
        marginBottom: '2%',
        width: '100%',
        height: 50,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'orange',
      },

      checkbox: {
        margin: 8,
       borderRadius: '5%',
       backgroundColor: 'pink',
       borderColor: 'transparent',
      },

      blocBas: {
        margin: '3%',
        width: '50%',
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      validerBtn: {
        width: '80%',
        height: '60%',
        backgroundColor: '#553DED',
        borderRadius: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    valider: {
        color: '#F474D0',
        fontWeight: 'bold',
        fontSize: 18,
},
})