//-----récupération des données dans le Local Storage-----
const cartSelect = JSON.parse(localStorage.getItem('cart'));
console.log(cartSelect)
const positionCart = document.getElementById('cart__items');

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

//-----Total du prix et quantité-----
    let totalArticle = 0;
    let totalPrice = 0;
    let totalProduct = 0;
        for (i = 0; i < cartSelect.length; i++) {
            for (i = 0; i < datas.length; i++) {
            if(datas[i].id == cartSelect[i].id) {
            totalArticle += parseInt(cartSelect[i].quantiteProduit);
            totalProduct = parseInt(datas[i].price * cartSelect[i].quantiteProduit);
            totalPrice += parseInt(datas.price[i] * cartSelect[i].quantiteProduit);
            }
        }
        }
        console.log(totalArticle);
        let quantityFinal = document.querySelector('#totalQuantity');
        quantityFinal.textContent = totalArticle;
        let priceFinal = document.querySelector('#totalPrice');
        priceFinal.textContent = totalPrice;
        

//-----Modification produit-----


//-----Suppression produit-----

    })
    }};

//-----Validation de formulaire-----