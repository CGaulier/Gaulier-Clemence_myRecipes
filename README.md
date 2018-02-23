Mise en place d'un serveur NodeJS avec des vues HTML

## Mettre en place le serveur
La première chose est d'initier un dossier nodeJS avec la console :
```
npm init
```

Suivre les indications du terminal.

Créer un fichier pour le server, à la base le fichier se nomme `index.js` mais nous le changeons pour server.js. (bash puis touch server.js)

##Installer les dépendances
Pour créer un server NodeJS en utilisant le framework ExpressJS Il faut commencer par l'installer sur le serveur avec la commande :
```
npm install --save express
```
Un serveur NodeJS à besoin d'un dossier "views" pour héberger les vues clients, nous allons modifier le nom de ce dossier par `www` grâce à la commande path :
```
npm install --save path
```
Un serveur NodeJS doit pouvoir analyser les données d'une requete, par exemple lors de la validation d'un formulaire, les données sont envoyée sur le serveur via une adresse API. Pour se faire, il faut installer la dépendance `body-parser` :

```
npm install --save body-parser
```

Les vues du client vont être configurer en HTML pour correspondre à l'affichage d'une appli angular, il faut donc importer la dépendance `ejs` que nous allons utiliser en mode rendu

```
npm install --save ejs
```

## Monter le serveur NodeJS
Chaque dépendances doit être importer dans le fichier `server.js` dans des constantes, sauf `body-parser` qui sera importer dans les fichiers de route :

```js
const express =  require('express');
const path = require('path');
const ejs = require('ejs');

```
Une fois les dépendances importer, il faut initier le server :

```js
/**
 * Initialiser le server
 */

 const app = express();
 const port = process.env.PORT || 3000;
```

Il faut également configurer le dossier pour les vues clients :

```js
    //configurer le dossier des vues clients
    app.set('views',__dirname + '/www');
    app.views( express.static(path.join(__dirname, 'www')) );
```
La dernière étape de configuration permet d"couter le serveur, CAD de la lancer :

```js
/**
 * 
 * Lancer le serveur
 */

    app.listen(port, ()=>console.log(`Le serveur est lancé sur le port ${port}`))

//
```

## Lancer le serveur
Pour lancer le serveur, il y a 3 méthodes possibles :

```
//Methode 1
node server.js

//Methode 2
npm start

//Methode 3 : nécessite l'installation de nodemon en global
nodemon server.js


```

Pour simplifier le travail, il est conseiller d'installer `nodemon` sur le serveur:

```
npm install --save nodemon
```
Il faut ensuite modifier le script dans le fichier `package.json` de la façon suivante :

```json
...
"script":{
    "start": "nodemon server.js
},
...
```

>Une fois le script modifié, la commande `npm start` lance l'écouteur `nodemon`.

##Création de la route front
Un serveur NodeJS doit être configurer sur toutes les étapes, comme pour la création des routes. Nous allons préparer la route pour les vues client. Créer un fichier nommé `front.js` dans un dossier nommé `routes` à la racine du serveur.

Ouvrir le fichier `front.js` pour configurer le module de route en commençant par importer les composants :

```js
/**
 * 
 * Importer les composants de la route
 */
    const express = require('express');
    const router = express.Router();

```

Dans le même fichier configurer les routes de la manière suivante :

```js
/**
 * Definition des routes
 */

    router.get( '/', (req, res)=>{
        //Renvoyer le fichier index dans la réponse
        res.render('index');
    } );
//

```
Pour finir, il faut exporter le module de route :

```js
/**
 * Exporter le module de route
 */
    module.exports = router;
//
```
Une fois la route front créée, il faut l'importer dans le fichier `server.js`:

```js
    //Modules
    const frontRoute = require('./routes/front');
```

Une fois importer, il faut configurer le serveur pour lui dire d'utiliser `frontRoute` pour l'adresse `/`

```js
app.use('/', frontRoute);
```

A cette étape, aucun moteur de rendu n'est défini, il faut donc utiliser le principe de `ejs` d'une manière qui permet de lier des fichier `.html` aux routes du server:

```js
    //Definir le moteur de rendu
    app.engine('html', ejs.renderFile );
    app.set('view engine', 'html');
```

>Pour finir il faut créer un fichier nommé `index.html` dans le dossier `www`.

La page d'accueil du serveur affiche à présent le fichier `index.html`, Bravoooo dood!


## Ajouter une route API
La route API est construite de la même manière que la route front, il faut donc dupliquer la route front et la mettre à jour pour qu'elle corresponde à une API. La seule différence est dans ce qu'elle renvoie :

```js
router.get( '/', (req, res)=>{
    //Renvoyer un flux json dans la réponse
    res.json({content: 'Hello APIs'});
} );
```

>Il faut ensuite l'importer dans `server.js` et la configurer de la même manière que la route front.

faire une BDD todoes avec > table task avec 4 colonnes > INT et AJ sur première colonne Index, Primary > 2è colonne : content, VARCHAR, 150 > 3ème colonne category , VARChar, 255 > 4ème  isDone, VARCHAR, 10

inserer > content : configurer le server NodeJS
category : Work
isDone : TRUE

Notre Projet va utiliser une BDD mysql, Il faut donc ajouter une dépendance à notre serveur pour pouvoir l'utiliser cette BDD:
```
npm install --save mysql
```
> Il faut ensuite configurer le module dans une route API.



