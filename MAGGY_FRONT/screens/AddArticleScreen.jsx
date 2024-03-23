import React, { useState, useEffect, useCallback} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Image, Text, TextInput, View, Platform, StyleSheet, ScrollView, KeyboardAvoidingView, RefreshControl} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CameraScreen from './CameraScreen';
import HomeScreen from './HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesScreen from './CategoriesScreen';
import MarqueScreen from './MarqueScreen';
import EtatScreen from './EtatScreen';
import StyleScreen from './StyleScreen';
import TailleScreen from './TailleScreen';
import EpoqueScreen from './EpoqueScreen';
import MatiereScreen from './MatiereScreen';
import CouleurScreen from './CouleurScreen';
import MotifScreen from './MotifScreen';
import LongueurScreen from './LongueurScreen';
import LongueurManchesScreen from './LongueurManchesScreen';
import VolumeScreen from './VolumeScreen';
import LieuFabricationScreen from './LieuFabricationScreen';


export default function AddArticleScreen({ navigation }) {
  const article = useSelector((state) => state.value)
  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  console.log(user)
  // const [image, setImage] = useState(null);
  // const temporaryPicture = useSelector(state => state.photo.value)
  const [showCameraScreen, setShowCameraScreen] = useState(false)
  const [pictureTaken, setPictureTaken] = useState(null)
  const [importedPhoto, setImportedPhoto] = useState(null)
  const [inputText, setInputText] = useState("")
  const [category, setCategory] = useState("")
  const [showButton, setShowButton] = useState(false)
  const [refreshing, setRefreshing] = useState(false);


  const [categories, setCategories] = useState([])
  const [showCategoriesScreen, setShowCategoriesScreen] = useState(false)

  const [Marque, setMarque] = useState([])
  const [showMarqueScreen, setShowMarqueScreen] = useState(false)

  const [Etat, setEtat] = useState([])
  const [showEtatScreen, setShowEtatScreen] = useState(false)

  const [Style, setStyle] = useState([])
  const [showStyleScreen, setShowStyleScreen] = useState(false)

  const [Taille, setTaille] = useState([])
  const [showTailleScreen, setShowTailleScreen] = useState(false)

  const [Epoque, setEpoque] = useState([])
  const [showEpoqueScreen, setShowEpoqueScreen] = useState(false)

  const [Matiere, setMatiere] = useState([])
  const [showMatiereScreen, setShowMatiereScreen] = useState(false)

  const [Couleur, setCouleur] = useState([])
  const [showCouleurScreen, setShowCouleurScreen] = useState(false)

  const [Motif, setMotif] = useState([])
  const [showMotifScreen, setShowMotifScreen] = useState(false)

  const [Longueur, setLongueur] = useState([])
  const [showLongueurScreen, setShowLongueurScreen] = useState(false)

  const [LongueurManches, setLongueurManches] = useState([])
  const [showLongueurManchesScreen, setShowLongueurManchesScreen] = useState(false)

  const [Volume, setVolume] = useState([])
  const [showVolumeScreen, setShowVolumeScreen] = useState(false)

  const [LieuFabrication, setLieuFabrication] = useState([])
  const [showLieuFabricationScreen, setShowLieuFabricationScreen] = useState(false)



  const resetState = () => {
    setPictureTaken(null);
    setImportedPhoto(null);
    setInputText("");
    setCategory("");
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      resetState();
    }, 2000);
  }, []);



