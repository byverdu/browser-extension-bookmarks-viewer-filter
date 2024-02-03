import { when } from 'jest-when';
import * as api from '../extension/api';
import utilsRewire from '../extension/pages/popup.js';

jest.mock('../extension/api');

const fetchStorage = utilsRewire.__get__('fetchStorage');
const listBuilder = utilsRewire.__get__('listBuilder');
const init = utilsRewire.__get__('init');
const links = [{ title: 'some link', link: 'some_link', date: 0 }];
const { api: extApi, EXTENSION_NAME, EXTENSION_OPTIONS } = api;
const emptyLinkHtml = '<ul><li>No links saved</li></ul>';
const savedLinksHtml =
  '<ul><li><a href="some_link">some link</a> visited on Thu, 01 Jan 1970 00:00:00 GMT</li></ul>';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchStorage', () => {
  it('should call api.getStorage', async () => {
    when(extApi.getStorage)
      .calledWith(EXTENSION_NAME)
      .mockResolvedValue({ [EXTENSION_NAME]: links });

    const result = await fetchStorage();

    expect(extApi.getStorage).toHaveBeenCalledTimes(1);
    expect(extApi.getStorage).toHaveBeenCalledWith(EXTENSION_NAME);
    expect(result).toEqual(links);
  });
});

describe('listBuilder', () => {
  it('should handle empty links', () => {
    expect(listBuilder([])).toEqual(emptyLinkHtml);
  });
  it('should return html for saved links', () => {
    expect(listBuilder(links)).toEqual(savedLinksHtml);
  });
});

describe('init', () => {
  document.body.insertAdjacentHTML('afterbegin', '<div id="root"></div>');

  it('should handle empty links', async () => {
    when(extApi.getStorage)
      .calledWith(EXTENSION_NAME)
      .mockResolvedValue({ [EXTENSION_NAME]: [] });
    when(extApi.getStorage)
      .calledWith(EXTENSION_OPTIONS)
      .mockResolvedValue({ [EXTENSION_OPTIONS]: { sort: 'asc' } });

    await init();

    expect(document.body.innerHTML).toEqual(
      `<div id="root">${emptyLinkHtml}</div>`,
    );
  });
  it('should return html for saved links', async () => {
    when(extApi.getStorage)
      .calledWith(EXTENSION_NAME)
      .mockResolvedValue({ [EXTENSION_NAME]: links });

    await init();

    expect(document.body.innerHTML).toEqual(
      `<div id="root">${savedLinksHtml}</div>`,
    );
  });
  it('should console any errors', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    when(extApi.getStorage)
      .calledWith(EXTENSION_NAME)
      .mockRejectedValue('error');

    await init();

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('error');
  });
});
