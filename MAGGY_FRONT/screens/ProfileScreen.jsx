import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    const token = useSelector(state => state.auth.token);
    const [pseudo, setPseudo] = useState("");
    const [ville, setVille] = useState("");

    console.log(token);

    useEffect(() => {
        if (token) {
            fetch(`http://10.20.2.112:3000/users/profile/${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log("Response data:", data);
                setPseudo(data.user.pseudo);
                setVille(data.user.adresse.ville);
            })
            .catch(error => console.error(error));
        }
    }, [token]);

    return (
        <View style={styles.container}>
            <View style={styles.blocHaut}>
                <View style={styles.fleche}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <FontAwesome name="arrow-left" size={24} color='#553DED' />
                    </TouchableOpacity>
                </View>


                <View style={styles.fleche}>
                    <TouchableOpacity onPress={() => navigation.navigate('MenuProfil')}>
                        <FontAwesome name="bars" size={24} color='#553DED' />
                    </TouchableOpacity>
                </View>
            </View>

            <Image
                source={require('../assets/logoprofilpage.png')}
                style={styles.logo}
            />
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.icon}>👤</Text>
                    <Text style={styles.infoText}>Pseudo: {pseudo}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.icon}>📍</Text>
                    <Text style={styles.infoText}>Ville: {ville}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.icon}>✏️</Text>
                    <Text style={styles.infoText}>Biographie: Aucune biographie disponible</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.icon}>📅</Text>
                    <Text style={styles.infoText}>Nombre d'abonnées: 3 </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.icon}>👥</Text>
                    <Text style={styles.infoText}>Nombre d'abonnements: 50</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.icon}>⏰</Text>
                    <Text style={styles.infoText}>Temps de réponse moyen: 5 min</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.icon}>⭐</Text>
                    <Text style={styles.infoText}>Évaluation: ⭐⭐⭐⭐⭐ (12)</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.buttonBackground}>
                    <Button title="Modifier" color="white" />
                </View>
                <View style={styles.buttonBackground}>
                    <Button title="Suivre" color="white" />
                </View>
            </View>

            <View style={styles.searchBar}>
                <Image
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher..."
                />
                <Text style={styles.productCount}>265 produits</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 190,
        marginBottom: 20,
    },
    infoContainer: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
    },
    infoText: {
        fontSize: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: '#8a2be2',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    productCount: {
        fontSize: 16,
    },
    blocfleche: {
        margin: '10%',
        paddingLeft: '5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        marginTop: 20,
    },
    buttonBackground: {
        backgroundColor: '#553DED',
        borderRadius: 5,
        flex: 1,
        margin: 8,
    },

    blocHaut:{
      position:'absolute',
      top: 0,
      width: '100%',
      height: '15%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
});

export default ProfileScreen;
