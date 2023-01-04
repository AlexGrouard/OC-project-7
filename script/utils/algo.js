async function algo() {
  const value = searchInput.value;
  const { recipes } = await getData();
  const tags = document.querySelectorAll('.tag');
  let tagArray = [];
  let fullResult = [];
  for (let tag of tags) {
    tagArray.push(tag.textContent);
  }
  // go through each recipe to find a match in Ingredients, name of the recipe, appliances or utensils
  for (let recipe of recipes) {
    //if something is input is the research bar
    if (value) {
      if (
        recipe.name.toLowerCase().includes(value) ||
        recipe.description.toLowerCase().includes(value) ||
        recipe.appliance.toLowerCase().includes(value)
      ) {
        fullResult.push(recipe);
      }
      for (let ingredientArr of recipe.ingredients) {
        if (ingredientArr.ingredient.toLowerCase().includes(value)) {
          fullResult.push(recipe);
        }
      }
      for (let utensilsArr of recipe.ustensils) {
        if (utensilsArr.toLowerCase().includes(value)) {
          fullResult.push(recipe);
        }
      }
    }
    // if tags is added or removed
    if (tagArray.length > 0) {
      for (let tag of tagArray) {
        if (
          recipe.name.toLowerCase().includes(tag) ||
          recipe.description.toLowerCase().includes(tag) ||
          recipe.appliance.toLowerCase().includes(tag)
        ) {
          fullResult.push(recipe);
        }
        for (let ingredientArr of recipe.ingredients) {
          if (ingredientArr.ingredient.toLowerCase().includes(tag)) {
            fullResult.push(recipe);
          }
        }
        for (let utensilsArr of recipe.ustensils) {
          if (utensilsArr.toLowerCase().includes(tag)) {
            fullResult.push(recipe);
          }
        }
      }
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
    displayRecipes(recipes);
  }
}

/* //Algo with match function
async function algo(value) {
  const { recipes } = await getData();
  const tags = document.querySelectorAll('.tag');
  let fullResult = [];
  recipes.forEach((recipe) => {
    if (
      recipe.name.toLowerCase().includes(value) ||
      recipe.description.toLowerCase().includes(value) ||
      recipe.appliance.toLowerCase().includes(value)
    ) {
      fullResult.push(recipe);
    }
    recipe.ingredients.forEach((ingredientArr) => {
      if (ingredientArr.ingredient.toLowerCase().includes(value)) {
        fullResult.push(recipe);
      }
    });
    recipe.ustensils.forEach((ustensilsArr) => {
      if (ustensilsArr.toLowerCase().includes(value)) {
        fullResult.push(recipe);
      }
    });
  });
  //remove duplicates
  fullResult = Array.from(new Set(fullResult));
  //clean up the page
  grid.replaceChildren();
  displayRecipes(fullResult);
}
 */
