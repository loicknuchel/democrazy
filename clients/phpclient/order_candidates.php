<?php include_once 'utils/api_call.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta property="og:title" content="Democrazy"/>
    <meta property="og:type" content="article"/>
    <meta property="og:image" content="http://democrazy.fr/img/logo1024.png"/>
    <meta property="og:url" content="http://democrazy.fr"/>
    <meta property="og:site_name" content="democrazy">

    <link rel="icon" type="image/png" href="favicon.png">
	<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

	<meta name="viewport" content="width=device-width,initial-scale=1.0" /> 
	<title>democrazy</title>

	<!-- add font from google -->
	<link href='http://fonts.googleapis.com/css?family=Cutive&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="./css/style.css">
	<script data-main="js/boot.js" src="js/require.js"></script>
</head>
<body>
	<div id="page2" class="page" align="center" style="margin: auto;">
		<div class="startBlock">order_candidates</div>
		<div class="actions">
			<a href="index.php" title="se déconnecter" alt="se déconnecter"  class="logout"></a>
			<span class="customtitle">Méthode de Condorcet</a>
		</div>
		<div class="content-description">
			<p class="title customtitle">
				Classer les candidats par ordre de préférence décroissant
			</p>
		</div>
		<ul id="orderCandidates">
			<?php
				$candidates = getCandidates();
			
				$pos = 0;
				foreach($candidates as $key => $candidate){
					echo '<li id="'.$candidate['voxe_id'].'" class="ui-state-default">'
						.'<img align="left"  src="'.$candidate['piclink72'].'" />'
						.'<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>'
						.'<div>'.$candidate['name'].'</div>'
					.'</li>';
				}
			?>
		</ul>
		
		<div class="send">
			<input type="submit" value="Envoyer" class="ui-button ui-widget ui-state-default ui-corner-all" />
		</div>

		<div class="footer" ></div>
	</div>
</body>
</html>
