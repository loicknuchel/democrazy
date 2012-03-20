define([ "require_jquery" ], function($) {
	var Api = (function() {
		var apiUrl = "http://democrazy.fr/4f16fe2299c7a10001000012/";
		var staticMode = false;
		
		// public
		function getCandidates(callback) {
			if(staticMode){
				callback(JSON.parse('[{"voxe_id":"4f1ec52d997d28000100000b","name":"Nathalie Arthaud","piclink72":"images/candidats72/nathalie_arthaud.png"},{"voxe_id":"4ef479fdbc60fb000400026e","name":"Fran\u00e7ois Bayrou","piclink72":"images/candidats72/francois_bayrou.png"},{"voxe_id":"4f298b733f56cd0008000014","name":"Jacques Cheminade","piclink72":"images/candidats72/jacques_cheminade.png"},{"voxe_id":"4f1888db5c664f0001000118","name":"Nicolas Dupont-Aignan","piclink72":"images/candidats72/nicolas_dupont_aignan.png"},{"voxe_id":"4f188a58f8104a0001000003","name":"Fran\u00e7ois Hollande","piclink72":"images/candidats72/francois_hollande.png"},{"voxe_id":"4f1887545c664f000100010e","name":"Eva Joly","piclink72":"images/candidats72/eva_joly.png"},{"voxe_id":"4f1491280bc89a0001000002","name":"Marine Le Pen","piclink72":"images/candidats72/marine_le_pen.png"},{"voxe_id":"4f188a20f8104a0001000001","name":"Jean-Luc M\u00e9lenchon","piclink72":"images/candidats72/jean_luc_melenchon.png"},{"voxe_id":"4ef479fdbc60fb0004000264","name":"Nicolas Sarkozy","piclink72":"images/candidats72/nicolas_sarkozy.png"}]'));
			} else {
				var apiCall = apiUrl+"candidates?callback=?";
				$.ajax({
					url: apiCall,
					success: function(data) {
						callback(data);
					},
					dataType: 'jsonp'
				});
			}
		}

		function premierTourVote(id_voxe, userIdf, callback){
			if(staticMode){
				var data = '{"code":200}';
				var rep = JSON.parse(data);
				callback(rep['code']);
			} else {
				var apiCall = apiUrl+"opinion/"+userIdf.mail+"/set_firstturn/?candidate="+id_voxe+"&email="+encodeURIComponent(userIdf.mail)+"&callback=?";
				$.ajax({
					url: apiCall,
					success: function(data) {
						callback(data['code']);
					},
					dataType: 'jsonp'
				});
			}
		}

		function listCandidatVote(ids, userIdf, callback){
			if(staticMode){
				var data = '{"code":200}';
				var rep = JSON.parse(data);
				callback(rep['code']);
			} else {
				var apiCall = apiUrl+"opinion/"+userIdf.mail+"/set_order/?candidates="+ids+"&callback=?";
				$.ajax({
					url: apiCall,
					success: function(data) {
						callback(data['code']);
					},
					dataType: 'jsonp'
				});
			}
		}

		function getResults(callback){
			if(staticMode){
				callback(JSON.parse('{"nb_votes":42,"results":[{"electionType":"traditionnal","electionId":"1","results":[{"name":"sarkozy","voxe_id":1,"piclink_anim":"images/candidats_anim/nicolas_sarkozy.png","score":"41"},{"name":"hollande","voxe_id":2,"piclink_anim":"images/candidats_anim/francois_hollande.png","score":"20"},{"name":"joly","voxe_id":3,"piclink_anim":"images/candidats_anim/eva_joly.png","score":"10"},{"name":"bayrou","voxe_id":4,"piclink_anim":"images/candidats_anim/francois_bayrou.png","score":"6.7"},{"name":"melenchon","voxe_id":5,"piclink_anim":"images/candidats_anim/jean_luc_melenchon.png","score":"6.3"},{"name":"poutou","voxe_id":6,"piclink_anim":"","score":"6"},{"name":"cheminade","voxe_id":7,"piclink_anim":"images/candidats_anim/jacques_cheminade.png","score":"5.8"},{"name":"dupont-aignan","voxe_id":8,"piclink_anim":"images/candidats_anim/nicolas_dupont_aignan.png","score":"3.5"},{"name":"le-pen","voxe_id":9,"piclink_anim":"images/candidats_anim/marine_le_pen.png","score":"1.2"},{"name":"arthaud","voxe_id":10,"piclink_anim":"images/candidats_anim/nathalie_arthaud.png","score":"0.5"}]},{"electionType":"condorcet","electionId":"2","results":[{"name":"hollande","voxe_id":2,"piclink_anim":"images/candidats_anim/francois_hollande.png","score":"45"},{"name":"joly","voxe_id":3,"piclink_anim":"images/candidats_anim/eva_joly.png","score":"20"},{"name":"cheminade","voxe_id":7,"piclink_anim":"images/candidats_anim/jacques_cheminade.png","score":"10"},{"name":"dupont-aignan","voxe_id":8,"piclink_anim":"images/candidats_anim/nicolas_dupont_aignan.png","score":"8"},{"name":"sarkozy","voxe_id":1,"piclink_anim":"images/candidats_anim/nicolas_sarkozy.png","score":"7"},{"name":"melenchon","voxe_id":5,"piclink_anim":"images/candidats_anim/jean_luc_melenchon.png","score":"5"},{"name":"poutou","voxe_id":6,"piclink_anim":"","score":"2.5"},{"name":"le-pen","voxe_id":9,"piclink_anim":"images/candidats_anim/marine_le_pen.png","score":"2"},{"name":"bayrou","voxe_id":4,"piclink_anim":"images/candidats_anim/francois_bayrou.png","score":"0.4"},{"name":"arthaud","voxe_id":1,"piclink_anim":"images/candidats_anim/nathalie_arthaud.png","score":"0.1"}]}]}'));
			} else {
				var apiCall = apiUrl+"results?callback=?";
				$.ajax({
					url: apiCall,
					success: function(data) {
						callback(data);
					},
					dataType: 'jsonp'
				});
			}
		}

		return {
			getCandidates: getCandidates,
			getResults: getResults,
			premierTourVote: premierTourVote,
			listCandidatVote: listCandidatVote
		};
	})();
	return Api;
});
