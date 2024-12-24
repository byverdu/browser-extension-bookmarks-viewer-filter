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
