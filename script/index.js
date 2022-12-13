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
  const dropdownModelIngredient = dropdownFactory(
    ingredientArray,
    "Ingredients"
  );
  const dropdownDOMingredient = dropdownModelIngredient.dropdownDOM();
  const dropdownModelAppliances = dropdownFactory(appliancesArray, "Appareils");
  const dropdownDOMappliances = dropdownModelAppliances.dropdownDOM();
  const dropdownModelUstensils = dropdownFactory(ustensilsArray, "Ustensiles");
  const dropdownDOMustensils = dropdownModelUstensils.dropdownDOM();
  // append the submenu
  buttonBar.appendChild(dropdownDOMingredient);
  buttonBar.appendChild(dropdownDOMappliances);
  buttonBar.appendChild(dropdownDOMustensils);
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
  let Ingredients = localStorage.getItem("ingredients");
  let Appareils = localStorage.getItem("appareils");
  let Ustensiles = localStorage.getItem("ustensiles");
  Ingredients = JSON.parse(Ingredients);
  Appareils = JSON.parse(Appareils);
  Ustensiles = JSON.parse(Ustensiles);

  dropdownSearch.forEach((search) => {
    search.addEventListener("input", () =>
      autoComplete(search.value, search.id, Ingredients, Appareils, Ustensiles)
    );
  });
}

function autoComplete(value, id, Ingredients, Appareils, Ustensiles) {
  const buttonBar = document.querySelector(".button-bar");
  const button = buttonBar.querySelector(`#${id}` + "Btn");
  const dropdownModelIngredient = dropdownFactory(Ingredients, "Ingredients");
  const dropdownModelAppliances = dropdownFactory(Appareils, "Appareils");
  const dropdownModelUstensils = dropdownFactory(Ustensiles, "Ustensiles");
  const regex = new RegExp(`${value}`);
  switch (id) {
    case "Ingredients":
      let Imatch = Ingredients.filter((e) => e.match(regex));
      // const submenuDOMingredient = dropdownModelIngredient.submenuDOM(
      //   button,
      //   Imatch
      // );
      // buttonBar.appendChild(submenuDOMingredient);
      console.log(Imatch);
      return Imatch;
    case "Appareils":
      let Amatch = Appareils.filter((e) => e.match(regex));
      return Amatch;
    case "Ustensiles":
      let Umatch = Ustensiles.filter((e) => e.match(regex));
      return Umatch;
  }
}

async function menuState() {
  const dropdown = document.querySelectorAll(".dropdown");
  dropdown.forEach((submenu) => {
    submenu.addEventListener("click", () => {
      const alreadyActive = document.querySelector(".active.inputSearch");
      const alreadyInput = document.querySelector(".inputSearch.active");
      if (alreadyActive) {
        alreadyActive.classList.remove("active");
      }
      if (alreadyInput) {
        alreadyInput.classList.remove("inputSearch");
      }
    });
  });
}

async function init() {
  const { recipes } = await getData();
  displayRecipes(recipes);
  sorting(recipes);
  menuState();
}
init();
