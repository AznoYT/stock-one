<!DOCTYPE html>
<!-- client.php -->
<html>
	<?php
		session_start();
		try { $bdd = new PDO('mysql:host=127.0.0.1;dbname=stock-one;charset=utf8', 'root', 'toor'); }
		catch(Exception $e) { die('ERROR : '.$e->getMessage()); }
		
		function list_fichiers($file, $dir) { // Fonction de listing de fichiers
			if($file[2] == 'folder') { echo(""); }
			else if($file[2] == 'png' || $file[2] == 'jpeg' || $file[2] == 'jpg' || $file[2] == 'gif' || $file[2] == 'bmp' ) { echo("<img class=\"classement\" height=\"15px\" src=\"./pics/".$dir."gallery.png\" /><input class=\"list\" type=\"button\" onclick=\"popupaction(4, '$file[4]$file[3]', 1, '$file[3]', '$file[5]');\" value=\"$file[3]\" title=\"$file[3]\" /><br />"); }
			else if($file[2] == 'mp3' || $file[2] == 'wav' || $file[2] == 'wma' || $file[2] == 'aac' || $file[2] == 'ac3' || $file[2] == 'm4a') { echo("<img class=\"classement\" height=\"15px\" src=\"./pics/".$dir."music.png\" /><input class=\"list\" type=\"button\" onclick=\"popupaction(4, '$file[4]$file[3]', 2, '$file[3]', '$file[5]');\" value=\"$file[3]\" title=\"$file[3]\" /><br />"); }
			else if($file[2] == 'txt' || $file[2] == 'log' || $file[2] == 'py' || $file[2] == 'pl' || $file[2] == 'js' || $file[2] == 'css' || $file[2] == 'php' || $file[2] == 'html' || $file[2] == 'sql' || $file[2] == 'pdf') { echo("<img class=\"classement\" height=\"15px\" src=\"./pics/".$dir."text-file.png\" /><input class=\"list\" type=\"button\" onclick=\"popupaction(4, '$file[4]$file[3]', 3, '$file[3]', '$file[5]');\" value=\"$file[3]\" title=\"$file[3]\" /><br />"); }
			else if($file[2] == 'mp4') { echo("<img class=\"classement\" height=\"15px\" src=\"./pics/".$dir."movie.png\" /><input class=\"list\" type=\"button\" onclick=\"popupaction(4, '$file[4]$file[3]', 4, '$file[3]', '$file[5]');\" value=\"$file[3]\" title=\"$file[3]\" /><br />"); }
			else { echo("<img class=\"classement\" height=\"15px\" src=\"./pics/".$dir."text-file.png\" /><a href=\"$file[4]$file[3]\" download><input class=\"list\" type=\"button\" value=\"$file[3]\" title=\"$file[3]\" /></a><br />"); }
		}
		
		function list_dossiers($file, $dir) { // Fonction de listing de dossiers
			if($file[2] == 'folder') { echo("<img class=\"classement\" height=\"15px\" src=\"./pics/".$dir."folder.png\" /><input class=\"list\" type=\"submit\" name=\"folder\" value=\"$file[3]\" title=\"$file[3]\" /><br />"); }
			else { echo(""); }
		}
	?>
	<head>
		<meta charset="UTF-8">
		<title>Stock One - Cloud [USER MODE]</title>
		<?php
			switch($_SESSION['theme']) {
				case 'default': $dir = "default/"; $thumb = "#002200"; $rgb = "rgb(0,0,0)"; $rgb_r = "rgb(180,180,180)"; $border = "#CCCCCC"; $bgcolor = "#000000"; $bglist = "#333333"; $color = "#CCCCCC"; $actcolor = "#00FF00"; $stick1 = "#888888"; $stick2 = "#999999"; $stick3 = "#AAAAAA"; $stick4 = "#BBBBBB"; $stick5 = "#CCCCCC"; break;
				case 'reverse': $dir = "reverse/"; $thumb = "#000000"; $rgb = "rgb(180,180,180)"; $rgb_r = "rgb(0,0,0)"; $border = "#000000"; $bgcolor = "#CCCCCC"; $bglist = "#999999"; $color = "#000000"; $actcolor = "#00AA00"; $stick1 = "#444444"; $stick2 = "#333333"; $stick3 = "#222222"; $stick4 = "#111111"; $stick5 = "#000000"; break;
				case 'red_line': $dir = "default/"; $thumb = "#220000"; $rgb = "rgb(180,0,0)"; $rgb_r = "rgb(25,0,0)"; $border = "#CC0000"; $bgcolor = "#110000"; $bglist = "#330000"; $color = "#CC0000"; $actcolor = "#00FF00"; $stick1 = "#880000"; $stick2 = "#990000"; $stick3 = "#AA0000"; $stick4 = "#BB0000"; $stick5 = "#CC0000"; break;
				case 'green_line': $dir = "default/"; $thumb = "#002200"; $rgb = "rgb(0,180,0)"; $rgb_r = "rgb(0,25,0)"; $border = "#00CC00"; $bgcolor = "#001100"; $bglist = "#003300"; $color = "#00CC00"; $actcolor = "#00FF00"; $stick1 = "#008800"; $stick2 = "#009900"; $stick3 = "#00AA00"; $stick4 = "#00BB00"; $stick5 = "#00CC00"; break;
				case 'blue_line': $dir = "default/"; $thumb = "#002222"; $rgb = "rgb(0,180,180)"; $rgb_r = "rgb(0,25,25)"; $border = "#00CCCC"; $bgcolor = "#001111"; $bglist = "#003333"; $color = "#00CCCC"; $actcolor = "#00FF00"; $stick1 = "#008888"; $stick2 = "#009999"; $stick3 = "#00AAAA"; $stick4 = "#00BBBB"; $stick5 = "#00CCCC"; break;
			}
		?>
		<link rel="stylesheet" type="text/css" href="./css/style.css" />
		<link rel="stylesheet" type="text/css" href="./css/scroll.css" />
		<link rel="icon" type="image/png" href="./pics/icon.png" />
		<?php include("./pages/theme.php"); ?>
		<script language="javascript" type="text/javascript" src="./js/script.js"></script>
	</head>
	<body onload="startTime();">
		<header>
			<div class="time" id="txt"></div>
			<div class="time info">
				<?php
					if(isset($_SESSION['user'])) {
						$user = $_SESSION['user'];
						$_SESSION['mode'] = "client";
						echo("<a class='profile' title='Paramètre du Compte Utilisateur' href='./pages/compteuser.php'><img class='avatar' height='25px' src='./pics/user.png' />$user</a>");
					}
					else { header("location: ./index.html"); }
				?>
			</div>
			<div class="h-butons">
				<?php
					if($_SESSION['profile'] == "ADMIN") {
						echo('<div class="userswitch">');
						echo('<input type="checkbox" name="userswitch" class="userswitch-checkbox" id="myuserswitch" onclick="adminswitch(1);" />');
						echo('<label class="userswitch-label" for="myuserswitch">');
						echo('<span class="userswitch-inner"></span>');
						echo('<span class="userswitch-switch"></span>');
						echo('</label>');
						echo('</div>');
					}
					else if($_SESSION['profile'] == "USER") { echo(""); }
				?>
				<input class="color" type="button" value="Tchat" title="Faire apparaître le tchat IRC" onclick="popupaction(5);" />
				<input class="color" type="button" value="Créer un dossier" onclick="popupaction(3);" />
				<input class="color" type="button" value="Importer" onclick="popupaction(1, 0 , 0);" />
				<input class="color" type="button" value="Déconnexion" onclick="popupaction(2);" />
			</div>
			<img class='logo' height="30px" src="./pics/logo.png" />
			<h1>Stock One</h1>
		</header>
		<section id="UserPanel">
			<aside class="left">
				<h2>Racine [./]</h2>
				<div class="content">
					<form action method="get">
						<?php
							for($tour = 0; $tour < 2; $tour++) { // Code réagencer pour le listing des dossiers séparer des fichiers
								$data = [$bdd->query('SELECT * FROM donnee'), $bdd->query('SELECT * FROM donnee'), $bdd->query('SELECT * FROM donnee')];
								
								switch($tour) {
									case 0:
										while($file = $data[0]->fetch()) {
											if($user == $file[1]) { list_dossiers($file, $dir); }
										} break;
									
									case 1:
										while($file = $data[0]->fetch()) {
											if($user == $file[1]) { list_fichiers($file, $dir); }
										} break;
								}
							}
						?>
					</form>
				</div>
			</aside>
			<article>
				<h2>Dossier [<?php if(!isset($_GET['folder'])) { echo(""); } else { echo($_GET['folder']."/"); } ?>]</h2>
				<div class="content">
					<form action method="get">
						<?php
							if(!isset($_GET['folder'])) { echo(""); }
							else if($_GET['folder']) { echo("<img class=\"classement\" height=\"15px\" src=\"./pics/".$dir."folder.png\" /><input class=\"list\" type=\"submit\" value=\"..\" title=\"..\" /><br />"); }
							
							while($file = $data[1]->fetch()) {
								if($user == $file[1]) {
									if(!isset($_GET['folder'])) { list_dossiers($file, $dir); }
									
									if(!isset($file[8])) { echo(""); }
									else if($file[8] == $_GET['folder']) { list_dossiers($file, $dir); }
								}
							}
						?>
					</form>
				</div>
			</article>
			<aside class="right">
				<h2>Fichiers du dossier</h2>
				<div class="content">
					<?php
						while($file = $data[2]->fetch()) {
							if($user == $file[1]) {
								if(!isset($_GET['folder'])) { list_fichiers($file, $dir); }
							}
						}
					?>
				</div>
			</aside>
			<!-- Le changement de popup s'opérera sur cette balise div depuis le javascript -->
			<div id="popup"></div>
			<div id="popupabout">
				<?php
					if(!isset($_GET['code'])) { echo(""); }
					else {
						switch($_GET['code']) {
							case 1: $action = 'Copie'; $objet = 'fichier'; $directory = 'client.php'; break;
							case 2: $action = 'Déplacement'; $objet = 'fichier'; $directory = 'client.php'; break;
							case 3: $action = 'Suppression'; $objet = 'fichier'; $directory = 'client.php'; break;
							case 4: $action = 'Importation'; $objet = 'fichier'; $directory = 'compteuser.php'; break;
							case 5: $action = 'Modification'; $objet = 'compte'; $directory = 'compteuser.php'; break;
						}
						
						switch($_GET['etat']) {
							case 'OK': $msg = '<font id="msg3">> L\'action mené au '.$objet.' à bien été éxecuter.</font>'; break;
							case 'ERREUR': $msg = '<font id="msg0">> L\'action mené au '.$objet.' fichier à rencontrer une erreur.</font>'; break;
						}
						
						echo("<fieldset>");
						echo("<Legend>Confirmation de $action:</Legend>");
						echo($msg);
						echo("<br /><br />");
						echo('<input type="button" onclick="moreaction(0); document.location = \'./'.$directory.'\';" value="Fermer" />');
						echo("</fieldset>");
					}
				?>
			</div>
		</section>
		<footer>
			<h4>Auteur: Groupe STI2D SIN Déodat de Séverac - 2016 Novembre</h4>
		</footer>
		<div id="popup_irc"></div>
	</body>
</html>
<!-- END -->
