#!/usr/bin/env bash

cd "$(dirname "$0")/vazord-client"
npm install &

cd "$(dirname "$0")/vazord-backend"
npm install
