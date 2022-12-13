function submenuDOM(button, data, name) {
  const divOptions = document.createElement('div');
  divOptions.classList.add('options');

  for (let ingredient of data) {
    const div = document.createElement('div');
    div.setAttribute('onclick', `show('${ingredient}','${name}')`);
    div.setAttribute('class', `${ingredient}`);
    div.textContent = ingredient;
    divOptions.appendChild(div);
  }
  button.appendChild(divOptions);
  return button;
}
