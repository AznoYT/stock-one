<!DOCTYPE html>
<!-- other.php -->
<?php session_start(); ?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Snake Game</title>
		<link rel='stylesheet' type='text/css' href='../css/other.css' />
		<link rel="icon" type="image/png" href="../pics/icon.png" />
		<script language="javascript" type="text/javascript" src="../js/script.js"></script>
		<script language="javascript" type="text/javascript" src="../js/other.js"></script>
	</head>
	<?php
		if(isset($_SESSION['user'])) { echo(''); }
		else { header('location: ../#'); }
	?>
	<body>
		<header>
			<h4 id="instr">Appuyez sur Espace pour lancer le jeu & Echap pour quitter</h4>
		</header>
		<section>
			<center>
				<canvas id="canvas" width="1000px" height="600px" />
			</center>
		</section>
		<section class="stats" id="stats">
			<p id="score">Score: 0</p>
			<p id="food">Pomme Manger: 0</p>
		</section>
		<footer></footer>
	</body>
</html>
<!-- END -->