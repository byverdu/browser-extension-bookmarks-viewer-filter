import { when } from 'jest-when';
import * as api from '../extension/api';
import utilsRewire from '../extension/scripts/background.js';

jest.mock('../extension/api');

const sendResponse = jest.fn();
const onMessageCallback = utilsRewire.__get__('onMessageCallback');
const links = [{ id: '123' }];

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

      await onMessageCallback(
        {
          type: api.ACTIONS.SET_STORAGE,
          payload: {
            key: api.EXTENSION_NAME,
            value: links,
          },
        },
        {},
      );

      expect(api.api.setStorage).toHaveBeenCalledTimes(1);
      expect(api.api.setStorage).toHaveBeenCalledWith(
        api.EXTENSION_NAME,
        links,
      );
    });
  });
  describe('GET_STORAGE', () => {
    it('should call api.getStorage', async () => {
      jest.spyOn(api.api, 'getStorage');

      when(api.api.getStorage)
        .calledWith(api.EXTENSION_NAME)
        .mockResolvedValue({ [api.EXTENSION_NAME]: links });

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
      expect(api.api.getStorage).toHaveBeenCalledWith(api.EXTENSION_NAME);
      expect(sendResponse).toHaveBeenCalledWith(links);
    });
  });

  describe('REMOVE_STORAGE', () => {
    it('should call api.setStorage', async () => {
      jest.spyOn(api.api, 'removeStorage');

      onMessageCallback(
        {
          type: api.ACTIONS.REMOVE_STORAGE,
          payload: { value: api.EXTENSION_NAME },
        },
        {},
      );

      expect(api.api.removeStorage).toHaveBeenCalledTimes(1);
      expect(api.api.removeStorage).toHaveBeenCalledWith(api.EXTENSION_NAME);
    });
  });
});
