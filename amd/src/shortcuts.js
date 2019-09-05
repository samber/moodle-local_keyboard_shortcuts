
define(["jquery", "./jquery.mousetrap"], function ($, Mousetrap) {
    "use strict";

    function mousetrap_goto_rel(path) {
        window.location.pathname = path;
    }
    function mousetrap_goto_abs(path) {
        window.location.href = path;
    }

    // goto
    var goTos = [
        /*
         * anybody
         */
        // go to dashboard
        {k: 'g d', p: '/my'},
        // go to messaging
        {k: 'g m', p: '/message/index.php'},

        /*
         * admin
         */
        // go to user management
        {k: 'g u', p: '/admin/user.php'},
        // go to cohort management
        {k: 'g c', p: '/cohort/index.php'},
        // go to role management
        {k: 'g r', p: '/admin/roles/manage.php'},
        // go to plugin management
        {k: 'g p', p: '/admin/plugins.php'}
    ];

    goTos.forEach(function (item) {
        Mousetrap.bind(item.k, function () {
            mousetrap_goto_rel(item.p);
            return false;
        });
    });

    // switch role
    Mousetrap.bind('s r', function () {
        var role_to = $("#action-menu-1-menu a[data-title='switchroleto,moodle']");
        var role_return = $("#action-menu-1-menu a[data-title='switchrolereturn,moodle']");
        if (role_to.length > 0) {
            mousetrap_goto_abs(role_to.attr('href'));
        } else {
            mousetrap_goto_abs(role_return.attr('href'));
        }
        return false;
    });

    // switch edit mode
    Mousetrap.bind('s e', function () {
        var btn = $('.coursecontrols .editingbutton').click();
        mousetrap_goto_abs(btn.attr('href'));
        return false;
    });
});