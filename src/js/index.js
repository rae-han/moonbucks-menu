import { makeMenuItem } from './customElement.js';

// localStorage
const moonbucksStorage = window.localStorage;

// Elements
const $menuForm = document.querySelector('#menuForm');
const $menuName = document.querySelector('#menuName');
const $menuList = document.querySelector('#menu-list');
const $menuSubmitBtn = document.querySelector('#menu-submit-button');
const $menuCount = document.querySelector('.menu-count');
const $categoryNav = document.querySelector('#categoryNav');


let categories = [
  { 
    id: 'espresso',
    text: '☕ 에스프레소',
    menu: [
      { enabled: true, name: 'Espresso' },
      { enabled: false, name: 'Americano' },
      { enabled: true, name: 'Caffè Latte' },
      { enabled: false, name: 'Cappuccino' },
    ]
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

const updateMenu = ({ target }) => {
  if(!target.matches('#menu-list > .menu-list-item > .menu-edit-button')) return;
  // let newName = window.prompt("변경할 메뉴 명을 입력해주세요.");
  let newName = 'modify';

  const menuName = target.parentNode.querySelector('.menu-name').textContent;
  const categoryIndex = categories.findIndex(category => category.id === selected.category);

  categories[categoryIndex].menu = categories[categoryIndex].menu.map(menu => menu.name === menuName ? { ...menu, name: newName } : menu);

  renderMenuList();
}

$menuList.addEventListener('click', updateMenu, () => console.log(1))

const removeMenu = ({ target }) => {
  if(!target.matches('#menu-list > .menu-list-item > .menu-remove-button')) return;
  // if(!window.confirm('메뉴를 삭제 하시겠습니까?')) return;

  const menuName = target.parentNode.querySelector('.menu-name').textContent;
  const categoryIndex = categories.findIndex(category => category.id === selected.category);

  categories[categoryIndex].menu = categories[categoryIndex].menu.filter(menu => menu.name !== menuName);

  renderMenuList();
}
$menuList.addEventListener('click', removeMenu, () => console.log(123))

const showMenuCount = ({ length }) => {
  $menuCount.querySelector('span').textContent = length;
}

const renderMenuList = () => {
  removeChildElements($menuList);

  let menuList = categories.find(category => category.id === selected.category).menu;

  let $newMenuList = menuList.map(item => {
    let $item = makeMenuItem(item, updateMenu);
    return $item;
  });

  $menuList.append(...$newMenuList);
  showMenuCount($newMenuList);
  moonbucksStorage.setItem('categories', JSON.stringify(categories));
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

const selectCategory = ({ target }) => {
  if(!target.matches('#categoryNav > button')) return;
  let categoryName = target.dataset.categoryName;
  selected.category = categoryName;
  renderMenuList();
}
$categoryNav.addEventListener('click', selectCategory);




window.onload = () => {
  const localStorageData = moonbucksStorage.getItem('categories');
  if(localStorageData) {
    categories = JSON.parse(localStorageData);
  }
  renderMenuList();
}



