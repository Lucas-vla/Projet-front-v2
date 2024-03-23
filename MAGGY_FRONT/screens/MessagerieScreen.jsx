import { useState } from 'react';
import {
  Image,
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';




export default function MessagerieScreen({ navigation }) {

  const [selectedTab, setSelectedTab] = useState('Profile');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.blocHaut}>
                <View style={styles.bloctitre}>
                <Text style={styles.title}>Messagerie</Text>
                </View>

                <View style={styles.pen}>
                <TouchableOpacity onPress={() => navigation.navigate("NouveauMessage")}>
                <FontAwesome name="pencil" size={24} color='#553DED' />
                </TouchableOpacity>
                </View>
          </View>

                <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Profile' && styles.selectedTab]}
              onPress={() => handleTabPress('Profile')}>
              <Text style={styles.tabLabel}>Messages (5)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Settings' && styles.selectedTab]}
              onPress={() => handleTabPress('Settings')}>
              <Text style={styles.tabLabel}>Notifications (8)</Text>
            </TouchableOpacity>
                </View>


            <TouchableOpacity onPress={() => navigation.navigate("Conversation")} style={styles.blocMessage}>
              <View style= {styles.picture}>
              <Image style= {styles.logo} source={require('../assets/logoprofilpage.png')}></Image>
              </View>
              <View style= {styles.textesMessage}>
                <Text style= {styles.pseudoMessage}>Manon99</Text>
                <Text style= {styles.articleMessage}>Converses roses</Text>
                <Text style= {styles.debutMessage}>Salut Manon99, je te contacte car je suis interéssé par ton article....</Text>
                </View>
                <Text style= {styles.timeMessage}>hier à 18h</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Conversation")} style={styles.blocMessage}>
              <View style= {styles.picture}>
              <Image style= {styles.logo} source={require('../assets/logoprofilpage.png')}></Image>
              </View>
              <View style= {styles.textesMessage}>
                <Text style= {styles.pseudoMessage}>Lucasdu13</Text>
                <Text style= {styles.articleMessage}>Robe longue</Text>
                <Text style= {styles.debutMessage}>Salut Lucasdu13, je te contacte car je suis interéssé par ton article....</Text>
                </View>
                <Text style= {styles.timeMessage}>hier à 12h</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Conversation")} style={styles.blocMessage}>
              <View style= {styles.picture}>
              <Image style= {styles.logo} source={require('../assets/logoprofilpage.png')}></Image>
              </View>
              <View style= {styles.textesMessage}>
                <Text style= {styles.pseudoMessage}>Juliedu13</Text>
                <Text style= {styles.articleMessage}>Santiages vintage</Text>
                <Text style= {styles.debutMessage}>Salut Juliedu13, je te contacte car je suis interéssé par ton article...</Text>
                </View>
                <Text style= {styles.timeMessage}>hier à 8h</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Conversation")} style={styles.blocMessage}>
              <View style= {styles.picture}>
              <Image style= {styles.logo} source={require('../assets/logoprofilpage.png')}></Image>
              </View>
              <View style= {styles.textesMessage}>
                <Text style= {styles.pseudoMessage}>Cycydu22</Text>
                <Text style= {styles.articleMessage}>Doudoune de ski</Text>
                <Text style= {styles.debutMessage}>Salut Cycydu22, je te contacte car je suis interéssé par ton article....</Text>
                </View>
                <Text style= {styles.timeMessage}>avant-hier</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Conversation")} style={styles.blocMessage}>
              <View style= {styles.picture}>
              <Image style= {styles.logo} source={require('../assets/logoprofilpage.png')}></Image>
              </View>
              <View style= {styles.textesMessage}>
                <Text style= {styles.pseudoMessage}>Toto3000</Text>
                <Text style= {styles.articleMessage}>Bottes de chantier</Text>
                <Text style= {styles.debutMessage}>Salut Toto3000, je te contacte car je suis interéssé par ton article....</Text>
                </View>
                <Text style= {styles.timeMessage}>avant-hier</Text>
            </TouchableOpacity>
  </SafeAreaView>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E3'
  },

  picture: {
    borderRadius: '15%',
    width: 80,
    height: 80,
    margin: '2%',
    backgroundColor: 'white',
  },

  logo: {
    margin: '2%',
    width: 70,
    height: 70,
  },

  blocHaut:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%'
  },

  bloctitre: {
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    marginLeft: '10%',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#F474D0'
  },

  pseudoMessage: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },

  articleMessage: {
    fontSize: 18,
    color: 'white'
  },

  debutMessage: {
    fontSize: 12,
    color: 'white'
  },

  textesMessage: {
    margin: '1%',
    height: '90%',
    width: '60%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  timeMessage: {
    paddingRight: '10%',
    height: '90%',
    width: '20%',
    fontSize: 12,
    color: 'white'
  },

  // Styles du TabContainer
  tabContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: '#3B9D38',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderTopRightRadius: '10%',
    borderBottomLeftRadius: '10%',
    borderBottomRightRadius: '10%',
    borderTopLeftRadius: '10%',
    width: '100%',
    borderWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'transparent',
  },

  tab: {
    flex: 1,
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: '#553DED',
    borderWidth: 2,
    borderLeftWidth:2,
    borderRightWidth: 2,
    borderRadius:'10%',
    borderColor: 'transparent',
  },

  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    color: '#F474D0',
  },

  blocMessage: {
    width: '100%',
    height: '15%',
    backgroundColor: '#F474D0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
  },
});