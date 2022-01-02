import { addMenu, fetchMenu } from '../api/menu.js'

import MenuItem from './components/MenuItem.js';

const $MenuForm = document.querySelector('#menuForm');
const $MenuName = document.querySelector('#menuName');
const $MenuList = document.querySelector('#menuList');

const current = {
  category: 'espresso'
}

async function addMenuItem(e) {
  e.preventDefault();

  const newName = $MenuName.value;
  
  $MenuName.value = '';
  
  console.log(newName);
  try {
    let res =  await addMenu({ category: current.category, name: newName});
    console.log(res)
    if(!res.ok) { return false; }

    let resJson = await res.json();
    const menuItem = new MenuItem(resJson);
    console.log(menuItem)


  } catch (error) {
    
  }
  

};

async function fetchMenuList() {
  try {
    let res = await fetchMenu(current.category);
    console.log(res);
    if(!res.ok) { return false; }

    const menuList = await res.json();
    console.log(1, menuList)
    const menuItemList = menuList.map(menu => { 
      console.log(new MenuItem(menu))
      return new MenuItem(menu)
    });
    console.log(2, menuItemList);
    menuItemList.forEach(menu => {
      console.log(menu);
    })

  } catch (error) {
    
  }
}

$MenuForm.addEventListener('submit', addMenuItem);

window.onload = () => {
  fetchMenuList(current.category);
}