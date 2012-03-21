define([ "require_jquery", "modules/Api", "modules/Config", "require_jqueryui" ], function($, Api, Config) {
	var OrderCandidatesPage = (function() {
		var config = Config.getInstance();
		var resultsPage = 'results.php';
		var page = null;
		
		function start(block){
			page = block;
			buidUI();
			
			page.find('.send input[type="submit"]').click(function(){
				sendVote();
			});
		}
		
		function buidUI(){
			/*Api.getCandidates(function(data){
				realBuildUI(data);
			});*/
			realBuildUI(null);
		}
		
		function realBuildUI(candidates){
			var block = page.find("#orderCandidates");
			/*for(var i in candidates){
				block.append('<li id="'+candidates[i]['voxe_id']+'" class="ui-state-default">'
					+'<img align="left"  src="'+candidates[i]['piclink72']+'" />'
					+'<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>'
					+'<div>'+candidates[i]['name']+'</div>'
				+'</li>');
			}*/
			block.sortable();
			block.disableSelection();
		}
		
		function sendVote(){
			Api.listCandidatVote(buildIds(), config.getUser(), function(code){
				if(code == 200){
					alert('A Voté!');
					location.href = resultsPage;
				} else {
					alert('try again');
				}
			});
		}
		
		function buildIds(){
			var ids;
			var first = true;
			page.find("#orderCandidates").find('li').each(function(){
				if(first == true){
					ids = $(this).attr('id');
					first = false;
				} else {
					ids += ','+$(this).attr('id');
				}
			});
			return ids;
		}

		return {
			start: start
		};
	})();
	return OrderCandidatesPage;
});
