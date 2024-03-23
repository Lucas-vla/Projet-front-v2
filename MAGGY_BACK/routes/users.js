
var express = require('express');
var router = express.Router();

require('../models/connexion');

const User= require('../models/user');
const { checkBody } = require('../modules/CheckBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');




router.post('/inscription', (req, res) => {
  if (!checkBody(req.body, ['mail','mdp'])) {
    res.json({ result: false, error: 'champs vides ou incomplets' });
    return
  }

// Le message d'erreur pour vérification format du mail
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (!EMAIL_REGEX.test(req.body.mail)) {
res.json({result: false, error: "le format du mail est incorrect"});
return

}

// Message d'erreur pour vérifier la longueur d'une mdp
if (req.body.mdp.length<6) {
  res.json ({result: false, error:"le mdp doit comporter au moins 12 caractères" })
  return;
}





  // Si l'utilisateur existe déjà
  User.findOne({ mail: req.body.mail }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.mdp, 10);

      const newUser = new User({
        mail: req.body.mail,
        mdp: hash,
        token: uid2(32),
       });

      newUser.save().then(data => {
        res.json({ result: true, token: data.token });
      });

    } else {
      // User already exists in database
      res.json({ result: false, error: 'mail associé à un compte existant' });
    }
  });
  });



  router.post('/connexion', (req, res) => {
    if (!checkBody(req.body, ['mail', 'mdp'])) {
      res.json({ result: false, error: 'champs vides ou incomplets' });
      return
    }


// Le message d'erreur pour vérification format du mail
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (!EMAIL_REGEX.test(req.body.mail)) {
res.json({result: false, error: "le format du mail est incorrect"});
return

}

// Message d'erreur pour vérifier la longueur d'une mdp
if (req.body.mdp.length<6) {
  res.json ({result: false, error:"le mdp doit comporter au moins 12 caractères" })
  return;
}

// Utilisateur non inscrit
    User.findOne({ mail: req.body.mail}).then(data => {
      console.log(data);
      if (data && bcrypt.compareSync(req.body.mdp, data.mdp)) {
        res.json({ result: true, token: data.token });
      } else {
        res.json({ result: false, error: 'utilisateur introuvable ou mot de passe incorrect' });
      }
    });
  });



  

   


  /*router.put('/user/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const existingUser = await User.findOne({ token: token });

        if (!existingUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier si 'adresse' est défini et est un objet
        if (!req.body.adresse || typeof req.body.adresse !== 'object') {
            return res.status(400).json({ message: "L'adresse doit être un objet contenant les sous-champs nécessaires" });
        }

        // Mise à jour des champs d'adresse individuels
        existingUser.adresse.rue = req.body.adresse.rue;
        existingUser.adresse.codePostal = req.body.adresse.codePostal;
        existingUser.adresse.ville = req.body.adresse.ville;

        // Mise à jour des autres champs de l'utilisateur
        existingUser.pseudo = req.body.pseudo;
        existingUser.prenom = req.body.prenom;
        existingUser.nom = req.body.nom;
        existingUser.birthday = req.body.birthday;

        // Enregistrement des modifications
        await existingUser.save();

        res.status(200).json({ message: "Informations utilisateur mises à jour avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});
*/

router.put('/user/:token', async (req, res) => {
  try {
    const existingUser = await User.findOne({ token: req.params.token });
    if (!existingUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const update = {
      pseudo: req.body.pseudo,
      prenom: req.body.prenom,
      nom: req.body.nom,
      birthday: req.body.birthday, 
      'adresse.rue': req.body.adresse.rue, 
      'adresse.codePostal': req.body.adresse.codePostal, 
      'adresse.ville': req.body.adresse.ville, 
    };
    const updatedDocument = await User.findOneAndUpdate({ token: req.params.token }, update, { new: true });

    return res.status(200).json({ user: updatedDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});





router.get("/profile/:token", async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Token reçu dans la requête :", token)

    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(404).json({ message: "User non trouvé" });
    }

    console.log(user)

    res.status(200).json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;