
define(["jquery", "local_keyboard_shortcuts/mousetrap"], function ($, Mousetrap) {
    "use strict";

    function mousetrap_goto(path) {
        window.location.href = path;
    }

    function get_query_params() {
	return decodeURI(window.location.search)
	    .replace('?', '')
	    .split('&')
	    .map(param => param.split('='))
	    .reduce((values, [ key, value ]) => {
		values[ key ] = value
		return values
	    }, {});
    }
    function to_query_params(obj) {
	const str = Object.entries(obj)
	      .filter((kv) => kv[0] != null && kv[1] != null)
	      .map((kv) => kv[0] + "=" + kv[1])
	      .join('&');
	return "?" + encodeURI(str);
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

    return {

        init: function () {
            goTos.forEach(function (item) {
                Mousetrap.bind(item.k, function () {
                    mousetrap_goto(item.p);
                    return false;
                });
            });

            // switch role
            Mousetrap.bind('s r', function () {
		const returnurl = window.location.pathname + window.location.search;
		const id = !!get_query_params()['id'] ? get_query_params()['id'] : "1";
		const session = M.cfg.sesskey;

		if ($('body.userswitchedrole').length == 0)
		    mousetrap_goto("/course/switchrole.php" + to_query_params({id: id, switchrole: -1, returnurl: returnurl}));
		else
		    mousetrap_goto("/course/switchrole.php" + to_query_params({id: id, sesskey: session, switchrole: 0, returnurl: returnurl}));
                return false;
            });

            // switch edit mode
            Mousetrap.bind('s e', function () {
		const id = get_query_params()['id'];
		const session = M.cfg.sesskey;
		const returnurl = encodeURI(window.location.pathname + window.location.search);
		const editing = $('body.editing').length == 1;

		const path = (id == null ? window.location.pathname : "/course/view.php")

		mousetrap_goto(path + to_query_params({
		    returnurl: returnurl,
		    id: id,
		    sesskey: session,
		    edit: editing ? "off" : "on",
		}));
		return false;
	    });
        }

    };
});
