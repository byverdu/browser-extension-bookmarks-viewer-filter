import { when } from 'jest-when';
import { api } from '../extension/api';
import { chrome } from 'jest-chrome';

const { setStorage, getStorage, sendMessage, onMessage, removeStorage } = api;

const links = [{ id: '123' }];
const linksStorage = { links };

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    when(chrome.storage.local.get)
      .calledWith('links')
      .mockResolvedValue(linksStorage);
  });

  describe('setStorage', () => {
    it('should be defined', () => {
      expect(setStorage).toBeInstanceOf(Function);
    });

    it('should call chrome.storage.local.set', async () => {
      await setStorage('links', links);

      expect(chrome.storage.local.set).toHaveBeenCalledTimes(1);
      expect(chrome.storage.local.set).toHaveBeenCalledWith(linksStorage);
    });

    it('should set the sync storage', async () => {
      await setStorage('links', links);

      await expect(chrome.storage.local.get('links')).resolves.toEqual(
        linksStorage,
      );
    });
  });

  describe('getStorage', () => {
    it('should be defined', () => {
      expect(getStorage).toBeInstanceOf(Function);
    });

    it('should call chrome.storage.local.get', async () => {
      await getStorage('links');

      expect(chrome.storage.local.get).toHaveBeenCalledTimes(1);
      expect(chrome.storage.local.get).toHaveBeenCalledWith('links');
    });

    it('should get the storage for the given key, "links"', async () => {
      await expect(getStorage('links')).resolves.toEqual(linksStorage);
    });

    it('should get the storage for the given key, "crabs"', async () => {
      await expect(getStorage('crabs')).resolves.toEqual(undefined);
    });
  });

  describe('sendMessage', () => {
    it('should be defined', () => {
      expect(sendMessage).toBeInstanceOf(Function);
    });

    it('should call chrome.runtime.sendMessage', async () => {
      await sendMessage({
        type: 'SET_STORAGE',
        payload: [],
      });

      expect(chrome.runtime.sendMessage).toHaveBeenCalledTimes(1);
      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        type: 'SET_STORAGE',
        payload: [],
      });
    });
  });

  describe('onMessage', () => {
    it('should be defined', () => {
      expect(onMessage).toBeInstanceOf(Function);
    });

    it('should call chrome.runtime.onMessage', () => {
      const listenerSpy = jest.fn();
      const sendResponseSpy = jest.fn();

      onMessage(listenerSpy);

      expect(listenerSpy).not.toBeCalled();
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
    it('should be defined', () => {
      expect(removeStorage).toBeInstanceOf(Function);
    });

    it('should call chrome.storage.sync.remove', async () => {
      await removeStorage('links');

      expect(chrome.storage.sync.remove).toHaveBeenCalledTimes(1);
      expect(chrome.storage.sync.remove).toHaveBeenCalledWith('links');
    });
  });
});