console.log(importedPhoto);

  const pickImage = async () => {
    const formData = new FormData()
    // Pas de permission necessaire pour accéder à la galerie
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)
    formData.append('photoFromFront', {
      uri: result?.assets[0].uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => { setImportedPhoto(data.url)})
  }




  const saveArticle = async () => {
    const formData = new FormData()

    {pictureTaken !== null && formData.append('photo', `data:image/jpg;base64,${pictureTaken?.base64}`)}
    {importedPhoto !== null && formData.append('importedPhoto', `${importedPhoto}` )}


    formData.append('titre', inputText)
    formData.append('categorie', category)


    // Voir doc: https://docs.expo.dev/versions/latest/sdk/camera/#takepictureasyncoptions
    // formData.append('photoFromFront', `data:image/jpg;base64,${pictureTaken?.base64}`)



    //Route pour enregistrer les photos en BDD
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/articles`, {
      method: 'POST',
      body: formData,
      })
      if (response.ok) {
        navigation.navigate("EvaluationArticle ")
      } else {
        console.error('failed to save article')
      }
    };

    //Supprimer les articles
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/delete/:_id`, {
      method: 'DELETE',
      body: JSON.stringify({

      })
    })

  if (showCameraScreen) { // -> Ce "if" ne passe plus et donc on affiche plus la caméra... -> ligne 78
    return <CameraScreen
      onPictureTaken={(newPhotoTaken) => {
        // Une fois que la photo est prise, je sauvegarde dans ce composant la photo et cache l'écran de "camera"
        setPictureTaken(newPhotoTaken)
        setShowCameraScreen(false) // Ici en passant à false... -> Ligne 68
      }}
    />
  }

  if (showCategoriesScreen) {
    return <CategoriesScreen
      onBack={() => setShowCategoriesScreen(false)}
      onValidated={(selectedCategories) => setCategories(selectedCategories)}
    />
  }

  if (showMarqueScreen) {
    return <MarqueScreen
      onBack={() => setShowMarqueScreen(false)}
      onValidated={(selectedMarque) => setMarque(selectedMarque)}
    />
  }

  if (showStyleScreen) {
    return <StyleScreen
      onBack={() => setShowStyleScreen(false)}
      onValidated={(selectedStyle) => setStyle(selectedStyle)}
    />
  }

  if (showEtatScreen) {
    return <EtatScreen
      onBack={() => setShowEtatScreen(false)}
      onValidated={(selectedEtat) => setEtat(selectedEtat)}
    />
  }

  if (showTailleScreen) {
    return <TailleScreen
      onBack={() => setShowTailleScreen(false)}
      onValidated={(selectedTaille) => setTaille(selectedTaille)}
    />
  }

  if (showEpoqueScreen) {
    return <EpoqueScreen
      onBack={() => setShowEpoqueScreen(false)}
      onValidated={(selectedEpoque) => setEpoque(selectedEpoque)}
    />
  }

  if (showMatiereScreen) {
    return <MatiereScreen
      onBack={() => setShowMatiereScreen(false)}
      onValidated={(selectedMatiere) => setMatiere(selectedMatiere)}
    />
  }

  if (showCouleurScreen) {
    return <CouleurScreen
      onBack={() => setShowCouleurScreen(false)}
      onValidated={(selectedCouleur) => setCouleur(selectedCouleur)}
    />
  }

  if (showMotifScreen) {
    return <MotifScreen
      onBack={() => setShowMotifScreen(false)}
      onValidated={(selectedMotif) => setMotif(selectedMotif)}
    />
  }

  if (showLongueurScreen) {
    return <LongueurScreen
      onBack={() => setShowLongueurScreen(false)}
      onValidated={(selectedLongueur) => setLongueur(selectedLongueur)}
    />
  }

  if (showLongueurManchesScreen) {
    return <LongueurManchesScreen
      onBack={() => setShowLongueurManchesScreen(false)}
      onValidated={(selectedLongueurManches) => setLongueurManches(selectedLongueurManches)}
    />
  }

  if (showVolumeScreen) {
    return <VolumeScreen
      onBack={() => setShowVolumeScreen(false)}
      onValidated={(selectedVolume) => setVolume(selectedVolume)}
    />
  }

  if (showLieuFabricationScreen) {
    return <LieuFabricationScreen
      onBack={() => setShowLieuFabricationScreen(false)}
      onValidated={(selectedLieuFabrication) => setLieuFabrication(selectedLieuFabrication)}
    />
  }



  // -> Du coup c'est ce code qui s'affiche
  // Pourquoi le "navigation.goBack()" fonctionnait pas dans le composant "<CameraScreen/>" ? Parce qu'en fait on a pas ouvert une nouvelle page, on a juste remplacé
  // ce qui est affiché sur cet écran. Donc il n'y a pas de notion de page précédente pour ce cas là. Voilà tout !



  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <View style={styles.blocHaut}>
    <Text style={styles.title}>Ajoute un nouvel article</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <FontAwesome name="times" size={25} color='#553DED'/>
                </TouchableOpacity>
    </View>

    {user.token  ? (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      {pictureTaken === null && <View style={styles.blocPhotoImport}>
        {
          importedPhoto ? (
            <Image style={styles.importedLocalPhotoSquare} source={{uri : importedPhoto}}/>
            ) : (
              <View style={styles.importedLocalPhotoSquare}>
              <FontAwesome name='plus' size={25} color="lightblue"></FontAwesome>
            </View>
          )
        }
        <TouchableOpacity style={styles.importBtn} onPress={pickImage}>
          <FontAwesome name='image' size={25}></FontAwesome>
        </TouchableOpacity>
      </View>}
      {importedPhoto === null && <View style={styles.blocPhotoImport}>
        {
          pictureTaken ? (
            <Image style={styles.importedPhotoSquare} source={pictureTaken} />
            ) : (
              <View style={styles.importedPhotoSquare}>
              <FontAwesome name='plus' size={25} color="lightblue"></FontAwesome>
            </View>
          )
        }
        <TouchableOpacity
          style={styles.photoBtn}
          onPress={() => setShowCameraScreen(true)}
          >
          <FontAwesome name='camera' size={25} ></FontAwesome>

        </TouchableOpacity>
      </View>}
      <View>
        <TextInput placeholder='Titre' value={inputText} onChangeText={setInputText} style={styles.textInput} />
      </View>


      <View style={styles.categorie}>

        <TouchableOpacity onPress={() => setShowCategoriesScreen(true)} style={styles.cate}>
            <Text style={styles.categorieText}>Catégorie</Text>
           <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowMarqueScreen(true)} style={styles.cate}>
            <Text style={styles.categorieText}>Marque</Text>
            <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowEtatScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>État</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowStyleScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Style</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowTailleScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Taille</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowEpoqueScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Epoque</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowMatiereScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Matière</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowCouleurScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Couleur</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowMotifScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Motif</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowLongueurScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Longueur</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowLongueurManchesScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Longueur des manches</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowVolumeScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Volume</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowLieuFabricationScreen(true)} style={styles.cate}>
          <Text style={styles.categorieText}>Lieu de fabrication</Text>
          <FontAwesome name="arrow-right" color='#F474D0' size={25} style={styles.arrow}></FontAwesome>
        </TouchableOpacity>

        <View style={styles.textAreaContainer} >
    <TextInput
      style={styles.textArea}
      underlineColorAndroid="pink"
      placeholder="Ici tu peux décrire un peu plus ton article"
      placeholderTextColor="grey"
      numberOfLines={10}
      multiline={true}
    />
  </View>


        <View style={styles.blocBas}>
        <TouchableOpacity style={styles.validerBtn} onPress={() => saveArticle()}>
          <Text style={styles.valider}>Ajouter</Text>
        </TouchableOpacity>
      </View>
      </View>

      </ScrollView>
    ) : (
      <Text>Veuillez vous connecter pour acceder à cette page</Text>

    )}
    </KeyboardAvoidingView>
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

  blocHaut:{
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '10%',
        paddingLeft: '15%',
        paddingRight: '5%',
  },
   title: {
        fontWeight: 'bold',
        fontSize:  24,
        color: '#F474D0'
      },

      scrollView: {
        flexDirection: 'column',
        width: '100%',
        height: '300%',
        paddingTop: '5%',
        paddingBottom: '10%',
      },

  importedPhotoSquare: {
    borderWidth: 2,
    width: 115,
    height: 115,
    borderColor: 'lightblue',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },

  importedLocalPhotoSquare: {
    borderWidth: 2,
    height:115,
    width:115,
    borderColor: 'lightblue',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },

  blocPhotoImport: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  endSpace: {
    height: 15,
  },

  xmark: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    color: '553DED',
    marginLeft: 300
  },

  categorie: {
    flexDirection: 'colunm',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    height:'60%',
  },

  cate: {
    paddingLeft: '5%',
    paddingRight: '15%',
    margin: '3%',
    width: '100%',
    height: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'orange',
  },

  textPhoto: {
    color: '#553DED',
  },

  categorieText: {
    color: '#553DED',
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },

  ajouter: {
    color: '#F474D0',
  },

  //Bouttons & inputs
  importBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC149',
    color: '#3A9D38',
    borderRadius: '50%',
    width: 70,
    height: 70,
    margin: "7%"
  },

  photoBtn: {
    backgroundColor: '#F474D0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 70,
    width: 70,
    color: '#3A9D38',
    borderRadius: '50%',
    margin: "7%"


  },

  ajouterBtn: {
    backgroundColor: '#FFC149',
    width: 100,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '22%'
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
    backgroundColor: '#D9E8D8',
    color: "#FFC149",
    boxShadow: '0, 0, 5, #C1D9BF, 0, 0, 0, 10, #f5f5f5eb',
    fontSize: '18',
    margin: "5%",
    paddingBottom: 7
  },

  deleteIcon: {
    marginRight: 10,
  },

  button:{
    flexDirection: 'row',
    alignItems:'center',
  },

  arrow: {
    marginRight: 15
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

blocBas: {
  margin: '3%',
  marginBottom: '10%',
  width: '50%',
  height: '10%',
  alignItems: 'center',
  justifyContent: 'center',
},

textAreaContainer: {
  paddingTop: '2%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  height: '10%',
  backgroundColor: 'pink',
},

textArea: {
  width: '100%',
  padding: '10%',
  backgroundColor: 'pink ',
},

});
