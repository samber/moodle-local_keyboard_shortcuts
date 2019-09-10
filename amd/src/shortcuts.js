
define(["jquery", "local_keyboard_shortcuts/mousetrap", "local_keyboard_shortcuts/tomloprodModal"], function ($, Mousetrap, TomloprodModal) {
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

	    Mousetrap.bind('?', function () {
		TomloprodModal.openModal("rtfmModal", {
		    bgColor: "3498db",
		    textColor: "white",
		});
	    });

	    Mousetrap.bind('/', function () {
		TomloprodModal.openModal("searchModal", {
		    bgColor: "3498db",
		    textColor: "white",
		});
	    });

	    const commands = [
		{k: '?', s: 'User', d: 'Display this help'},
		{k: '/', s: 'User', d: 'Search'},
		{k: 'g d', s: 'User', d: 'Go to dasbhoard'},
		{k: 'g m', s: 'User', d: 'Go to Messaging page'},
		{k: 'g c', s: 'Teacher', d: 'Go to cohort mnamgement page'},
		{k: 's e', s: 'Teacher', d: 'Switch edition mode on/off'},
		{k: 'g u', s: 'Admin', d: 'Go to user management page'},
		{k: 'g r', s: 'Admin', d: 'Go to role management page'},
		{k: 'g p', s: 'Admin', d: 'Go to plugin management page'},
		{k: 's r', s: 'Admin', d: 'Switch role (and back)'},
	    ];
	    const strCmds = commands.map((cmd) => "<tr><td>" + cmd.k + "</td><td>" + cmd.s + "</td><td>" + cmd.d + '</td></tr>').join('');
	    $('body').append(`
			     <div class="tm-modal tm-effect tm-draggable" id="rtfmModal" style="max-width: 600px">
			     <div class="tm-wrapper">
			     <div class="tm-title">
			     <span class="tm-XButton tm-closeButton"></span>
			     <p class="tm-title-text" style="margin-top: 1em;font-size: 35px;color: white;">Help</p>
			     </div>
			     <div class="tm-contentd">
			     <table style="margin: 30px;width:140%;color: white;">
			     <tr>
			     <th>Shortcut</th>
			     <th>Scope</th>
			     <th>Description</th>
			     </tr>
			     ` + strCmds + `
			     </table>
			     </div>
			     </div>
			     </div>
			     `);
	    
	    $('body').append(`
			     <div class="tm-modal tm-effect tm-draggable" id="searchModal">
			     <div class="tm-wrapper">

			     <span class="tm-XButton tm-closeButton" style="display:none;"></span>
			     
			     <div class="tm-content" style="margin: 20px 0px;">

			     <form style="text-align:center;margin:20px 0px;" id="searchContent">
			     <input class="tm-emptyOnClose" placeholder="Search in content" required="" type="text" style="line-height: 30px;padding: 8px 15px;width: 80%;font-size: 17px;" focus>
			     </form>
			     
			     <form style="text-align:center;margin:20px 0px;" id="searchAdmin">
			     <input class="tm-emptyOnClose" placeholder="Search in admin" required="" type="text" style="line-height: 30px;padding: 8px 15px;width: 80%;font-size: 17px;">
			     </form>

			     </div>

			     </div>
			     </div>
			     `);

	    TomloprodModal.start({
		showMessages: false,
		closeOnOverlay: true,
		closeOnEsc: true,
		draggable: false,
		bgColor: "3498db",
		textColor: "white",
		borderRadius: '0.5em',
		idMainContainer: 'page',
	    });
	    
	    TomloprodModal.registerHandler("opened", function () {
		setTimeout(function() {
		    $('form#searchContent input').focus();

		    $('form#searchContent').on('submit', function(e) {
			console.log("toto");
			mousetrap_goto("/course/search.php?search=" + $('form#searchContent input')[0].value);
			e.preventDefault();
			return false;
		    });

		    $('form#searchAdmin').on('submit', function(e) {
			mousetrap_goto("/admin/search.php?query=" + $('form#searchAdmin input')[0].value);
			e.preventDefault();
			return false;
		    });
		}, 400);
	    });
        }

    };
});
