//-----récupération des données dans le Local Storage-----
var cartSelect = JSON.parse(localStorage.getItem('cart'));
console.log(cartSelect);
const positionCart = document.getElementById('cart__items');
let kanaps = [];

function allcart() {
//-----Si le panier est vide-----
    if (cartSelect === 0 || cartSelect === null) {
        document.querySelector('h1').textContent = 'Votre panier est vide';
//-----Si il contient au moins un produit-----
    } else {
        document.querySelector('h1').textContent = 'Contenu de votre panier';

//-----Insertion des éléments dans cart__items-----
    for (let cart of cartSelect) {
//-----Récupération des données de l'API-----
fetch("http://localhost:3000/api/products/" + cart.id)
    .then(response => response.json())
    .then(datas => {
//-----L'élément article-----
            let productArticle = document.createElement('article');
            positionCart.appendChild(productArticle);
            productArticle.className = "cart__items";
            productArticle.setAttribute('data-id', cart.id)
            productArticle.setAttribute('data-color',cart.couleurProduit)

//-----L'élément div image-----
            let productDivImage = document.createElement('div');
            productArticle.appendChild(productDivImage);
            productDivImage.className = 'cart__item__img';

//-----L'élément image-----
            let productImage = document.createElement('img');
            productDivImage.appendChild(productImage);
            productImage.src = datas.imageUrl;
            productImage.alt = datas.altTxt;
//-----L'élément div-----
            let productDivContent = document.createElement('div');
            productArticle.appendChild(productDivContent);
            productDivContent.className = 'cart__item__content';

//-----L'élément div-----
            let productDivContentDescription = document.createElement('div');
            productDivContent.appendChild(productDivContentDescription);
            productDivContentDescription.className = 'cart__item__content__description';

//-----L'élément h2-----
            let productTitle = document.createElement('h2');
            productDivContentDescription.appendChild(productTitle);
            productTitle.textContent = datas.name;

//-----L'élément paragraphe: couleur-----
            let productColor = document.createElement('p');
            productDivContentDescription.appendChild(productColor);
            productColor.textContent = 'Couleur : ' + cart.couleurProduit;

//-----L'élément paragraphe: prix-----
            let productPrice = document.createElement('p');
            productDivContentDescription.appendChild(productPrice);
            productPrice.textContent = datas.price +"€";
        
//-----L'élément div settings-----
            let productDivSettings = document.createElement('div');
            productDivContent.appendChild(productDivSettings);
            productDivSettings.className = 'cart__item__content__settings';

//-----L'élément div settings quantity-----
            let productDivSettingsQuantity = document.createElement('div');
            productDivSettings.appendChild(productDivSettingsQuantity);
            productDivSettingsQuantity.className = 'cart__item__content__settings__quantity';

//-----L'élément paragraphe: quantité-----
            let productQuantity = document.createElement('p');
            productDivSettingsQuantity.appendChild(productQuantity);
            productQuantity.textContent = "Qté : ";

//-----L'élément input-----
            let productInput = document.createElement('input');
            productDivSettingsQuantity.appendChild(productInput);
            productInput.className = 'itemQuantity';
            productInput.setAttribute('type', 'number');
            productInput.setAttribute('name', 'itemQuantity');
            productInput.setAttribute('min', '1');
            productInput.setAttribute('max', '100');
            productInput.value = cart.quantiteProduit;

//-----L'élément supprimer-----
            let productSettingsDelete = document.createElement('div');
            productDivSettings.appendChild(productSettingsDelete);
            productSettingsDelete.className = 'cart__item__content__settings__delete';
    
//-----L'élément paragraphe: supprimer-----
            let productDelete = document.createElement('p');
            productSettingsDelete.appendChild(productDelete);
            productDelete.className = 'deleteItem';
            productDelete.innerHTML = 'Supprimer';
        }
        )}
    }
}
allcart();

function articleCart() {

//-----Calcul du nombre d'articles dans le panier-----
    let totalArticle = 0; 

    for (i = 0; i < cartSelect.length; i++) {
        totalArticle += parseInt(cartSelect[i].quantiteProduit);
        let quantityFinal = document.querySelector('#totalQuantity');
        quantityFinal.textContent = totalArticle;
        console.log(totalArticle);
    }
}
function priceCart() {
    var cartSelect = JSON.parse(localStorage.getItem('cart'));
    fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
//-----deuxième promesse pourrécupérer les données-----
      .then(function(result) {
        kanaps = result;
        console.log(kanaps);
            for (i = 0; i < kanaps.length; i++) {
                    let priceArt = kanaps[i].price;
//-----On calcul le total par produit(même id et même couleur)-----
//-----on calcul le prix total du panier(somme de tous les prix)-----
                totalPrice += parseInt(cartSelect.quantiteProduit * priceArt.price);
                let priceFinal = document.querySelector('#totalPrice');    
                priceFinal.textContent = totalPrice;

            }}
    )
}
priceCart();

//-----Modification produit-----
function changeQty() {
    let qtyChange = document.querySelectorAll('.itemQuantity');
//-----Boucle pour modifier la quantité-----
    for (k = 0; k < qtyChange.length; k++) {
//-----Déclenchement de l'écoute du bouton-----
        qtyChange[k].addEventListener('change', function() {
//-----
//-----On recherche le produit-----
            let findProduct = cartSelect.find((p) => (p.id == productId) && (p.couleurProduit))
//-----Si la quantité n'est pas comprise netre 0 et 100-----
            if (qtyChange) {

            }}
        )
            }
        }            
changeQty();

//-----Suppression produit-----
function deleteQty() {
//-----Déclenchement de l'écoute du bouton-----
    let qtyDelete = document.querySelector('.deleteItem');
    for (l = 0; l < qtyChange.length; l++) {
        qtyDelete.addEventListener('click', function(event) {
//-----Elément a supprimer-----
    let deleteId = cartSelect[l].id;
    let 
//-----On recherche dans le panier-----
    const cartSelect = JSON.parse(localStorage.getItem('cart'));
    deleteProduct = cartSelect.find((elm.id == articleDeleteId && elm.couleurProduit == articleDeleteColor));
//-----On actualise la page-----
    localStorage.setItem('cart', JSON.stringify(cartSelect));
    window.location.reload();
    alert(`L'article a été supprimer du panier!`);
            })
    }}
deleteQty();


//-----Validation de formulaire-----