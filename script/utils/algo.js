async function algo() {
  const value = searchInput.value;
  const { recipes } = await getData();
  const tags = document.querySelectorAll('.tag');
  let tagArray = [];
  let fullResult = [];

  for (let tag of tags) {
    tagArray.push({
      tagName: tag.textContent.toLowerCase(),
      tagType: tag.classList[1]
    });
  }
  console.log(tagArray);

  // go through each recipe to find a match in Ingredients, name of the recipe, appliances or utensils
  for (let recipe of recipes) {
    let recipeHasIngredient = false;
    let recipeHasAppliances = false;
    let recipeHasUstensils = false;
    let recipeHasKeyword = false;
    let tagTypeCounter = 0;
    let tagFoundCounter = 0;
    let tagOk = false;

    //if something is input is the research bar
    if (value) {
      if (
        recipe.name.toLowerCase().includes(value) ||
        recipe.description.toLowerCase().includes(value)
      ) {
        recipeHasKeyword = true;
      }
      for (let ingredientArr of recipe.ingredients) {
        if (ingredientArr.ingredient.toLowerCase().includes(value)) {
          recipeHasKeyword = true;
        }
      }
    }
    // if tags is added or removed
    for (let i = 0; i < tagArray.length; i++) {
      tagTypeCounter++;
      if (tagArray[i].tagType === 'Itag') {
        for (let ingredientArr of recipe.ingredients) {
          if (
            ingredientArr.ingredient.toLowerCase().includes(tagArray[i].tagName)
          ) {
            recipeHasIngredient = true;
            tagFoundCounter++;
          }
        }
      }
      if (tagArray[i].tagType === 'Atag') {
        if (recipe.appliance.toLowerCase().includes(tagArray[i].tagName)) {
          recipeHasAppliances = true;
          tagFoundCounter++;
        }
      }
      if (tagArray[i].tagType === 'Utag') {
        tagFoundCounter++;
        for (let utensilsArr of recipe.ustensils) {
          if (utensilsArr.toLowerCase().includes(tagArray[i].tagName)) {
            recipeHasUstensils = true;
            tagFoundCounter++;
          }
        }
      }
    }
    if (tagFoundCounter === tagTypeCounter) {
      console.log('Found');
      tagOk = true;
    }

    if (tagOk || recipeHasKeyword) {
      console.log('recette push');
      fullResult.push(recipe);
    }
  }

  if (fullResult.length > 0) {
    //remove duplicates
    fullResult = Array.from(new Set(fullResult));
    //clean up the page
    grid.replaceChildren();
    displayRecipes(fullResult);
  } else {
    grid.replaceChildren();
    grid.textContent = ' Aucune recette ne correspond à votre critère…';
  }
}

/* //Algo filter/every
async function algo() {
  const value = searchInput.value;
  const { recipes } = await getData();
  const tags = document.querySelectorAll('.tag');
  let tagArray = [];
  let fullResult = [];

  for (let tag of tags) {
    tagArray.push({
      tagName: tag.textContent.toLowerCase(),
      tagType: tag.classList[1]
    });
  }
  recipes.forEach(function (recipe) {
    for (let i = 0; i < tagArray.length; i++) {}
  });
  if (fullResult.length > 0) {
    //remove duplicates
    fullResult = Array.from(new Set(fullResult));
    //clean up the page
    grid.replaceChildren();
    displayRecipes(fullResult);
  } else {
    grid.replaceChildren();
    grid.textContent = ' Aucune recette ne correspond à votre critère…';
  }
} */
