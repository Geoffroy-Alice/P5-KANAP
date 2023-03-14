//-----récupération des données dans le Local Storage-----
let cartSelect = JSON.parse(localStorage.getItem('cart'));
console.log(cartSelect);
const positionCart = document.getElementById('cart__items');

function allcart() {

//-----Si le panier est vide-----
    if (cartSelect.length === 0 || cartSelect === null) {
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
            productInput.setAttribute('id', cart.id);
            productInput.setAttribute('type', 'number');
            productInput.setAttribute('name', 'itemQuantity');
            productInput.setAttribute('min', '1');
            productInput.setAttribute('max', '100');
            productInput.value = cart.quantiteProduit;

//-----On recherche l' ID du produit à modifier-----
    let changeQtyId = productInput.closest('.cart__items').dataset.id;
    let changeQtyColor = productInput.closest('.cart__items').dataset.color;
//-----Déclenchement du bouton pour modifier la quantité-----
        productInput.addEventListener('change', function(event) {
            changeQty(changeQtyId, changeQtyColor);
            alert ('La quantité a été mise à jour')
            window.location.href = 'cart.html';
        });
        
//-----L'élément supprimer-----
            let productSettingsDelete = document.createElement('div');
            productDivSettings.appendChild(productSettingsDelete);
            productSettingsDelete.className = 'cart__item__content__settings__delete';
    
//-----L'élément paragraphe: supprimer-----
            let productDelete = document.createElement('p');
            productSettingsDelete.appendChild(productDelete);
            productDelete.className = 'deleteItem';
            productDelete.innerHTML = 'Supprimer';

//-----ID et couleur à supprimer-----
    let deleteQtyId =  productDelete.closest('.cart__items').dataset.id;
    let deleteQtyColor = productDelete.closest('.cart__items').dataset.color;
//-----Déclenchement du bouton au click pour supprimer-----
    productDelete.addEventListener('click', function() {
        deleteQty(deleteQtyId, deleteQtyColor);
        alert('Le produit a été supprimé panier.');
        window.location.href = 'cart.html';
        console.log(cartSelect);
    });

    // console.log(deleteQtyId);
    // console.log(deleteQtyColor);
        }
        )}
    }
}
allcart();

function articlePriceCart() {
//-----Calcul du nombre d'articles dans le panier-----
    let totalArticle = 0; 
    let totalPrice = 0;

    for (let datas of cartSelect) {
        totalArticle = parseInt(totalArticle) + parseInt(datas.quantiteProduit);
        let quantityFinal = document.querySelector('#totalQuantity');
        quantityFinal.textContent = totalArticle;
        // console.log(totalArticle);

    fetch("http://localhost:3000/api/products/" + datas.id)
        .then(response => response.json())
        .then(function(result) {
            kanaps = result;
            // console.log(kanaps);
                    totalPrice = totalPrice + datas.quantiteProduit * kanaps.price;
                    let finalPrice = document.querySelector('#totalPrice');
                    finalPrice.textContent = totalPrice;
                    console.log(totalPrice);
        }
    ) } 
    }
articlePriceCart();

//-----Modification produit-----
function changeQty(changeQtyId, changeQtyColor) {
//-----On récupère les données du LS------
    let cartSelect = JSON.parse(localStorage.getItem('cart'));   
    console.log(cartSelect)
    console.log(changeQtyId);
    for (j = 0; j < cartSelect.length; j++) {
        if (cartSelect[j].id === changeQtyId && cartSelect[j].couleurProduit === changeQtyColor) {
            let newQtyProduct = document.getElementById(changeQtyId);
            cartSelect[j].quantiteProduit = newQtyProduct.value; 
            console.log(newQtyProduct.value);
        }
    }
//-----Mise à jour du LocalStorage-----
    localStorage.setItem('cart', JSON.stringify(cartSelect)); 
    //console.log(cartSelect)
    }
  

//-----Suppression de produits-----
function deleteQty(deleteQtyId, deleteQtyColor) {
//-----On récupère les données du LS------
    let cartSelect = JSON.parse(localStorage.getItem('cart'));
//-----On filtre les articles que l'on veut garder-----
    cartSelect = cartSelect.filter((elm) => elm.id !== deleteQtyId && elm.couleurProduit !== deleteQtyColor);
    //-----Mise à jour du LocalStorage-----
    localStorage.setItem('cart', JSON.stringify(cartSelect));
   }

