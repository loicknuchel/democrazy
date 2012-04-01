define([ "require_jquery", "modules/Config", "modules/Utils" ], function($, Config, Utils) {
	var LoginPage = (function() {
		var config = Config.getInstance();
		var premierTourPage = 'premier_tour.html';
		var page = null;
		
		function start(block){
			page = block;
			page.find('#submitemail').click(function(){
				var mail = page.find('.UserIdf input[name="mail"]').val();
				
				if(Utils.isMail(mail)){
					
					if(Utils.isLocalStrorage())
					{
						Utils.persist(config.getUserStoreKey(), mail);
						location.href = premierTourPage;
					}
					else
					{
					
						location.href = encodeURI(premierTourPage+"?"+config.getUserStoreKey()+"="+mail);
					}
						
					
						
				} else {
					alert('Veuillez entrer votre mail!');
				}
			});
			
			
			if(!document.getElementById("fbscriptforlike"))
			{
				var b2 = document.createElement('script');
				b2.id = 'fbscriptforlike';
				b2.type = 'text/javascript';
				b2.src = ('http://connect.facebook.net/fr_FR/all.js#xfbml=1&appId=314465848606774');
				var a2 = document.getElementById("deferedjs2");
				a2.parentNode.insertBefore(b2, a2);
			}
			if(!document.getElementById("tweeterscript"))
			{
				var b = document.createElement('script');
				b.id = 'tweeterscript';
				b.type = 'text/javascript';
				b.src = ('http://platform.twitter.com/widgets.js');
				var a = document.getElementById("deferedjs");
				a.parentNode.insertBefore(b, a);
			}
		}

		return {
			start: start
		};
	})();
	return LoginPage;
});
