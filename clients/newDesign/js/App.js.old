
define([ "require_jquery", "modules/LoginPage", "modules/PremierTourPage", "modules/OrderCandidatesPage", "modules/ResultsPage", "modules/Utils", "modules/Config" ], 
function($, LoginPage, PremierTourPage, OrderCandidatesPage, ResultsPage, Utils, Config) {
	function App(){
		var config = Config.getInstance();
		var loginPage = 'login.php';
		
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
