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
	<div id="page3" class="page" align="center" style="margin: auto;">
		<div class="startBlock">results</div>
		<div class="actions">
			<a href="index.php" title="accueil" alt="accueil"  class="logout"></a>
			<span class="titlepage">Résultat</a>
		</div>
		<div class="container">
			<span class="customtitle"></span>
			<div class="result-container">
				<?php
					$results = getResults();
					
					foreach($results['results'] as $key => $result){
						if($result['results'][0] != null){
							$maxPc = 0;
							foreach($result['results'] as $key => $candidate){
								if($candidate['score'] > $maxPc){
									$maxPc = $candidate['score'];
								}
							}
							
							echo '<div class="scrutin" id="'.$result['electionId'].'">'
								.'<div class="name"><img src="img/info32.png" class="infoscrutin"/>'.$result['electionType'].'</div>'
								.'<div class="winner"><img src="'.$result['results'][0]['piclink_anim'].'" /></div>'
								.'<div class="resultats">';
								foreach($result['results'] as $key => $candidate){
									echo '<div class="head"><img src="'.$candidate['piclink_anim'].'" /></div> '
									.'<div class="bar">'
										.'<div class="load" style="width: '.round($candidate['score']*(100/$maxPc), 0).'%;"></div>'
										.'<div class="name">'.$candidate['name'].'</div>'
										.'<div class="pc">'.$candidate['score'].$candidate['unit'].'</div>'
									.'</div><br/>';
								}
								echo '</div>'
							.'</div>';
						}
					}
					echo '<div class="clear"></div>';
				?>
			</div>
		</div>
		<div class="footer" ></div>
	</div>
</body>
</html>
