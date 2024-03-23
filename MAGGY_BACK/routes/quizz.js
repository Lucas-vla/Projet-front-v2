var express = require('express');
var router = express.Router();
const User  = require('../models/user');

// si true (case cochée) je l'enregistre en BDD)
// router.post('/quizz', (req,res) => {
//    const newQuizz = new Quizz ({
//     question1: req.body,
//     question2: req.body,
//     question3: req.body,
//     question4: req.body,
//     question5: req.body, 
//    })
//    newQuizz.save()
// });

//Route pour enregistrer les réponses du quizz
router.post('/saveResponse/:token', async (req, res) => {
    User.updateOne({token: req.params.token},
        {quizz: [{ question:req.params.question, selectedoptions: req.params.selectedoptions}] }
        .then(() => {
             User.find()
            // .then(data=> {
            //     console.log(data)
        })
   )
  

    try {
        const { question, selectedOptions } = req.body;
        //Créer une nouvelle instance du modèle User avec les réponses du quizz
        const newUser = new User({
            quizz: [{ question, selectedOptions }] //Mettre les réponses dans un tableau
        });
        //Enregistrer l'utilisateur avec ses réponses du quizz dans la BDD
        await newUser.save();

        res.json({ resultat: true, message: 'Réponses du quizz enregistrées' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ resultat: false, error: "Une erreur est survenue" });
    } 
});



module.exports = router;