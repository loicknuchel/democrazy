define([ "require_jquery", "modules/Config", "modules/Utils" ], function($, Config, Utils) {
	var LoginPage = (function() {
		var config = Config.getInstance();
		var premierTourPage = 'premier_tour.html';
		var page = null;
		
		function start(block){
			page = block;
			page.find('.send input[type="submit"]').click(function(){
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
		}

		return {
			start: start
		};
	})();
	return LoginPage;
});
