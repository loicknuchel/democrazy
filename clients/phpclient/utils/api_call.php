<?php

function getStatus(){return "LOCAL";}
function getStaticMode(){return false;}

function getCandidates(){
	$staticMode = getStaticMode();
	if($staticMode){
		$json = '[{"voxe_id":"4f1ec52d997d28000100000b","name":"Nathalie Arthaud","piclink72":"http://democrazy.fr/images/candidats72/nathalie_arthaud.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nathalie_arthaud.png","urlinfo":"http://www.nathalie-arthaud.info/"},{"voxe_id":"4ef479fdbc60fb000400026e","name":"Fran\u00e7ois Bayrou","piclink72":"http://democrazy.fr/images/candidats72/francois_bayrou.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/francois_bayrou.png","urlinfo":"http://www.bayrou.fr/"},{"voxe_id":"4f298b733f56cd0008000014","name":"Jacques Cheminade","piclink72":"http://democrazy.fr/images/candidats72/jacques_cheminade.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/jacques_cheminade.png","urlinfo":"http://www.cheminade2012.fr/Preface_00434"},{"voxe_id":"4f1888db5c664f0001000118","name":"Nicolas Dupont-Aignan","piclink72":"http://democrazy.fr/images/candidats72/nicolas_dupont_aignan.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nicolas_dupont_aignan.png","urlinfo":"http://www.debout-la-republique.fr/projet-presidentiel-de-nicolas-dupont-aignan-31-propositions"},{"voxe_id":"4f188a58f8104a0001000003","name":"Fran\u00e7ois Hollande","piclink72":"http://democrazy.fr/images/candidats72/francois_hollande.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/francois_hollande.png","urlinfo":"http://francoishollande.fr/"},{"voxe_id":"4f1887545c664f000100010e","name":"Eva Joly","piclink72":"http://democrazy.fr/images/candidats72/eva_joly.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/eva_joly.png","urlinfo":"http://evajoly2012.fr/"},{"voxe_id":"4f1491280bc89a0001000002","name":"Marine Le Pen","piclink72":"http://democrazy.fr/images/candidats72/marine_le_pen.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/marine_le_pen.png","urlinfo":"http://www.marinelepen2012.fr/le-projet/"},{"voxe_id":"4f188a20f8104a0001000001","name":"Jean-Luc M\u00e9lenchon","piclink72":"http://democrazy.fr/images/candidats72/jean_luc_melenchon.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/jean_luc_melenchon.png","urlinfo":"http://www.lhumaindabord2012.fr/"},{"voxe_id":"4ef479fdbc60fb0004000264","name":"Nicolas Sarkozy","piclink72":"http://democrazy.fr/images/candidats72/nicolas_sarkozy.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nicolas_sarkozy.png","urlinfo":"http://statique.lemouvementpopulaire.fr/DIVERS/Supp.Mag%2055-Projet_2012_bdf.pdf"}]';
	} else {
		$json = getJson("GET", "http://democrazy.fr/4f16fe2299c7a10001000012/candidates", null);
	}
	$candidates = json_decode($json, true);
	return $candidates;
}

