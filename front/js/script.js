var listKanap = [];
function alldata() {
//-----on récupère les données de l'API-----
fetch("http://localhost:3000/api/products")
//-----première promesse pour récupérer la réponse en json-----
  .then(response => response.json())
//-----deuxième promesse pourrécupérer les données-----
  .then(function(result) {
    listKanap = result;
    console.log('Result', result);
//-----la constante permet de retourner l'élément dans le sélecteur (items)-----
    const articleItems = document.querySelector('#items');
//-----on crée une boucle pour éxécuter des instructions et afficher les produits-----
        for (let article of listKanap) {
//-----on crée les éléments----
//-----on met en place la relation parent/enfant-----
//-----élément contenant les données, les liens des produits(card)-----
            let eltA = document.createElement('a');
            eltA.href =`./product.html?id=${article._id}`;           
//-----éléments des produits-----
            let eltArticle = document.createElement('article');
//-----images des produits + textes descriptifs-----
            let eltImage = document.createElement('img');
            eltImage.src =`${article.imageUrl}`;
            eltImage.alt = `${article.altTxt}`;
            eltArticle.appendChild(eltImage);
//-----noms des produits-----
            let eltName = document.createElement('h3');
            eltName.innerText = `${article.name}`;
            eltArticle.appendChild(eltName);
//-----descriptions des produits-----
            let eltDescription = document.createElement('p');
            eltDescription.innerText = `${article.description}`;
            eltArticle.appendChild(eltDescription);

            articleItems.appendChild(eltA);
            eltA.appendChild(eltArticle)
        }
  }
  )
  //-----message en cas d'erreur-----
  .catch(error => console.log(`Une erreur s'est produite. Veuillez nous en excuser!`, error));
}
alldata();