//Algo with match function
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
