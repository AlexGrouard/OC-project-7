function show(value) {
  document.querySelector(".search").value = value;
}

let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
};
