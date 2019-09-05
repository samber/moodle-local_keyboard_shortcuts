#!/bin/bash

set -x
set -e

moodle-plugin-ci install --moodle /moodle --data /data --branch MOODLE_37_STABLE --db-type pgsql --db-user moodle --db-pass moodle --db-name moodel --db-host postgres

cd /moodle/local/keyboard_shortcuts/amd
rm -rf build/
grunt amd

rm -rf /plugin/amd/build/
cp -r build/ /plugin/amd/build/
