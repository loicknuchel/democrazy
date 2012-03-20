
define([ "require_jquery", "modules/LoginPage", "modules/PremierTourPage", "modules/OrderCandidatesPage", "modules/ResultsPage", "modules/Api", "modules/Utils", "modules/Config", "require_jqueryui" ], 
function($, LoginPage, PremierTourPage, OrderCandidatesPage, ResultsPage, Api, Utils, Config) {
	function App(){
		var config = Config.getInstance();
		var loginPage = 'login.html';
		
		function startLogin(block){
			Utils.remove(config.getUserStoreKey());
			LoginPage.start(block);
		}
		
		function startPremierTour(block){
			if(config.getUser() != null){
				PremierTourPage.start(block);
			} else {
				location.href = loginPage;
			}
		}
		
		function startOrderCandidates(block){
			if(config.getUser() != null){
				OrderCandidatesPage.start(block);
			} else {
				location.href = loginPage;
			}
		}
		
		function startResults(block){
			ResultsPage.start(block);
		}
	
		// Singleton !!!
		if ( App.caller != App.getInstance ) {
			throw new Error("This object cannot be instanciated");
		}

		return {
			startLogin: startLogin,
			startPremierTour: startPremierTour,
			startOrderCandidates: startOrderCandidates,
			startResults: startResults
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
