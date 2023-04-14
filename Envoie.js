
// Fonction pour nettoyer les champs du modal d'inscription
function nettoyerChamps() {
    $("#formInscription")[0].reset();
    $("#erreurInscription").hide();
}

// Fonction pour valider le mot de passe dans le modal d'inscription
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

// Fonction pour inscrire l'utilisateur
function inscrireUtilisateur() {
    if (!validerMotDePasse()) {
        return;
    }
    // Faire la requête AJAX pour enregistrer l'utilisateur avec MockAPI
    $.ajax({
        url: 'https://641b4a099b82ded29d4f0dfe.mockapi.io/Users',
        method: "POST",
        data: {
            username: $("#username").val(),
            motDePasse: $("#motDePasse").val(),
            email: $("#email").val(),
            nom: $("#nom").val(),
            prenom: $("#prenom").val()
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

// Fonction pour valider la connexion
function validerConnexion() {
    var login = $("#login").val();
    var motDePasse = $("#senha").val();

    // Requête AJAX pour vérifier l'identifiant et le mot de passe avec MockAPI
    $.ajax({
        url: 'https://641b4a099b82ded29d4f0dfe.mockapi.io/Users',
        method: "GET",
        success: function(data) {
            var utilisateurTrouve = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].username === login && data[i].motDePasse === motDePasse) {
                    utilisateurTrouve = true;
                    break;
                }
            }
            if (utilisateurTrouve) {
                window.location.href = "Utilisateur.html";
            } else {
                $("#erreurConnexion").html("Identifiant ou mot de passe incorrect").show();
            }
        },
        error: function(error) {
            console.log(error);
            $("#erreurConnexion").html("Erreur lors de la vérification des identifiants").show();
        }
    });
}

$(document).ready(function() {
    // Événement de clic sur le bouton de connexion
    $("#btnConnexion").click(function() {
        validerConnexion();
    });

    // Événement de clic sur le bouton d'inscription
    $("#btnInscription").click(function() {
        inscrireUtilisateur();
    });

// Événement de clic sur le bouton annuler dans le modal d'inscription
    $("#modalInscription").on("hidden.bs.modal", function () {
        nettoyerChamps();
    });
});

