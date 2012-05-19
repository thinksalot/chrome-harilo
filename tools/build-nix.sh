#!/bin/bash

# clean older files
rm ../build/*.crx
rm ../build/*.pem

#pack extension to root dir
google-chrome --pack-extension=../src

# move
cd ../
mv src.crx build/extension.crx
mv src.pem build/extension.pem
