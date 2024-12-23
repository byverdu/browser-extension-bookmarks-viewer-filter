import {
  SearchBox,
  SearchResult,
  SearchResults,
  SortButton,
  Toolbar,
} from '../components/index.js';

window.addEventListener('DOMContentLoaded', () => {
  customElements.define('x-search-result', SearchResult);
  customElements.define('x-search-results', SearchResults);
  customElements.define('x-search-box', SearchBox);
  customElements.define('x-toolbar', Toolbar);
  customElements.define('x-sort-button', SortButton);
});
