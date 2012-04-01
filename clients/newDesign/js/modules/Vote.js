
define([ "libs/require_jquery", "modules/Api", "modules/Utils", "libs/require_jqueryui" ], function($, Api, Utils) {
	var Vote = (function() {
		var user = {etape: 0, results: {}};
		var page = null;
		var selectedClass = "selected";
		var resultsPage = 'results.html';
		
		function start(block){
			page = block;
			
			page.find('.etape.no0 form input[type="submit"]').click(function(){
				checkIdf();
				console.log(user);
				return false;
			});
			page.find('.etape.no0 form').submit(function(){
				checkIdf();
				console.log(user);
				return false;
			});
			
			Api.getCandidates(function(data){
				console.log(data);
				buildEtape1(data);
				buildEtape2(data);
			});
			
			page.find('.etape.no1 .valid a').click(function(){
				validEtape1($(this).parents('.etape'));
				console.log(user);
				return false;
			});
			
			page.find('.etape.no2 .valid a').click(function(){
				validEtape2($(this).parents('.etape'));
				console.log(user);
				return false;
			});
		}
		
		function checkIdf(){
			var mail = page.find('form .mail input[type="text"]').val();
			if(Utils.isMail(mail)){
				user.idf = {mail: mail};
				nextStep();
			} else {
				alert('Veuillez entrer votre mail!');
			}
		}
		
		function validEtape1(etapeBlock){
			var candidat = etapeBlock.find('.candidats .candidat.'+selectedClass).first();
			if(candidat.html() != null){
				user.premierTour = {id: candidat.attr('id'), name: candidat.find('.name').html()};
				nextStep();
			} else {
				alert('Pour quel candidat voterez vous au premier tour ?');
			}
			return false;
		}
		
		function validEtape2(etapeBlock){
			var ids;
			var first = true;
			etapeBlock.find("#orderCandidates").find('li').each(function(){
				if(first == true){
					ids = $(this).attr('id');
					first = false;
				} else {
					ids += ','+$(this).attr('id');
				}
			});
			
			user.orderCandidates = {ids: ids};
			nextStep();
			return false;
		}
		
		function nextStep(){
			if(user.etape == 0){ // give mail => premier tour
				user.etape++;
				page.find('.etape').hide();
				page.find('.etape.no1').show();
			} else if(user.etape == 1){ // premier tour => order candidates
				user.etape++;
				page.find('.etape').hide();
				page.find('.etape.no2').show();
			} else if(user.etape == 2){ // order candidates => results
				user.etape++;
				sendVotes();
			} else {
				alert('ERROR : user.etape = '+user.etape+' !!!');
			}
		}
		
		function sendVotes(){
			console.log('SEND VOTES :');
			console.log(user);
			Api.premierTourVote(user.premierTour.id, user.idf, function(code){
				if(code == 200){
					goResults("premierTour");
				} else {
					alert('ERROR WHILE PERSIST VOTE "premier tour"');
				}
			});
			Api.listCandidatVote(user.orderCandidates.ids, user.idf, function(code){
				if(code == 200){
					goResults("orderCandidates");
				} else {
					alert('ERROR WHILE PERSIST VOTE "order candidates"');
				}
			});
		}
		
		function goResults(resultOk){
			if(resultOk == "premierTour"){
				user.results.premierTour = true;
			} else if(resultOk == "orderCandidates"){
				user.results.orderCandidates = true;
			}
			
			if(user.results.premierTour == true && user.results.orderCandidates == true){
				location.href = resultsPage;
			} 
		}
		
		function buildEtape1(candidates){
			var block = page.find('.etape.no1 .candidats');
			for(var i in candidates) {
				var candidatBlock = '<div class="candidat" id="'+candidates[i]['voxe_id']+'">'
					+ '<div class="pic" style="background: url('+candidates[i]['piclink72']+');"></div>'
					+ '<div class="name">'+candidates[i]['name']+'</div>'
					+ '<div class="infocandidatdiv" title="Voir le programme"><a target="'+candidates[i]['voxe_id']+'" href="'+candidates[i]['urlinfo']+'"><img src="img/info32.png" class="infocandidat"/></a></div>'
				+ '</div>';
				block.append(candidatBlock);
			}
			block.append('<div class="clear"></div>');
			
			block.find('.candidat').each(function(){
				$(this).click(function(){
					if(!$(this).hasClass(selectedClass)){
						block.find('.candidat').removeClass(selectedClass);
						$(this).addClass(selectedClass);
					} else {
						block.find('.candidat').removeClass(selectedClass);
					}
				});
			});
		}
		
		function buildEtape2(candidates){
			var block = page.find('.etape.no2 #orderCandidates');
			for(var i in candidates){
				block.append('<li id="'+candidates[i]['voxe_id']+'" class="ui-state-default">'
					+'<img align="left"  src="'+candidates[i]['piclink72']+'" />'
					+'<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>'
					+'<div>'+candidates[i]['name']+'</div>'
				+'</li>');
			}
			
			block.sortable();
			block.disableSelection();
		}

		return {
			start: start
		};
	})();
	return Vote;
});
