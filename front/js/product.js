//-----lien entre la page d'accueil et la page produits et on récupère l'id-----
var paramsString = window.location.search;
var searchParams = new URLSearchParams(paramsString);
var articleId = searchParams.get("id");

//-----on récupère les données de l'api-----
fetch("http://localhost:3000/api/products/" + articleId)
//-----promesse pour récupérer la réponse en json-----
    .then(Response => Response.json())
//-----promesse pour récupérer les données-----
    .then(function(data) {
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
                
                colorsKanap.appendChild(colorOption);
            }        
    })
//-----message en cas d'erreur-----
    .catch(error => console.log(`Une erreur s'est produite. Veuillez nous en excuser!`, error));
 