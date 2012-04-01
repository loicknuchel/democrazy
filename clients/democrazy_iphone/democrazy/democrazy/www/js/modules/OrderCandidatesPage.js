define([ "require_jquery", "modules/Api", "modules/Utils", "modules/Config" ], function($, Api, Utils,Config) {
	var OrderCandidatesPage = (function() {
		var config = Config.getInstance();
		var resultsPage = 'results.html';
		var page = null;
		
		function start(block){
			page = block;
			buidUI();
			
			page.find('#submitemail').click(function(){
				sendVote();
			});
		}
		
		function buidUI(){
			Api.getCandidates(function(data){
				realBuildUI(data);
			});
		}
		
		function realBuildUI(candidates){
			var block = page.find("#orderCandidates");
			for(var i in candidates){
				block.append('<li id="'+candidates[i]['voxe_id']+'" class="ui-state-default">'
					+'<img align="left"  src="'+candidates[i]['piclink72']+'" />'
					+'<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>'
					+'<span class="orderCandidatesName">'+candidates[i]['name']+'</span>'
				+'</li>');
			}
			block.sortable();
			block.disableSelection();
			/*try {
				block.sortable();
				block.disableSelection();
			} catch(err) {
				document.location.reload();
			}*/
		}
		
		function sendVote(){
			Api.listCandidatVote(buildIds(), config.getUser(), function(code){
				if(code == 200){
					alert('A Voté!');
					if(Utils.isLocalStrorage())
					{
						location.href = resultsPage;
					}
					else
					{
						location.href = encodeURI(resultsPage+"?"+config.getUserStoreKey()+"="+config.getUser());
					}
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
