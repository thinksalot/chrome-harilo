#!/bin/bash

# clean older files
rm -f crx/*.crx
rm -f crx/*.pem

#pack extension to root dir
google-chrome --pack-extension=src/

# move
mv src.crx crx/extension.crx
mv src.pem crx/extension.pem
