import { api, EXTENSION_OPTIONS } from '../api/index.js';
import { renderer } from '../utils/index.js';

/**
 * @type {API}
 **/
const { setStorage, getStorage } = api;

/**
 * @param {Options} sort
 */
async function setOptions({ sort }) {
  await setStorage(EXTENSION_OPTIONS, { sort });
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

/**
 * @param {Event} event
 */
async function handleOptionsChange(event) {
  const { value } = event.target;

  await setOptions({ sort: value });
}

function contentBuilder(content) {
  return `<div><h1>Options</h1><form><fieldset><legend class="mui--text-light-secondary">Choose sorting order</legend>${content}</fieldset></form></div>`;
}

/**
 * @param {'asc' | 'desc'} option
 */
function buildOptions(savedOption) {
  const options = ['asc', 'desc'].map(
    option =>
      `<div class="mui-checkbox">
        <input id="${option}" type="radio" name="sort" value="${option}" ${
          savedOption === option ? 'checked' : ''
        } />
        <label for="${option}">${option}</label>
      </div>`,
  );

  return contentBuilder(options.join(''));
}

async function init() {
  try {
    const data = await getOptions();
    const html = buildOptions(data);
    renderer(html);

    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', handleOptionsChange);
    });
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener('DOMContentLoaded', init);
