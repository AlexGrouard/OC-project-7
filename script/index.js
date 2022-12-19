var ingredientArray = [];
var appliancesArray = [];
var ustensilsArray = [];
const searchInput = document.querySelector('.search');
const tag = document.querySelectorAll('.tag');
const grid = document.querySelector('#grid');

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
  recipes.forEach((recipes) => {
    for (let i = 0; i < recipes.ingredients.length; i++) {
      ingredientArray.push(recipes.ingredients[i].ingredient.toLowerCase());
    }
    appliancesArray.push(recipes.appliance.toLowerCase());
    for (let i = 0; i < recipes.ustensils.length; i++) {
      ustensilsArray.push(recipes.ustensils[i].toLowerCase());
    }
  });
  ingredientArray = Array.from(new Set(ingredientArray));
  appliancesArray = Array.from(new Set(appliancesArray));
  ustensilsArray = Array.from(new Set(ustensilsArray));
  displayDropdown(ingredientArray, appliancesArray, ustensilsArray);
}
// TODO: find a way to handle closing the dropdown when clicking outside of the dropdown
async function menuState() {
  const dropdown = document.querySelectorAll('.dropdown');
  const input = document.querySelectorAll('.input');
  dropdown.forEach((submenu) => {
    submenu.addEventListener('click', () => {
      const active = document.querySelectorAll('.active');
      const alreadyActive = document.querySelector('.active.inputSearch');
      const alreadyInput = document.querySelector('.inputSearch.active');
      // if (active.length > 1) {
      //   document.querySelector('.active').classList.toggle('active');
      // } else {
      //   document.querySelector('.active').classList.add('active');
      // }
      if (alreadyInput) {
        alreadyInput.classList.remove('inputSearch');
      }
    });
  });
}

async function displayDropdown(
  ingredientArray,
  appliancesArray,
  ustensilsArray
) {
  const buttonBar = document.querySelector('.button-bar');
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
        e.parentElement.classList.toggle(name);
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
      //console.log(Imatch);
      return Imatch;
    case 'Appareils':
      options.remove();
      let Amatch = appliancesArray.filter((e) => e.match(regex));
      submenuDOM(button, Amatch, id);
      //console.log(Amatch);
      return Amatch;
    case 'Ustensiles':
      options.remove();
      let Umatch = ustensilsArray.filter((e) => e.match(regex));
      submenuDOM(button, Umatch, id);
      //console.log(Umatch);
      return Umatch;
  }
}

async function show(value, id) {
  document.querySelector(`#${id}`).value = value;
  addTags(value, id);
  algo(value);
  //document.querySelector(`#${id}`).value = "";
}

async function algo(value) {
  const { recipes } = await getData();
  const regex = new RegExp(`${value}`);
  let fullResult = [];
  console.log(value)
  recipes.forEach((recipe) => {
    if (recipe.name.toLowerCase().match(regex) || recipe.appliance.toLowerCase().match(regex)) {
      fullResult.push(recipe);
    }
    recipe.ingredients.forEach((ingredientArr) => {
    if (ingredientArr.ingredient.toLowerCase().match(regex)) {
      fullResult.push(recipe);
    }})
    // for (el of recipe.ingredients) {
    //   let oneIngredient = el.ingredient.toLowerCase();
    //   console.log(oneIngredient);
    //   let result = oneIngredient.filter((e) => e.match(regex));
    //   console.log(result);
    //   if (result.length > 0) {
    //     fullResult.push(recipe);
    //   }
    // }
  });
  grid.replaceChildren();
  displayRecipes(fullResult);
  // recipes.forEach((recipe) => {
  //   for (el of recipe.ingredients) {
  //     console.log(el);
  //     if (el.ingredient.toLowerCase() === value.toLowerCase()) {
  //       console.log('equal');
  //       grid.removeChild();
  //       displayRecipes(recipe);
  //     }
  //   }
  // });
}

async function init() {
  const { recipes } = await getData();
  displayRecipes(recipes);
  sorting(recipes);
  menuState();
}
init();

searchInput.addEventListener('input', () => {
  if (searchInput.value.length > 2) {
    algo(searchInput.value);
  }
  else {
    init();
  }
});
