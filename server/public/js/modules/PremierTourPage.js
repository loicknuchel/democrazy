define([ "require_jquery", "modules/Api", "modules/Utils","modules/Config" ], function($, Api,Utils, Config) {
	var PremierTourPage = (function() {
		var config = Config.getInstance();
		var orderCandidatePage = 'order_candidates.html';
		var selectedClass = "selected";
		var page = null;
		
		function start(block){
			page = block;
			buildUI();
			
			page.find('.send input[type="submit"]').click(function(){
				sendVote();
			});
		}
		
		function buildUI(){
			Api.getCandidates(function(data){
				realBuildUI(data);
			});
		}
		
		function realBuildUI(candidates){
			var pos = 0;
			var block = page.find('.candidats');
			for(var i in candidates) {
				var candidatBlock = '<div class="candidat" id="'+candidates[i]['voxe_id']+'">'
					+ '<div class="pic" style="background: url('+candidates[i]['piclink72']+');"></div>'
					+ '<div>'+candidates[i]['name']+'</div>'
					+ '<div class="infocandidatdiv"><a target="'+candidates[i]['voxe_id']+'" href="'+candidates[i]['urlinfo']+'"><img src="img/info32.png" class="infocandidat"/></a></div>'
				+ '</div>';
				block.append(candidatBlock);
				
				if(pos == 2){
					block.append('<div class="clear"></div>');
					pos = 0;
				} else {
					pos++;
				}
			}
			block.append('<div class="clear"></div>');
			
			page.find('.candidats .candidat').each(function(){
				$(this).click(function(){
					selectCandidate($(this));
				});
			});
		}
		
		function selectCandidate(candidate){
			page.find('.candidats .candidat').removeClass(selectedClass);
			candidate.addClass(selectedClass);
		}
		
		function sendVote(){
			var candidat = page.find('.candidats .candidat.'+selectedClass).first();
			if(candidat.html() != null){
				Api.premierTourVote(candidat.attr('id'), config.getUser(), function(code){
					if(code == 200){
						alert('A voté!');
						if(Utils.isLocalStrorage())
						{
							location.href = orderCandidatePage;
						}
						else
						{
						
							document.location.href = encodeURI(orderCandidatePage+"?"+config.getUserStoreKey()+"="+config.getUser());
						}
					} else {
						alert('try again');
					}
				});
			} else {
				alert('veuillez choisir un candidat');
			}
		}

		return {
			start: start
		};
	})();
	
	return PremierTourPage;
});
