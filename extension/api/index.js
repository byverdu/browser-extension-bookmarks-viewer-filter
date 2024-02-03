/**
 * @type {API}
 */ const api = {
  onInstalled: callback => chrome.runtime.onInstalled.addListener(callback),
  getStorage: async key => chrome.storage.local.get(key),
  setStorage: async (key, values) =>
    chrome.storage.local.set({ [key]: values }),
  sendMessage: async ({ type, payload }) =>
    await chrome.runtime.sendMessage({
      type,
      payload,
    }),
  onMessage: callback => chrome.runtime.onMessage.addListener(callback),
  removeStorage: async key => await chrome.storage.sync.remove(key),
  updateStorage: async (key, value) => {
    const { [key]: savedLinks } = await chrome.storage.local.get(key);
    const newLinks = [...savedLinks, value];

    await chrome.storage.local.set({ [key]: newLinks });
  },
  createContextMenu: ({ title, contexts, id }) => {
    chrome.contextMenus.create({
      id,
      title,
      contexts,
    });
  },
  //Extensions using event pages or Service Workers cannot pass an onclick parameter to chrome.contextMenus.create.
  // Instead, use the chrome.contextMenus.onClicked event.
  contextMenuOnClick: callback =>
    chrome.contextMenus.onClicked.addListener(callback),
};

const EXTENSION_NAME = 'VisitedLinks';
const EXTENSION_OPTIONS = 'VisitedLinksOptions';
const ACTIONS = {
  GET_STORAGE: 'GET_STORAGE',
  SET_STORAGE: 'SET_STORAGE',
  REMOVE_STORAGE: 'REMOVE_STORAGE',
  UPDATE_STORAGE: 'UPDATE_STORAGE',
};

export { api, EXTENSION_NAME, ACTIONS, EXTENSION_OPTIONS };
