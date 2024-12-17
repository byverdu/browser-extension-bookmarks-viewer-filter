function Hero() {
  return `
    <section class="hero is-small is-link">
      <div class="hero-body">
        <p class="title">
          Bookmarks Viewer-Filter
        </p>
      </div>
    </section>
  `;
}

function SearchBox() {
  return `
    <div class="columns is-1-mobile is-2-tablet">
      <div class="column">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input id="search-bookmark-input" class="input" type="text" placeholder="Type a url, title or a search term" />
          </p>
          <p class="control">
            <button type="button" disabled id="search-bookmark-cta" class="button is-link">
              <span class="icon">
                <i class="fas fa-filter"></i>
              </span>
              <span>Filter</span>
            </button>
          </p>
        </div>
      </div>

      <div class="column">
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <button class="button" title="Card View">
              <span class="icon">
                <i class="fas fa-th-large"></i>
              </span>
            </button>
          </p>
          <p class="control">
            <button class="button" title="List View">
              <span class="icon">
                <i class="fas fa-list"></i>
              </span>
            </button>
          </p>
        </div>
      </div>
    </div>
  `;
}

function Results() {
  return `
    <div id="search-bookmark-results" class="columns is-flex is-flex-wrap-wrap"></div>
  `;
}

export function App() {
  return `
    ${Hero()}
    <div class="container">
      <section class="section pb-4">
        ${SearchBox()}
      </section>
      <section class="section pt-4">
        ${Results()}
      </section>
    </div>
  `;
}
