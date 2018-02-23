function validateForm() {
    //Je rentre une a une des variables contenant la value entré dans chaque input text
    var x = document.forms["verif"]["title"].value;
    var y = document.forms["verif"]["content"].value
    var z = document.forms["verif"]["ingredients"].value

    if (x == "", y=="",z=="") { //Si c'est vide alors j'affiche un msg d'erreur
        alert("TAPE UN NOM COTEAUX DES BOIS");
        return false;
    }else {popUp();}

}

function popUp(){
    console.log('deui');
    document.getElementById("popup").style.visibility = "visible";
    return false;
}