console.log('javascipt')

// Elements
const $menuForm = document.querySelector('#menuForm');
const $menuName = document.querySelector('#menuName');

let categories = [
  { 
    id: 'espresso',
    text: '☕ 에스프레소',
    menu: []
  },
  { 
    id: 'frappuccino',
    text: '🥤 프라푸치노',
    menu: []
  },
  { 
    id: 'blended',
    text: '🍹 블렌디드',
    menu: []
  },
  { 
    id: 'teavana',
    text: '🫖 티바나',
    menu: []
  },
  { 
    id: 'desert',
    text: '🍰 디저트s',
    menu: []
  },
];

const selected = {
  category: 'espresso',
}

const addMenu = e => {
  e.preventDefault();

  const menuName = $menuName.value;

  if(menuName === '') return false;

  categories = categories.map(category => category.id === selected.category ? { ...category, menu: category.menu.concat(menuName) }  : category);
  console.log(categories);  

  $menuName.value = '';
}

$menuForm.addEventListener('submit', addMenu);

console.log(addMenu)