function getResults(){
	$staticMode = getStaticMode();
	if($staticMode){
		$json = '{"results":[{"electionType":"Syst\u00e8me actuel, 1er tour","electionId":1,"results":[{"voxe_id":"4f188a20f8104a0001000001","name":"Jean-Luc M\u00e9lenchon","piclink72":"http://democrazy.fr/images/candidats72/jean_luc_melenchon.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/jean_luc_melenchon.png","urlinfo":"http://www.lhumaindabord2012.fr/","score":33,"unit":"%"},{"voxe_id":"4ef479fdbc60fb000400026e","name":"Fran\u00e7ois Bayrou","piclink72":"http://democrazy.fr/images/candidats72/francois_bayrou.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/francois_bayrou.png","urlinfo":"http://www.bayrou.fr/","score":24,"unit":"%"},{"voxe_id":"4f188a58f8104a0001000003","name":"Fran\u00e7ois Hollande","piclink72":"http://democrazy.fr/images/candidats72/francois_hollande.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/francois_hollande.png","urlinfo":"http://francoishollande.fr/","score":17,"unit":"%"},{"voxe_id":"4f1887545c664f000100010e","name":"Eva Joly","piclink72":"http://democrazy.fr/images/candidats72/eva_joly.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/eva_joly.png","urlinfo":"http://evajoly2012.fr/","score":13,"unit":"%"},{"voxe_id":"4ef479fdbc60fb0004000264","name":"Nicolas Sarkozy","piclink72":"http://democrazy.fr/images/candidats72/nicolas_sarkozy.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nicolas_sarkozy.png","urlinfo":"http://statique.lemouvementpopulaire.fr/DIVERS/Supp.Mag%2055-Projet_2012_bdf.pdf","score":6,"unit":"%"},{"voxe_id":"4f1888db5c664f0001000118","name":"Nicolas Dupont-Aignan","piclink72":"http://democrazy.fr/images/candidats72/nicolas_dupont_aignan.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nicolas_dupont_aignan.png","urlinfo":"http://www.debout-la-republique.fr/projet-presidentiel-de-nicolas-dupont-aignan-31-propositions","score":2,"unit":"%"},{"voxe_id":"4f1491280bc89a0001000002","name":"Marine Le Pen","piclink72":"http://democrazy.fr/images/candidats72/marine_le_pen.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/marine_le_pen.png","urlinfo":"http://www.marinelepen2012.fr/le-projet/","score":2,"unit":"%"},{"voxe_id":"4f1ec53d997d28000100000c","name":"Philippe Poutou","piclink72":"http://democrazy.fr/images/candidats72/philippe_poutou.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/philippe_poutou.png","urlinfo":"http://poutou2012.org/-Dossiers-","score":2,"unit":"%"},{"voxe_id":"4f298b733f56cd0008000014","name":"Jacques Cheminade","piclink72":"http://democrazy.fr/images/candidats72/jacques_cheminade.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/jacques_cheminade.png","urlinfo":"http://www.cheminade2012.fr/Preface_00434","score":1,"unit":"%"},{"voxe_id":"4f1ec52d997d28000100000b","name":"Nathalie Arthaud","piclink72":"http://democrazy.fr/images/candidats72/nathalie_arthaud.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nathalie_arthaud.png","urlinfo":"http://www.nathalie-arthaud.info/","score":0,"unit":"%"}]},{"electionType":"Syst\u00e8me actuel, 2e tour","electionId":2,"results":[{"voxe_id":"4f188a20f8104a0001000001","name":"Jean-Luc M\u00e9lenchon","piclink72":"http://democrazy.fr/images/candidats72/jean_luc_melenchon.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/jean_luc_melenchon.png","urlinfo":"http://www.lhumaindabord2012.fr/","score":53,"unit":"%"},{"voxe_id":"4ef479fdbc60fb000400026e","name":"Fran\u00e7ois Bayrou","piclink72":"http://democrazy.fr/images/candidats72/francois_bayrou.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/francois_bayrou.png","urlinfo":"http://www.bayrou.fr/","score":47,"unit":"%"}]},{"electionType":"Scrutin par \u00e9limination","electionId":3,"results":[{"voxe_id":"4f188a20f8104a0001000001","name":"Jean-Luc M\u00e9lenchon","piclink72":"http://democrazy.fr/images/candidats72/jean_luc_melenchon.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/jean_luc_melenchon.png","urlinfo":"http://www.lhumaindabord2012.fr/","score":111,"unit":""},{"voxe_id":"4ef479fdbc60fb000400026e","name":"Fran\u00e7ois Bayrou","piclink72":"http://democrazy.fr/images/candidats72/francois_bayrou.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/francois_bayrou.png","urlinfo":"http://www.bayrou.fr/","score":52,"unit":""},{"voxe_id":"4f188a58f8104a0001000003","name":"Fran\u00e7ois Hollande","piclink72":"http://democrazy.fr/images/candidats72/francois_hollande.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/francois_hollande.png","urlinfo":"http://francoishollande.fr/","score":24,"unit":""},{"voxe_id":"4f1887545c664f000100010e","name":"Eva Joly","piclink72":"http://democrazy.fr/images/candidats72/eva_joly.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/eva_joly.png","urlinfo":"http://evajoly2012.fr/","score":17,"unit":""},{"voxe_id":"4ef479fdbc60fb0004000264","name":"Nicolas Sarkozy","piclink72":"http://democrazy.fr/images/candidats72/nicolas_sarkozy.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nicolas_sarkozy.png","urlinfo":"http://statique.lemouvementpopulaire.fr/DIVERS/Supp.Mag%2055-Projet_2012_bdf.pdf","score":10,"unit":""},{"voxe_id":"4f1491280bc89a0001000002","name":"Marine Le Pen","piclink72":"http://democrazy.fr/images/candidats72/marine_le_pen.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/marine_le_pen.png","urlinfo":"http://www.marinelepen2012.fr/le-projet/","score":5,"unit":""},{"voxe_id":"4f1ec52d997d28000100000b","name":"Nathalie Arthaud","piclink72":"http://democrazy.fr/images/candidats72/nathalie_arthaud.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nathalie_arthaud.png","urlinfo":"http://www.nathalie-arthaud.info/","score":5,"unit":""},{"voxe_id":"4f1ec53d997d28000100000c","name":"Philippe Poutou","piclink72":"http://democrazy.fr/images/candidats72/philippe_poutou.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/philippe_poutou.png","urlinfo":"http://poutou2012.org/-Dossiers-","score":2,"unit":""},{"voxe_id":"4f298b733f56cd0008000014","name":"Jacques Cheminade","piclink72":"http://democrazy.fr/images/candidats72/jacques_cheminade.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/jacques_cheminade.png","urlinfo":"http://www.cheminade2012.fr/Preface_00434","score":1,"unit":""},{"voxe_id":"4f1888db5c664f0001000118","name":"Nicolas Dupont-Aignan","piclink72":"http://democrazy.fr/images/candidats72/nicolas_dupont_aignan.png","piclink_anim":"http://democrazy.fr/images/candidats_anim/nicolas_dupont_aignan.png","urlinfo":"http://www.debout-la-republique.fr/projet-presidentiel-de-nicolas-dupont-aignan-31-propositions","score":1,"unit":""}]}],"nb_votes":116}';
	} else {
		$json = getJson("GET", "http://democrazy.fr/4f16fe2299c7a10001000012/results", null);
	}
	$results = json_decode($json, true);
	return $results;
}


