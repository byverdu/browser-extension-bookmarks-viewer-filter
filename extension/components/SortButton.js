export class SortButton extends HTMLElement {
  constructor() {
    super();
  }

  get isDisabled() {
    return this.parentElement.getAttribute('disabled') === 'true';
  }

  get sortDescending() {
    const searchResults = document.getElementById('search-results');
    const sort = searchResults.getAttribute('sort') ?? 'asc';

    return sort === 'desc';
  }

  connectedCallback() {
    this.render();

    const button = this.querySelector('button');

    if (!button) return;

    button.addEventListener('click', this.clickHandler.bind(this));
    button.toggleAttribute('disabled', this.isDisabled);
  }

  clickHandler() {
    const newSort = this.sortDescending ? 'asc' : 'desc';
    const sortIcon =
      newSort === 'desc' ? 'fa-sort-numeric-down' : 'fa-sort-numeric-up';
    const icon = this.querySelector('i');

    icon.className = `fas ${sortIcon}`;

    document.getElementById('search-results').setAttribute('sort', newSort);
  }

  render() {
    const template = document.getElementById('sort-button-template');
    const content = template.content.cloneNode(true);

    this.className = 'field is-grouped is-grouped-right';
    this.appendChild(content);
  }
}
