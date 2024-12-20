export class SortButtons extends HTMLElement {
  constructor() {
    super();
  }

  get sort() {
    return this.parentElement.getAttribute('sort');
  }

  get disabled() {
    return this.parentElement.getAttribute('disabled');
  }

  connectedCallback() {
    this.render();

    this.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', this.clickHandler.bind(this));
    });
  }

  clickHandler() {
    const sort = this.sort === 'desc' ? 'asc' : 'desc';

    document.getElementById('search-results').setAttribute('sort', sort);
    this.parentElement.setAttribute('sort', sort);
  }

  render() {
    const disabled = this.disabled === 'true' ? 'disabled' : '';
    const sort =
      this.sort === 'desc' ? 'fa-sort-numeric-down' : 'fa-sort-numeric-up';

    this.innerHTML = `
  		<p class="control">
  			<button ${disabled} data-sort="desc" class="button" title="Sort Descending">
  				<span class="icon">
  					<i class="fas ${sort}"></i>
  				</span>
  			</button>
  		</p>
    `;
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
