#!/bin/bash

# depends on `rn`, a utility for running parallel processes.

rn "npm run dev,python3 -m http.server --directory src,livereload"
