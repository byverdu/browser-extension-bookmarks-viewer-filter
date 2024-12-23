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

    const template = document.getElementById('search-box-template');
    const content = template.content.cloneNode(true);

    this.appendChild(content);
  }

  get input() {
    return this._internals.form.querySelector('input');
  }

  get button() {
    return this._internals.form.querySelector('button');
  }

  connectedCallback() {
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
    let messageType = '';

    try {
      const res = await sendMessage({
        type: ACTIONS.SEARCH_BOOKMARKS,
        payload: this.input.value,
      });

      window.bookmarks = res;
      messageType = res.length ? 'info' : 'warning';

      results.setAttribute('search-term', this.input.value);
      results.setAttribute('results-length', res.length);
      results.setAttribute('message-type', messageType);

      document
        .getElementById('toolbar')
        .setAttribute('disabled', res.length === 0);
    } catch (e) {
      results.setAttribute('message-type', 'error');

      console.error(e);
    }
  }
}
