import { jest } from '@jest/globals';
import { when } from 'jest-when';
import * as api from '../extension/api/index.js';
import utilsRewire from '../extension/scripts/background.js';

jest.mock('../extension/api/index.js');

const sendResponse = jest.fn();
const onMessageCallback = utilsRewire.__get__('onMessageCallback');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('onMessage', () => {
  it('should call console.info if message.type is not defined', () => {
    jest.spyOn(console, 'info');
    onMessageCallback({}, {});

    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('No messages found');
  });

  describe('SET_STORAGE', () => {
    it('should call api.setStorage', async () => {
      jest.spyOn(api.api, 'setStorage');
      onMessageCallback(
        {
          type: api.ACTIONS.SET_STORAGE,
          payload: {
            key: api.EXTENSION_NAME,
            value: [],
          },
        },
        {},
      );

      console.log(api.api.setStorage);

      expect(api.api.setStorage).toHaveBeenCalledTimes(1);
      //   expect(api.api.setStorage).toHaveBeenCalledWith(api.EXTENSION_NAME, []);
    });
  });
  describe.only('GET_STORAGE', () => {
    it('should call api.getStorage', async () => {
      jest.spyOn(api.api, 'getStorage');

      when(api.api.getStorage)
        .calledWith(api.EXTENSION_NAME)
        .mockResolvedValue({ [api.EXTENSION_NAME]: [] });

      await onMessageCallback(
        {
          type: api.ACTIONS.GET_STORAGE,
          payload: {
            value: api.EXTENSION_NAME,
          },
        },
        {},
        sendResponse,
      );

      expect(api.api.getStorage).toHaveBeenCalledTimes(1);
      expect(api.api.getStorage).toHaveBeenCalledWith(api.OPTIONS_ITEM);
      expect(sendResponse).toHaveBeenCalledWith([]);
    });
  });

  describe('REMOVE_ALL_STORAGE', () => {
    it('should call api.setStorage', async () => {
      jest.spyOn(api.api, 'removeStorage');

      onMessageCallback(
        {
          type: api.REMOVE_ALL_STORAGE,
          payload: { value: [api.TABS_ITEM, api.OPTIONS_ITEM] },
        },
        {},
        sendResponse,
      );

      expect(api.api.removeStorage).toHaveBeenCalledTimes(1);
      expect(api.api.removeStorage).toHaveBeenCalledWith([
        api.TABS_ITEM,
        api.OPTIONS_ITEM,
      ]);
    });
  });
});
