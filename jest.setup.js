import('jest-chrome').then(chrome => {
  Object.assign(global, chrome);
});
