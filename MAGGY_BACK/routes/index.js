// @ts-check
var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Article = require('../models/article');
const fetch = require('node-fetch');
const uniqid = require('uniqid');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

//Enregistrer les articles en BDD
router.post('/articles', async (req, res) => {
  const newArticle = new Article({
    photo: req.body.photo,
    importedPhoto: req.body.importedPhoto,
    titre: req.body.titre,
    categorie: req.body.categorie,
    /*marque: req.body.marque,
    style: [req.body.style],
    etat: req.body.etat,
    taille: req.body.taille,
    epoque: [req.body.epoque],
    matiere: [req.body.matiere],
    couleur: [req.body.couleur],
    motif: [req.body.motif],
    longueur: [req.body.longueur],
    longueurManche: req.body.longueurManche,
    volume: [req.body.volume],
    lieuFabrication: [req.body.lieuFabrication],
    description: req.body.description,
    favoris: req.body.favoris,
    cocos: req.body.cocos,*/
  })
  ;
  newArticle.save().then(() => res.json({ result: true } ) )
})


//Ajouter les photos prises avec la caméra dans cloudinary
router.post('/upload', async (req, res) => {
  const photoPath = `./tmp/${uniqid()}.jpg`;
  // Récupération de l'image Base64:
  //const photoFromFrontImage = Buffer.from(req.body.photoFromFront, 'base64');
  const resultMove = await req.files.photoFromFront.mv(photoPath);
  // !resultMove ? Pas l'inverse plutôt ?
  if (!resultMove) {
    // Voir doc: https://cloudinary.com/documentation/node_image_and_video_upload#node_js_upload_stream ???
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
    res.json({ result: true, url: resultCloudinary.secure_url });
    console.log(resultCloudinary.secure_url);
  } else {
    res.json({ result: false, error: resultMove });
  }
  fs.unlinkSync(photoPath);
});


//Afficher les articles créés sur HomeScreen
router.get('/displayArticles', (req, res) => {
  Article.find()
    .then(articles =>
      res.json({ result: true, Article: articles })
    )
});


//Afficher les articles selon un critère de recherche
router.get('/articles/:term', async (req, res) => {
  try {
    const searchTerm = req.params.term; // Récupère le terme de recherche de la route

    // Recherche les articles correspondants dans la base de données
    // tester sur thunder client avec http://localhost:3000/articles/encore la plante
    const articles = await Article.find({
      $or: [
        { titre: { $regex: searchTerm, $options: 'i' } },
        { categorie: { $regex: searchTerm, $options: 'i' } }, // Recherche par categorie (cas insensible)
        { marque: { $regex: searchTerm, $options: 'i' } }, // Recherche par marque (cas insensible)
        { style: { $regex: searchTerm, $options: 'i' } },
        { etat: { $regex: searchTerm, $options: 'i' } },
        { taille: { $regex: searchTerm, $options: 'i' } },
        { epoque: { $regex: searchTerm, $options: 'i' } },
        { matiere: { $regex: searchTerm, $options: 'i' } },
        { couleur: { $regex: searchTerm, $options: 'i' } },
        { motif: { $regex: searchTerm, $options: 'i' } },
        { lieuFabrication: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ]
    });
    res.json(articles); // Renvoie les articles trouvés en tant que réponse JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Aucun resultat ne correspond à votre recherche' });
  }
});

//Supprimer des articles selon leur id (car unique id)
router.delete("/delete/:_id", (req, res) => {
  const { _id: _id } = req.params
  Article.findById({ _id }).then((articleFound) => {
    Article.deleteOne({ _id }).then((articleDeleted) => {
      return res.json({ result: true, articleDeleted })
    })
  })
});

//Ajouter des articles en page favoris si le User est connecté grâce à son token
router.get('/favoris', (req, res) => {
  User.findOne({ token: req.params.token })
    .then(data => {
      if (data) {
        res.json({ result: true, addFavoris: data.addFavoris });
      } else {
        res.json({ result: false, error: 'Vous devez vous connecter' });
      }
    })
});


//Afficher les informations du profil
router.get('/displayProfile', (req, res) => {
  User.findOne({ token: req.params.token })
    .then(data => {
      if (data) {
        res.json({ result: true, displayProfile: data.displayProfile });
      } else {
        res.json({ result: false, error: 'Vous devez vous connecter' });
      }
    })
  })
  //Ajouter les photos prises avec la caméra dans cloudinary
  router.post('/upload', async (req, res) => {
    const photoPath = `./tmp/${uniqid()}.jpg`;
    // Récupération de l'image Base64:
    //const photoFromFrontImage = Buffer.from(req.body.photoFromFront, 'base64');
    const resultMove = await req.files.photoFromFront.mv(photoPath);
    // !resultMove ? Pas l'inverse plutôt ?
    if (!resultMove) {
      // Voir doc: https://cloudinary.com/documentation/node_image_and_video_upload#node_js_upload_stream ???
      const resultCloudinary = await cloudinary.uploader.upload(photoPath);
      res.json({ result: true, url: resultCloudinary.secure_url });
      console.log(resultCloudinary.secure_url);
    } else {
      res.json({ result: false, error: resultMove });
    }
    fs.unlinkSync(photoPath);
  });



module.exports = router;




