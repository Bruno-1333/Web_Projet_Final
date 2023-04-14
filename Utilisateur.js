// Afficher les utilisateurs
function afficherHtml() {
    // Vider le contenu du div avant d'ajouter de nouvelles données
    $("#usersList").empty();

    // GET JSON : Obtenir les données du serveur JSON
    $.getJSON('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users')
        .done(function (users) {
            for (user of users) {
                $("#usersList").append(`
                <p id='user${user.id}'>${user.id}, ${user.username}, ${user.motDePasse}, ${user.confMotDePasse} , ${user.email}, ${user.nom}, ${user.prenom}</p>
                `);
            }
        });
}

// Valider les mots de passe
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

// Vider les champs de saisie
function viderLabels() {
    $("#id").val("");
    $("#username").val("");
    $("#motDePasse").val("");
    $("#confMotDePasse").val("");
    $("#email").val("");
    $("#nom").val("");
    $("#prenom").val("");
}

// Soumission du formulaire
$("form").submit(function (event){
    event.preventDefault(); // Empêcher le formulaire d'être soumis

    //POST : Envoyer des données au serveur JSON
    alert(JSON.stringify({ "username": $("#username").val(),"motDePasse": $("#motDePasse").val(),"confMotDePasse": $("#confMotDePasse").val() ,"email" : $("#email").val(),"nom" : $("#nom").val(),"prenom" : $("#prenom").val()}));
    $.ajax('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users', {
        data : JSON.stringify({ "username": $("#username").val(), "motDePasse": $("#motDePasse").val() ,"confMotDePasse": $("#confMotDePasse").val() ,"email" : $("#email").val(),"nom" : $("#nom").val(),"prenom" : $("#prenom").val()}),
        contentType : 'application/json',
        type : 'POST'
    }).done(function () {
        // Rafraîchir l'affichage automatiquement après avoir ajouté un nouvel utilisateur
        afficherHtml();
        alert("Utilisateur ajouté avec succès.");
        viderLabels();
    }).catch(function (error){
        console.log(error.message);
    });

});

// Charger un utilisateur spécifique
function charger() {
    // Récupérer les données de l'utilisateur avec l'ID spécifié
    $.getJSON('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users/' + $("#id").val())
        .done(function (user) {
            // Placer les données de l'utilisateur dans les champs de saisie
            $("#username").val(user.username);
            $("#motDePasse").val(user.motDePasse);
            $("#confMotDePasse").val(user.confMotDePasse);
            $("#email").val(user.email)
            $("#nom").val(user.nom);
            $("#prenom").val(user.prenom);
        });
}

// Modifier un utilisateur existant
function modifier(){
// Modifier l'utilisateur avec l'ID choisi
    fetch('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users/'+$("#id").val(), {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify({ "username": $("#username").val(),"motDePasse": $("#motDePasse").val() ,"confMotDePasse": $("#confMotDePasse").val() ,"email" : $("#email").val(),"nom" : $("#nom").val(),"prenom" : $("#prenom").val() })
    }).then(function (){
// Mettre à jour l'affichage de façon dynamique, sans recharger la page
        $("#user"+$("#id").val()).text($("#id").val() + ", " + $("#username").val() + ", " + $("#motDePasse").val() + "," + $("#confMotDePasse").val() + " ," + $("#email").val()+ ", " +$("#nom").val() + ", " + $("#prenom").val());
        alert("Utilisateur modifié avec succès.");
        viderLabels();
    })
}

// Supprimer un utilisateur
function supprimer() {
// Supprimer l'utilisateur avec l'ID choisi à l'aide de la commande AJAX fetch et la méthode DELETE du serveur
    fetch('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users/' + $("#id").val(), {
        method: 'DELETE',
    }).then(function () {
        $("#user" + $("#id").val()).remove();
        alert("Utilisateur supprimé avec succès.");
        viderLabels();
    });
}

// Événement de clic sur le bouton Charger
$("#btnCharger").click(function () {
    charger();
});

// Afficher la liste des utilisateurs au chargement de la page
afficherHtml();


