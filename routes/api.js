/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


/**
 * Besoin de ces constantes pour capturer l'ID
 */
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
//

/**
 * 
 * Configuration de Mongoose
 */

    const mongoose = require('mongoose');
    const mongoServeur = 'mongodb://localhost:27017/my-recipes';
//


/*
Configuration de body-parser
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
//

/*
Définition des routes
*/

// Accueil de mon API
router.get( '/', (req, res) => {
    // Renvoyer un flux JSON dans la réponse
    res.json( { content: 'Hello from API' } );
});

// Afficher la liste des tâches
router.get( '/recipes', (req, res) => {
   
    //Connextion à la base de données mongoDB
    mongoose.connect(mongoServeur, (err, db)=>{
        //Tester ma connexion
        if(err){ res.json({error: err}) }
        else{
            //Connexion ouverte : récupérer la collection de données
            db.collection('recipes').find().toArray( (err, collection)=>{

                //tester la connexion de la collection
                if(err){res.json({error:err})}
                else{
                    //Collection récupérée
                    res.json(collection);
                }
            })
        };

        //Fermer la connexion
        db.close();

    })

});

    //Créer une route API pour ajouter une recette
    router.post('/add-recipes', (req,res)=>{
        console.log(req.body);
        mongoose.connect(mongoServeur, (err, db)=>{
            //Tester ma connexion
            if(err){ res.render('add-recipes', {msg:err}) }
            else{
                //Connexion ouverte : ajouter les données dans la BDD
                db.collection('recipes').insert({ 
                    title: req.body.title, 
                   type:req.body.type}, (err, newObject)=>{
                    //Verifier l'ajout et redirection vers l'accueil
                    if(err){res.redirect(500,'/') }
                    else{
                        res.redirect(301, '/')
                    }
                })
            };
    
            //Fermer la connexion
            db.close();
    
        })
    })





//

    //Créer une route API pour supprimer une recette
    router.post('/suppr-recipes/:id', (req,res)=>{
        console.log(req.params.id);
        mongoose.connect(mongoServeur, (err, db)=>{
            //Tester ma connexion
            if(err){ res.render('suppr-recipes', {msg:err}) }
            else{
                //Connexion ouverte : supprimer les données dans la BDD
                db.collection('recipes').remove({ 
                    _id: new ObjectId(req.params.id)
                   }, (err, newObject)=>{
                    //Verifier LA SUPPRESSION
                    if(err){res.redirect(500,'/') }
                    else{
                        res.redirect(301,'/')
                    }
                })
            };
    
            //Fermer la connexion
            db.close();
    
        })
    })





//
/** 
    //Créer une route API pour update une recette
    router.post('/update-recipes', (req,res)=>{
        console.log(req.body);
        mongoose.connect(mongoServeur, (err, db)=>{
            //Tester ma connexion
            if(err){ res.render('update-recipes', {msg:err}) }
            else{
                //Connexion ouverte : update les données dans la BDD
                db.collection('recipes').update({ 
                    title: req.body.title, 
                   type:req.body.content}, (err, newObject)=>{
                    //Verifier l'ajout
                    if(err){res.redirect(500,'/') }
                    else{
                        res.redirect(301, '/')
                    }
                })
            };
    
            //Fermer la connexion
            db.close();
    
        })
    })



*/

//




/*
Exporter le module de route
*/
module.exports = router;
//