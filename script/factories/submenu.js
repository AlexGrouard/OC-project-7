function submenuDOM(button, data, name) {
  const divOptions = document.createElement('div');
  divOptions.classList.add('options');

  const divContanier = document.createElement('div');
  divContanier.classList.add('subMenuContainer');

  for (let ingredient of data) {
    const div = document.createElement('div');
    div.setAttribute('onclick', `show('${ingredient}','${name}')`);
    div.setAttribute('class', `${ingredient}`);
    div.textContent = ingredient;
    divContanier.appendChild(div);
  }
  button.appendChild(divOptions);
  divOptions.append(divContanier);
  return button;
}
