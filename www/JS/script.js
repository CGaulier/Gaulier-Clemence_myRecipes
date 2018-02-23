function validateForm() {
    //Je rentre une a une des variable contenant la value entré dans chaque input text
    var x = document.forms["verif"]["title"].value;
    var y = document.forms["verif"]["content"].value
    var z = document.forms["verif"]["ingredients"].value
    if (x == "") { //Si c'est vide alors j'affiche un msg d'erreur
        alert("TAPE UN NOM COTEAUX DES BOIS");
        return false;
    }
    if (y == "") {
        alert("TAPE UNE DESCRIPTION COTEAUX DES BOIS");
        return false;
    }
    if (z == "") {
        alert("TAPE DES INGREDIENTS COTEAUX DES BOIS");
        return false;
    }

}