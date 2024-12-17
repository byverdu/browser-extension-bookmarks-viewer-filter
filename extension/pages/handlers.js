import { api, ACTIONS } from '../api/index.js';

/**
 * @type {API}
 */
const { sendMessage } = api;

const template = `
  <div class="column is-one-third">
    <div class="message is-info">
      <div class="message-body">
        <h6 class="is-flex is-align-items-center has-text-primary-20-invert pb-2">
          <span class="icon">
            <i class="fas fa-calendar-alt"></i>
          </span>
          {{date}}
        </h6>
        <p class="has-text-primary-65">
          <a href="{{url}}" target="_blank">{{title}}</a>
        </p>
      </div>
    </div>
  </div>
`;

const noResultsTemplate = `<div class="column is-half m-auto">
    <div class="message is-warning">
      <div class="message-body">
        <p class="sub-title has-text-primary-20-invert pb-2">No results found for:</p>
        <code>{{term}}</code>
        </div>
    </div>
  </div>`;

const searchBookmarkClickHandler = async (input, results) => {
  sendMessage({
    type: ACTIONS.SEARCH_BOOKMARKS,
    payload: input.value || 'jira',
  }).then(res => {
    if (!res.length) {
      results.innerHTML = noResultsTemplate.replace('{{term}}', input.value);
    } else {
      const html = res.map(bookmark =>
        template
          .replace('{{url}}', bookmark.url)
          .replace('{{title}}', bookmark.title)
          .replace('{{date}}', new Date(bookmark.date).toLocaleDateString()),
      );

      results.innerHTML = html.join('');
    }
  });
};

const inputKeyUpHandler = (e, searchBookmark) => {
  if (e.key === 'Enter') {
    searchBookmark.click();
  }
};

window.addEventListener('appRendered', () => {
  const searchBookmark = document.getElementById('search-bookmark-cta');
  const input = document.getElementById('search-bookmark-input');
  const results = document.getElementById('search-bookmark-results');

  input.addEventListener('keyup', e => inputKeyUpHandler(e, searchBookmark));
  searchBookmark.addEventListener(
    'click',
    async () => await searchBookmarkClickHandler(input, results),
  );
});
