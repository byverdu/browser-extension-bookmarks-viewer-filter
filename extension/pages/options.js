import { renderer } from '../utils/index.js';

async function init() {
  try {
    renderer('<h1>Hello World</h1>');
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener('DOMContentLoaded', init);
