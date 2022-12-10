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

    // for each ingredient list, create a new li element and check if the unit is present if unit is present print it.
    for (let i = 0; i < data.ingredients.length; i++) {
      const li = document.createElement("li");
      const divIngredient = document.createElement("div");
      divIngredient.setAttribute("class", "card-ingredient");
      divIngredient.textContent = data.ingredients[i].ingredient + " : ";
      const divQuantity = document.createElement("div");
      if (JSON.stringify(data.ingredients[i].unit) == undefined) {
        divQuantity.textContent = data.ingredients[i].quantity;
      } else {
        if (data.ingredients[i].unit === "grammes") {
          divQuantity.textContent = data.ingredients[i].quantity + "g";
        } else if (data.ingredients[i].unit === "cuillères à soupe") {
          divQuantity.textContent = data.ingredients[i].quantity + " cuillères";
        } else {
          divQuantity.textContent =
            data.ingredients[i].quantity + data.ingredients[i].unit;
        }
      }
      ul.appendChild(li);
      li.appendChild(divIngredient);
      li.appendChild(divQuantity);
    }

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
