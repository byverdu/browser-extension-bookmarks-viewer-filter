/**
 * @param {string} content
 */
function renderer(content) {
  const target = document.querySelector('#root');

  if (target) {
    target.innerHTML = content;
  } else {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<div>No target element found.</div>',
    );
  }
}

/**
 *
 * @param {MouseEvent} event
 * @param {API['sendMessage']} sendMessage
 * @param {Actions} action
 * @param {APIKey} key
 */
async function contentScriptClickHandler(event, sendMessage, action, key) {
  const url = event.target.href;
  const date = new Date().getTime();
  const title = event.target.innerText;
  /**
   * @type VisitedLink
   */
  const link = { url, date, title };

  try {
    sendMessage({
      type: action,
      payload: { key, value: link },
    });
  } catch (e) {
    console.error(e);
  }
}

export { renderer, contentScriptClickHandler };
