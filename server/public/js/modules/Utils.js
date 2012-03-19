define([], function() {
	var Utils = (function() {
		// public
		function isLocalStrorage() {
			return typeof localStorage != "undefined";
		}
		
		function isPlaceholder(){
			return 'placeholder' in document.createElement('input');
		}
		
		function getAnchor(){
			var hash = window.location.hash;
			return hash.substring(1);
		}
		
		function isMail(str){
			if(str != null && str != ''){
				return true;
			}
			return false;
		}

		return {
			isLocalStrorage: isLocalStrorage,
			isPlaceholder: isPlaceholder,
			isMail: isMail,
			getAnchor: getAnchor
		};
	})();
	return Utils;
});
