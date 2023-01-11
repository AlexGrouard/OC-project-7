//Algo filter
async function algo() {
  const value = searchInput.value;
  const { recipes } = await getData();
  const tags = document.querySelectorAll('.tag');
  let tagArray = [];
  let fullResult = [];

  tags.forEach((tag) => {
    tagArray.push({
      tagName: tag.textContent.toLowerCase(),
      tagType: tag.classList[1]
    });
  });
  recipes.forEach(function (recipe) {
    let recipeHasKeyword = true;
    let tagOK = true;
    let keywordInIngredient = false;
    let recipeHasAppliances;
    let recipeHasUstensils;
    let recipeHasIngredients;
    let tagTypeCounter = 0;
    let tagFoundCounter = 0;
    const { name, ingredients, description, appliance, ustensils } = recipe;

    if (value && value.length > 2) {
      ingredients.forEach(function (ingredientList) {
        if (
          ingredientList.ingredient.toLowerCase().includes(value.toLowerCase())
        ) {
          keywordInIngredient = true;
        }
      });
      if (
        !name.toLowerCase().includes(value.toLowerCase()) &&
        !description.toLowerCase().includes(value.toLowerCase()) &&
        !keywordInIngredient
      ) {
        recipeHasKeyword = false;
      }
    }

    if (tagArray.length > 0) {
      recipeHasAppliances = tagArray.every(
        (tag) => tag.tagName.toLowerCase() === appliance.toLowerCase()
      );
      tagArray.forEach((tag) => {
        recipeHasUstensils = ustensils.some(
          (ustensilsList) =>
            ustensilsList.toLowerCase() === tag.tagName.toLowerCase()
        );
        recipeHasIngredients = ingredients.some(
          (ingredientList) =>
            ingredientList.ingredient.toLowerCase() ===
            tag.tagName.toLowerCase()
        );
      });
      //console.log('Appliances ' + recipeHasAppliances);
      console.log('Ingredient ' + recipeHasIngredients);
      console.log('recipeHasUstensils ' + recipeHasUstensils);
      if (
        !recipeHasAppliances &&
        !recipeHasIngredients &&
        !recipeHasUstensils
      ) {
        tagOK = false;
      }
    }
    if (tagOK && recipeHasKeyword) {
      fullResult.push(recipe);
    }
  });
  //console.log(fullResult);
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
