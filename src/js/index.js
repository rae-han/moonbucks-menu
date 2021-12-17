const category = [
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

const selectedOption = {
  category: 'espresso',
}

const addMenu = e => {
  e.preventDefault();
  e.stopPropagation();
  console.log('add: menu');
}

