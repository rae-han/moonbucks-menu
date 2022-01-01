const $MenuForm = document.querySelector('#menuForm');
const $MenuName = document.querySelector('#menuName');

const addMenu = e => {
  e.preventDefault();

  const newName = $MenuName.value;
  
  $MenuName.value = '';

  console.log(newName);

};

$MenuForm.addEventListener('submit', addMenu);