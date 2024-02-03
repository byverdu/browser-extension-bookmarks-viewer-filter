# browser-extension-boilerplate-v3

This is a boilerplate for creating a browser extension for Chrome on manifest v3. It is a minimal boilerplate with the basic structure and features to get started with the development of a browser extension.

## Getting Started

- Enable developer mode in `chrome://extensions`
- Click on `Load unpacked` and select the `extension` directory

## Directory Structure

```txt
extension
├── api
│   └── index.js
├── assets
│   ├── icon-128.png
│   ├── icon-16.png
│   ├── icon-32.png
│   └── icon-48.png
├── libs
│   └── mui.min.css
├── manifest.json
├── pages
│   ├── options.html
│   ├── options.js
│   ├── popup.html
│   ├── popup.js
│   └── styles.css
├── scripts
│   ├── background.js
│   └── content.js
├── types
│   └── index.d.ts
└── utils
    └── index.js
```

## Features

- [x] Manifest v3
- [x] Popup page
- [x] Options page
- [x] ContextMenu (Right-click menu)
- [x] Content script
- [x] Background script
- [x] Local storage

## What the VisitedLinks extension does?

- Options page to select the ascending or descending order of the visited links
- Save on local storage the links visited by the user
  - Properties: `url`, `title`, `date`
- Display the visited links on the Popup page sorted by the selected order
- ContextMenu to save a selected link as visited