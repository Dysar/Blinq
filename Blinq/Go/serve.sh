#!/bin/sh

cd ../ClientApp
ng serve &
gin --port 4201 --path . --build ../Go --i --all &

wait
