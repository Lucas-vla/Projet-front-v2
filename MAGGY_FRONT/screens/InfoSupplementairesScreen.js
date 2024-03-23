import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from 'react-redux';

const InfoSupplementairesScreen = ({ navigation }) => {
    const token = useSelector(state => state.auth.token);
   console.log("Token récupéré:", token)
    const [pseudo, setPseudo] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [birthday, setBirthday] = useState("");
    const [adresse, setAdresse] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [ville, setVille] = useState("");
    const [errors, setErrors] = useState({});
    const [errorPseudo, setErrorPseudo] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);


    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type === "set") {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setBirthday(currentDate.toDateString());
        } else {
            toggleDatePicker();
        }
    };

    const validateForm = () => {
        let errors = {};

        if (!pseudo) errors.pseudo = " HEP HEP Tu dois remplir ce champ";
        if (!prenom) errors.prenom = " HEP HEP Tu dois remplir ce champ";
        if (!nom) errors.nom = " HEP HEP Tu dois remplir ce champ";
        if (!birthday) errors.birthday = " HEP HEP Tu dois remplir ce champ";
        if (!adresse) errors.adresse = " HEP HEP Tu dois remplir ce champ";
        if (!codePostal) errors.codePostal = " HEP HEP Tu dois remplir ce champ";
        if (!ville) errors.ville = " HEP HEP Tu dois remplir ce champ";

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const requestBody = {
                pseudo: pseudo,
                prenom: prenom,
                nom: nom,
                birthday: birthday,
                adresse: {
                    rue: adresse,
                    codePostal: codePostal,
                    ville: ville
            }

        };

            console.log("body:", JSON.stringify(requestBody));

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/user/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                setErrorPseudo("Une erreur s'est produite lors de la mise à jour du profil");
            } else {
                setErrorPseudo("");
                console.log("Submitted", pseudo, prenom, nom, birthday, adresse, codePostal, ville); // ajouter rue là ?
                navigation.navigate('Profil');
            }
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => {
                        console.log(location);
                    }
                );
            }
        })();
    }, []);


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.background}>
            <View style={styles.box}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <FontAwesome name="times" size={24} color='#553DED' />
                </TouchableOpacity>
                <View style={styles.parentInput}>
                    <TextInput
                        placeholder="Pseudo"
                        value={pseudo}
                        onChangeText={setPseudo}
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                    />
                    {errorPseudo && <Text style={styles.error}>{errorPseudo}</Text>}
                    <TextInput
                        placeholder="Prénom"
                        value={prenom}
                        onChangeText={setPrenom}
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                    />
                    {errors.prenom && <Text style={styles.error}>{errors.prenom}</Text>}
                    <TextInput
                        placeholder="Nom"
                        value={nom}
                        onChangeText={setNom}
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                    />
                    {errors.nom && <Text style={styles.error}>{errors.nom}</Text>}
                    <View onPress={toggleDatePicker}>
                        {showPicker && (
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                                style={styles.datePicker}
                            />
                        )}
                    </View>
                    <TextInput
                        placeholder="Date de naissance"
                        value={birthday}
                        onChangeText={setBirthday}
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                        onPressIn={toggleDatePicker}
                    />
                    {errors.birthday && <Text style={styles.error}>{errors.birthday}</Text>}
                    <TextInput
                        placeholder="Adresse"
                        value={adresse}
                        onChangeText={setAdresse}
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                    />
                    {errors.adresse && <Text style={styles.error}>{errors.adresse}</Text>}
                    <TextInput
                        placeholder="Code postal"
                        value={codePostal}
                        onChangeText={setCodePostal}
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                    />
                    {errors.codePostal && <Text style={styles.error}>{errors.codePostal}</Text>}
                    <TextInput
                        placeholder="Ville"
                        value={ville}
                        onChangeText={setVille}
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                    />
                    {errors.ville && <Text style={styles.error}>{errors.ville}</Text>}
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonBackground1}>
                        <Button onPress={() => navigation.navigate("Quizz1")}
                            title="Passez cette étape"
                            color="#FFFFFF"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonBackground2}
                        onPress={handleSubmit}
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Let's goooo</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#3A9D38',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: '85%',
        height: '75%',
        backgroundColor: '#F474D0',
        padding: 10,
        borderRadius: 10,
        alignItems: 'stretch',
        justifyContent: 'space-around',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 40,
    },
    buttonBackground1: {
        backgroundColor: "orange",
        borderRadius: 5,
    },
    buttonBackground2: {
        backgroundColor: '#553DED',
        borderRadius: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    error: {
        color: '#553DED',
        marginLeft: 250,
    },
    button: {
        backgroundColor: '#553DED',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
});

export default InfoSupplementairesScreen;