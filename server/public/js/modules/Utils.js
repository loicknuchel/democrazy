define([], function() {
	var Utils = (function() {
		// public
		function isMail(str){
			if(str != null && str != ''){
				return true;
			}
			return false;
		}
		
		return {
			isMail: isMail
		};
	})();
	
	return Utils;
});
