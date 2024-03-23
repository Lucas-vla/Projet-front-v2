const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
 photo: String,
 importedPhoto: String,
 titre: String,
 categorie: String,
 marque: String,
 style:Array,
 etat: String,
 taille: String,
 epoque: Array,
 matiere: Array,
 couleur: Array,
 motif: Array,
 longueur: Array,
 longueurManche: String,
 volume: Array,
 lieuFabrication: Array,
 description: String,
 cocos: Number,
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});


const Article = mongoose.model('articles', articleSchema);

module.exports = Article;