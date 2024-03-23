const mongoose = require('mongoose');


const adresseSchema = mongoose.Schema({
    rue: String,
    codePostal: String,
    ville: String,
});

// const quizzSchema = mongoose.Schema({
//     question1: Array,
//     question2: Array,
//     question3: Array,
//     question4: Array,
//     question5: Array,
// });

const quizzResponseSchema = new mongoose.Schema({
    question:{
        type:String,
        required: true,
    }, selectedOptions: {
        type:[String],
        required: true,
    }
})

const reseauSchema = mongoose.Schema({
    abonnes: Array,
    abonnements: Array,
});

const userSchema = mongoose.Schema({
  nom: String,
  prenom: String,
  pseudo: String,
photoProfil: String,
  mdp: String,
  token: String,
  mail: String,
  birthday: Date,
  photoProfil: Array,
  biographie: String,
  abonnes: Array,
  abonnement: Array,
  tempsReponse: Number,
  favoris: Array,
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'articles'},
    avis: { type: mongoose.Schema.Types.ObjectId, ref: 'avis'},
adresse: adresseSchema,
quizz:[quizzResponseSchema],  //quizzSchema,
reseau: reseauSchema,
});

const User = mongoose.model('users', userSchema);
module.exports = User;