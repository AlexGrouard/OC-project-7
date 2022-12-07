function show(value, id) {
  document.querySelector(`#${id}`).value = value;
}

let dropdown = document.querySelectorAll(".dropdown");
dropdown.forEach(function (e) {
  e.onclick = function () {
    e.classList.toggle("active");
  };
});
