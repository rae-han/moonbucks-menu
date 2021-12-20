console.log('javascipt');

import { makeMenuItem } from './customElement.js';

// Elements
const $menuForm = document.querySelector('#menuForm');
const $menuName = document.querySelector('#menuName');
let $menuList = document.querySelector('#menu-list')


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

const removeChildElements = $el => {
  while($el.hasChildNodes()) {
    $el.removeChild($el.firstChild);
  }
}

const renderMenuList = () => {
  let menuList = categories.find(category => category.id === selected.category).menu;
  console.log(menuList);

  let $newMenuList = menuList.map(item => {
    console.log(item)
    let $item = makeMenuItem(item);
    return $item;
  });

  console.log($menuList);
  console.log($newMenuList);

  $menuList.append(...$newMenuList);
}

const addMenu = e => {
  e.preventDefault();
  removeChildElements($menuList);

  const menuName = $menuName.value;

  if(menuName === '') return false;

  categories = categories.map(category => category.id === selected.category ? { ...category, menu: category.menu.concat(menuName) }  : category);

  $menuName.value = '';

  renderMenuList();
}
$menuForm.addEventListener('submit', addMenu);



