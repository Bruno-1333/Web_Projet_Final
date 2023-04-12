function envoi(){
    event.preventDefault(); // Impede o formulário de ser submetido

    //POST : Envoyer des données au serveur JSON
    alert(JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val(),"nom" : $("#nom").val(),"prenom" : $("#prenom").val()}));
    $.ajax('https://641b4a099b82ded29d4f0dfe.mockapi.io/Users', {
        data : JSON.stringify({ "username": $("#username").val(), "email" : $("#email").val(),"nom" : $("#nom").val(),"prenom" : $("#prenom").val()}),
        contentType : 'application/json',
        type : 'POST'
    }).catch(function (error){
        console.log(error.message);
    });

};
function validerConnexion() {
    var login = $("#login").val();
    var motDePasse = $("#senha").val();
// Valider le login et le mot de passe ici
    if (login === "usuario" && motDePasse === "123") {
        return true;
    } else {
        $("#erreurConnexion").show();
        return false;
    }
}

// Fonction pour nettoyer les champs du modal d'inscription
function nettoyerChamps() {
    $("#formInscription")[0].reset();
    $("#erreurInscription").hide();
}

// Fonction pour valider le mot de passe dans le modal d'inscription
function validerMotDePasse() {
    var motDePasse = $("#motDePasseInscription").val();
    var confMotDePasse = $("#confMotDePasse").val();
    if (motDePasse !== confMotDePasse) {
        $("#erreurInscription").html("Les mots de passe ne correspondent pas").show();
        return false;
    } else {
        $("#erreurInscription").hide();


        return true;
    }
}

// Fonction pour inscrire l'utilisateur
function inscrireUtilisateur() {
// Faire la requête AJAX pour enregistrer l'utilisateur avec MockAPI
// Exemple:
    $.ajax({
        url: 'https://641b4a099b82ded29d4f0dfe.mockapi.io/Users',
        method: "POST",
        data: {
            nom: $("#nom").val,
            prenom: $("#prenom").val(),
            telephone: $("#telephone").val(),
            email: $("#email").val(),
            utilisateur: $("#utilisateur").val(),
            motDePasse: $("#motDePasseInscription").val()
        },
        success: function(data) {
            console.log(data);
            nettoyerChamps();
            alert("Utilisateur inscrit avec succès!");
            $("#modalInscription").modal("hide");
        },
        error: function(error) {
            console.log(error);
            $("#erreurInscription").html("Erreur lors de l'inscription de l'utilisateur").show();
        }
    });
}
$(document).ready(function() {
// Événement de clic sur le bouton de connexion
    $("#btnConnexion").click(function() {
        if (validerConnexion()) {
            window.location.href = "index.html";
        }
    });


// Événement de clic sur le bouton d'inscription
    $("#btnInscription").click(function() {
        if (validerMotDePasse()) {
            inscrireUtilisateur();
        }
    });

// Événement de clic sur le bouton annuler dans le modal d'inscription
    $("#modalInscription").on("hidden.bs.modal", function () {
        nettoyerChamps();
    });
});