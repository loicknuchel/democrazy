define([ "require_jquery", "modules/Api", "modules/Utils", "modules/Config" ], function($, Api, Utils, Config) {
	var PremierTourPage = (function() {
		var config = Config.getInstance();
		var pageId = 1;
		var page = $('#page'+pageId);
		
		function start(cb_finalize){
			if(!config.isPageBuild(pageId)){
				config.buildPage(pageId);
				buildUI();
				
				page.find('.send input[type="submit"]').click(function(){
					sendVote(cb_finalize);
				});
				
				page.find('.actions .logout').click(function(){
					cb_finalize('restart');
					return false;
				});
			}
		}
		
		function buildUI(){
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
			var pos = 0;
			var block = page.find('.candidats');
			for(var i in candidates)
			{
				var candidatDiv = document.createElement('div');
				candidatDiv.setAttribute('class','candidat');
				candidatDiv.setAttribute('className','candidat');
				candidatDiv.setAttribute('id',candidates[i]['voxe_id']);

				var picDiv = document.createElement('div');
				picDiv.setAttribute('style','background: url('+candidates[i]['piclink72']+');');
				picDiv.setAttribute('class','pic');
				picDiv.setAttribute('className','pic');

				var nameDiv = document.createElement('div');
				nameDiv.innerHTML = candidates[i]['name'];

				var infoDiv = document.createElement('div');
				infoDiv.setAttribute('class','infocandidatdiv');
				infoDiv.setAttribute('className','infocandidatdiv');
				

				var urlinfo = candidates[i]['urlinfo'];
				var infoImg = "<a target='"+candidates[i]['voxe_id']+"' href='"+urlinfo+"'><img src='img/info32.png' class='infocandidat'/></a>";
				infoDiv.innerHTML = infoImg;
				

				candidatDiv.appendChild(picDiv);
				candidatDiv.appendChild(nameDiv);
				candidatDiv.appendChild(infoDiv);
				block.append(candidatDiv);
				//block.append(infoDiv);
	
				
				if(pos == 2){
					block.append('<div style="clear: left;"></div>');
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
		
		function sendVote(cb_finalize){
			var candidat = page.find('.candidats .candidat.'+config.getSelectedClass());
			if(candidat.html() != null){
				var userIdf = config.getUser();
				Api.premierTourVote(candidat.attr('id'), userIdf, function(code){
					if(code == 200){
						alert('A voté!');
						cb_finalize('success');
					} else {
						alert('try again');
					}
				});
			} else {
				if(candidat.html() == null){
					alert('veuillez choisir un candidat');
				} else {
					cb_finalize('restart');
				}
			}
		}
		
		function selectCandidate(candidate){
			page.find('.candidats .candidat').removeClass(config.getSelectedClass());
			candidate.addClass(config.getSelectedClass());
		}
		
		function getPage(){
			return page;
		}

		return {
			start: start,
			getPage: getPage
		};
	})();
	return PremierTourPage;
});
