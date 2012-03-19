
/*
http://democrazy.fr/4f16fe2299c7a10001000012/candidates
*/
define([ "modules/Api", "modules/Storage", "modules/Utils" ], function(Api, Storage, Utils) {
	function Config(){
		// params
		var selectedClass = "selected";
		var pageStoreKey = 'page';
		var userStoreKey = 'user';
		var pageBuild = new Array();
		pageBuild[0] = false;
		pageBuild[1] = false;
		pageBuild[2] = false;
		pageBuild[3] = false;
		var candidates = null;

		function getCandidates(){
			return candidates;
		}
		function setCandidates(c){
			candidates = c;
		}

		function getCurPage(){
			var anchor = Utils.getAnchor();
			console.log(anchor);
			if(anchor != 'results'){
				var curPage = Storage.get(pageStoreKey);
				var mail = Storage.get(userStoreKey);
				if(curPage != null && curPage != '' && curPage > 0 && mail != null && mail != ''){
					return curPage;
				} else {
					setCurPage(0);
					return 0;
				}
			} else {
				setCurPage(3);
				return 3;
			}
		}

		function setCurPage(pageId){
			Storage.put(pageStoreKey, pageId);
		}

		function getUser(){
			var mail = Storage.get(userStoreKey);
			return {mail: mail};
		}

		function buildPage(pageId){
			if(pageBuild[pageId] == true){
				console.log('ERROR : build page '+pageId+' for the second time');
				alert('ERROR : build page '+pageId+' for the second time');
			} else {
				pageBuild[pageId] = true;
			}
		}

		function isPageBuild(pageId){
			return pageBuild[pageId];
		}

		// Singleton !!!
		if ( Config.caller != Config.getInstance ) {
			throw new Error("This object cannot be instanciated");
		}

		return {
			getSelectedClass: function(){
				return selectedClass;
			},
			getUserStoreKey: function(){
				return userStoreKey;
			},
			getCurPage: getCurPage,
			setCurPage: setCurPage,
			getUser: getUser,
			buildPage: buildPage,
			isPageBuild: isPageBuild,
			getCandidates: getCandidates,
			setCandidates: setCandidates
		}
	}
	Config.instance = null;
	Config.getInstance = function() {
		if (this.instance == null) {
			this.instance = new Config();
		}
		return this.instance;
	}

	return Config;
});
