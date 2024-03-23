import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setToken } from '../reducers/authSlice';

const ConnectionScreen = ({ navigation }) => {
    const [mail, setMail] = useState('');
    const [mdp, setMdp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [messageErreur, setMessageErreur] = useState("");
    const dispatch = useDispatch();

    const handleConnexion = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/connexion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: mail.toLowerCase(),
                    mdp: mdp,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(setToken(data.token));
                    navigation.navigate('TabNavigator');
                } else {
                    setMessageErreur(data.error);
                }
            })
            .catch((error) => {
                console.error("Erreur de connection :", error);
                setMessageErreur("Erreur de connection");
            });
        } catch (error) {
            console.error("Erreur de connection :", error);
            setMessageErreur("Erreur de connection");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.blocfleche}>
                <TouchableOpacity onPress={() => navigation.navigate("Acceuil")}>
                    <FontAwesome name="arrow-left" size={30} color="#553DED" style={styles.fleche} />
                </TouchableOpacity>
            </View>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Je me connecte</Text>
            <View style={styles.blocBas}>
                <TextInput
                    placeholder="Email"
                    value={mail}
                    onChangeText={setMail}
                    style={styles.input}
                    placeholderTextColor="#BDBDBD" />
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        placeholder="Mot de passe"
                        value={mdp}
                        onChangeText={setMdp}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={24} color="orange" style={styles.eyeIcon} />
                    </TouchableOpacity>
                </View>
                {messageErreur ? <Text style={styles.error}>{messageErreur}</Text> : null}
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonBackground}>
                        <Button
                            title="Valider"
                            onPress={handleConnexion}
                            color="white"
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#3A9D38',
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        marginBottom: 10,
        fontSize: 30,
        color: 'white',
    },
    input: {
        width: '90%',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    blocfleche: {
        margin: '10%',
        paddingLeft: '5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    eyeIcon: {
        marginLeft: -30,
    },
    forgotPasswordText: {
        color: 'orange',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 10,
        width: '50%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    buttonBackground: {
        backgroundColor: '#553DED',
        borderRadius: 5,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
    blocBas: {
        width: '90%',
        height: '40%',
        marginBottom: 100,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default ConnectionScreen;
