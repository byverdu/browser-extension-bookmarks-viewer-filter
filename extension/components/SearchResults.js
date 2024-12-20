const sortBookmarksByDate = action =>
  action.includes('asc')
    ? (a, b) => a.date - b.date
    : (a, b) => b.date - a.date;

export class SearchResults extends HTMLElement {
  static observedAttributes = ['results-length', 'sort'];

  constructor() {
    super();
  }

  get bookmarks() {
    return window.bookmarks ?? [];
  }

  resultsLengthCallback(newValue) {
    if (this.getAttribute('data-api-error')) {
      this.renderError();
    } else {
      const sort = this.getAttribute('sort');
      const bookmarks = this.bookmarks.sort(sortBookmarksByDate(sort));

      Number(newValue) > 0
        ? this.renderResults(bookmarks)
        : this.renderNoResults(this.getAttribute('data-search-term'));
    }
  }

  sortCallback(newValue) {
    this.renderResults(this.bookmarks.sort(sortBookmarksByDate(newValue)));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'results-length' && newValue) {
      this.resultsLengthCallback(newValue);
    }

    if (name === 'sort' && newValue !== oldValue) {
      this.sortCallback(newValue);
    }
  }

  renderResults = bookmarks =>
    (this.innerHTML = bookmarks
      .map(
        ({ date, url, title }) => `
          <div class="column is-one-third">
            <div class="message is-info">
              <div class="message-body">
                <h6 class="is-flex is-align-items-center has-text-primary-20-invert pb-2">
                  <span class="icon">
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                  ${new Date(Number(date)).toLocaleDateString()}
                </h6>
                <p class="has-text-primary-65">
                  <a href="${url}" target="_blank">${title}</a>
                </p>
              </div>
            </div>
          </div>`,
      )
      .join(''));

  renderNoResults = term =>
    (this.innerHTML = `
      <div class="column is-half m-auto">
        <div class="message is-warning">
          <div class="message-body">
            <p class="sub-title has-text-primary-20-invert pb-2">No results found for:</p>
            <code>${term}</code>
          </div>
        </div>
      </div>
    `);

  renderError = () =>
    (this.innerHTML = `
      <div class="column is-full m-auto">
        <div class="message is-danger">
          <div class="message-body">
            <code class="has-text-primary-20-invert">Something went wrong, please try again.</code>
          </div>
        </div>
      </div>
    `);
}
