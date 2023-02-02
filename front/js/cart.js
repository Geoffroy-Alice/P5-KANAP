//-----récupération des données dans le Local Storage-----
const cartSelect = window.localStorage.getItem('cart');
const cart = JSON.parse(cartSelect);
console.log(cartSelect)

//-----Tableau vide pour mettre les données-----
let products = [];

//-----Si le panier est vide-----
    if (cartSelect === 0 || cartSelect === null) {
        document.querySelector('h1').textContent = 'Votre panier est vide';
//-----Si il contient au moins un produit-----
    } else {
        document.querySelector('h1').textContent = 'Contenu de votre panier';
    };
//-----Récupération des données de l'API-----
        fetch("http://localhost:3000/api/products/")
        .then(response => response.json())
        .then(datas => {
        products = datas;
//-----Insertion des éléments dans cart__items-----
const positionCart = document.getElementById('cart__items');
            for (let productCart of products) {
//-----L'élément article-----
            let productArticle = document.createElement('article');
            positionCart.appendChild(productArticle);
            productArticle.className = "cart__items";
            productArticle.setAttribute('data-id', productCart.id)
            productArticle.setAttribute('data-color', productCart.couleurProduit)

//-----L'élément div image-----
            let productDivImage = document.createElement('div');
            productArticle.appendChild(productDivImage);
            productDivImage.className = 'cart__item__img';

//-----L'élément image-----
            let productImage = document.createElement('img');
            productDivImage.appendChild(productImage);
            productImage.src = productCart.imageUrl;
            productImage.alt = productCart.altTxt;
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
            productTitle.textContent = productCart.name;
            
//-----L'élément paragraphe: couleur-----
            let productColor = document.createElement('p');
            productDivContentDescription.appendChild(productColor);
            productColor.textContent = productCart.couleurProduit;

//-----L'élément paragraphe: prix-----
            let productPrice = document.createElement('p');
            productDivContentDescription.appendChild(productPrice);
            productPrice.textContent = productCart.price +"€";
        
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
        });
