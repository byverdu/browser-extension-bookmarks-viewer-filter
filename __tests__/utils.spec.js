import * as utils from '../extension/utils';

jest.mock('../extension/api');

afterEach(() => {
  document.body.innerHTML = '';
});

describe('renderer', () => {
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
