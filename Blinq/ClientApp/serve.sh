#!/bin/sh

ng serve &
gin --port 4201 --path . --build ./ --i --all &

wait
