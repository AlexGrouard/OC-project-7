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
  //console.log(tagArray);
  recipes.forEach(function (recipe) {
    let recipeHasKeyword = false;
    const { name, ingredients, description, appliance, ustensils } = recipe;
    if (
      name.toLowerCase().includes(value) ||
      description.toLowerCase().includes(value)
    ) {
      recipeHasKeyword = true;
    }
    ingredients.forEach(function (ingredientList) {
      if (ingredientList.ingredient.toLowerCase().includes(value)) {
        recipeHasKeyword = true;
      }
    });

    let recipeHasAppliances = tagArray.some((tag) => {
      /*       console.log('appliance ' + appliance.toLowerCase());
      console.log('tag ' + tag.tagName.toLowerCase()); */
      appliance.toLowerCase() === tag.tagName.toLowerCase();
    });
    console.log(recipeHasAppliances);
    if (recipeHasAppliances || recipeHasKeyword) {
      fullResult.push(recipe);
    }
  });
  console.log(fullResult);
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
