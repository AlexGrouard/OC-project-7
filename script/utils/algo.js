//Algo with match function
async function algo(value, toggle) {
  const { recipes } = await getData();
  const regex = new RegExp(`${value}`);
  let fullResult = [];
  // go through each recipe to find a match in Ingredients, name of the recipe, appliances or utensils
  recipes.forEach((recipe) => {
    if (
      recipe.name.toLowerCase().match(regex) ||
      recipe.appliance.toLowerCase().match(regex)
    ) {
      fullResult.push(recipe);
    }
    recipe.ingredients.forEach((ingredientArr) => {
      if (ingredientArr.ingredient.toLowerCase().match(regex)) {
        fullResult.push(recipe);
      }
    });
    recipe.ustensils.forEach((ustensilsArr) => {
      if (ustensilsArr.toLowerCase().match(regex)) {
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

//Algo with match function
async function algo(value, toggle) {
  const { recipes } = await getData();
  const regex = new RegExp(`${value}`);
  let fullResult = [];
  let removeResult = [];
  let index;
  // go through each recipe to find a match in Ingredients, name of the recipe, appliances or utensils
  recipes.forEach((recipe) => {
    if (
      recipe.name.toLowerCase().match(regex) ||
      recipe.appliance.toLowerCase().match(regex)
    ) {
      if (toggle == 'remove') {
        index = fullResult.indexOf(recipe);
        console.log(index);
        removeResult = fullResult.splice(index, 1);
      } else {
        fullResult.push(recipe);
      }
      recipe.ingredients.forEach((ingredientArr) => {
        if (ingredientArr.ingredient.toLowerCase().match(regex)) {
          if (toggle == 'remove') {
            index = fullResult.indexOf(recipe);
            removeResult = fullResult.splice(index, 1);
          } else {
            fullResult.push(recipe);
          }
        }
      });
      recipe.ustensils.forEach((ustensilsArr) => {
        if (ustensilsArr.toLowerCase().match(regex)) {
          if (toggle == 'remove') {
            index = fullResult.indexOf(recipe);
            removeResult = fullResult.splice(index, 1);
          } else {
            fullResult.push(recipe);
          }
        }
      });
    }
  });
  //remove duplicates
  fullResult = Array.from(new Set(fullResult));
  //clean up the page
  grid.replaceChildren();
  displayRecipes(fullResult);

  // if (fullResult.length === 0) {
  //   document.querySelector('.button-bar').replaceChildren()
  //   document.querySelector('.tag-bar').replaceChildren()
  //   grid.replaceChildren()
  //   init();
  // }
  // else {
}
