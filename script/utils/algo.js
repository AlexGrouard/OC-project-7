/* async function algo() {
  const value = searchInput.value;
  const { recipes } = await getData();
  const tags = document.querySelectorAll('.tag');
  let tagArray = [];
  let fullResult = [];
  let recipeHasKeyword = true;
  let recipeHasIngredient = true;
  let recipeHasAppliances = true;
  let recipeHasUstensils = true;
  let tagOk = true;
  let tagCounter = 0;

  for (let tag of tags) {
    console.log(tag);
    tagArray.push(tag.textContent, tag.classList[1]);
    console.log(tagArray);
  }
  // go through each recipe to find a match in Ingredients, name of the recipe, appliances or utensils
  for (let recipe of recipes) {
    //if something is input is the research bar
    console.log(value);
    if (value) {
      if (recipe.name.toLowerCase().includes(value)) {
        fullResult.push(recipe);
      }
      if (recipe.description.toLowerCase().includes(value))
        for (let ingredientArr of recipe.ingredients) {
          if (ingredientArr.ingredient.toLowerCase().includes(value)) {
            fullResult.push(recipe);
          }
        }
    }
    /*     // if tags is added or removed

    //recupere les types de tag
    // compter le nombres de tag
    // si trouver ajouter + 1 au compteur
    // si le nombre est ok tag ok
    // si les tag et la recherche sont ok push la recette
    if (tagArray.tagType == 'Atag') {
    }
    if (tagArray.length > 0) {
      for (let tag of tagArray) {
        if (!recipe.appliance.toLowerCase().includes(tag)) {
          recipeHasAppliances = false;
        }
        for (let ingredientArr of recipe.ingredients) {
          if (!ingredientArr.ingredient.toLowerCase().includes(tag)) {
            recipeHasIngredient = false;
          }
        }
        for (let utensilsArr of recipe.ustensils) {
          if (!utensilsArr.toLowerCase().includes(tag)) {
            recipeHasUstensils = false;
          }
        }
      }
      if (recipeHasAppliances && recipeHasIngredient && recipeHasUstensils) {
        fullResult.push(recipe);
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
    grid.textContent = ' Aucune recette ne correspond à votre critère…';
  }
} */

//Algo with match function
/* async function algo(value) {
  const { recipes } = await getData();
  const tags = document.querySelectorAll('.tag');
  let fullResult = [];
  recipes.forEach((recipe) => {
    const result = recipe.filter(ingredient => recipe.)
  });
  //remove duplicates
  fullResult = Array.from(new Set(fullResult));
  //clean up the page
  grid.replaceChildren();
  displayRecipes(fullResult);
}  */

async function algo() {
  const value = searchInput.value;
  const { recipes } = await getData();
  const tags = document.querySelectorAll('.tag');
  let tagArray = [];
  let fullResult = [];
  let recipeHasIngredient = true;
  let recipeHasAppliances = true;
  let recipeHasUstensils = true;
  let tagTypeCounter = 0;
  let tagFoundCounter = 0;
  let tagOk = false;
  for (let tag of tags) {
    tagArray.push((tagName = tag.textContent), (tagType = tag.classList[1]));
  }
  console.log(tagArray);
  // go through each recipe to find a match in Ingredients, name of the recipe, appliances or utensils
  for (let recipe of recipes) {
    //if something is input is the research bar
    if (value) {
      if (
        recipe.name.toLowerCase().includes(value) ||
        recipe.description.toLowerCase().includes(value)
      ) {
        fullResult.push(recipe);
      }
      for (let ingredientArr of recipe.ingredients) {
        if (ingredientArr.ingredient.toLowerCase().includes(value)) {
          fullResult.push(recipe);
        }
      }
    }
    // if tags is added or removed
      console.log(tagType)
      for (let i = 0; i > tagArray.length; i++) {
        switch (tagType) {
          case 'Itag':
            console.log('Itag')
            tagTypeCounter++;
            for (let ingredientArr of recipe.ingredients) {
              if (!ingredientArr.ingredient.toLowerCase().includes(tagName)) {
                recipeHasIngredient = false;
              } else {
                tagFoundCounter++;
              }
            }
            break;
          case 'Atag':
            console.log('Atag')
            tagTypeCounter++;
            if (!recipe.appliance.toLowerCase().includes(tagName)) {
              recipeHasAppliances = false;
            } else {
              tagFoundCounter++;
            }
            break;
          case 'Utag':
            console.log('Utag')
            tagTypeCounter++;
            for (let utensilsArr of recipe.ustensils) {
              if (!utensilsArr.toLowerCase().includes(tagName)) {
                recipeHasUstensils = false;
              } else {
                tagFoundCounter++;
              }
            }
            break;
        }
      }

    if (
      recipeHasUstensils ||
      recipeHasIngredient ||
      recipeHasAppliances && 
      tagFoundCounter === tagTypeCounter
    ) {
      tagOk = true;
    }
    if (tagOk) {
      //console.log('recette push')
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