//-----Validation de formulaire-----
//-----Déclenchement du bouton au click-----
let form = document.querySelector('#order');
//-----Déclenchement du bouton au click-----
form.addEventListener('click', function(event) {
    event.preventDefault(event);

//-----On récupère les éléments HTML grâce aux ID-----
const validationForm = {
    firstName: document.querySelector('#firstName').value,
    lastName: document.querySelector ('#lastName').value,
    address: document.querySelector('#address').value,
    city: document.querySelector('#city').value,
    email: document.querySelector('#email').value,
};
console.log(validationForm);

let firstNameErr = document.querySelector('#firstNameErrorMsg');
let lastNameErr = document.querySelector('#lastNameErrorMsg');
let addressErr = document.querySelector('#addressErrorMsg');
let cityErr = document.querySelector('#cityErrorMsg');
let emailErr = document.querySelector('#emailErrorMsg');
console.log(firstNameErr)

//-----Les regex-----
let textRegex = /^[a-zA-ZÀ-ÿ '.,-]+$/;
let adresseRegex = /^[0-9]{1,3}[a-zA-ZÀ-ÿ ,.'-]+$/;
let emailRegex = /^[a-zA-Z0-9 .-_]+@([a-zA-Z]+\.)+[a-z]+$/;
console.log(textRegex);

function validationFirstName() {
//-----On récupère l'Id correspondant-----
    let firstForm = validationForm.firstName;
    if(textRegex.test(firstForm)) {
        firstNameErr.textContent = '';
        return true;
    } else {
        firstNameErr.textContent = `Le prénom saisit n'est pas valide!`;
        return false;
    }
};

function validationLastName() {
    let lastForm = validationForm.lastName;
    if (textRegex.test(lastForm)) {
        lastNameErr.textContent = '';
        return true;
    } else {
        lastNameErr.textContent = `Le nom saisit n'est pas valide!`;
        return false;
    }
};

function validationAddress() {
    let adressForm = validationForm.address;
    if (adresseRegex.test(adressForm)) {
        addressErr.textContent = '';
        return true;
    } else {
        addressErr.textContent = `L'adresse saisit n'est pas valide`;
        return false;
    }
};

function validationCity() {
    let cityForm = validationForm.city;
    if (textRegex.test(cityForm)) {
        cityErr.textContent = '';
        return true;
    } else {
        cityErr.textContent = `La ville saisit n'est pas valide!`;
        return false;
    }
};

function validationEmail() {
    let emailForm = validationForm.email;
    if (emailRegex.test(emailForm)) {
        emailErr.textContent = '';
        return true;
    } else {
        emailErr.textContent = `L'email saisit n'est pas valide!`;
        return false;
    }
}

function sendForm() {
    let cartSelect = JSON.parse(localStorage.getItem('cart'));
    //console.log(cartSelect);
//-----Contrôle du formulaire pour pouvoir l'envoyer au LS-----
if (cartSelect !== null &&
    validationFirstName() &&
    validationLastName() &&
    validationAddress() &&
    validationCity() &&
    validationEmail()
){

//-----Tableau des produits-----
let kanaps = [];
    for (let i = 0; i < cartSelect.length; i ++) {
        kanaps.push(cartSelect[i].id);
        //console.log(cartSelect[i].id)
    }
//-----Stockage des contact et des produits-----
    localStorage.setItem('validationForm', JSON.stringify(validationForm)); 
    //console.log(validationForm);
    localStorage.setItem('kanaps', JSON.stringify('kanaps'));
    //console.log(kanaps);

//-----Requête POST-----
    fetch('http://localhost:3000/api/products/order', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({validationForm, kanaps}),
    })
//-----Réponse API que l'on stock-----
    .then((response) => response.json())
//-----Récupération du numéro de commande, on vide le LS et on redirige vers la page de confirmation-----
    .then (server => { 
        console.log(server);
        localStorage.setItem('orderId', server.orderId);
        console.log('server.orderId')
        alert('Votre commende a bien été enregistrée!')
        //window.location.href = 'confirmation.html?id=${server.orderId}';
        //window.localStorage.clear();
    });
//-----Message en cas d'erreur-----
} else {
    alert(`Veuillez vérifier les champs de saisie!`);
}
}
sendForm();
});