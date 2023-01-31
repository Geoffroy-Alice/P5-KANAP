//-----lien entre la page d'accueil et la page produits et on récupère l'id-----
var paramsString = window.location.search;
var searchParams = new URLSearchParams(paramsString);
var articleId = searchParams.get("id");
console.log(articleId);

//-----on récupère les données de l'api-----
fetch("http://localhost:3000/api/products/" + articleId)
//-----promesse pour récupérer la réponse en json-----
    .then(Response => Response.json())
    .then(function(data) {
        console.log(data)
//-----nom du produit sur la page-----
        let pageTitle = document.querySelector('title');
        pageTitle.innerText = data.name;
//-----image du produit-----
        let Image = document.createElement('img');
        Image.src = data.imageUrl;
        Image.alt = data.altTxt;
//-----nom du produit-----
        let kanapName = document.querySelector('#title');
        kanapName.innerText = data.name;
//-----prix du produit-----
        let Price = document.querySelector('#price');
        Price.innerText = data.price;
//-----description de produit-----
        let Description = document.querySelector('#description');
        Description.innerText = data.description;
//-----relation parent/enfant-----
        const Images = document.querySelector('.item__img');
        Images.appendChild(Image);

//-----couleur du produit-----
        const colorsKanap = document.querySelector('#colors');
        console.log(data.colors)
            for(let colors of data.colors) {
                let colorOption = document.createElement('option');
                colorOption.innerText = colors;
                colorOption.value = colors;
                
                colorsKanap.appendChild(colorOption);
            }
    });
//-----bouton ajouter au panier-----
        let btn = document.getElementById('addToCart');
//-----déclenchement du bouton addToCart au clic-----
        btn.addEventListener('click', function() {
//-----couleur sélectionnée-----
        let choiceColor = document.getElementById('colors').value;
//-----quantité sélectionnée-----
        let choiceQuantity = document.getElementById('quantity').value;
//-----on crée l'objet de stockage des informations-----
        let cartSelect = [];
        if (localStorage.getItem('cart')) {
            cartSelect = JSON.parse(localStorage.getItem('cart'));
}
//-----si la couleur n'est pas sélectionnée, on affiche un message d'erreur-----
            if (choiceColor == '') {
                alert('Veuillez sélectionner une couleur');
            } 
//-----si la quantité selectionnée n'est pas entre zéro et cent, on affiche un message d'erreur-----
            else if (choiceQuantity < 1 || choiceQuantity > 100) {
                alert('Veuillez sélectionner une quantité entre 0 et 100.');
            }
//----- si la couleur et la quantité sont sélectionnees-----
                else {
                    alert('le produit a été ajouté au panier');
                    window.location.href = 'cart.html';
                };
//-----option des article à mettre dans le panier-----
            let produitOption = {
                id: articleId,
                couleurProduit: choiceColor,
                quantiteProduit: Number(choiceQuantity),
            };  
            console.log(produitOption);

//-----si le panier est vide-----
            if (cartSelect === 0) {
                cartSelect = []
                cartSelect.push(produitOption);
//----- local storage: stockage-----
                localStorage.setItem('cart', JSON.stringify(cartSelect));
            } else {
//-----si nous avons des produits présents (on vérifie si même ID et même couleur)-----
            if (cartSelect) {
            let product = cartSelect.find(
                (product) => product.id === produitOption.id && product.couleurProduit === produitOption.couleurProduit);
//-----si il n'est pas présent, on ajoute le nouvel éléments-----
                if (product == undefined) {
                cartSelect.push(produitOption);
                localStorage.setItem('cart', JSON.stringify(cartSelect));
//-----sinon on modifie les quantités-----
            } else {
               let newProduct = product.quantiteProduit += produitOption.quantiteProduit;
               product.quantiteProduit = newProduct;
               console.log(newProduct);
                if (newProduct > 100)
                    alert(`Le nombre d'articles maximun autorisés est de 100`);
                    

                localStorage.setItem('cart', JSON.stringify(cartSelect));
            }
        };
}
        });
