import { api, ACTIONS } from '../api/index.js';

/**
 * @type {API}
 */
const { sendMessage } = api;

export class SearchBox extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  get input() {
    return this._internals.form.querySelector('input');
  }

  get button() {
    return this._internals.form.querySelector('button');
  }

  connectedCallback() {
    this.render();

    this.input.addEventListener('keyup', this.keyUpHandler.bind(this));
    this._internals.form.addEventListener(
      'submit',
      this.submitHandler.bind(this),
    );
  }

  keyUpHandler(e) {
    if (e.key === 'Enter') {
      this.submitHandler(e);
    }

    this.button.disabled = e.target.value.length === 0;
  }

  async submitHandler(e) {
    e.preventDefault();

    const results = document.getElementById('search-results');

    try {
      const res = await sendMessage({
        type: ACTIONS.SEARCH_BOOKMARKS,
        payload: this.input.value,
      });

      window.bookmarks = res;

      results.setAttribute('data-search-term', this.input.value);
      results.setAttribute('results-length', res.length);

      document
        .getElementById('toolbar')
        .setAttribute('disabled', res.length === 0);
    } catch (e) {
      results.setAttribute('data-api-error', true);
      results.setAttribute('results-length', null);

      console.error(e);
    }
  }

  render() {
    this.innerHTML = `
      <p class="control is-expanded">
        <input id="search-bookmark-input" class="input" type="text" placeholder="Type a url, title or a search term" />
      </p>
      <p class="control">
        <button type="submit" disabled id="search-bookmark-cta" class="button is-link">
          <span class="icon">
            <i class="fas fa-filter"></i>
          </span>
          <span>Filter</span>
        </button>
      </p>
    `;
  }
}
