import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authSlice';
import favoris from './reducers/favoris';
import user from './reducers/user';
import article from './reducers/article';


const reducers = combineReducers({ favoris , user, article, auth: authReducer})


const persistConfig = { key: 'Maggy', storage: AsyncStorage };
const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import AddArticle from './screens/AddArticleScreen';
import MessagerieScreen from './screens/MessagerieScreen';
import ProfileScreen from './screens/ProfileScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraScreen from './screens/CameraScreen';
import ChargementScreen from './screens/ChargementScreen';
import AcceuilScreen from './screens/AcceuilScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import ConfirmationMailScreen from './screens/ConfirmationMailScreen';
import ValidationInscriptionScreen from './screens/ValidationInscriptionScreen';
import InfoSupplementairesScreen from './screens/InfoSupplementairesScreen';
import NouveauMessageScreen from './screens/NouveauMessageScreen';
import ConversationScreen from './screens/ConversationScreen';
import MapScreen from './screens/MapScreen';
import Quizz1Screen from './screens/Quizz1Screen';
import EvaluationArticleScreen from './screens/EvaluationArticleScreen';
import ArticleScreen from './screens/ArticleScreen';
import MenuProfilScreen from "./screens/MenuProfilScreen";
import AutreUtilisateurScreen from './screens/AutreUtilisateurScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'home'
        } else if (route.name === 'Favorite') {
          iconName = 'heart'
        } else if (route.name === 'AddArticle') {
          iconName = 'plus'
        } else if (route.name === 'Message') {
          iconName = 'envelope'
        } else if (route.name === 'Profil') {
          iconName = 'user'
        }

        return <FontAwesome name={iconName} size={size} color={color} />
      },
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#553DED',
      tabBarInactiveTintColor: '#F474D0',
      tabBarStyle: { backgroundColor: '#3A9D38' }
    })}>
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name='Favorite' component={FavoriteScreen} />
      <Tab.Screen name='AddArticle' component={AddArticle} />
      <Tab.Screen name='Message' component={MessagerieScreen} />
      <Tab.Screen name='Profil' component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>

      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Acceuil" component={AcceuilScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Chargement" component={ChargementScreen} />
            <Stack.Screen name="Inscription" component={InscriptionScreen} />
            <Stack.Screen name="Connection" component={ConnectionScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationMailScreen} />
            <Stack.Screen name="ValidationInscription" component={ValidationInscriptionScreen} />
            <Stack.Screen name="InfoSupp" component={InfoSupplementairesScreen} />
            <Stack.Screen name="Profil" component={ProfileScreen} />
            <Stack.Screen name="map" component={MapScreen}/>
            <Stack.Screen name="Article" component={ArticleScreen}/>
            <Stack.Screen name="Quizz1" component={Quizz1Screen} />
            <Stack.Screen name="EvaluationArticle" component={EvaluationArticleScreen} />
            <Stack.Screen name="AutreUtilisateur" component={AutreUtilisateurScreen} />
            <Stack.Screen name="Conversation" component={ConversationScreen} />
            <Stack.Screen name="NouveauMessage" component={NouveauMessageScreen} />
            <Stack.Screen name="MenuProfil" component={MenuProfilScreen}/>


          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
