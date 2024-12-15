function Hero() {
  return `
    <section class="hero is-small is-info">
      <div class="hero-body">
        <p class="title">
          Bookmark Manager
        </p>
        <p class="subtitle">
          Search and manage your bookmarks
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
            <input class="input" type="text" placeholder="Enter a bookmarked url" />
          </p>
          <p class="control">
            <button class="button is-info">
              <span class="icon">
                <i class="fas fa-search"></i>
              </span>
              <span>Search</span>
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
    <div class="columns is-multiline">
      <div class="column is-one-third">
        <div class="card is-shadowless">
          <div class="card-content">
            <p class="title is-4">Bookmark Title</p>
            <p class="subtitle is-6">bookmark.url.com</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function App() {
  return `
    ${Hero()}
    <div class="container">
      <section class="section">
        ${SearchBox()}
        ${Results()}
      </section>
    </div>
  `;
}
