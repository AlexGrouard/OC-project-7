function addTags(value, id) {
  const tagBar = document.querySelector('.tag-bar');
  const divTag = document.createElement('div');
  const alreadyTagged = document.querySelectorAll('.tag');

  divTag.classList.add('tag');
  switch (id) {
    case 'Ingredients':
      divTag.classList.add('Itag');
      break;
    case 'Appareils':
      divTag.classList.add('Atag');
      break;
    case 'Ustensiles':
      divTag.classList.add('Utag');
      break;
  }
  divTag.textContent = value;
  const imgTag = document.createElement('img');
  imgTag.classList.add('closeTag');
  imgTag.src = './assets/images/cross.svg';
  imgTag.alt = ' ';
  imgTag.setAttribute('onclick', "toggleClass('.closeTag','close')");
  tagBar.appendChild(divTag);
  divTag.appendChild(imgTag);

  // check if tag already exist
  alreadyTagged.forEach((tag) => {
    if (tag.textContent === value) {
      alert('Tag déjà existant');
      divTag.remove();
    }
  });
}
