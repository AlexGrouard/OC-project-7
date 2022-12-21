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

  //for tags utliser some()
}
