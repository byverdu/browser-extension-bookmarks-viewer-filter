import { api, EXTENSION_NAME } from '../api/index.js';
import { renderer } from '../utils/DOMHelpers.js';

/**
 *
 * @returns {VisitedLink[]}
 */
async function fetchStorage() {
  const { [EXTENSION_NAME]: savedLinks } = await api.getStorage(EXTENSION_NAME);

  return savedLinks;
}

/**
 * @param {VisitedLink[]} savedLinks
 */
function listBuilder(savedLinks) {
  const emptyLink = '<li>No links saved</li>';

  return `<ul>${
    savedLinks.length
      ? savedLinks
          .map(
            ({ title, link, date }) =>
              `<li><a href="${link}">${title}</a> visited on ${new Date(
                date,
              ).toUTCString()}</li>`,
          )
          .join('')
      : emptyLink
  }</ul>`;
}

async function init() {
  try {
    const data = await fetchStorage();
    const html = listBuilder(data);
    renderer(html);
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener('DOMContentLoaded', init);
