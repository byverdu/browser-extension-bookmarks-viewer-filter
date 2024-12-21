export class SortButton extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('sort-button-template');
    const content = template.content.cloneNode(true);

    this.appendChild(content);
  }

  get sortDescending() {
    return this.parentElement.getAttribute('sort') === 'desc';
  }

  get isDisabled() {
    return this.parentElement.getAttribute('disabled') === 'true';
  }

  connectedCallback() {
    const button = this.querySelector('button');
    const icon = this.querySelector('i');
    const sortIcon = this.sortDescending
      ? 'fa-sort-numeric-down'
      : 'fa-sort-numeric-up';

    if (!button || !icon) return;

    button.addEventListener('click', this.clickHandler.bind(this));
    button.toggleAttribute('disabled', this.isDisabled);

    icon.classList.add(sortIcon);
  }

  clickHandler() {
    const newSort = this.sortDescending ? 'asc' : 'desc';

    document.getElementById('search-results').setAttribute('sort', newSort);
    this.parentElement.setAttribute('sort', newSort);
  }
}

export class Toolbar extends HTMLElement {
  static observedAttributes = ['disabled', 'sort'];

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setAttribute('disabled', 'true');
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <x-sort-buttons class="field is-grouped is-grouped-right"></x-sort-buttons>
    `;
  }
}
