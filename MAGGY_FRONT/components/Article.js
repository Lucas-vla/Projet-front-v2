import { useState, useEffect } from 'react';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { addFavoris, removeFavoris } from '../reducers/favoris';
import ProfileScreen from '../screens/ProfileScreen';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Share
  } from 'react-native';

function Article(props){

    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.value)
    const [favoris, setFavoris] = useState(false)

    const handleFavorisClick = () => {
        if (user.token) {
            if (props.isFavorite) {
                dispatch(removeFavoris(props))
            } else {
                dispatch(addFavoris(props))
            }
        }
    }

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

    let iconStyle = {}
    if (props.isFavorite) {
        iconStyle = { 'color': '#da70d6' }
    }
    // Liked Article
    // const handleLikeArticle = () => {
    //     setLike(!like);
    //     props.updateLikedArticle(props.title) };

    //     let heartIconStyle ={ 'cursor': 'pointer'}
    //     if (like) {
    //         heartIconStyle = { 'color': '#e74c3c', }
    //     }

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.clickImg} onPress={() => props.navigation.navigate('Article')}>
                {props.photo && <Image style={styles.image} source={{ uri:props.photo}}/>}
                {props.importedPhoto && <Image style={styles.image} source={{ uri:props.importedPhoto}}/>}
            </TouchableOpacity>
            <View style={styles.iconStyle}>
                <View><FontAwesome name={'heart'} size={19} onPress={() => handleFavorisClick()} style={iconStyle} color={'black'}/></View>
                <View><FontAwesome name={'envelope'} size={19} onPress={() =>props.navigation.navigate('Conversation')} color={'brown'}/></View>
                <View><FontAwesome name={'share'}  size={19} onPress={shareData} color={'blue'}/></View>
                <View><FontAwesome name={'map-pin'} size={19} onPress={() => props.navigation.navigate('map')} color={'red'}/></View>
            </View>
            <View>
                {/* mettre les props pour être dynamique plus tard */}
                <Text style={styles.infoArticle}>{props.titre}</Text>
                <Text style={styles.infoArticle}>{props.categories}</Text>
                <Text style={styles.infoArticle}>{props.taille}</Text>
                <Text style={styles.infoArticle}>{props.cocos}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    clickImg: {
        height: "75%",
        marginBottom: 10,

    },


    container:{
      height: '100%',
      maxHeight: 225,
     width: '45%',
     padding: 15,


    },

    iconStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 2,

    },

    image: {
        width: '100%',
        height: "100%",
     marginBottom: 15,
     borderRadius: 5

    },

    infoArticle: {
        marginLeft: 5,
        padding: 1
    }
})
export default Article;
