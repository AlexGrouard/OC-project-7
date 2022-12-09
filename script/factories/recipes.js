function recipesFeactory(data) {
  const { id, name, ingredients, time, description } = data;

  function getCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("class", "card");
    article.setAttribute("id", id);

    const img = document.createElement("img");
    img.setAttribute("src", "http://via.placeholder.com/380x178");
    img.setAttribute("class", "card-img");
    img.setAttribute("alt", name);

    const divDescription = document.createElement("div");
    divDescription.setAttribute("class", "card-description");

    const divTitle = document.createElement("div");
    divTitle.setAttribute("class", "card-title");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const divTimer = document.createElement("div");
    divTimer.setAttribute("class", "timer");

    const imgTimer = document.createElement("img");
    imgTimer.setAttribute("src", "./assets/images/timer.svg");

    const divTime = document.createElement("div");
    divTime.textContent = time;

    const divMin = document.createElement("div");
    divMin.setAttribute("class", "timer-min");
    divMin.textContent = " min";

    const divContent = document.createElement("div");
    divContent.setAttribute("class", "card-content");

    const ul = document.createElement("ul");
    let index = id;
    console.log(data);
    //ingredientFactory(index, data);

    const divRecette = document.createElement("div");
    divRecette.setAttribute("class", "recette");
    divRecette.textContent = description;

    article.appendChild(img);
    article.appendChild(divDescription);
    divDescription.appendChild(divTitle);
    divTitle.appendChild(h2);
    divTitle.appendChild(divTimer);
    divTimer.appendChild(imgTimer);
    divTimer.appendChild(divTime);
    divTimer.appendChild(divMin);
    divDescription.appendChild(divContent);
    divContent.appendChild(ul);
    divContent.appendChild(divRecette);
    return article;
  }

  return { id, name, ingredients, time, description, getCardDOM };
}
