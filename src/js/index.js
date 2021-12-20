console.log('javascipt');

import { makeMenuItem } from './customElement.js';

// Elements
const $menuForm = document.querySelector('#menuForm');
const $menuName = document.querySelector('#menuName');
const $menuList = document.querySelector('#menu-list');
const $menuSubmitBtn = document.querySelector('#menu-submit-button');
const $menuCount = document.querySelector('.menu-count');


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

const updateMenu = menu => {
  let newName = window.prompt("변경할 메뉴 명을 입력해주세요.");
  menu.name = newName;
  renderMenuList();
}

const removeMenu = menu => {
  let canRemove = window.confirm("메뉴를 삭제 하시겠습니까?");
  
  if(!canRemove) return false;

  const index = categories.findIndex(category => category.id === selected.category);
  categories[index].menu;
  const newMenu = categories[index].menu.filter(menuItem => menuItem.name !== menu.name);
  categories[index].menu = newMenu;
  renderMenuList();
}

const removeMenuDelegation = ({ target }) => {
  console.log(target);
}

const showMenuCount = ({ length }) => {
  $menuCount.querySelector('span').textContent = length;
}

const renderMenuList = () => {
  removeChildElements($menuList);

  let menuList = categories.find(category => category.id === selected.category).menu;

  let $newMenuList = menuList.map(item => {
    let $item = makeMenuItem(item, updateMenu, removeMenu);
    return $item;
  });

  $menuList.append(...$newMenuList);
  showMenuCount($newMenuList);
}

function addMenu(e) {
  e.preventDefault();

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
$menuSubmitBtn.addEventListener('click', addMenu);



