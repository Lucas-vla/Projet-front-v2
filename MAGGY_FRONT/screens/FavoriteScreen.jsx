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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Article from '../components/Article';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';



export default function FavoriteScreen({ navigation }) {

  const favorisRed = useSelector((state)=> state.favoris.value)
  const articles = favorisRed.map((data , i ) =>{
  const isFavorite = favorisRed.find(reduce => reduce.titre === data.titre)

    return <Article navigation={navigation} key={i} photo={data.photo} importedPhoto={data.importedPhoto} titre={data.titre} marque={data.marque} taille={data.taille} cocos={data.cocos} isFavorite={isFavorite}/>
  });

  const [selectedTab, setSelectedTab] = useState('Profile');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (

      <SafeAreaView style={styles.container}>
          <View style={styles.blocHaut}>
                <View style={styles.bloctitre}>
                <Text style={styles.title}>Favoris</Text>
                </View>
          </View>

                <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Profile' && styles.selectedTab]}
              onPress={() => handleTabPress('Profile')}>
              <Text style={styles.tabLabel}>Mes Favoris(5)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Settings' && styles.selectedTab]}
              onPress={() => handleTabPress('Settings')}>
              <Text style={styles.tabLabel}>Mes Alertes (8)</Text>
            </TouchableOpacity>
                </View>




      {/* Fin TabContainer */}
      <ScrollView contentContainerStyle={styles.favArticles}>
        {articles}
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E3'
  },
  blocHaut:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%'
  },
  bloctitre: {
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    marginLeft: '10%',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#F474D0'
  },

  favArticles: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },

 // Styles du TabContainer
 tabContainer: {
  padding: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignContent:'center',
  backgroundColor: '#3B9D38',
  paddingVertical: 0,
  paddingHorizontal: 0,
  borderTopRightRadius: '10%',
  borderBottomLeftRadius: '10%',
  borderBottomRightRadius: '10%',
  borderTopLeftRadius: '10%',
  width: '100%',
  borderWidth: 0,
  borderRightWidth: 0,
  borderLeftWidth: 0,
  borderBottomWidth: 0,
  borderColor: 'transparent',
},

  tab: {
    flex: 1,
    alignItems: 'center',
  },

  selectedTab: {
    backgroundColor: '#553DED',
    borderWidth: 2,
    borderLeftWidth:2,
    borderRightWidth: 2,
    borderRadius:'10%',
    borderColor: 'transparent',
  },

  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    color: '#F474D0',
  },
});
