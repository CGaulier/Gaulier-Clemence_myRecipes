/*
Chargement du DOM
*/
document.addEventListener('DOMContentLoaded', function()  {
    
            /*
            Gestion des requêtes serveur
            */
                var TodoBot = {
                    /*
                    Définition des propriétés de l'objet
                    */  

    
                        apiUrl: {
                            recipes: 'http://localhost:8000/api/my-recipes/',
                            add: 'http://localhost:8000/api/add-recipes',
                            delete: 'http://localhost:8000/api/suppr_recipes/',
                        },
    
                        domElements: {
                            form: {
                                theForm: document.querySelector('#addRecipe form'),
                                newTodoContent: document.querySelector('#newRecipeContent')
                            },
                            filter: {
                                btnAllTasks: document.getElementById('btnAllRecipes'),
                            },
                            taskList: {
                                theList: document.getElementById('recipeList')
                            },
                            errors: {
                                errorMsg: document.getElementById('errorMsg'),
                                errorHandeler: document.getElementById('errorHandeler')
                            }
                        },
                    //
    
                    /*
                    Ajout des méthodes (fonctions) de l'objet
                    */
                        // Charger la liste des tâches
                        loadRecipeList: function()  {
                            // Réinitaliser les données
                            TodoBot.recipeData.reset();
    
                            // La fonction fetch() prend en paramètre l'adresse de l'API
                            fetch(TodoBot.apiUrl.recipes).then(function (data) {
                                    
                                // Les données sont présentes => renvoyer une Promise de type 'resolve'
                                if (data.ok) { return Promise.resolve(data) }
    
                                // Les données sont présentes => renvoyer une Promise de type 'reject'
                                else { return Promise.reject(new Error('Problème de requête, veuillez actualiser la page et vérifier votre connexion.')) }
                            })
    
                            // Traiter le réponse
                            .then(function (data) { return data.json() })
    
                            // Manipuler les données de la réponse
                            .then(function (data) {
                                // Ajouter les tâches dans le DOM
                                for( var i = 0; i < data.length; i++ ){
                                    TodoBot.appendRecipe(data[i]);
                                };
                            })
    
                            // Capter l'erreur
                            .catch(function (err) { TodoBot.errorHandeler({error: 404, msg: err}) })
                        },
    
                        // Charger la liste filtrée des tâches
                        loadFiltretedRecipes: function(filter){
                            // Réinitaliser les données
                            TodoBot.recipeData.reset();
    
                            // La fonction fetch() prend en paramètre l'adresse de l'API
                            fetch(TodoBot.apiUrl.recipes + filter).then(function (data) {
                                    
                                // Les données sont présentes => renvoyer une Promise de type 'resolve'
                                if (data.ok) { return Promise.resolve(data) }
    
                                // Les données sont présentes => renvoyer une Promise de type 'reject'
                                else { return Promise.reject(new Error('Problème dans la requête')) }
                            })
    
                            // Traiter le réponse
                            .then(function (data) { return data.json() })
    
                            // Manipuler les données de la réponse
                            .then(function (data) {
                                // Ajouter les tâches dans le DOM
                                for( var i = 0; i < data.length; i++ ){
                                    TodoBot.appendRecipe(data[i]);
                                };
                            })
    
                            // Capter l'erreur
                            .catch(function (err) { TodoBot.errorHandeler({error: 404, msg: err}) })
                        },
    
                        // Ajouter une tâche
                        addRecipe: function(object)  {
                            fetch(TodoBot.apiUrl.add, {
                                method: 'POST',
                                body: JSON.stringify(object), 
                                headers: new Headers({ 'Content-Type': 'application/json' })
                            })
                            .then(res => res.json())
    
                            .catch(error => console.error('Error:', error))
    
                            .then(response => {
                                // Ajouter la tâche dans le DOM
                                TodoBot.appendRecipe({content: response.content, state:false, _id: response._id})
    
                                // Vider le formulaire
                                TodoBot.domElements.form.newRecipeContent.value = '';
                            });
                        },
    
                        // Supprimer une tâche
                        deleteRecipe: function(_id){
                            fetch(TodoBot.apiUrl.delete + _id, {
                                method: 'DELETE',
                                headers: new Headers({ 'Content-Type': 'application/json' })
                            })
                            .then(res => res.json())
    
                            .catch(error => console.error('Error:', error))
    
                            .then(response => {
                                document.getElementById(_id).classList.add('recipeDeleted');
    
                                // Mettre à jour le footer la la liste des tâches
                                var recipeState = document.querySelector('[data-id-object="'+ _id +'"] .deleteRecipe').getAttribute('data-state-object');
                                if(recipeState === 'true') { TodoBot.tasksDone -= 1 }
                                else { TodoBot.taskToDo -= 1 };
                                TodoBot.setTaskData();
                            });
                        },
    
    
                        // Ajouter une tâche dans le DOM
                        appendRecipe: function(recipe){
                            // Création de la balise HTML
                            var recipeArticle = document.createElement("article");
    
                            // Ajouter une ID à l'article
                            recipeArticle.id = recipe._id;
    
                            // Ajouter un attribut à l'article
                            recipeArticle.setAttribute('data-recipe-state', recipe.state)
    
                            // Ajouter du contenu HTML à l'article
                            recipeArticle.innerHTML = '<p>'+ recipe.content +'</p><ul data-id-object="'+ recipe._id +'"><li><button class="confirmTask"><i class="fa fa-check"></i></button></li><li><button data-id-object="'+ recipe._id +'" data-state-object="'+ recipe.state +'" class="deleteTask"><i class="fa fa-times"></i></button></li></ul>';
    
                            // Ajout de la balise HTML dans le DOM
                            TodoBot.domElements.recipeList.theList.appendChild( recipeArticle );
    
                            // Ajout de les écouteurs d'événement
                            this.taskEventListener(recipe._id);
    
                            // Mettre à jour le footer la la liste des tâches
                            TodoBot.setRecipeData();
                        },
    
                        
    
                        // Editer le footer de la liste des tâches
                        setTaskData: function(task){
                            // Calcule des tâches faites
/**                            if( TodoBot.taskToDo >= 2 ){ TodoBot.domElements.taskData.taskTodo.innerHTML = '<b>' + TodoBot.taskToDo + '</b> tâches à faire' }
                            else if( TodoBot.taskToDo === 1 ){ TodoBot.domElements.taskData.taskTodo.innerHTML = '<b>1</b> tâche à faire' }
                            else{ TodoBot.domElements.taskData.taskTodo.innerHTML = '' }
    
                            // Calcule des tâches à faire
                            if( TodoBot.tasksDone >= 2 ){ TodoBot.domElements.taskData.taskDone.innerHTML = ' <b>' + TodoBot.tasksDone + '</b> tâches faites' }
                            else if( TodoBot.tasksDone === 1 ){ TodoBot.domElements.taskData.taskDone.innerHTML = ' <b>' + TodoBot.tasksDone + '</b> tâche faite' }
                            else{ TodoBot.domElements.taskData.taskDone.innerHTML = '' }
                        },
    
                        // Ajout des écouteurs d'événement sur les tâches
                        taskEventListener: function(_id){TodoBot
                            // Afficher la tâche
                            window.setTimeout(function(){
                                document.getElementById(_id).classList.add('open');
                            }, 200);
                            
    
                            // Capter le clic sur le bouton confirmTask
                            document.querySelector('[data-id-object="'+ _id +'"] .confirmTask').addEventListener('click', function(){
                                var activState = document.getElementById(_id).getAttribute('data-task-state');
                                if(activState === 'true') { TodoBot.setTaskState(_id, { stateVal: false }) }
                                else{ TodoBot.setTaskState(_id, { stateVal: true }) }
                            });
**/    
                            // Capter le clic sur le bouton deleteTask
                            document.querySelector('[data-id-object="'+ _id +'"] .deleteRecipe').addEventListener('click', function(){
                                TodoBot.deleteRecipe(_id)
                            });
                        },
    
                        // Gestion du formulaire
                        getFormSubmit: function(){TodoBot
                            // Soumission du formulaire
                            TodoBot.domElements.form.theForm.addEventListener('submit', function(evt){
                                // Bloquer l'événement
                                evt.preventDefault();
    
                                // Vérifier le champs
                                if( TodoBot.domElements.form.newRecipeContent.value.length >=1 ){
                                    // Ajouter une tâche
                                    TodoBot.addRecipe({ content: TodoBot.domElements.form.newRecipeContent.value})
                                };
                            });
                        },
/**    
                        // Gestion des boutons dans le footer de la liste des tâches
                        getFilterBtnClick: function(){                        
                            TodoBot.domElements.filter.btnToDoTacks.addEventListener('click', function(){
                                // Lancer le filtre
                                TodoBot.removeTasks();
                                window.setTimeout(function(){
                                    TodoBot.loadFiltretedTasks('toDo');
                                }, 600)
    
                                // Gestion des class
                                this.classList.add('active');
                                TodoBot.domElements.filter.btnAllTasks.classList.remove('active');
                                TodoBot.domElements.filter.btnDoneTasks.classList.remove('active');
                            });
    
                            TodoBot.domElements.filter.btnDoneTasks.addEventListener('click', function(){
                                // Lancer le filtre
                                TodoBot.removeTasks();
                                window.setTimeout(function(){
                                    TodoBot.loadFiltretedTasks('isDone');
                                }, 600)
    
                                // Gestion des class
                                this.classList.add('active');
                                TodoBot.domElements.filter.btnAllTasks.classList.remove('active');
                                TodoBot.domElements.filter.btnToDoTacks.classList.remove('active');
                            });
    
                            TodoBot.domElements.filter.btnAllTasks.addEventListener('click', function(){
                                // Lancer le filtre
                                TodoBot.removeTasks();
                                window.setTimeout(function(){
                                    TodoBot.loadTaskList();
                                }, 600)
    
                                // Gestion des class
                                this.classList.add('active');
                                TodoBot.domElements.filter.btnToDoTacks.classList.remove('active');
                                TodoBot.domElements.filter.btnDoneTasks.classList.remove('active');
                            });
                        },
**/    
                        // Gestion des erreurs
                        errorHandeler: function(error){
                            TodoBot.domElements.errors.errorMsg.innerHTML = '<i class="fa fa-exclamation-circle"></i> <span>'+ error.msg +'</span>'
                            TodoBot.domElements.errors.errorHandeler.classList.add('open')
                        },
    
                        // Initialisation
                        init: function(){
                            // Charger la liste des tâches
                            TodoBot.loadRecipeList();
                            // Capter la soumission du formulaire
                            TodoBot.getFormSubmit();
                            // Capter le click sur les boutons du footer de la liste des tâches
                            TodoBot.getFilterBtnClick();
                        }
                    //
                };
            //
    
    
            /*
            Lancer la ToDo
            */
                TodoBot.init();
            //
        });
    // 