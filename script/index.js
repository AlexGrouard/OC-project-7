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
  localStorage.setItem("Ingredients", JSON.stringify(ingredientArray));
  localStorage.setItem("Appareils", JSON.stringify(appliancesArray));
  localStorage.setItem("Ustensiles", JSON.stringify(ustensilsArray));
  displaySubmenu();
}
// async function addTags(recipes) {
//   const tagBar = document.querySelector(".tag-bar");
//   recipes.forEach((recipes) => {
//     const tagModel = sortingFactory(recipes);
//     const tagsCardDOM = tagModel.getTagDOM();
//     tagBar.appendChild(tagsCardDOM);
//   });
// }
async function displaySubmenu() {
  const buttonBar = document.querySelector(".button-bar");
  const ingredients = JSON.parse(localStorage.getItem("Ingredients"));
  const appliances = JSON.parse(localStorage.getItem("Appareils"));
  const ustensils = JSON.parse(localStorage.getItem("Ustensiles"));
  const submenuModelIngredient = submenuFactory(ingredients, "Ingredients");
  const submenuDOMingredient = submenuModelIngredient.submenuDOM();
  const submenuModelAppliances = submenuFactory(appliances, "Appareils");
  const submenuDOMappliances = submenuModelAppliances.submenuDOM();
  const submenuModelUstensils = submenuFactory(ustensils, "Ustensiles");
  const submenuDOMustensils = submenuModelUstensils.submenuDOM();
  buttonBar.appendChild(submenuDOMingredient);
  buttonBar.appendChild(submenuDOMappliances);
  buttonBar.appendChild(submenuDOMustensils);
  toggleClass(".dropdown-search", "inputSearch");
  toggleClass(".dropdownBtn", "active");
}

function show(value, id) {
  document.querySelector(`#${id}`).value = value;
}

function toggleClass(el, name) {
  let selector = document.querySelectorAll(el);
  if (
    document.querySelector(".active") ||
    document.querySelector(".inputSearch")
  ) {
    el.classList.toggle("active");
    el.classList.toggle("inputSearch");
  } else {
    selector.forEach((e) => {
      e.onclick = function () {
        e.parentElement.parentElement.classList.toggle(name);
      };
    });
  }
}

async function init() {
  const { recipes } = await getData();
  displayRecipes(recipes);
  sorting(recipes);
}

init();
