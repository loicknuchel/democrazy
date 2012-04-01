
define([ "libs/require_jquery", "modules/Vote", "modules/Api" ], function($, Vote, Api) {
	function App(){
		var resultPage;
		
		function startMailSender(block){
			Vote.start(block);
		}
		
		function startResults(block){
			resultPage = block;
			Api.getResults(function(data){
				buildResultUI(data);
			});
		}
		
		function buildResultUI(results){
			resultPage.find('.header-container').append('<p>Résultats pour '+results['nb_votes']+' votes comptabilisés</p>');
			var container = resultPage.find('.scrutin-container');
			var scrutinHTML;
			var clearHTML;
			
			var elections = results['results'];
			var pos = 0;
			var fit;
			for(var i in elections){
				if(elections[i]['results'][0] != null){
					var election = elections[i];
					if(pos == 2){
						fit = ' fit';
						clearHTML = '<div class="clear"></div>';
						pos = 0;
					} else {
						fit = '';
						clearHTML = '';
						pos++;
					}
					
					scrutinHTML = '<div class="grid col-300'+fit+'">'
						+ '<div class="scrutin" id="'+election['electionId']+'">'
							+ '<div class="name">'
								+ '<h3><a href="scrutins.html#'+election['electionId']+'" target="'+election['electionId']+'" title="Explications du scrutin"><img src="img/info32.png" /></a> '+election['electionType']+'</h3>'
							+ '</div>'
							+ '<div class="results">'
								+ '<ul>';
						var maxPc = 0;
						for(var j in election['results']){
							if(eval(election['results'][j]['score']) > maxPc){
								maxPc = election['results'][j]['score'];
							}
						}
						for(var j in election['results']){
							var electionRes = election['results'][j];
							var score = Math.round(electionRes['score']*(100/maxPc));
							scrutinHTML += '<li>'
									+ '<div class="label"><img src="'+electionRes['piclink_anim']+'" /></div>'
									+ '<div class="bar">'
										+ '<div class="before">'+electionRes['name']+'</div>'
										+ '<div class="data" style="width: '+score+'%;"></div>'
										+ '<div class="after">'+electionRes['score']+electionRes['unit']+'</div>'
									+ '</div>'
									+ '<div class="clear"></div>'
								+ '</li>';
						}
							
					scrutinHTML += '</ul>'
							+ '</div>'
						+ '</div>'
					+ '</div>';
					container.append(scrutinHTML);
					container.append(clearHTML);
				}
			}
			container.append('<div class="clear"></div>');
		}
		
		// Singleton !!!
		if ( App.caller != App.getInstance ) {
			throw new Error("This object cannot be instanciated");
		}

		return {
			startMailSender: startMailSender,
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
