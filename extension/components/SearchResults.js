const sortBookmarksByDate = action =>
  action.includes('asc')
    ? (a, b) => a.date - b.date
    : (a, b) => b.date - a.date;

export class SearchResults extends HTMLElement {
  static observedAttributes = ['results-length', 'sort', 'message-type'];

  constructor() {
    super();
  }

  get bookmarks() {
    return window.bookmarks ?? [];
  }

  attributeChangedCallback() {
    const messageType = this.getAttribute('message-type');

    if (messageType === 'info') {
      this.renderResults(
        this.bookmarks.sort(sortBookmarksByDate(this.getAttribute('sort'))),
      );
    }

    if (messageType === 'warning') {
      this.renderNoResults();
    }

    if (messageType === 'error') {
      this.renderError();
    }
  }

  renderResults(bookmarks) {
    this.innerHTML = '';

    bookmarks.forEach(bookmark => {
      const searchResult = document.createElement('x-search-result');

      this.appendChild(searchResult);

      searchResult.setAttribute('title', bookmark.title);
      searchResult.setAttribute('date', bookmark.date);
      searchResult.setAttribute('url', bookmark.url);
    });
  }

  renderNoResults = () => {
    this.innerHTML = '';

    const searchResult = document.createElement('x-search-result');

    this.appendChild(searchResult);

    searchResult.querySelector('slot[name="term"]').textContent =
      this.getAttribute('search-term');
  };

  renderError = () => {
    this.innerHTML = '';

    const searchResult = document.createElement('x-search-result');

    this.appendChild(searchResult);
  };
}
