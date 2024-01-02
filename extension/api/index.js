/**
 * @type {API}
 */ const api = {
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
};

const EXTENSION_NAME = 'VisitedLinks';
const ACTIONS = {
  GET_STORAGE: 'GET_STORAGE',
  SET_STORAGE: 'SET_STORAGE',
  REMOVE_STORAGE: 'REMOVE_STORAGE',
};

export { api, EXTENSION_NAME, ACTIONS };
