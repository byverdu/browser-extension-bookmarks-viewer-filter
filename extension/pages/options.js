import { renderer } from '../utils/index.js';
import { App } from '../components/index.js';

async function init() {
  try {
    renderer(App());
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener('DOMContentLoaded', init);
