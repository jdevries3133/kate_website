#!/bin/bash

# depends on `rn`, a utility for running parallel processes.

source api/venv/bin/activate
rn "npm run dev,python3 -m http.server --directory src,livereload,./api/manage.py runserver 8001"
