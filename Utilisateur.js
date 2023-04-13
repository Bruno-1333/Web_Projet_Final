function afficher() {
    // GET JSON : Obtenir les données du serveur JSON
    $.getJSON('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users')
        .done(function (users) {
            for (user of users) {
                $("body").append(`
                <p id='user${user.id}'>${user.id}, ${user.username}, ${user.email}, ${user.nom}, ${user.prenom}</p>
            `)
            }
        });
}

function validerMotDePasse() {
    var motDePasse = $("#motDePasse").val();
    var confMotDePasse = $("#confMotDePasse").val();
    if (motDePasse !== confMotDePasse) {
        $("#erreurInscription").html("Les mots de passe ne correspondent pas").show();
        return false;
    } else {
        $("#erreurInscription").hide();
        return true;
    }
}

$("form").submit(function (event){
    event.preventDefault(); // Impede o formulário de ser submetido

    //POST : Envoyer des données au serveur JSON
    alert(JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val(),"nom" : $("#nom").val(),"prenom" : $("#prenom").val()}));
    $.ajax('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users', {
        data : JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val(),"nom" : $("#nom").val(),"prenom" : $("#prenom").val()}),
        contentType : 'application/json',
        type : 'POST'
    }).done(function () {
        // Rafraîchir l'affichage automatiquement après avoir ajouté un nouvel utilisateur
        afficherHtml();
    }).catch(function (error){
        console.log(error.message);
    });

});

function modifier(){
    //Modifier l'utilisateur avec le id choisi.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users/'+$("#id").val(), {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val(),"nom" : $("#nom").val(),"prenom" : $("#prenom").val() })
    }).then(function (){
        //Mette à jour l'affichage de façon dynamique, sans recharger la page
        $("#user"+$("#id").val()).text($("#id").val() + ", " + $("#username").val() + ", " + $("#email").val()+ ", " +$("#nom").val() + ", " + $("#prenom").val());
    })
}

function supprimer(){
    //Supprimer le user avec le id choisi à l'aide de la commande ajax fetch et la methode delete du serveur.
    //Référence : https://github.com/mockapi-io/docs/wiki/Code-examples
    fetch('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users/'+$("#id").val(), {
        method: 'DELETE',
    }).then(function (){
        $("#user"+$("#id").val()).remove();
    });
}

function afficherHtml() {
    // Vider le contenu du div avant d'ajouter de nouvelles données
    $("#usersList").empty();

    // GET JSON : Obtenir les données du serveur JSON
    $.getJSON('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users')
        .done(function (users) {
            for (user of users) {
                $("#usersList").append(`
                <p id='user${user.id}'>${user.id}, ${user.username}, ${user.email}, ${user.nom}, ${user.prenom}</p>
                `);
            }
        });
}


afficherHtml();