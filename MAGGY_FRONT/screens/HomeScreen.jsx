import { useState, useEffect, useCallback } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  RefreshControl,

} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Article from '../components/Article';

export default function HomeScreen({ navigation }) {

  const favorisRed = useSelector((state) => state.favoris.value)
  const [newArticles, setNewArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  //Méthode pour rafraichir la page
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

//Afficher les articles selon un critère de recherche (titre, marque...)
  const fetchArticles = async () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/articles/${searchTerm}`)
      .then((response) => response.json())
      .then(data => setNewArticles(data))
      .catch(error => console.error("Failed to fetch", error))
  };

  useEffect(() => {
    fetchArticles();
  }, [refreshing, searchTerm]);

  const handleSearch = () => {
    //Appeler à nouveau fetchArticles lors de la recherche
    fetchArticles();
  };

  //Afficher les articles
  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/displayArticles`)
      .then((response) => response.json())
      .then(data => setNewArticles(data.Article.reverse()))
      .catch(error => console.error("Failed to fetch", error))
  }, [refreshing])

  const articles = newArticles?.map((data, i) => {
    // comparer par titre dans le reducer
    const isFavorite = favorisRed.find(reduce => reduce.titre === data.titre)
    return <Article key={i} photo={data.photo} navigation={navigation} importedPhoto={data.importedPhoto} titre={data.titre} marque={data.marque} taille={data.taille} cocos={data.cocos} isFavorite={isFavorite} />
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.haut}>
        <FontAwesome name={'bars'} size={23} style={styles.barsIcon} />
        <TextInput placeholder="Recherche..."
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          OnSubmitEditing={handleSearch}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoArticle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {articles}
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FAF4E3',
  },
  infoArticle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  haut: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 15
  },

  searchInput: {
    height: 40,
    lineHeight: 28,
    padding: '0 1',
    width: '70%',
    paddingLeft: 10,
    border: '2 solid transparent',
    borderRadius: 8,
    outline: 'none',
    backgroundColor: '#FFC149',
    color: "#0E000A",
    boxShadow: '0, 0, 5, #C1D9BF, 0, 0, 0, 10, #f5f5f5eb',
    fontSize: '18',
    paddingBottom: 9
  },

  barsIcon: {
    color: '#808080'
  }
})
