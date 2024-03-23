import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { clearToken } from '../reducers/authSlice';
import ConnectionScreen from './ConnectionScreen';


const MenuRectangle = ({ text, iconName,  }) => (
  <TouchableOpacity style={styles.menuItem}>

    <FontAwesome name={iconName} size={20} color="white" style={styles.icon} />

    <Text style={styles.menuText}>{text}</Text>
    <FontAwesome name="arrow-right" size={20} color="#553DED" style={styles.arrow} />
  </TouchableOpacity>
);

const MonCompteScreen = ({navigation}) => {

  const logout = () => {
    dispatch(clearToken());
    navigation.navigate('Connection');
  };

  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
                    <FontAwesome name="arrow-left" size={30} color="#553DED" style={styles.arrow} />
                </TouchableOpacity>

        <Text style={styles.headerText}>Mon Compte</Text>
        <View style={{ width: 20 }} />
      </View>

      <View style={styles.menuContainer}>
        <MenuRectangle text="Mes Cocos" iconName="user" />
        <MenuRectangle text="Mes Transactions" iconName="shopping-cart" />
        <MenuRectangle text="Mes Favoris" iconName="heart" />
        <MenuRectangle text="Mes Recommandations" iconName="star" />
        <MenuRectangle text="Mode Vacances" iconName="plane" />
        <MenuRectangle text="Personnalisation" iconName="cog" />
        <MenuRectangle text="Paramètres" iconName="gear" />
        <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonBackground}
                       onPress={() => logout()}>
                        <Text styles={styles.decoBtn}>Deconnexion</Text>
                      </TouchableOpacity>
                    </View>
                </View>
      </View>
     );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 27,
  },
  menuContainer: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3B9D38',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 30,
    marginBottom: 10,
  },
  menuText: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
  },
  icon: {
    marginRight: 10,
  },
  arrow: {
    marginRight: 10,
  },

  buttonContainer: {
    marginTop: 10,
    width: '50%',
    borderRadius: 5,
    overflow: 'hidden',
    paddingLeft: 15,
},
buttonBackground: {
    backgroundColor: '#553DED',
    borderRadius: 5,
    padding: 10,
},

decoBtn: {
  color: 'white'
},

});

export default MonCompteScreen;
