import { when } from 'jest-when';
import { api, EXTENSION_NAME, ACTIONS } from '../extension/api';
import { chrome } from 'jest-chrome';

const {
  setStorage,
  getStorage,
  sendMessage,
  onMessage,
  removeStorage,
  onInstalled,
  updateStorage,
} = api;

const links = [{ id: '123' }];
const linksStorage = { [EXTENSION_NAME]: links };

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    when(chrome.storage.local.get)
      .calledWith(EXTENSION_NAME)
      .mockResolvedValue(linksStorage);
  });

  describe('setStorage', () => {
    it('should call chrome.storage.local.set', async () => {
      await setStorage(EXTENSION_NAME, links);

      expect(chrome.storage.local.set).toHaveBeenCalledTimes(1);
      expect(chrome.storage.local.set).toHaveBeenCalledWith(linksStorage);
    });

    it('should set the sync storage', async () => {
      await setStorage(EXTENSION_NAME, links);

      await expect(chrome.storage.local.get(EXTENSION_NAME)).resolves.toEqual(
        linksStorage,
      );
    });
  });

  describe('getStorage', () => {
    it('should call chrome.storage.local.get', async () => {
      await getStorage(EXTENSION_NAME);

      expect(chrome.storage.local.get).toHaveBeenCalledTimes(1);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(EXTENSION_NAME);
    });

    it('should get the storage for the given key, "links"', async () => {
      await expect(getStorage(EXTENSION_NAME)).resolves.toEqual(linksStorage);
    });

    it('should get the storage for the given key, "crabs"', async () => {
      await expect(getStorage('crabs')).resolves.toEqual(undefined);
    });
  });

  describe('sendMessage', () => {
    it('should call chrome.runtime.sendMessage', async () => {
      await sendMessage({
        type: ACTIONS.SET_STORAGE,
        payload: [],
      });

      expect(chrome.runtime.sendMessage).toHaveBeenCalledTimes(1);
      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        type: ACTIONS.SET_STORAGE,
        payload: [],
      });
    });
  });

  describe('onMessage', () => {
    it('should call chrome.runtime.onMessage', () => {
      const listenerSpy = jest.fn();
      const sendResponseSpy = jest.fn();

      onMessage(listenerSpy);

      expect(listenerSpy).not.toHaveBeenCalled();
      expect(chrome.runtime.onMessage.hasListeners()).toBe(true);

      chrome.runtime.onMessage.callListeners(
        { greeting: 'hello' }, // message
        {}, // MessageSender object
        sendResponseSpy, // SendResponse function
      );

      expect(listenerSpy).toHaveBeenCalledWith(
        { greeting: 'hello' },
        {},
        sendResponseSpy,
      );
      expect(sendResponseSpy).not.toHaveBeenCalled();
    });
  });

  describe('removeStorage', () => {
    it('should call chrome.storage.sync.remove', async () => {
      await removeStorage(EXTENSION_NAME);

      expect(chrome.storage.sync.remove).toHaveBeenCalledTimes(1);
      expect(chrome.storage.sync.remove).toHaveBeenCalledWith(EXTENSION_NAME);
    });
  });

  describe('onInstalled', () => {
    it('should call chrome.runtime.onInstalled', async () => {
      const listenerSpy = jest.fn();

      onInstalled(listenerSpy);

      expect(listenerSpy).not.toHaveBeenCalled();
      expect(chrome.runtime.onInstalled.hasListeners()).toBe(true);

      chrome.runtime.onInstalled.callListeners({ reason: 'install' });

      expect(listenerSpy).toHaveBeenCalledWith({ reason: 'install' });
    });
  });

  describe('updateStorage', () => {
    it('should call chrome.storage.sync.remove', async () => {
      await updateStorage(EXTENSION_NAME, { id: '456' });

      expect(chrome.storage.local.get).toHaveBeenCalledTimes(1);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(EXTENSION_NAME);

      expect(chrome.storage.local.set).toHaveBeenCalledTimes(1);
      expect(chrome.storage.local.set).toHaveBeenCalledWith({
        [EXTENSION_NAME]: [{ id: '123' }, { id: '456' }],
      });
    });
  });

  describe('createContextMenu', () => {
    it('should call chrome.contextMenus.create', () => {
      const title = 'some title';
      const contexts = ['page'];
      const id = 'some_id';

      api.createContextMenu({ title, onclick, contexts, id });

      expect(chrome.contextMenus.create).toHaveBeenCalledTimes(1);
      expect(chrome.contextMenus.create).toHaveBeenCalledWith({
        id,
        title,
        contexts,
      });
    });
  });

  describe('contextMenuOnClick', () => {
    it('should call chrome.contextMenus.onClicked', () => {
      const listenerSpy = jest.fn();

      api.contextMenuOnClick(listenerSpy);

      expect(listenerSpy).not.toHaveBeenCalled();
      expect(chrome.contextMenus.onClicked.hasListeners()).toBe(true);

      chrome.contextMenus.onClicked.callListeners();

      expect(listenerSpy).toHaveBeenCalledTimes(1);
    });
  });
});
