define([ "require_jquery", "modules/Storage", "modules/Config", "modules/Utils" ], function($, Storage, Config, Utils) {
	var LoginPage = (function() {
		var config = Config.getInstance();
		var pageId = 0;
		var page = $('#page'+pageId);
		
		function start(cb_finalize){

			if(!config.isPageBuild(pageId)){
				config.buildPage(pageId);
				page.find('.send input[type="submit"]').click(function(){
					var mail = page.find('.UserIdf input[name="mail"]').val();
					if(Utils.isMail(mail)){
						Storage.put(config.getUserStoreKey(), mail);
						page.find('.UserIdf input[name="mail"]').val('');
						cb_finalize('success');
					}
					else
					{
						alert('Veuillez entrer votre mail!');
					}
				});
				page.find('#resultsLoginPage').click(function(){
					cb_finalize('results');

				});
				page.find('.logo').click(function(){
					cb_finalize('results');
					
				});
			}

		}
		
		function getPage(){
			return page;
		}

		return {
			start: start,
			getPage: getPage
		};
	})();
	return LoginPage;
});
