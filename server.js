/*
Importer les dépendances
*/
    // Composants
    const express = require('express');
    const path = require('path');
    const ejs = require('ejs');

    // Modules
    const frontRoute = require('./routes/front');
    const apiRoute = require('./routes/api');

//

/*
Initialiser le serveur
*/
    // Configurer le serveur
    const app = express();
    const port = process.env.PORT || 8000;// on spécifie le port (et j'ai changé du 3000 :) )

    // Configurer le dossier des vues client
    app.set( 'views', __dirname + '/www-html' ); // A CHANGER POUR VOIR LE TRAVAIL EN EJS
    app.use( express.static(path.join(__dirname, 'www-html')) );//ICI aussi

    // Définir le moteur de rendu
    //app.engine( 'html', ejs.renderFile ); c'est une vieille ligne
    //app.set( 'view engine', 'ejs' );
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    // Configurer les routes
    app.use('/', frontRoute);
    app.use('/api', apiRoute);
//

/*
Lancer le serveur
*/
    app.listen( port, () => console.log( `Le serveur est lancé sur le port ${port}`) )
//