var ingredientArray = [];
var appliancesArray = [];
var ustensilsArray = [];
const searchInput = document.querySelector('.search');
const grid = document.querySelector('#grid');
const buttonBar = document.querySelector('.button-bar');

async function getData() {
  return await fetch('./data/recipes.json').then((response) => response.json());
}

async function displayRecipes(recipes) {
  recipes.forEach((recipes) => {
    const recipeModel = recipesFeactory(recipes);
    const recipesCardDOM = recipeModel.getCardDOM();
    grid.appendChild(recipesCardDOM);
  });
}

async function sorting(recipes) {
  recipes.forEach((recipe) => {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      ingredientArray.push(recipe.ingredients[i].ingredient.toLowerCase());
    }
    appliancesArray.push(recipe.appliance.toLowerCase());
    for (let i = 0; i < recipe.ustensils.length; i++) {
      ustensilsArray.push(recipe.ustensils[i].toLowerCase());
    }
  });
  ingredientArray = Array.from(new Set(ingredientArray));
  appliancesArray = Array.from(new Set(appliancesArray));
  ustensilsArray = Array.from(new Set(ustensilsArray));
  displayDropdown(ingredientArray, appliancesArray, ustensilsArray);
}

async function displayDropdown(
  ingredientArray,
  appliancesArray,
  ustensilsArray
) {
  // create the 3 different submenu
  const dropdownModelIngredient = dropdownFactory(
    ingredientArray,
    'Ingredients'
  );
  const dropdownDOMingredient = dropdownModelIngredient.dropdownDOM();
  const dropdownModelAppliances = dropdownFactory(appliancesArray, 'Appareils');
  const dropdownDOMappliances = dropdownModelAppliances.dropdownDOM();
  const dropdownModelUstensils = dropdownFactory(ustensilsArray, 'Ustensiles');
  const dropdownDOMustensils = dropdownModelUstensils.dropdownDOM();
  // append the submenu
  buttonBar.appendChild(dropdownDOMingredient);
  buttonBar.appendChild(dropdownDOMappliances);
  buttonBar.appendChild(dropdownDOMustensils);
  // add the toggle to the button
  toggleClass('.dropdown-search', 'inputSearch');
  toggleClass('.dropdownBtn', 'active');

  await inputListening();
}

async function toggleClass(el, name) {
  let selector = document.querySelectorAll(el);
  selector.forEach((e) => {
    if (name == 'close') {
      e.addEventListener('click', () => {
        e.parentElement.remove();
        algo();
      });
    } else {
      e.addEventListener('click', () => {
        e.parentElement.parentElement.classList.toggle(name);
      });
    }
  });
}

async function inputListening() {
  const dropdownSearch = document.querySelectorAll('.dropdown-search');
  dropdownSearch.forEach((search) => {
    search.addEventListener('input', () =>
      autoComplete(
        search.value,
        search.id,
        ingredientArray,
        appliancesArray,
        ustensilsArray
      )
    );
  });
}

async function autoComplete(
  value,
  id,
  ingredientArray,
  appliancesArray,
  ustensilsArray
) {
  value = value.toLowerCase();
  const buttonBar = document.querySelector('.button-bar');
  const button = buttonBar.querySelector(`#${id}` + 'Btn');
  const options = button.querySelector('.options');
  const regex = new RegExp(`${value}`);

  switch (id) {
    case 'Ingredients':
      options.remove();
      let Imatch = ingredientArray.filter((e) => e.match(regex));
      submenuDOM(button, Imatch, id);
      return Imatch;
    case 'Appareils':
      options.remove();
      let Amatch = appliancesArray.filter((e) => e.match(regex));
      submenuDOM(button, Amatch, id);
      return Amatch;
    case 'Ustensiles':
      options.remove();
      let Umatch = ustensilsArray.filter((e) => e.match(regex));
      submenuDOM(button, Umatch, id);
      return Umatch;
  }
}

async function show(value, id) {
  document.querySelector(`#${id}`).value = value;
  addTags(value, id);
  algo();
}



async function init() {
  const { recipes } = await getData();
  displayRecipes(recipes);
  sorting(recipes);
}

init();

searchInput.addEventListener('input', () => {
  if (searchInput.value.length > 2) {
    algo();
  } else {
    document.querySelector('.button-bar').replaceChildren();
    document.querySelector('.tag-bar').replaceChildren();
    grid.replaceChildren();
    init();
  }
});
document.addEventListener('click', (e) => {
  const ingredientMenu = document.querySelector('#IngredientsBtn');
  const applianceMenu = document.querySelector('#AppareilsBtn');
  const ustensilsMenu = document.querySelector('#UstensilesBtn');
  if (!ingredientMenu.contains(e.target)) {
    ingredientMenu.classList.remove('active');
    ingredientMenu.classList.remove('inputSearch');
  }
  if (!applianceMenu.contains(e.target)) {
    applianceMenu.classList.remove('active');
    applianceMenu.classList.remove('inputSearch');
  }
  if (!ustensilsMenu.contains(e.target)) {
    ustensilsMenu.classList.remove('active');
    ustensilsMenu.classList.remove('inputSearch');
  }
});
