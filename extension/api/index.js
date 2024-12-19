/**
 * @type {API}
 */ const api = {
  onInstalled: callback => chrome.runtime.onInstalled.addListener(callback),
  onPopupClickListener: () =>
    chrome.action.onClicked.addListener(() => {
      chrome.runtime.openOptionsPage();
    }),
  getStorage: async key => chrome.storage.sync.get(key),
  setStorage: async (key, values) => chrome.storage.sync.set({ [key]: values }),
  sendMessage: async ({ type, payload }) =>
    await chrome.runtime.sendMessage({
      type,
      payload,
    }),
  onMessage: callback => chrome.runtime.onMessage.addListener(callback),
  removeStorage: async key => await chrome.storage.sync.remove(key),
  updateStorage: async (key, value) => {
    try {
      const { [key]: savedLinks } = await chrome.storage.sync.get(key);
      const newLinks = [...savedLinks, value];

      await chrome.storage.sync.set({ [key]: newLinks });
    } catch (e) {
      console.error(e);
    }
  },
  searchBookmarks: async query => {
    try {
      const bookmarks = await chrome.bookdmarks.search(query);

      return bookmarks
        .filter(
          bookmark => bookmark.title && bookmark.url && bookmark.dateAdded,
        )
        .map(bookmark => ({
          url: bookmark.url,
          title: bookmark.title,
          date: bookmark.dateAdded,
        }));
    } catch (e) {
      console.error(e);
    }
  },
};

const EXTENSION_NAME = 'BookmarkViewerFilter';
const ACTIONS = {
  GET_STORAGE: 'GET_STORAGE',
  SET_STORAGE: 'SET_STORAGE',
  REMOVE_STORAGE: 'REMOVE_STORAGE',
  UPDATE_STORAGE: 'UPDATE_STORAGE',
  SEARCH_BOOKMARKS: 'SEARCH_BOOKMARKS',
};

export { api, EXTENSION_NAME, ACTIONS };
