import * as api from '../extension/api';
import * as utils from '../extension/utils';

jest.mock('../extension/api');

const links = [{ title: 'some link', url: 'some_link', date: 0 }];
const { api: extApi, EXTENSION_NAME, ACTIONS } = api;

afterEach(() => {
  document.body.innerHTML = '';
});

describe('clickListener', () => {
  document.body.innerHTML = '<a href="some_link">some link</a>';
  it('should call api.sendMessage', async () => {
    jest.spyOn(Date.prototype, 'getTime').mockReturnValue(0);
    const event = { target: { href: 'some_link', innerText: 'some link' } };

    await utils.contentScriptClickHandler(
      event,
      extApi.sendMessage,
      ACTIONS.UPDATE_STORAGE,
      EXTENSION_NAME,
    );

    expect(extApi.sendMessage).toHaveBeenCalledTimes(1);
    expect(extApi.sendMessage).toHaveBeenCalledWith({
      type: ACTIONS.UPDATE_STORAGE,
      payload: { key: EXTENSION_NAME, value: links[0] },
    });
  });
});

describe.only('renderer', () => {
  document.body.innerHTML = '<div id="root"></div>';

  it('should render html', () => {
    utils.renderer('<div>some html</div>');

    expect(document.body.innerHTML).toEqual(
      '<div id="root"><div>some html</div></div>',
    );
  });

  it('should render error message', () => {
    document.body.innerHTML = '';
    utils.renderer('<div>some html</div>');

    expect(document.body.innerHTML).toEqual(
      '<div>No target element found.</div>',
    );
  });
});
