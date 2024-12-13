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

export { renderer };
