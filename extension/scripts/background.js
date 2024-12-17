import { api, ACTIONS } from '../api/index.js';

/**
 * @type {API}
 */
const {
  onMessage,
  getStorage,
  setStorage,
  removeStorage,
  onInstalled,
  updateStorage,
  searchBookmarks,
  onPopupClickListener,
} = api;

const {
  GET_STORAGE,
  SET_STORAGE,
  REMOVE_STORAGE,
  UPDATE_STORAGE,
  SEARCH_BOOKMARKS,
} = ACTIONS;

/**
 * @param {APIKey} key
 * @param {VisitedLink[]} values
 */
async function setStorageAsync(key, values) {
  await setStorage(key, values);
}

/**
 * @param {(response: SyncStorage) => void} sendResponse
 * @param {APIKey} key
 */
async function getStorageAsync(sendResponse, key) {
  const items = await getStorage(key);

  sendResponse(items[key]);
}

/**
 * @param {APIKey} key
 */
async function removeStorageAsync(key) {
  await removeStorage(key);
}

/**
 * @param {APIKey} key
 * @param {VisitedLink} value
 */
async function updateStorageAsync(key, value) {
  await updateStorage(key, value);
}

/**
 * @param {(response: Bookmark[]) => void} sendResponse
 * @param {string} query
 */
async function searchBookmarksAsync(sendResponse, query) {
  const bookmarks = await searchBookmarks(query);
  sendResponse(bookmarks);
}

/**
 * @type {OnMsgCallback}
 */
function onMessageCallback(msg, sender, sendResponse) {
  if (sender && msg && msg.type) {
    if (msg.type === SET_STORAGE) {
      /**
       * @type {Payload<VisitedLink[]>}
       */
      const { key, value } = msg.payload;
      setStorageAsync(key, value);
    }

    if (msg.type === GET_STORAGE) {
      /**
       * @type {Payload<unknown>}
       */
      const { key } = msg.payload;
      getStorageAsync(sendResponse, key);

      // make it asynchronously by returning true
      return true;
    }

    if (msg.type === REMOVE_STORAGE) {
      /**
       * @type {Payload<unknown>}
       */
      const { key } = msg.payload;
      removeStorageAsync(key);
    }

    if (msg.type === UPDATE_STORAGE) {
      /**
       * @type {Payload<VisitedLink>}
       */
      const { key, value } = msg.payload;

      updateStorageAsync(key, value);
    }

    if (msg.type === SEARCH_BOOKMARKS) {
      /**
       * @type {Payload<string>}
       */
      searchBookmarksAsync(sendResponse, msg.payload);

      return true;
    }
  } else {
    console.info('No messages found');
  }
}

/**
 * @type {OnInstalledCallback}
 */
function onInstalledCallback() {
  onPopupClickListener();
}

onMessage(onMessageCallback);
onInstalled(onInstalledCallback);
