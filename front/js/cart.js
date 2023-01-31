//-----récupération des données dans le Local Storage-----
const cartSelect = window.localStorage.getItem('cart');
console.log(cartSelect)
const positionCart = document.getElementById('cart__items');

//-----Si le panier est vide-----
if (cartSelect === 0) {
    alert ('Votre panier est vide!');
} else {
fetch("http://localhost:3000/api/products" + articleId)
    .then(response => response.json())
    .then(function(datas) {
//----- L'élément article-----
            let productArticle = document.createElement('article');
            positionCart.appendChild(productArticle);
            productArticle = datas._id;

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
            let productDivConten
        }
)
};
