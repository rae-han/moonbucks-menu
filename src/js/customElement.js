console.log('custom element');

class MenuItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    let id = this.getAttribute('id');
    let name = this.getAttribute('text');

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