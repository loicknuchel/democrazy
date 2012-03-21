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
		
		function retireve(eltId)
		{
			if(isLocalStrorage()){
				return localStorage[eltId];
			} else {

				return getUrlVars()[eltId];
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
		
		function getUrlVars()
		{
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		}

		return {
			getUrlVars : getUrlVars,
			isLocalStrorage: isLocalStrorage,
			isMail: isMail,
			persist: persist,
			retireve: retireve,
			remove: remove
		};
	})();
	
	return Utils;
});
