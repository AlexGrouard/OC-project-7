//Algo filter
async function algo() {
  const value = searchInput.value
  const { recipes } = await getData()
  const tags = document.querySelectorAll(".tag")
  let tagArray = []
  let fullResult = []

  tags.forEach((tag) => {
    tagArray.push({
      tagName: tag.textContent.toLowerCase(),
      tagType: tag.classList[1],
    })
  })

  recipes.forEach(function (recipe) {
    let recipeHasKeyword = true
    let tagOK = true
    const { name, ingredients, description, appliance, ustensils } = recipe

    //verify if the keyword enter is present in the recipe and is longer than 2 character
    if (value && value.length > 2) {
      if (
        !name.toLowerCase().includes(value.toLowerCase()) &&
        !description.toLowerCase().includes(value.toLowerCase()) &&
        !ingredients.find((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(value.toLowerCase())
        )
      ) {
        recipeHasKeyword = false
      }
    }

    tagArray.forEach((tag) => {
      let recipeHasAppliance
      tag.tagType === "Atag" &&
      tag.tagName.toLowerCase().includes(appliance.toLowerCase())
        ? (recipeHasAppliance = true)
        : (recipeHasAppliance = false)

      const recipeHasUstensils = ustensils.some(
        (ustensilsList) =>
          tag.tagType === "Utag" &&
          ustensilsList.toLowerCase() === tag.tagName.toLowerCase()
      )
      const recipeHasIngredient = ingredients.some(
        (ingredientList) =>
          tag.tagType === "Itag" &&
          ingredientList.ingredient.toLowerCase() === tag.tagName.toLowerCase()
      )
      if (!recipeHasAppliance && !recipeHasUstensils && !recipeHasIngredient) {
        tagOK = false
      }
    })

    if (recipeHasKeyword && tagOK) {
      fullResult.push(recipe)
    }
  })
  //display theresults
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
