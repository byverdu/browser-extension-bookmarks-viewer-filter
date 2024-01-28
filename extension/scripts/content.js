(async () => {
  const apiSrc = chrome.runtime.getURL('api/index.js');
  const helpersSrc = chrome.runtime.getURL('utils/index.js');
  const { ACTIONS, api, EXTENSION_NAME } = await import(apiSrc);
  const { contentScriptClickHandler } = await import(helpersSrc);
  /**
   * @type {API['sendMessage']}
   */
  const sendMessage = api.sendMessage;
  const allLinks = [...document.querySelectorAll('a')];
  for (const link of allLinks) {
    link.addEventListener('click', async event => {
      await contentScriptClickHandler(
        event,
        sendMessage,
        ACTIONS.UPDATE_STORAGE,
        EXTENSION_NAME,
      );
    });
  }
})();
