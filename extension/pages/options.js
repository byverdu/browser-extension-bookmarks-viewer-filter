import { renderer } from '../utils/index.js';
import { App } from '../components/index.js';

async function init() {
  try {
    renderer(App());
    window.dispatchEvent(new CustomEvent('appRendered'));
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener('DOMContentLoaded', init);
