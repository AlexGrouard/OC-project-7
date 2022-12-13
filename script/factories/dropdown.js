function dropdownFactory(data, name) {
  //const { ingredent } = data;

  function dropdownDOM() {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("dropdown");
    button.id = name + "Btn";

    const divDropdown = document.createElement("div");
    divDropdown.classList.add("dropdown-visible");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("dropdown-search");
    input.id = name;
    input.placeholder = name;

    const img = document.createElement("img");
    img.classList.add("dropdownBtn");
    img.src = "./assets/images/arrow-down.svg";

    button.appendChild(divDropdown);
    divDropdown.appendChild(input);
    divDropdown.appendChild(img);
    submenuDOM(button, data);
    return button;
  }
  function submenuDOM(button, data) {
    const divOptions = document.createElement("div");
    divOptions.classList.add("options");

    for (let ingredient of data) {
      const div = document.createElement("div");
      div.setAttribute("onclick", `show('${ingredient}','${name}')`);
      div.textContent = ingredient;
      divOptions.appendChild(div);
    }
    button.appendChild(divOptions);
    return button;
  }
  return { data, dropdownDOM, submenuDOM };
}
