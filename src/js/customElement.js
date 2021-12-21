console.log('custom element');

class MenuItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    // let id = this.getAttribute('menu-id');
    let name = this.getAttribute('menu-name');

    let $li = document.createElement('li');
    $li.classList = "menu-list-item d-flex items-center py-2";

    let $span = document.createElement('span');
    $span.classList = "w-100 pl-2 menu-name";
    $span.textContent = name;
    $li.appendChild($span);

    let $updateBtn = document.createElement('button');
    $updateBtn.classList = "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
    $updateBtn.textContent = "수정";
    $li.appendChild($updateBtn);

    let $removeBtn = document.createElement('button');
    $removeBtn.classList = "bg-gray-50 text-gray-500 text-sm menu-remove-button";
    $removeBtn.textContent = "삭제";
    $li.appendChild($removeBtn);

    this.appendChild($li);
  }
}

customElements.define('menu-item', MenuItem);

export const makeMenuItem = (menu) => {
  let $li = document.createElement('li');
  $li.classList = "menu-list-item d-flex items-center py-2";

  let $span = document.createElement('span');
  $span.classList = `w-100 pl-2 menu-name${menu.enabled ? '' : ' sold-out'}`;
  $span.textContent = menu.name;
  $li.appendChild($span);

  let $toggleBtn = document.createElement('button');
  $toggleBtn.classList = "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button";
  $toggleBtn.textContent = "품절";
  $li.appendChild($toggleBtn);

  let $updateBtn = document.createElement('button');
  $updateBtn.classList = "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
  $updateBtn.textContent = "수정";
  $li.appendChild($updateBtn);

  let $removeBtn = document.createElement('button');
  $removeBtn.classList = "bg-gray-50 text-gray-500 text-sm menu-remove-button";
  $removeBtn.textContent = "삭제";
  $li.appendChild($removeBtn);

  return $li;
}