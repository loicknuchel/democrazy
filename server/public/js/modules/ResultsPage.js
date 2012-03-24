define([ "require_jquery", "modules/Api", "modules/Utils", "modules/Config" ], function($, Api, Utils, Config) {
	var ResultsPage = (function() {
		var config = Config.getInstance();
		var page = null;

		function start(block){
			page = block;
			//buildUI();
			$('.scrutin .infoscrutin').click(function(){
				window.open("/info", "info", null);
				return false;
			});
		}

		function buildUI(){
			/*Api.getResults(function(data){
				realBuildUI(data);
			});*/
		}

		function realBuildUI(newResults){
			/*var block = page.find('.result-container');
			var title = page.find('.customtitle');
			var scrutin;
			var results = newResults['results'];
			title.html('Voici les résultats pour '+newResults['nb_votes']+' votes :');
			for(var i in results){
				if(results[i]['results'][0] != null){
					scrutin = '<div class="scrutin" id="'+results[i]['electionId']+'">'
						+'<div class="name"><img src="img/info32.png" class="infoscrutin"/>'+results[i]['electionType']+'</div>'
						+'<div class="winner"><img src="'+results[i]['results'][0]['piclink_anim']+'" /></div>'
						+'<div class="resultats">';
						var maxPc = 0;
						for(var j in results[i]['results']){
							if(eval(results[i]['results'][j]['score']) > maxPc){
								maxPc = results[i]['results'][j]['score'];
							}
						}
						for(var j in results[i]['results']){
							scrutin += '<div class="head"><img src="'+results[i]['results'][j]['piclink_anim']+'" /></div> '
								+'<div class="bar">'
									+'<div class="load" style="width: '+Math.round(results[i]['results'][j]['score']*(100/maxPc))+'%;"></div>'
									+'<div class="name">'+results[i]['results'][j]['name']+'</div>'
									+'<div class="pc">'+results[i]['results'][j]['score']+results[i]['results'][j]['unit']+'</div>'
								+'</div><br/>'
							;
						}
					scrutin += '</div>'
					+'</div>';
					block.append(scrutin);
				}
			}
			block.append('<div class="clear"></div>');*/
		}

		return {
			start: start
		};
	})();

	return ResultsPage;
});
