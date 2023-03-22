# !/bin/bash

if [ "$1" == "help" ]; then
    echo "";
    echo "dev: install dev dependencies and run tests";
    echo "server: install dependencies and run server";
    echo "help: show this message";
    echo "";
fi

if [ "$1" == "dev" ]; then
    npm i -D;
    npm test;
fi

if [ "$1" == "server" ]; then
    npm i;
    npm start;
fi