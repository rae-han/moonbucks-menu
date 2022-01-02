function MenuItem({id, name, isSoldOut}) {
  // this.template = document.createElement('template');
  // const style = document.createElement('style');
  // style.textContent = stylesheet;

  let $li = document.createElement('li');
  $li.setAttribute('class', "menu-list-item d-flex items-center py-2");

  let $span = document.createElement('span');
  $span.setAttribute('class', `w-100 pl-2 menu-name ${isSoldOut ? 'sold-out' : ''}`);
  $span.textContent = name;
  $li.appendChild($span);

  let $toggleBtn = document.createElement('button');
  $toggleBtn.setAttribute('class', "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button");
  $toggleBtn.textContent = "품절";
  $li.appendChild($toggleBtn);

  let $updateBtn = document.createElement('button');
  $updateBtn.setAttribute('class', "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button");
  $updateBtn.textContent = "수정";
  $li.appendChild($updateBtn);

  let $removeBtn = document.createElement('button');
  $removeBtn.setAttribute('class', "bg-gray-50 text-gray-500 text-sm menu-remove-button");
  $removeBtn.textContent = "삭제";
  $li.appendChild($removeBtn);

  this.appendChild($li);
}

export default MenuItem;