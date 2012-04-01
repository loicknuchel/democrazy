define([ "require_jquery", "modules/Api", "modules/Utils", "modules/Config" ], function($, Api, Utils, Config) {
	var ResultsPage = (function() {
		var config = Config.getInstance();
		var page = null;
		
		
		var arrayInfos =  new Array();
		
		
		function displayInfo(titre, url)   
		{
			if(url == 'infotour1.hmtl')
		        $('<div>').dialog({
		            modal: true,
		            open: function (url)
		            {
		                $(this).load('infotour1.html');
		            },         
		            dialogClass: 'dialoginfo',
		            title: titre
		        });
			else if(url == 'infotour2.hmtl')
		        $('<div>').dialog({
		            modal: true,
		            open: function (url)
		            {
		                $(this).load('infotour2.html');
		            },         
		            dialogClass: 'dialoginfo',
		            title: titre
		        });
			else if(url == 'infoborda.hmtl')
		        $('<div>').dialog({
		            modal: true,
		            open: function (url)
		            {
		                $(this).load('infoborda.html');
		            },         
		            dialogClass: 'dialoginfo',
		            title: titre
		        });
			else if(url == 'infocondorcet.hmtl')
		        $('<div>').dialog({
		            modal: true,
		            open: function (url)
		            {
		                $(this).load('infocondorcet.html');
		            },         
		            dialogClass: 'dialoginfo',
		            title: titre
		        });
			else if(url == 'infoelimination.hmtl')
		        $('<div>').dialog({
		            modal: true,
		            open: function (url)
		            {
		                $(this).load('infoelimination.html');
		            },         
		            dialogClass: 'dialoginfo',
		            title: titre
		        });
	    }
		
		function start(block){
			page = block;
			buildUI();
		}
		
		function buildUI(){
			Api.getResults(function(data){
				realBuildUI(data);
			});
		}
		
		function realBuildUI(newResults){
			var block = page.find('.result-container');
			var title = page.find('.customtitle');
			var scrutin;
			var results = newResults['results'];
			title.html('Les résultats pour '+newResults['nb_votes']+' votes');
			
			
			for(var i in results)
			{
				if(results[i]['results'][0] != null)
				{
				
					scrutin = '<div class="scrutin" id="'+results[i]['electionId']+'">'
						+'<div class="name"><img id="'+i+'" src="img/info32.png" alt="en savoir plus..." alt="en savoir plus..." class="infoscrutin"/>'+results[i]['electionType']+'</div>'
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
			block.append('<div class="clear"></div>');
			
			
			$( "#link_retour" ).click(function()
					{
						document.location.href="index.html";
						return false;
					});
			
			$('.scrutin .infoscrutin').click(function()
			{
				var posRes = eval(this.id);
				var titleNew = results[posRes]['electionType'];
				
				var matchTour = 'tour';
				var matchString0 = 'actuel';
				
				var matchString1 = 'borda';
				var matchString2 = 'condorcet';
				var matchString3 = 'limination';
				

				var pagesel = 'info.html';
				if (titleNew.toLowerCase().indexOf(matchString0) != -1)
				{
					if(titleNew.indexOf("2") != -1)
					{
						pagesel = 'infotour2.hmtl';
					}
				   	else 
					{
						pagesel = 'infotour1.hmtl';
					}
				}
				else if (titleNew.toLowerCase().indexOf(matchString1) != -1)
				{
					pagesel = 'infoborda.hmtl';
				}
				else if (titleNew.toLowerCase().indexOf(matchString2) != -1)
				{
					titleNew = "Méthode de Condorcet";
					pagesel = 'infocondorcet.hmtl';
				}
				else if (titleNew.toLowerCase().indexOf(matchString3) != -1)
				{
					pagesel = 'infoelimination.hmtl';
				}
				
				//window.open("info.html", "info", null);
				
				displayInfo(titleNew, pagesel)   ;
				
				//$dialog.dialog('open');
		
				return false;
			});
			
			//if (navigator.appName == 'Microsoft Internet Explorer')
			//{
				setTimeout( function () 
				{
				
//            $(".winner").animate({
//                opacity: '0'
//            }, 3000);

					 $('.winner').addClass('outer_circle_open').animate({height: '183px', width: '183px'},100);
						$('.winner').animate({left:'47',top:'76'},0);
						$('.winner').addClass('rotate_label');
	               		$('.winner').animate({"top":"150px"},300).animate({"bottom":"20px"}, 100, function(){ });
						$('.winner').animate({"opacity":"0","margin-left":"600px"}, 800, 'linear');
          
           
				}, 3000);
				//$(".winner").animate({opacity:0}, 600000); 
			//}
		}

		return {
			start: start
		};
	})();
	
	return ResultsPage;
});
