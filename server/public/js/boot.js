require({paths: {
		'jquery': "require_jquery"
	}
}
, ["require_jquery", "App"], function($, App) {
	$().ready(function() {
		var app = App.getInstance();
		app.startApp();
	});
});
