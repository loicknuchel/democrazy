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
	<div id="page0" class="page" align="center" style="margin: auto;">
		<div class="startBlock">login</div>
		<div class="UserIdf">
			
			<div class="acroche">Vous élisez,<br>les règles du jeu décident.</div>

			
			<div>Pour voter, entrer votre mail<br><input class="rounded" type="text" name="mail" placeholder="Votre mail" /></div>
			<div class="send" style="padding-bottom:10px;">
				<input type="submit" value="Envoyer" class="ui-button ui-widget ui-state-default ui-corner-all" />
			</div>
			<div align="center" class="ptttxt">
				<br>
				<font class="titre">Democrazy est une expérimentation de différents modes de scrutins</font><br>
			    &bull; Scrutin à un tour &bull;<br>
    			&bull; Scrutin majoritaire à deux tours (système actuel) &bull;<br>
    			&bull; Scrutin par élimination &bull;<br>
    			&bull; Scrutin plurinominal majoritaire (dit de Borda) &bull;<br>
    			&bull; Méthode de Condorcet &bull;<br>

			</div>

			<p style="margin:0; line-height:20pt;">
			<a  style="font-size:11pt; line-height:20pt; background-color:transparent;" href="info.php" target="info">en savoir plus...</a>
			<br>
			<a  style="line-height:20pt; font-size:11pt; background-color:transparent;" href="results.php" target="_self" >les résultats...</a>
		</p>
			<div class="logo">
				<a href="premier_tour.php"><img class="letter" src="img/letter.jpg" style="width: 70px; display: inline;" /></a>
				<img class="urne" src="img/urne.png" style="width: 280px;" />
			</div>
			<div class="share">
				<div class="fb-like facebook" data-send="false" data-layout="button_count" data-width="100" data-show-faces="false" data-href="https://www.facebook.com/Democrazy2012"></div><div id="fb-root" class="facebook"></div>
				<div class="g-plusone" data-size="small"></div>
				<a href="https://twitter.com/share" class="twitter-share-button" data-text="Je viens de voter sur" data-lang="fr" data-hashtags="voxe2012" data-url="http://democrazy.fr/" data-via="democrazy2012" class="twitter">Tweeter</a>
				<script type="text/javascript" src="https://apis.google.com/js/plusone.js">{lang: 'fr'}</script>
				<script>(function(d,s,id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
			</div>
		</div>
		
	</div>
</body>
</html>
