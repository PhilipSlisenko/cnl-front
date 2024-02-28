#!/bin/bash
set -e

rm -rf build/_temp/*
mkdir -p build/_temp/src_for_prod_build/src/
rsync -av --exclude='-*' src/* build/_temp/src_for_prod_build/src/
find . -type f -maxdepth 1 -exec rsync -av {} build/_temp/src_for_prod_build/ \;

(cd build/_temp/src_for_prod_build/ && npm run build)