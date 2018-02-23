/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
//


const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;

/**
 * 
 * Configuration de Mongoose
 */

const mongoose = require('mongoose');
const mongoServeur = 'mongodb://localhost:27017/my-recipes';
//

/*
Définition des routes
*/
router.get( '/', (req, res) => {
    // Renvoyer le fichier index dans la réponse
    
     //Connextion à la base de données mongoDB
     mongoose.connect(mongoServeur, (err, db)=>{
         //Tester ma connexion
         if(err){ res.json({error: err}) }
         else{
             //Connexion ouverte : récupérer la collection de données
             db.collection('recipes').find().toArray( (err, collection)=>{
 
                 //tester la connexion de la collection
                 if(err){res.render('index',{error:err})}
                 else{
                     //Collection récupérée
                     //res.json(collection);

                         // Collection récupérée :Renvoyer le fichier index dans la réponse avec la collection
                        res.render('index',{data:collection});
                 }
             } )
         };
 
         //Fermer la connexion
         db.close();
 
     })
 
 });

/**
 * Modifier des valeurs !!!
 */
// Afficher la liste des posts dans la page INDEX
router.post( '/detail-recipes/:id', (req, res) => {
    
             // Connexion à la BDD MongoDB
             mongoose.connect( mongoServeur, ( err, db ) => {
     
                 // Tester la connexion à la BDD
                 if( err ) { res.render('detail-recipes', {error: err}) }
                 else {
     
                     // Connexion ouverte : récupérer la collection de données
                     db.collection('recipes').find({ _id: new ObjectId(req.params.id) }).toArray( (err, collection) => {
     
                         // Tester la connexion à la collection
                         if( err ) { res.render('detail-recipes', {error: err}) }
                         else{
     
                             // Collection récupérée : Renvoyer le fichier index dans la réponse avec la collection
                             res.render('detail-recipes', {data: collection});
                         };
                     });
                 };
     
                 // Fermer la connexion
                 db.close();
             });
         });






/**
 * Créer une route pour ajouter des taches
*/

    router.get('/add-recipes',(req, res)=>{
        res.render('add-recipes')
    });



 //
/*

/**
 * Créer une route pour suppr des taches
*/

router.get('/suppr-recipes',(req, res)=>{
    res.render('suppr-recipes')
});

/**
 * Créer une route pour les details des taches
*/

router.get('/detail-recipes',(req, res)=>{
    res.render('detail-recipes')
});


//
/*



Exporter le module de route
*/
module.exports = router;
//