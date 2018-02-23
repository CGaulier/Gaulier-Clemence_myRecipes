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
const mongoServeur = 'mongodb://localhost:27017/blog';
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
             db.collection('posts').find().toArray( (err, collection)=>{
 
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
router.post( '/detail-posts/:id', (req, res) => {
    
             // Connexion à la BDD MongoDB
             mongoose.connect( mongoServeur, ( err, db ) => {
     
                 // Tester la connexion à la BDD
                 if( err ) { res.render('detail-posts', {error: err}) }
                 else {
     
                     // Connexion ouverte : récupérer la collection de données
                     db.collection('posts').find({ _id: new ObjectId(req.params.id) }).toArray( (err, collection) => {
     
                         // Tester la connexion à la collection
                         if( err ) { res.render('detail-posts', {error: err}) }
                         else{
     
                             // Collection récupérée : Renvoyer le fichier index dans la réponse avec la collection
                             res.render('detail-posts', {data: collection});
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

    router.get('/add-posts',(req, res)=>{
        res.render('add-posts')
    });



 //
/*

/**
 * Créer une route pour suppr des taches
*/

router.get('/suppr-posts',(req, res)=>{
    res.render('suppr-posts')
});

/**
 * Créer une route pour les details des taches
*/

router.get('/detail-posts',(req, res)=>{
    res.render('detail-posts')
});


//
/*



Exporter le module de route
*/
module.exports = router;
//