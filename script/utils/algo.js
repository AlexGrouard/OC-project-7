//Algo filter
async function algo() {
  const value = searchInput.value;
  const { recipes } = await getData();
  const tags = document.querySelectorAll(".tag");
  let tagArray = [];
  let fullResult = [];
  let tagTypeCounter = 0;
  tags.forEach((tag) => {
    tagTypeCounter++;
    tagArray.push({
      tagName: tag.textContent.toLowerCase(),
      tagType: tag.classList[1],
    });
  });
  recipes.forEach(function (recipe) {
    let recipeHasKeyword = true;
    let tagOK = true;
    let keywordInIngredient = false;
    let recipeHasUstensils;
    let recipeHasIngredient;
    let tagFoundCounter = 0;

    const { name, ingredients, description, appliance, ustensils } = recipe;

    if (value && value.length > 2) {
      keywordInIngredient = ingredients.some(
        (ingredientList) =>
          ingredientList.ingredient.toLowerCase() === value.toLowerCase()
      );
      if (
        !name.toLowerCase().includes(value.toLowerCase()) &&
        !description.toLowerCase().includes(value.toLowerCase()) &&
        !keywordInIngredient
      ) {
        recipeHasKeyword = false;
      }
    }

    tagArray.forEach((tag) => {
      if (tag.tagType === "Atag") {
        if (tag.tagName.toLowerCase() === appliance.toLowerCase()) {
          tagFoundCounter++;
        }
      } else {
        recipeHasUstensils = ustensils.some(
          (ustensilsList) =>
            ustensilsList.toLowerCase() === tag.tagName.toLowerCase()
        );
        recipeHasIngredient = ingredients.some(
          (ingredientList) =>
            ingredientList.ingredient.toLowerCase() ===
            tag.tagName.toLowerCase()
        );
        if (recipeHasUstensils || recipeHasIngredient) {
          tagFoundCounter++;
        }
      }
    });

    if (tagFoundCounter != tagTypeCounter) {
      tagOK = false;
    }
    if (tagOK && recipeHasKeyword) {
      fullResult.push(recipe);
    }
  });
  if (fullResult.length > 0) {
    //remove duplicates
    fullResult = Array.from(new Set(fullResult));
    //clean up the page
    grid.replaceChildren();
    displayRecipes(fullResult);
  } else {
    grid.replaceChildren();
    grid.textContent = " Aucune recette ne correspond à votre critère…";
  }
}
