
define([ "require_jquery", "modules/LoginPage", "modules/PremierTourPage", "modules/OrderCandidatesPage", "modules/ResultsPage", "modules/Api", "modules/Utils", "modules/Config", "require_jqueryui" ], 
function($, LoginPage, PremierTourPage, OrderCandidatesPage, ResultsPage, Api, Utils, Config) {
	function App(){
		var config = Config.getInstance();
		var loginPage = 'index.html';
		
		function startLogin(block)
		{
		
			
			var $dialog = $('<div id="dialog" class="dialoginfo"></div>')
			.load('info.html')
			.dialog({
				autoOpen: false,
				title: 'En savoir plus...',
				 dialogClass: 'dialoginfo'
			});
			
			

			
			$( "#link_info" ).click(function()
			{
				$dialog.dialog('open');
				$('#info_vote1').click(function() {
				    $('#vote1').toggle(400);
				    return false;
				  });
				$('#info_vote2').click(function() {
				    $('#vote2').toggle(400);
				    return false;
				  });
				$('#info_voteborda').click(function() {
				    $('#voteborda').toggle(400);
				    return false;
				  });
				$('#info_voteelimination').click(function() {
					$('#voteelimination').toggle(400);
				    return false;
				  });
				
				$('#info_votecondorcet').click(function() {
				    $('#votecondorcet').toggle(400);
				    return false;
				  });
				return false;
			});
			$( "#link_resultats" ).click(function()
			{
				document.location.href="results.html";
				return false;
			});
		
		


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
		
		function startOrderCandidates(block)
		{
			
			if(config.getUser() != null ){
				OrderCandidatesPage.start(block);
			} else {
				location.href = loginPage;
			}
		}
		
		function startResults(block)
		{
		
			
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
