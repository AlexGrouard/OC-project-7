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

let dropdown = document.querySelectorAll(".dropdown");
dropdown.forEach(function (e) {
  e.onclick = function () {
    e.classList.toggle("active");
  };
});

async function init() {
  const { recipes } = await getData();
  displayRecipes(recipes);
}

init();
