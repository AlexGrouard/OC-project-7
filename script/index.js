async function getData() {
  return await fetch("./data/recipes.json").then((response) => response.json());
}

async function displayRecipes(recipes) {
  const grid = document.querySelector("#grid");
  recipes.forEach((recipes) => {
    const recipeModel = recipesFeactory(recipes);
    const recipesCardDOM = recipeModel.getCardDOM();
    grid.appendChild(recipesCardDOM);
  });
}

async function sorting(recipes) {
  let ingredientArray = [];
  let appliancesArray = [];
  let ustensilsArray = [];
  recipes.forEach((recipes) => {
    for (let i = 0; i < recipes.ingredients.length; i++) {
      ingredientArray.push(recipes.ingredients[i].ingredient);
    }
    appliancesArray.push(recipes.appliance);
    for (let i = 0; i < recipes.ustensils.length; i++) {
      ustensilsArray.push(recipes.ustensils[i]);
    }
  });
  ingredientArray = Array.from(new Set(ingredientArray));
  appliancesArray = Array.from(new Set(appliancesArray));
  ustensilsArray = Array.from(new Set(ustensilsArray));
  localStorage.setItem("ingredients", JSON.stringify(ingredientArray));
  localStorage.setItem("appareils", JSON.stringify(appliancesArray));
  localStorage.setItem("ustensiles", JSON.stringify(ustensilsArray));
  displaySubmenu(ingredientArray, appliancesArray, ustensilsArray);
}

async function displaySubmenu(
  ingredientArray,
  appliancesArray,
  ustensilsArray
) {
  const buttonBar = document.querySelector(".button-bar");
  // create the 3 different submenu
  const submenuModelIngredient = submenuFactory(ingredientArray, "Ingredients");
  const submenuDOMingredient = submenuModelIngredient.submenuDOM();
  const submenuModelAppliances = submenuFactory(appliancesArray, "Appareils");
  const submenuDOMappliances = submenuModelAppliances.submenuDOM();
  const submenuModelUstensils = submenuFactory(ustensilsArray, "Ustensiles");
  const submenuDOMustensils = submenuModelUstensils.submenuDOM();
  // append the submenu
  buttonBar.appendChild(submenuDOMingredient);
  buttonBar.appendChild(submenuDOMappliances);
  buttonBar.appendChild(submenuDOMustensils);
  // add the toggle to the button
  toggleClass(".dropdown-search", "inputSearch");
  toggleClass(".dropdownBtn", "active");

  inputListening();
}

function show(value, id) {
  document.querySelector(`#${id}`).value = value;
  addTags(value, id);
}

function toggleClass(el, name) {
  let selector = document.querySelectorAll(el);
  selector.forEach((e) => {
    if (name == "close") {
      e.onclick = function () {
        e.parentElement.classList.toggle(name);
      };
    } else {
      e.onclick = function () {
        e.parentElement.parentElement.classList.toggle(name);
      };
    }
  });
}

function inputListening() {
  const dropdownSearch = document.querySelectorAll(".dropdown-search");
  const Ingredients = localStorage.getItem("ingredients");
  Ingredients = JSON.parse(Ingredients);
  dropdownSearch.forEach((search) => {
    search.addEventListener("input", () =>
      autoComplete(search.value, search.id, Ingredients)
    );
  });
}

function autoComplete(value, id, Ingredients) {
  const regex = new RegExp(`^${value}`);
  switch (id) {
    case "Ingredients":
      let match = Ingredients.match(regex);
      console.log(match);
      break;
    case "Appareils":
      break;
    case "Ustensiles":
      break;
  }
}

async function init() {
  const { recipes } = await getData();

  displayRecipes(recipes);
  sorting(recipes);
  // listen for any input on the dropdown
}
init();