function getJson($method, $url, $data){
	$debug = false;
	
	if($method == 'POST'){$file = http_post($url, $data, $debug);}
	else if($method == 'GET'){$file = http_get($url, $data, $debug);}
	else{$file = false;}
	
	return $file;
}

function http_get($url, $data, $debug = false){
	if(getStatus() == "LOCAL"){
		$params = '';
		if($data != null){
			$cpt = 0;
			foreach($data as $key => $value){
				if($cpt == 0){$params .= '?'.$key.'='.$value;}
				else{$params .= '&'.$key.'='.$value;}
				$cpt++;
			}
		}
		if($debug == true){echo '<pre>GET '.$url.$params.'</pre>';}
		return file_get_contents($url.$params);
	}
	else{ // file_get_contents NOT ALLOWED ON WEBSERVER !!!
		$params = '';
		if($data != null){
			$cpt = 0;
			foreach($data as $key => $value){
				if($cpt == 0){$params .= '?'.$key.'='.urlencode($value);}
				else{$params .= '&'.$key.'='.urlencode($value);}
				$cpt++;
			}
		}
		if($debug == true){echo '<pre>GET '.$url.$params.'</pre>';}
		return get_file_content($url.$params);
	}
}

function http_post($url, $data, $debug = false){
	if(getStatus() == "LOCAL"){
		$data_url = http_build_query($data);
		$data_len = strlen ($data_url);

		if($debug == true){
			$params = '';
			if($data != null){
				$cpt = 0;
				foreach($data as $key => $value){
					if($cpt == 0){$params .= '?'.$key.'='.urlencode($value);}
					else{$params .= '&'.$key.'='.urlencode($value);}
					$cpt++;
				}
			}
			echo '<pre>POST '.$url.$params.'&meth=post'.'</pre>';
		}
		return file_get_contents($url, false,
				stream_context_create(
					array(
						'http'=>array(
							'method'=>	'POST',
							'header'=>	"Connection: close\r\n".
										"Content-Type: application/x-www-form-urlencoded\r\n". 
										"Content-Length: ".$data_len."\r\n",
							'content'=>	$data_url
						)		
					)
				)
			);
	}
	else{ // file_get_contents NOT ALLOWED ON WEBSERVER !!!
		$params = '';
		if($data != null){
			$cpt = 0;
			foreach($data as $key => $value){
				if($cpt == 0){$params .= '?'.$key.'='.urlencode($value);}
				else{$params .= '&'.$key.'='.urlencode($value);}
				$cpt++;
			}
		}
		if($debug == true){echo '<pre>POST '.$url.$params.'&meth=post'.'</pre>';}
		return get_file_content($url.$params.'&meth=post');
	}
}

function get_file_content($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$ret = curl_exec($ch);
	curl_close($ch);
	return $ret;
}

?>