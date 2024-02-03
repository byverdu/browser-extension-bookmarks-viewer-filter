import { api, EXTENSION_NAME, EXTENSION_OPTIONS } from '../api/index.js';
import { renderer } from '../utils/index.js';

/**
 * @type {API}
 **/
const { getStorage } = api;

/**
 * @returns {VisitedLink[]}
 */
async function fetchStorage() {
  const { [EXTENSION_NAME]: savedLinks } = await getStorage(EXTENSION_NAME);

  return savedLinks;
}

/**
 * @returns {Options}
 */
async function getOptions() {
  const {
    [EXTENSION_OPTIONS]: { sort },
  } = await getStorage(EXTENSION_OPTIONS);

  return sort;
}

function contentBuilder(content) {
  return `<div><h1>Saved Links</h1><ul class="mui-list--unstyled">${content}</ul></div>`;
}

/**
 * @param {VisitedLink[]} savedLinks
 * @param {'asc' | 'desc'} sortOrder
 */
function listItemBuilder(savedLinks, sortOrder) {
  const emptyLink = '<li>No links saved</li>';
  const sortCallback = (a, b) =>
    sortOrder === 'asc' ? a.date - b.date : b.date - a.date;

  return `${
    savedLinks.length
      ? savedLinks
          .sort(sortCallback)
          .map(
            ({ title, link, date }) =>
              `<li style="padding: 4px;"><a href="${link}">${title}</a> visited on ${new Date(
                date,
              ).toUTCString()}</li>`,
          )
          .join('')
      : emptyLink
  }`;
}

async function init() {
  try {
    const savedLinks = await fetchStorage();
    const sortOrder = await getOptions();
    const liContent = listItemBuilder(savedLinks, sortOrder);
    const html = contentBuilder(liContent);

    renderer(html);
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener('DOMContentLoaded', init);
