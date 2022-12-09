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

function show(value, id) {
  document.querySelector(`#${id}`).value = value;
}

function toggleClass(el, name) {
  let selector = document.querySelectorAll(el);
  selector.forEach((e) => {
    e.onclick = function () {
      e.parentElement.parentElement.classList.toggle(name);
    };
  });
}

async function init() {
  const { recipes } = await getData();
  displayRecipes(recipes);
}
toggleClass(".dropdown-search", "inputSearch");
toggleClass(".dropdownBtn", "active");
init();
