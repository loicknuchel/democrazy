define([ "require_jquery", "modules/Api", "modules/Config" ], function($, Api, Config) {
	var OrderCandidatesPage = (function() {
		var config = Config.getInstance();
		var pageId = 2;
		var page = $('#page'+pageId);
		
		function start(cb_finalize){
			if(!config.isPageBuild(pageId)){
				config.buildPage(pageId);
				buidUI();
				
				page.find('.send input[type="submit"]').click(function(){
					sendVote(cb_finalize);
				});
				
				page.find('.actions .logout').click(function(){
					cb_finalize('restart');
					return false;
				});
			}
		}
		
		function buidUI(candidates){
			var candidates = config.getCandidates();
			if(candidates == null){
				Api.getCandidates(function(data){
					realBuildUI(data);
				});
			} else {
				realBuildUI(candidates);
			}
		}
		
		function realBuildUI(candidates){
			config.setCandidates(candidates);
			var orderList = page.find("#orderCandidates");
			for(var i in candidates){
				orderList.append('<li id="'+candidates[i]['voxe_id']+'" class="ui-state-default"><img align="left"  src="'+candidates[i]['piclink72']+'" /><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><div>'+candidates[i]['name']+'</div></li>');
			}
			try
			{
				orderList.sortable();

				orderList.disableSelection();
			}
			catch(err)
			{
				document.location.reload();
			}
		}
		
		function sendVote(cb_finalize){
			var ids = "";
			var first = true;
			page.find("#orderCandidates").find('li').each(function(){
				if(first == true){
					ids += $(this).attr('id');
					first = false;
				} else {
					ids += ','+$(this).attr('id');
				}
			});
			var userIdf = config.getUser();
			Api.listCandidatVote(ids, userIdf, function(code){
				if(code == 200){
					alert('A Voté!');
					cb_finalize('success');
				} else {
					alert('try again');
				}
			});
		}
		
		function getPage(){
			return page;
		}

		return {
			start: start,
			getPage: getPage
		};
	})();
	return OrderCandidatesPage;
});
