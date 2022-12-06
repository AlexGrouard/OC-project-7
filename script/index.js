function show(value, index) {
  document.getElementsByClassName(`dropdown-search .${index}`).value = value;
}

let dropdown = document.querySelectorAll(".dropdown");
dropdown.forEach(function (e) {
  e.onclick = function () {
    e.classList.toggle("active");
  };
});
