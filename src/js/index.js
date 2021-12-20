console.log('javascipt');

import { makeMenuItem } from './customElement.js';

// Elements
const $menuForm = document.querySelector('#menuForm');
const $menuName = document.querySelector('#menuName');
const $menuList = document.querySelector('#menu-list')


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

  let $newMenuList = menuList.map(item => {
    let $item = makeMenuItem(item);
    return $item;
  });

  $menuList.append(...$newMenuList);
}

function addMenu(e) {
  e.preventDefault();
  removeChildElements($menuList);
  console.log(this)

  const menuName = $menuName.value;

  if(menuName === '') return false;

  const menu = {
    enabled: true,
    name: $menuName.value
  }

  // categories = categories.map(category => category.id === selected.category ? { ...category, menu: category.menu.concat(menuName) }  : category);
  categories = categories.map(category => category.id === selected.category ? { ...category, menu: [...category.menu, menu] }  : category);

  $menuName.value = '';

  renderMenuList();
}

$menuForm.addEventListener('submit', addMenu);



