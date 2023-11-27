#!/bin/bash

rm -rf dist
mkdir dist
cp -rv extension/* dist
node ./utils/minify.js
zip -r browserExtensionBoilerplate.zip ./dist
