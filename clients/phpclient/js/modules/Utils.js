define([], function() {
	var Utils = (function() {
		// public
		function isLocalStrorage() {
			return typeof localStorage != "undefined";
		}
		
		function isMail(str){
			if(str != null && str != ''){
				return true;
			}
			return false;
		}
		
		function retireve(eltId){
			if(isLocalStrorage()){
				return localStorage[eltId];
			} else {
			
			}
		}
		
		function persist(eltId, eltVal){
			if(isLocalStrorage()){
				localStorage[eltId] = eltVal;
			} else {
			
			}
		}
		
		function remove(eltId){
			if(isLocalStrorage()){
				localStorage.removeItem(eltId);
			} else {
			
			}
		}

		return {
			isLocalStrorage: isLocalStrorage,
			isMail: isMail,
			persist: persist,
			retireve: retireve,
			remove: remove
		};
	})();
	
	return Utils;
});
