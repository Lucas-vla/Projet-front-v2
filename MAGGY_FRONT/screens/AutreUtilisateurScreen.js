import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

const AutreUtilisateurScreen = ({ navigation }) => {
    const token = useSelector(state => state.auth.token);
    const [pseudo, setPseudo] = useState("");
    const [ville, setVille] = useState("");
    const [modalVisible, setModalVisible] = useState(false); // false psk je veux pas qu"lle se voit des que j'arrive

    useEffect(() => {
        if (token) {
            fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/profile/${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log("Response data:", data)
                setPseudo(data.user.pseudo);
                setVille(data.user.adresse.ville);
            })
            .catch(error => console.error(error));
        }
    }, [token]);

    const handleOptionsPress = () => {
        setModalVisible(true); // ma modale s'affiche qd je clique sur l'icone
    };

    return (
        <View style={styles.container}>
            <View style={styles.blocfleche}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={30} color="#553DED" style={styles.fleche} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOptionsPress}>
                    <FontAwesome name="ellipsis-v" size={30} color="#553DED" style={styles.optionsIcon} />
                </TouchableOpacity>
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
                    <Text style={styles.infoText}>Ville:{ville} </Text>
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


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <TouchableOpacity >
                            <Text style={styles.modalOption}>Restreindre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Text style={styles.modalOption}>Bloquer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.modalOption}>Signaler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Text style={styles.modalOption}>À propos de ce compte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Text style={styles.modalOption}>Partager ce profil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row', // tjr ça pour mettre en ligne
        justifyContent: 'space-around', // pr créer un espace entre les btn
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
    optionsIcon: {
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalOption: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalCancel: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
    },
});

export default AutreUtilisateurScreen;
