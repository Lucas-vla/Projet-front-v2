import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ImageBackground, ScrollView, TextInput} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';


const ArticleScreen = ({navigation}) => {

  const shareData = async () => {
    try {
        await Share.share({
            message:
                'This is the demo text',
        });
    } catch (error) {
        alert(error.message);
    }
};

  return (
<View style={styles.container}>
      <ScrollView style={styles.scrollView}>
                <View style={styles.image}>
                <Image source={require('../assets/vetement.jpg')} style={{height : 450, objectFit: 'contain'}}></Image>
                </View>

      <View style={styles.blocuser}>

      <TouchableOpacity onPress={() => navigation.navigate('AutreUtilisateur')} style={styles.blocuserhaut}>
      <View style={styles.blocprofilpic}>
      <Image></Image>
      </View>
      <View style={styles.pseudocontainer}>
        <Text style={styles.pseudo}>Toto-l'escro</Text>
        <View style={styles.note}>
        <Text style={styles.notechiffre}>⭐⭐⭐⭐⭐(32)</Text>
        </View>
        <View style={styles.blocposition}>
        <Text style={styles.position}>📍 Marseille (3)</Text>
        </View>

      </View>

      <View style={styles.blocprix}>
      <FontAwesome name="star" color='green' size={60} ></FontAwesome>
      <Text style={styles.texteprix}>62 COCO</Text>
      </View>
      </TouchableOpacity>

        <View style={styles.blocuserbas}>
                <TouchableOpacity style={styles.fondButton1} onPress={() => navigation.navigate('TabNavigator')}>
                <FontAwesome name="heart" color='blue' size={30} ></FontAwesome>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fondButton3}  onPress={() => navigation.navigate('AutreUtilisateur')}>
                <FontAwesome name="user" size={30} color='#553DED' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fondButton2} onPress={() => navigation.navigate('Conversation')}>
                <FontAwesome name="pencil" color='#F474D0' size={30} ></FontAwesome>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fondButton3}  onPress={shareData}>
                <FontAwesome name="share" size={30} color='#553DED' />
                </TouchableOpacity>

        </View>
      </View>

      <View style={styles.blocsoustitre}>
        <Text style={styles.soustitle}>Robe noire</Text>
      </View>

      <View style={styles.blocinfos}>

      <View style={styles.blocinfosgauche}>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>catégorie:</Text>
      <Text style={styles.textedynamique}>Femme</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Etat:</Text>
      <Text style={styles.textedynamique}>Neuf</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Taille:</Text>
      <Text style={styles.textedynamique}>S-38</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Epoque:</Text>
      <Text style={styles.textedynamique}>les années 90</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Matière:</Text>
      <Text style={styles.textedynamique}>Polyester</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Longueur:</Text>
      <Text style={styles.textedynamique}>mi-long</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Couleur:</Text>
      <Text style={styles.textedynamique}>Noir</Text>
      </View>

      </View>

      <View style={styles.blocinfosdroite}>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Marque:</Text>
      <Text style={styles.textedynamique}>Chanel</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Style:</Text>
      <Text style={styles.textedynamique}>Working</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Motif:</Text>
      <Text style={styles.textedynamique}>uni</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Longueur des manches:</Text>
      <Text style={styles.textedynamique}>Bustier</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Volume:</Text>
      <Text style={styles.textedynamique}>Près du corps</Text>
      </View>

      <View style={styles.blocinfostexte}>
      <Text style={styles.texteclef}>Lieu de fabrication:</Text>
      <Text style={styles.textedynamique}>Made in China</Text>
      </View>

      </View>
      </View>

      <View style={styles.blocdescription}>
    <TextInput
      style={styles.textArea}
      underlineColorAndroid="pink"
      placeholder="Elle est fendue sur le devant et zippée derrière"
      placeholderTextColor="grey"
      numberOfLines={10}
      multiline={true}
    />

      </View>

      <View style={styles.blocTitreEtInput}>
      <Text style={styles.texteclef}>Dressing de Toto-l'escro</Text>
      <TextInput placeholder='Recherche'  style={styles.textInput} />
      </View>

      <View style={styles.blocNbproduit}>
      </View>

      <View style={styles.blocDressing}>
      </View>
      </ScrollView>


      <View style={styles.blocHaut}>
      <View style={styles.fleche}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome name="arrow-left" size={24} color='#553DED' />
                </TouchableOpacity>
                </View>
                <View style={styles.bloctitre}>
                <Text style={styles.title}>Robe noire</Text>
                </View>
                <View style={styles.fleche}>
                <TouchableOpacity onPress={() => navigation.navigate('AddArticle')}>
                <FontAwesome name="bars" size={24} color='#553DED' />
                </TouchableOpacity>
                </View>
                </View>
      </View>
  );
};





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

    image: {
        flex:1,
        width: '90%',
justifyContent: 'center',
alignItems: 'center',
    },

    scrollView: {

        width: '100%',
        height: '300%',
        paddingBottom: '10%',
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

      blocuser: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 240,
      },

      pseudocontainer: {
        marginLeft: '5%',
        paddingTop: '4%',
        paddingBottom: '4%',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '40%',
        height: '90%',
      },

      blocprix: {
        paddingTop: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        height: '90%',
      },

      blocuserhaut: {
        paddingLeft: '4%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '50%',
      },

      blocprofilpic: {
        marginTop: '8%',
        marginBottom: '8%',
        borderRadius: '15%',
        width: '25%',
        height: '70%',
        backgroundColor: 'pink',
      },

      blocuserbas: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '40%',

      },

      title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: 'white'
      },

      pseudo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'blue'
      },

      texteprix: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'blue'
      },

      position:{
        fontWeight: 'bold',
        fontSize: 14,
        color: 'blue'
      },

      blocsoustitre: {
        paddingLeft: '6%',
        width: '100%',
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'pink',
      },

      soustitle: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'blue'
      },

      profilpic: {
        width: '100%',
        height: '100%',
      },

      fondButton1: {
        width: '20%',
        height: '60%',
        backgroundColor: 'orange',
        borderRadius: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

      fondButton2: {
        width: '20%',
        height: '60%',
        backgroundColor: 'green',
        borderRadius: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fondButton3: {
        width: '20%',
        height: '60%',
        backgroundColor: 'red',
        borderRadius: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ecrire: {
        color: '#F474D0',
        fontWeight: 'bold',
        fontSize: 18,
    },

    blocinfos: {
        width: '100%',
        height: 500,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

    blocinfosgauche: {
        width: '45%',
        height: '100%',

    },

    blocinfosdroite: {
        width: '45%',
        height: '100%',

    },

    blocinfostexte: {
        padding: '5%',
        borderRadius: '10%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        marginTop: '8%',
        width: '100%',
        height: 55,
        backgroundColor: 'pink',
    },

    texteclef: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'blue'
    },

    textedynamique: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'green'
    },

    blocdescription: {
        paddingTop: '4%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: 100,
        backgroundColor: 'pink',
      },

      textArea: {
        width: '100%',
        padding: '10%',
        backgroundColor: 'pink ',
      },

      textInput: {
        height: 40,
        lineHeight: 28,
        padding: '0 1',
        width: 300,
        paddingLeft: 10,
        border: '2 solid transparent',
        borderRadius: 8,
        outline: 'none',
        backgroundColor: 'white',
        color: "#FFC149",
        boxShadow: '0, 0, 5, #C1D9BF, 0, 0, 0, 10, #f5f5f5eb',
        fontSize: '18',
        margin: "5%",
        paddingBottom: 7
      },
});

export default ArticleScreen;