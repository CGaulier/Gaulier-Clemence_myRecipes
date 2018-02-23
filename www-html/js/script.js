
/*
Attendre le chargement du DOM
*/
document.addEventListener('DOMContentLoaded', function(){
 
            // La fonction fetch() prend en paramètre l'adresse de l'API
            fetch('http://localhost:8000/api/my-recipes').then(data => {
                // Les données sont présentes => renvoyer une Promise de type 'resolve'
                if (data.ok) { return Promise.resolve(data) }
    
                // Les données sont présentes => renvoyer une Promise de type 'reject'
                else { return Promise.reject(new Error('Problème dans la requête')) }
            })
    
            // Formater la réponse en JSON
            .then( data => data.json() )
    
            // Manipuler les données de la réponse
            .then(data =>  {
                // Afficher le résultat dans la DOM
                data.forEach( element => {// on boucle pour avoir chaque élement
                    document.querySelector('#recipeList').innerHTML +=
                    "<article><h3>"+element.title+"</h3><form action='/api/detail-recipes/"+element._id+"' method='POST'><input type='submit' value='Afficher la recette'></form></article>";
                });
            })
    
            // Capter l'erreur
            .catch((err) =>  console.error(err) );
            
        //});
    //

/**
 * 
 * 
 * CECI EST UN TEST
 * 
 */



            // La fonction fetch() prend en paramètre l'adresse de l'API
            fetch('http://localhost:8000/api/detail-recipes').then(data => {
                // Les données sont présentes => renvoyer une Promise de type 'resolve'
                if (data.ok) { return Promise.resolve(data) }
    
                // Les données sont présentes => renvoyer une Promise de type 'reject'
                else { return Promise.reject(new Error('Problème dans la requête')) }
            })
    
            // Formater la réponse en JSON
            .then( data => data.json() )
    
            // Manipuler les données de la réponse
            .then(data =>  {
                // Afficher le résultat dans la DOM
                data.forEach( element => {// on boucle pour avoir chaque élement
                    document.querySelector('#addRecipe').innerHTML +=
                    "<article><h3>"+element.title+"</h3><form action='/api/detail-recipes/"+element._id+"' method='POST'><input type='submit' value='Afficher la recette'></form></article>";
                });
            })
    
            // Capter l'erreur
            .catch((err) =>  console.error(err) );
            
        });
    //