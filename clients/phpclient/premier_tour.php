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
	<div id="page1" class="page" align="center" style="margin: auto; position:relative">
		<div class="startBlock">premier_tour</div>
		<div class="actions">
			<a href="index.php" title="se déconnecter" alt="se déconnecter"  class="logout"></a>
			<span class="customtitle">Scrutin à un tour</a>
		</div>
		<div class="title customtitle">
			Pour quel candidat voteriez vous au premier tour ?
		</div>
		<div class="candidats" align="center">
			<?php
				$candidates = getCandidates();
				/*echo '<pre>';
				print_r($candidates);
				echo '</pre>';*/
				$pos = 0;
				foreach($candidates as $key => $candidate){
					echo '<div class="candidat" id="'.$candidate['voxe_id'].'">'
						. '<div class="pic" style="background: url('.$candidate['piclink72'].');"></div>'
						. '<div>'.$candidate['name'].'</div>'
						. '<div class="infocandidatdiv"><a target="'.$candidate['voxe_id'].'" href="'.$candidate['urlinfo'].'"><img src="img/info32.png" class="infocandidat"/></a></div>'
					. '</div>';
					
					if($pos == 2){
						echo '<div class="clear"></div>';
						$pos = 0;
					} else {
						$pos++;
					}
				}
				echo '<div class="clear"></div>';
			?>
		</div>
		
			<div class="send">
				<input type="submit" value="Envoyer" class="ui-button ui-widget ui-state-default ui-corner-all" />
			</div>
		<div class="footer" ></div>
	</div>
</body>
</html>
