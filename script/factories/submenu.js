function submenuDOM(button, data, name) {
  const divOptions = document.createElement('div');
  divOptions.classList.add('options');

  const divContainer = document.createElement('div');
  divContainer.classList.add('subMenuContainer');

  for (let ingredient of data) {
    const div = document.createElement('div');
    div.setAttribute('onclick', `show('${ingredient}','${name}')`);
    div.setAttribute('class', `${ingredient}`);
    div.textContent = ingredient;
    divContainer.appendChild(div);
  }
  button.appendChild(divOptions);
  divOptions.appendChild(divContainer);
  return button;
}
