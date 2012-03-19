define([ "modules/Utils" ], function(Utils) {
	var Storage = (function() {
		function get(eltId){
			if(Utils.isLocalStrorage()){
				return localStorage[eltId];
			} else {
			
			}
		}
		
		function put(eltId, eltVal){
			if(Utils.isLocalStrorage()){
				localStorage[eltId] = eltVal;
			} else {
			
			}
		}

		return {
			get: get,
			put: put
		};
	})();
	return Storage;
});
