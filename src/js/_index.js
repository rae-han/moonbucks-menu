import { makeMenuItem, makeCategoryItem } from './customElement.js';

// localStorage
const moonbucksStorage = window.localStorage;

// Elements
const $menuForm = document.querySelector('#menuForm');
const $menuName = document.querySelector('#menuName');
const $menuList = document.querySelector('#menu-list');
const $menuSubmitBtn = document.querySelector('#menu-submit-button');
const $menuCount = document.querySelector('.menu-count');
const $categoryNav = document.querySelector('#categoryNav');
const $currentCategory = document.querySelector('#currentCategory');


let categories = [
  { 
    id: 'espresso',
    text: '☕ 에스프레소',
    menu: [
      { isSoldOut: true, name: 'Espresso' },
      { isSoldOut: false, name: 'Americano' },
      { isSoldOut: true, name: 'Caffè Latte' },
      { isSoldOut: false, name: 'Cappuccino' },
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
    text: '🍰 디저트',
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
$menuList.addEventListener('click', removeMenu)

const toggleMenuEnable = ({ target }) => {
  if(!target.matches('#menu-list > .menu-list-item > .menu-sold-out-button')) return;

  const menuName = target.parentNode.querySelector('.menu-name').textContent;
  const categoryIndex = categories.findIndex(category => category.id === selected.category);

  categories[categoryIndex].menu = categories[categoryIndex].menu.map(menu => menu.name === menuName ? { ...menu, isSoldOut: !menu.isSoldOut } : menu);

  console.log(categories[categoryIndex]);

  renderMenuList();
}
$menuList.addEventListener('click', toggleMenuEnable)


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
    isSoldOut: true,
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

  $currentCategory.textContent = categories.find(category => category.id === categoryName).text;
}
$categoryNav.addEventListener('click', selectCategory);

const renderCategoryList = () => {
  let categoryList = categories.map(category => makeCategoryItem(category));

  $categoryNav.append(...categoryList);
}

window.onload = () => {
  const localStorageData = moonbucksStorage.getItem('categories');
  if(localStorageData) {
    categories = JSON.parse(localStorageData);
  }
  renderCategoryList();
  renderMenuList();
}



