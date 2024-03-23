import { TouchableOpacity, Image, Text, TextInput, View, Platform, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddArticle from './AddArticleScreen';
import Checkbox from 'expo-checkbox';

export default function EtatScreen({ onBack, onValidated}) {
    const [selectedCategories, setSelectedCategories] = useState([])
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
        { key: 'Neuf avec emballage', label: 'Neuf avec emballage' },
        { key: 'Neuf', label: 'Neuf' },
        { key: 'Excellent état', label: 'Excellent état' },
        { key: 'Très bon état', label: 'Très bon état' },
        { key: 'Bon état', label: 'Bon état' },
        { key: 'Etat correct', label: 'Etat correct' },
        { key: 'Mauvais état', label: 'Mauvais état' },
        { key: 'A réparer', label: 'A réparer' },
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
                <Text style={styles.title}>État</Text>
                </View>

                <View style={styles.fleche}>
                <TouchableOpacity onPress={() => onBack()}>
                <FontAwesome name="times" size={24} color='#553DED' />
                </TouchableOpacity>
                </View>
          </View>

          <View style={styles.blocQcm}>
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
          </View>
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

      title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#3B9D38'
      },

      blocQcm: {
      width: '100%',
      height: '70%',
      paddingTop: '10%',
      paddingBottom: '10%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      },


    texte: {
        color: '#553DED',
        fontWeight: 'bold',
        fontSize: 20,
    },


    checkboxLigne: {
        paddingLeft: '5%',
        paddingRight: '15%',
        margin: '3%',
        width: '100%',
        height: '8%',
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
        height: '10%',
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