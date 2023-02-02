async function algo() {
  const value = searchInput.value
  const { recipes } = await getData()
  const tags = document.querySelectorAll(".tag")
  let tagArray = []
  let fullResult = []

  for (let tag of tags) {
    tagArray.push({
      tagName: tag.textContent.toLowerCase(),
      tagType: tag.classList[1],
    })
  }

  // go through each recipe to find a match in Ingredients, name of the recipe, appliances or utensils
  for (let recipe of recipes) {
    let recipeHasKeyword = true
    let tagTypeCounter = 0
    let tagFoundCounter = 0
    let tagOk = true

    //if something is input is the research bar
    if (value && value.length > 2) {
      let keywordInIngredients = false
      for (let ingredientArr of recipe.ingredients) {
        if (
          ingredientArr.ingredient.toLowerCase().includes(value.toLowerCase())
        ) {
          recipeHasKeyword = true
        }
      }
      if (
        !recipe.name.toLowerCase().includes(value.toLowerCase()) &&
        !recipe.description.toLowerCase().includes(value.toLowerCase()) &&
        !keywordInIngredients
      ) {
        recipeHasKeyword = false
      }
    }
    // if tags is added or removed
    for (let i = 0; i < tagArray.length; i++) {
      tagTypeCounter++
      if (tagArray[i].tagType === "Itag") {
        for (let ingredientArr of recipe.ingredients) {
          if (
            ingredientArr.ingredient.toLowerCase().includes(tagArray[i].tagName)
          ) {
            tagFoundCounter++
          }
        }
      }
      if (tagArray[i].tagType === "Atag") {
        if (recipe.appliance.toLowerCase().includes(tagArray[i].tagName)) {
          tagFoundCounter++
        }
      }
      if (tagArray[i].tagType === "Utag") {
        for (let utensilsArr of recipe.ustensils) {
          if (utensilsArr.toLowerCase().includes(tagArray[i].tagName)) {
            tagFoundCounter++
          }
        }
      }
    }
    if (tagFoundCounter !== tagTypeCounter) {
      tagOk = false
    }
    if (tagOk && recipeHasKeyword) {
      fullResult.push(recipe)
    }
  }

  if (fullResult.length > 0) {
    //remove duplicates
    fullResult = Array.from(new Set(fullResult))
    inputAutoComplete(fullResult)
    //clean up the page
    grid.replaceChildren()
    displayRecipes(fullResult)
  } else {
    grid.replaceChildren()
    grid.textContent = " Aucune recette ne correspond à votre critère…"
    fullResult = []
    inputAutoComplete(fullResult)
  }
}
