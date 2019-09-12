<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 *  is defined here.
 * @package     local_keyboard_shortcuts
 * @copyright   2019 Samuel Berthe <contact@samuel-berthe.fr>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

function req_is_ajax() {
    $reqwith = 'HTTP_X_REQUESTED_WITH';
    if (isset($_SERVER[$reqwith]) && $_SERVER[$reqwith] == 'XMLHttpRequest') {
        return true;
    }
    return false;
}

function local_keyboard_shortcuts_extend_navigation() {
    global $PAGE;
    if (!req_is_ajax() && $PAGE->requires->is_head_done()) {
        //        $PAGE->requires->css('/local/keyboard_shortcuts/styles/tomloprodModal.css');
        $PAGE->requires->js_call_amd('local_keyboard_shortcuts/shortcuts', 'init');
    }
}