#!/bin/bash

set -x
set -e

moodle-plugin-ci install --moodle /moodle --data /data --branch MOODLE_37_STABLE --db-type pgsql --db-user moodle --db-pass moodle --db-name moodel --db-host postgres

moodle-plugin-ci grunt

rm -rf amd/build/
cp -r /moodle/local/keyboard_shortcuts/amd/build/ amd/build/
