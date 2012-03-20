require({paths: {
		'jquery': "require_jquery"
	}
}
, ["require_jquery", "App"], function($, App) {
	$().ready(function() {
		var app = App.getInstance();
		$('.startBlock').each(function(){
			if($(this).html() == 'login'){
				app.startLogin($(this).parent());
				$(this).remove();
			} else if($(this).html() == 'premier_tour'){
				app.startPremierTour($(this).parent());
				$(this).remove();
			} else if($(this).html() == 'order_candidates'){
				app.startOrderCandidates($(this).parent());
				$(this).remove();
			} else if($(this).html() == 'results'){
				app.startResults($(this).parent());
				$(this).remove();
			}
		});
		//app.startApp();
	});
});
