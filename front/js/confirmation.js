function confirmation() {
//-----Récupération de l'id de confirmation-----
const id = new URLSearchParams(document.location.search);
//-----Création de la constante qui récupère l'id-----
const orderId = id.get(orderId);
//-----on cible l'élément id-----
const idConfirmation = document.querySelector('#orderId');
idConfirmation.textContent = orderId;
//-----On vide le LS une fois la commande passée-----
localStorage.clear();
}