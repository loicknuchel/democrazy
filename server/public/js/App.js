
define([ "require_jquery", "modules/LoginPage", "modules/PremierTourPage", "modules/OrderCandidatesPage", "modules/ResultsPage", "modules/Api", "modules/Config", "require_jqueryui" ], 
function($, LoginPage, PremierTourPage, OrderCandidatesPage, ResultsPage, Api, Config) {
	function App(){
		var config = Config.getInstance();
		//var candidates = null; 
		var iduser = "";
		
		function startApp() {
			goPage(config.getCurPage());
		}
		
		function goPage(pageId){
			$('.page').hide();
			config.setCurPage(pageId);
			if(pageId == 0)
			{
				LoginPage.getPage().show();
				LoginPage.start(pageFinish);
			} else if(pageId == 1){
				PremierTourPage.getPage().show();
				PremierTourPage.start(pageFinish);
			} else if(pageId == 2){
				OrderCandidatesPage.getPage().show();
				OrderCandidatesPage.start(pageFinish);
			} else if(pageId == 3){
				ResultsPage.getPage().show();
				ResultsPage.start(pageFinish);
			} else {
				alert('goPage ERROR : unknown page : '+pageId);
				console.log('goPage ERROR : unknown page : '+pageId);
				goPage(0);
			}
		}
		
		function pageFinish(result)
		{

			
			
			if(result == 'success'){
				var curPage = config.getCurPage();
				goPage(eval(eval(curPage)+1));
			} else if(result == 'restart'){
				goPage(0);
			} else if(result == 'results'){
				goPage(3);
			} else {
				alert('pageFinish ERROR : unknown result : '+result);
				console.log('pageFinish ERROR : unknown result : '+result);
				goPage(0);
			}
		}
	
		// Singleton !!!
		if ( App.caller != App.getInstance ) {
			throw new Error("This object cannot be instanciated");
		}

		return {
			startApp: startApp
		}
	}
	App.instance = null;
	App.getInstance = function() {
		if (this.instance == null) {
			this.instance = new App();
		}
		return this.instance;
	}
	
	return App;
});
