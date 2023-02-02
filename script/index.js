var ingredientArray = []
var appliancesArray = []
var ustensilsArray = []
var fullArray = []
const searchInput = document.querySelector(".search")
const grid = document.querySelector("#grid")
const buttonBar = document.querySelector(".button-bar")

async function getData() {
  return await fetch("./data/recipes.json").then((response) => response.json())
}

async function displayRecipes(recipes) {
  recipes.forEach((recipes) => {
    const recipeModel = recipesFeactory(recipes)
    const recipesCardDOM = recipeModel.getCardDOM()
    grid.appendChild(recipesCardDOM)
  })
}
// get everything from the recipes, put them into arrays clen them and send them to the display function
async function sorting(recipes) {
  recipes.forEach((recipe) => {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      ingredientArray.push(recipe.ingredients[i].ingredient.toLowerCase())
    }
    appliancesArray.push(recipe.appliance.toLowerCase())

    for (let i = 0; i < recipe.ustensils.length; i++) {
      ustensilsArray.push(recipe.ustensils[i].toLowerCase())
    }
  })
  //eliminate double
  ingredientArray = Array.from(new Set(ingredientArray))
  appliancesArray = Array.from(new Set(appliancesArray))
  ustensilsArray = Array.from(new Set(ustensilsArray))
  displayDropdown(ingredientArray, appliancesArray, ustensilsArray)
}

async function displayDropdown(
  ingredientArray,
  appliancesArray,
  ustensilsArray
) {
  // create the 3 different submenu
  const dropdownModelIngredient = dropdownFactory(
    ingredientArray,
    "Ingredients"
  )
  const dropdownDOMingredient = dropdownModelIngredient.dropdownDOM()
  const dropdownModelAppliances = dropdownFactory(appliancesArray, "Appareils")
  const dropdownDOMappliances = dropdownModelAppliances.dropdownDOM()
  const dropdownModelUstensils = dropdownFactory(ustensilsArray, "Ustensiles")
  const dropdownDOMustensils = dropdownModelUstensils.dropdownDOM()
  // append the submenu
  buttonBar.appendChild(dropdownDOMingredient)
  buttonBar.appendChild(dropdownDOMappliances)
  buttonBar.appendChild(dropdownDOMustensils)
  // add the toggle to the button
  toggleClass(".dropdown-search", "inputSearch")
  toggleClass(".dropdownBtn", "active")
  //first part of the autocomplete functionality
  inputListening()
}

//toggle class on the dropdown menu for multiple state
async function toggleClass(el, name) {
  let selector = document.querySelectorAll(el)
  selector.forEach((e) => {
    if (name == "close") {
      e.parentElement.remove()
      algo()
    } else {
      e.addEventListener("click", () => {
        e.parentElement.parentElement.classList.toggle(name)
      })
    }
  })
}

//show the element in the button
async function show(value, id) {
  addTags(value, id)
  document.querySelector(`#${id}`).value = ""
  algo()
}

async function init() {
  const { recipes } = await getData()
  displayRecipes(recipes)
  sorting(recipes)
}

init()

//listen to the search bar
searchInput.addEventListener("input", () => {
  algo()
})
//close the dropdown menu when clicked outside
document.addEventListener("click", (e) => {
  const ingredientMenu = document.querySelector("#IngredientsBtn")
  const applianceMenu = document.querySelector("#AppareilsBtn")
  const ustensilsMenu = document.querySelector("#UstensilesBtn")
  if (!ingredientMenu.contains(e.target)) {
    ingredientMenu.classList.remove("active")
    ingredientMenu.classList.remove("inputSearch")
  }
  if (!applianceMenu.contains(e.target)) {
    applianceMenu.classList.remove("active")
    applianceMenu.classList.remove("inputSearch")
  }
  if (!ustensilsMenu.contains(e.target)) {
    ustensilsMenu.classList.remove("active")
    ustensilsMenu.classList.remove("inputSearch")
  }
})
