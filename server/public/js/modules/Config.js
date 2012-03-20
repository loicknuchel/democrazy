
define([ "modules/Utils" ], function(Utils) {
	function Config(){
		// params
		var userStoreKey = 'user';

		function getUser(){
			var mail = Utils.retireve(userStoreKey);
			if(mail != null && mail != ''){
				return {mail: mail};
			} else {
				return null;
			}
		}

		// Singleton !!!
		if ( Config.caller != Config.getInstance ) {
			throw new Error("This object cannot be instanciated");
		}

		return {
			getUserStoreKey: function(){
				return userStoreKey;
			},
			getUser: getUser
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
