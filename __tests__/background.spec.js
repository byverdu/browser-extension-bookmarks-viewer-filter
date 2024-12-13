import { when } from 'jest-when';
import * as api from '../extension/api';
import utilsRewire from '../extension/scripts/background.js';

jest.mock('../extension/api');

const sendResponse = jest.fn();
const onMessageCallback = utilsRewire.__get__('onMessageCallback');
const links = [{ url: 'some_url', title: 'some title', date: 0 }];
const {
  api: extApi,
  ACTIONS: { SET_STORAGE, GET_STORAGE, REMOVE_STORAGE, UPDATE_STORAGE },
  EXTENSION_NAME,
} = api;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('onMessageCallback', () => {
  it('should call console.info if message.type is not defined', () => {
    jest.spyOn(console, 'info');
    onMessageCallback({}, {});

    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('No messages found');
  });

  describe('SET_STORAGE', () => {
    it('should call api.setStorage', async () => {
      jest.spyOn(extApi, 'setStorage');

      await onMessageCallback(
        {
          type: SET_STORAGE,
          payload: {
            key: EXTENSION_NAME,
            value: links,
          },
        },
        {},
      );

      expect(extApi.setStorage).toHaveBeenCalledTimes(1);
      expect(extApi.setStorage).toHaveBeenCalledWith(EXTENSION_NAME, links);
    });
  });
  describe('GET_STORAGE', () => {
    it('should call api.getStorage', async () => {
      jest.spyOn(extApi, 'getStorage');

      when(extApi.getStorage)
        .calledWith(EXTENSION_NAME)
        .mockResolvedValue({ [EXTENSION_NAME]: links });

      await onMessageCallback(
        {
          type: GET_STORAGE,
          payload: {
            key: EXTENSION_NAME,
          },
        },
        {},
        sendResponse,
      );

      expect(extApi.getStorage).toHaveBeenCalledTimes(1);
      expect(extApi.getStorage).toHaveBeenCalledWith(EXTENSION_NAME);
      expect(sendResponse).toHaveBeenCalledWith(links);
    });
  });

  describe('REMOVE_STORAGE', () => {
    it('should call api.setStorage', async () => {
      jest.spyOn(extApi, 'removeStorage');

      onMessageCallback(
        {
          type: REMOVE_STORAGE,
          payload: { key: EXTENSION_NAME },
        },
        {},
      );

      expect(extApi.removeStorage).toHaveBeenCalledTimes(1);
      expect(extApi.removeStorage).toHaveBeenCalledWith(EXTENSION_NAME);
    });
  });

  describe('UPDATE_STORAGE', () => {
    it('should call api.setStorage', async () => {
      jest.spyOn(extApi, 'updateStorage');

      await onMessageCallback(
        {
          type: UPDATE_STORAGE,
          payload: { key: EXTENSION_NAME, value: { id: '456' } },
        },
        {},
      );

      expect(extApi.updateStorage).toHaveBeenCalledTimes(1);
      expect(extApi.updateStorage).toHaveBeenCalledWith(EXTENSION_NAME, {
        id: '456',
      });
    });
  });
});
