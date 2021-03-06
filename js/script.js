/************************
*                       *
*    File: script.js    *
*                       *
************************/

var packet = '';
var packet0 = '';
var a = 0;

// Affichage du temps de la machine
function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
	t = setTimeout(function() { startTime(); }, 500);
	if(a <= 4) {
		if(document.location.pathname == "/Stock-One-cloud/maintenance.html") { a = Note_annim(a, 0); }
		else { a = Note_annim(a); }
	}
	//hide_pubs();
}

function checkTime(i) {
	if (i<10) { i = 0 + i; }
	return i;
}

// Ajout d'information de note
function Note_annim(i, j) {
	var output = document.getElementById('Note_MAJ');
	var warning_msg = '<fieldset id="Note">';
	warning_msg += '<div class="title"><h3 class="alert">ATTENTION !</h3></div>';
	warning_msg += '<img height="100px" width="100px" src="./pics/alert.png" />';
	
	switch(j) {
		case 0: warning_msg += '<p class="alert alert_content">Une Mise à Jour de maintenance est en cours à ce moment même, veuillez revenir plus tard.<br /><br /><br /><br /></p>'; break;
		default: warning_msg += '<p class="alert alert_content">A l\'attention des utilisateurs,<br /><br />Des Mises à Jours auront régulièrement toutes les semaines, il est donc normal que vous rencontriez quelques bugs.</p>'; break;
	}
	
	warning_msg += '</fieldset>';
	
	if(output != undefined) {
		var msg = [document.getElementById('text_0').value, document.getElementById('text_1').value, document.getElementById('text_2').value, document.getElementById('text_3').value];
		
		switch(i) {
			case 4: document.getElementById('article').innerHTML = warning_msg; break;
			default: packet0 += msg[i]; break;
		}
		
		output.innerHTML = packet0;
		i++;
		return i;
	}
}

// Cette fonction d'alert texte l'affiche mtn sur les 2 type de connexion Login & Register
function verify(connect, pws1, pws2, usr) {
	var passed = false;
	var msg = [document.getElementById('msg0'), document.getElementById('msg1'), document.getElementById('msg2')];
	
	if(connect == 0) { // Verification Login
		if(pws1.value =='') {
			msg[1].innerHTML = 'Nom d\'utilisateur inexistant';
			pws1.focus();
		}
		else if(pws2.value == '') {
			msg[1].innerHTML = 'Mot de passe inexistant';
			pws2.focus();
		}
		else if(pws1 == 1 && pws2 == 0) { // Cette condition c'est pour le mot de passe faux
			msg[1].innerHTML = ' Nom d\'utilisateur ou mot de passe incorrect';
		}
		else { var passed = true; }
	}
	else if(connect == 1) { // Verification d'Update de Mot de Passe
		if(pws1.value =='') {
			msg[1].innerHTML = ' <-- Ce champs est vide !';
			msg[2].innerHTML = '';
			pws1.focus();
		}
		else if(pws2.value == '') {
			msg[1].innerHTML = '';
			msg[2].innerHTML = ' <-- Ce champs est vide !';
			pws2.focus();
		}
		else if(usr == "confirm" && pws1.value != pws2.value) {
			msg[1].innerHTML = ' <-- Les 2 champs sont différents !';
			msg[2].innerHTML = ' <-- Les 2 champs sont différents !';
			pws1.focus();
		}
		else if(pws1 == 1 && pws2 == 0) {
			msg[1].innerHTML = ' Nom d\'utilisateur ou mot de passe incorrect';
			msg[2].innerHTML = '';
		}
		else { var passed = true; }
	}
	else if(connect == 2) { // Verification de Register
		if(usr.value == '') {
			msg[0].innerHTML = ' <-- Ce champs est vide !';
			msg[1].innerHTML = '';
			msg[2].innerHTML = '';
			usr.focus();
		}
		else if(pws1.value == '') {
			msg[0].innerHTML = '';
			msg[1].innerHTML = ' <-- Ce champs est vide !';
			msg[2].innerHTML = '';
			pws1.focus();
		}
		else if(pws2.value == '') {
			msg[0].innerHTML = '';
			msg[1].innerHTML = '';
			msg[2].innerHTML = ' <-- Ce champs est vide !';
			pws2.focus();
		}
		else if(pws1.value != pws2.value) {
			msg[0].innerHTML = '';
			msg[1].innerHTML = ' <-- Les 2 champs sont différents !';
			msg[2].innerHTML = ' <-- Les 2 champs sont différents !';
			pws1.focus();
		}
		else if(pws1 == 1 && pws2 == 1 && usr == 0) { // Cette condition c'est pour le nom d'utilisateur déjà existant
			msg[0].innerHTML = ' Nom d\'utilisateur déjà existant';
			msg[1].innerHTML = '';
			msg[2].innerHTML = '';
		}
		else { var passed = true; }
	}
	
	return passed;
}

// Nouvelle fonction pour géré les popup de login ou register de l'index
function popuplogin(login, attempt) {
	var popup = document.getElementById('popup');
	popup.style.width = 'auto';
	popup.style.left = '12%';
	
	if(login == 1) { // Ici le Login
		popup.style.width = '42%';
		popup.style.left = '28.75%';
		
		switch(attempt) { // Ces conditions sont variante pour les chemins d'actions des formulaire si il y a un imprévue à la connexion
			case 1: packet = '<form method="post" action="./validate.php" onsubmit="return verify(0, this.lutilisateur, this.lpws);">'; break;
			default: packet = '<form method="post" action="./php/validate.php" onsubmit="return verify(0, this.lutilisateur, this.lpws);">'; break;
		}
		
		packet += '<fieldset>';
		packet += '<legend>Connexion:</legend>';
		packet += '<center>';
		packet += '<input type="hidden" name="method" value="LOGIN" />';
		packet += '<label for="userinput">';
		
		switch(attempt) {
			case 1: packet += '<img class="img_login" type="images/png" src="../pics/default/user.png" />'; break;
			default: packet += '<img class="img_login" type="images/png" src="./pics/default/user.png" />'; break;
		}
		
		packet += '</label>';
		packet += '<br />';
		packet += '<input class="text" type="text" name="lutilisateur" id="userinput" placeholder="Nom d\'Utilisateur" />';
		packet += '<br />';
		packet += '<input class="text" type="password" id="password" name="lpws" placeholder="Mot de passe" />';
		packet += '<br />';
		packet += '<font id="msg1"></font>';
		packet += '<br />';
		packet += '<input class="ACT" type="submit" value="Connexion" /> ';
	}
	else if(login == 2) { // Ici le Register
		switch(attempt) { // Même topo que pour le login
			case 1: packet = '<form method="post" action="./validate.php" onsubmit="return verify(2, this.pws, this.pws1, this.utilisateur);">'; break;
			default: packet = '<form method="post" action="./php/validate.php" onsubmit="return verify(2, this.pws, this.pws1, this.utilisateur);">'; break;
		}
		
		packet += '<fieldset>';
		packet += '<legend>Inscription:</legend>';
		packet += '<input type="hidden" name="method" value="REGISTER" />';
		packet += '<label for="userinput">Nom d\'utilisateur:*</label>';
		packet += '<br />';
		packet += '<input class="text" type="text" name="utilisateur" id="userinput" value="" />';
		packet += '<font id="msg0"></font>';
		packet += '<br />';
		packet += '<label for="nom">Nom:</label>';
		packet += '<br />';
		packet += '<input class="text" type="text" id="nom" name="Nom" value="" />';
		packet += '<br />';
		packet += '<label for="surnom">Prénom:</label>';
		packet += '<br />';
		packet += '<input class="text" type="text" id="surnom" name="prenom" value="" />';
		packet += '<br /><br />';
		packet += '<label>Sexe:</label>';
		packet += '<br />';
		packet += '<input type="radio" id="Homme" name="genre" value="Homme" checked />';
		packet += '<label for="Homme"> Homme</label>';
		packet += '<br />';
		packet += '<input type="radio" id="Femme" name="genre" value="Femme" />';
		packet += '<label for="Femme"> Femme</label>';
		packet += '<br />';
		packet += '<input type="radio" id="Autres" name="genre" value="Autres" />';
		packet += '<label for="Autres"> Autres</label>';
		packet += '<br /><br />';
		packet += '<label for="adresse">E-mail:</label>';
		packet += '<br />';
		packet += '<input class="text" type="email" id="adresse" name="email" placeholder="exemple@mail.box" />';
		packet += '<br />';
		packet += '<label for="password">Mot de passe:*</label>';
		packet += '<br />';
		packet += '<input class="text" id="password" type="password" name="pws" value="" placeholder="Mot de passe" />';
		packet += '<font id="msg1"></font>';
		packet += '<br />';
		packet += '<input class="text" id="confirmpassword" type="password" name="pws1" value="" placeholder="Confirmation" />';
		packet += '<font id="msg2"></font>';
		packet += '<br /><br />';
		packet += '<input type="checkbox" id="notif" name="notif" value="1" />';
		packet += '<label for="notif"> Souhaitez vous recevoir des notifications de la part de Stock-One</label>';
		packet += '<br />';
		packet += '<input type="checkbox" id="notifpart" name="notifpart" value="1" />';
		packet += '<label for="notifpart"> Souhaitez vous que les partenaires de Stock-One puissent vous contacter</label>';
		packet += '<br /><br />';
		packet += '<input class="ACT" type="submit" value="Inscription" /> ';
		packet += '<input class="WARN" type="reset" value="Tout Effacer" /> ';
	}
	
	switch(attempt) {
		case 1: packet += '<input type="button" onclick="document.location = \'../index.html\'" value="Retour" />'; break;
		default: packet += '<input type="button" onclick="popupaction(0);" value="Annuler" />'; break;
	}
	
	packet += '</center>'
	packet += '</fieldset>';
	packet += '</form>';
	
	popup.innerHTML = packet;
	document.getElementById('userinput').focus();
}

// Nouvelle fonction pour géré les popups d'actions du compte.
function popupaction(action, attempt, methode, nom, taille, partage, ext, owner, sharekey, ID) {
	var popup = document.getElementById('popup');
	
	if(action == 0) {
		packet = '';
		moreaction(0);
	}
	else if(action == 1) { // Ici l'upload
		popup.style.width = '30%';
		popup.style.left = '34.75%';
		moreaction(0);
		
		switch(attempt) {
			case 1: packet = '<form method="post" action="./vupload.php" enctype="multipart/form-data">'; break;
			default: packet = '<form method="post" action="./php/vupload.php" enctype="multipart/form-data">'; break;
		}
		
		packet += '<fieldset>';
		
		switch(methode) {
			case 0: packet += '<legend>Envoyer un élément: [FICHIER]</legend>'; break;
			case 1: packet += '<legend>Envoyer un élément: [DOSSIER]</legend>'; break;
		}
		
		packet += '<input type="button" onclick="popupaction(1, ' + attempt + ', 0);" value="Importer un fichier" id="file_choose" /> ';
		packet += '<input type="button" onclick="popupaction(1, ' + attempt + ', 1);" value="Importer un dossier" id="folder_choose" />';
		packet += '<br /><br />';
		
		switch(methode) {
			case 0: packet += '<input type="file" name="fichiers" id="fichiers" title="Importation de fichiers" required />'; break;
			case 1: packet += '<input type="file" name="dossier" id="dossier" title="Importation de dossiers" webkitdirectory required />';
				packet += '<br />';
				packet += '<font id="msg1">/!\\ ATTENTION: Incompatible sous Mozilla FireFox</font>';
				break;
		}
		
		packet += '<br /><br />';
		packet += '<input type="checkbox" id="public" name="Public" value="notif">';
		packet += '<label for="public"> Publique</label>';
		packet += '<br /><br />';
		
		switch(methode) {
			case 0: var CONTENT_FILE = 'fichiers'; break;
			case 1: var CONTENT_FILE = 'dossier'; break;
		}
		
		packet += '<input class="ACT" type="submit" name="submit" value="Importer" onclick="moreaction(5, ' + attempt + ', document.getElementById(\'' + CONTENT_FILE + '\').files.length);" />';
		packet += ' - ';
		
		switch(attempt) {
			case 1: packet += '<input type="button" onclick="document.location = \'../client.php\'" value="Retour" />'; break;
			default: packet += '<input type="button" onclick="popupaction(0);" value="Annuler" />'; break;
		}
		
		packet += '</fieldset>';
		packet += '</form>';
	}
	else if(action == 2) { // Ici la deconnexion
		popup.style.width = '30%';
		popup.style.left = '34.75%';
		moreaction(0);
		
		packet = '<fieldset>';
		packet += '<legend>Déconnexion:</legend>';
		packet += '<label>Êtes-vous sûre de vouloir vous déconnecter ?</label>';
		packet += '<br /><br />';
		
		switch(attempt) {
			case 1: packet += '<input class="WARN" type="button" onclick="disconnect(1, 1);" value="Oui" />'; break;
			default: packet += '<input class="WARN" type="button" onclick="disconnect(1, 0);" value="Oui" />'; break;
		}
		
		packet += ' - ';
		packet += '<input type="button" onclick="disconnect(0, 0);" value="Non" />';
		packet += '</fieldset>';
	}
	else if(action == 3) { // Ici la création de répertoire
		popup.style.width = '30%';
		popup.style.left = '34.75%';
		moreaction(0);
		
		packet = '<form method="post" action="./php/vupload.php" enctype="multipart/form-data">';
		packet += '<fieldset>';
		packet += '<legend>Nouveau Dossier:</legend>';
		packet += '<label>Nom du dossier:</label>';
		packet += '<br />';
		packet += '<input class="text" type="text" id="nom_dossier" name="Nom_Dossier" />';
		packet += '<br /><br />';
		packet += '<input type="checkbox" id="public" name="Public" value="notif">';
		packet += '<label for="public"> Publique</label>';
		packet += '<br /><br />';
		packet += '<input class="ACT" type="submit" name="option" value="Créer" />';
		packet += ' - ';
		
		switch(attempt) {
			case 1: packet += '<input type="button" onclick="document.location = \'../client.php\'" value="Retour" />'; break;
			default: packet += '<input type="button" onclick="popupaction(0);" value="Annuler" />'; break;
		}
		
		packet += '</fieldset>';
		packet += '</form>';
	}
	else if(action == 4) { // Ici l'affichage du fichiers
		popup.style.width = 'auto';
		popup.style.left = '12%';
		moreaction(0);
		option(0);
		
		var all_unit = ["b", "Kb", "Mb", "Gb", "Tb"];
		var unit = all_unit[0];
		
		for(var i = 1; taille > 1000; i++) { // Convertisseur d'unité
			taille = taille / 1000;
			unit = all_unit[i];
		}
		
		taille = String(taille);
		taille = taille.charAt(0) + taille.charAt(1) + taille.charAt(2) + taille.charAt(3) + taille.charAt(4);
		
		packet = '<form method="post" action="./php/action.php?fichiers=' + nom + '">';
		packet += '<fieldset>';
		packet += '<legend>Fichiers: ' + nom + ' - ' + taille + ' ' + unit + '</legend>';
		packet += '<center>';
		
		switch(methode) {
			case 0: packet += '<p>En construction</p>'; break; // Pour les dossiers [PROTOTYPE]
			case 1: packet += '<img class="show" title="' + nom + '" src="' + attempt + '" />'; break; // Pour les images
			case 2: packet += '<audio id="player" ontimeupdate="custom_controls(4);" autoplay>'; // Pour les musiques
				packet += '<source src="' + attempt + '" type="audio/mpeg" />';
				packet += '</audio>';
				packet += '<div style="position: relative;">';
				packet += '<div id="progressbarControl">';
				packet += '<div id="progressbar"></div>';
				packet += '</div>';
				packet += '<input class="controls" id="player_start" type="button" value="||" title="Pause" onclick="custom_controls(1, this);">';
				packet += '<input class="controls" type="button" value=" ■ " title="Stop" onclick="custom_controls(2);">';
				packet += '<span class="volume">';
				packet += '<a class="stick1 volume" onclick="custom_controls(3, 0);" title="MUTE"></a>';
				packet += '<a class="stick2 volume" onclick="custom_controls(3, 0.3);" title="30%"></a>';
				packet += '<a class="stick3 volume" onclick="custom_controls(3, 0.5);" title="50%"></a>';
				packet += '<a class="stick4 volume" onclick="custom_controls(3, 0.7);" title="70%"></a>';
				packet += '<a class="stick5 volume" onclick="custom_controls(3, 1);" title="100%"></a>';
				packet += '</span>';
				packet += '</div>';
				break;
			case 3: packet += '<div class="show">'; // Pour les fichiers textes ou pdf
				packet += '<iframe src="' + attempt + '"></iframe>';
				packet += '</div>';
				break;
			case 4: packet += '<video class="show" controls autoplay>'; // Pour les vidéos
				packet += '<source src="' + attempt + '" type="audio/mpeg" />';
				packet += '</video>';
				break;
		}
		
		packet += '</center>';
		packet += '<br />';
		packet += '<input type="button" onclick="moreaction(1, \'' + nom + '\');" value="Copier" />';
		packet += '<input type="button" onclick="moreaction(2, \'' + nom + '\');" value="Déplacer" />';
		packet += '<input type="button" onclick="moreaction(6, \'' + nom + '\');" value="Renommer" />';
		packet += '<input class="WARN" type="button" onclick="moreaction(3, \'' + nom + '\');" value="Supprimer" />';
		packet += ' - ';
		packet += '<a href="' + attempt + '" download><input type="button" value="Télécharger" /></a>';
		packet += '<input type="button" onclick="moreaction(7, \'' + nom + '\', \'' + partage + '\', \'' + sharekey + '\', \'' + ID + '\');" value="Partager" />';
		packet += ' - ';
		substract = 8 + owner.length;
		packet += '<input type="button" onclick="moreaction(4, \'' + nom + '\', \'' + partage + '\', \'' + taille + unit + '\', \'.' + attempt.substring(substract, 1000) + '\', \'' + ext + '\', \'' + sharekey + '\', \'' + ID + '\');" value="Propriétés" />';
		packet += ' - ';
		packet += '<input type="button" onclick="popupaction(0);" value="Fermer" />';
		packet += '</fieldset>';
		packet += '</form>';
	}
	else if(action == 5) { // Ici l'affichage du tchat IRC
		popup = document.getElementById('popup_irc');
		
		if(popup.innerHTML == '<iframe class="IRC" src="./php/IRC.php"></iframe>') { packet = ''; }
		else { packet = '<iframe class="IRC" src="./php/IRC.php"></iframe>'; }
	}
	else if(action == 6) { // Ici la demande d'un code de déverrouillage de partage
		popup.style.width = '42%';
		popup.style.left = '28.75%';
		
		packet = '<fieldset>';
		packet += '<legend>Déverrouillage de partage:</legend>';
		packet += '<br />';
		packet += '<div class="lock-content">';
		packet += '<br />';
		packet += '<input class="text lock" type="number" id="id_file" placeholder="Numéro d\'identification du fichier (ID)..." />';
		packet += '<br /><br />';
		packet += '<input class="text lock" type="text" id="code_dechif" placeholder="Clé de décodage..." />';
		packet += '<br /><br />';
		packet += '<div style="right: 10%; position: absolute;">';
		packet += '<input class="ACT" type="button" value="Décoder" onclick="" /> ';
		packet += '<input type="button" value="Annuler" onclick="popupaction(0);" />';
		packet += '</div>';
		packet += '</div>';
		packet += '<div style="margin-bottom: 30px; width: 30%;">';
		packet += '<img class="lock-img" type="image/png" src="./pics/lock-file.png" />';
		packet += '</div>';
		packet += '</fieldset>';
	}
	
	popup.innerHTML = packet;
	switch(action) {
		case 3: document.getElementById('nom_dossier').focus(); break;
		case 6: document.getElementById('id_file').focus(); break;
		default: break;
	}
}

// Nouvelle fonctions de gestions du panneau administrateur
function view_param(action, nameuser, name, surname, sexe, mail, pws, nso, np, profile, taille) {
	var frame_param = document.getElementById('frame_param');
	var selected = document.getElementById('selected');
	var info_param = document.getElementById('info_param');
	
	if(action == 1) { // Changement d'informations utilisateur
		packet = '<div class="info_selected">';
		packet += '<h3 id="selected">Affichage de: ' + nameuser + '</h3>> ';
		packet += '<input type="button" value="Données Utilisateurs" onclick="view_param(3, \'' + nameuser + '\', \'' + name + '\', \'' + surname + '\', \'' + sexe + '\', \'' + mail + '\', \'' + pws + '\', \'' + nso + '\', \'' + np + '\', \'' + profile + '\', \'' + taille + '\');" /> ';
		packet += '<input type="button" value="Paramètre Profile" onclick="view_param(2, \'' + nameuser + '\', \'' + name + '\', \'' + surname + '\', \'' + sexe + '\', \'' + mail + '\', \'' + pws + '\', \'' + nso + '\', \'' + np + '\', \'' + profile + '\', \'' + taille + '\');" />';
		packet += '<br /><br />';
		packet += '<h3>Paramètre Afficher:</h3>';
		packet += '</div>';
		packet += '<div id="info_param">';
		packet += '</div>';
		
		frame_param.innerHTML = packet;
		view_param(2, nameuser, name, surname, sexe, mail, pws, nso, np, profile, taille);
	}
	else if(action == 2) { // Affichage d'informations utilisateur
		packet = '<form action="./php/verifmcompte.php" method="post">';
		packet += '<h3>Information Personnels:</h3>';
		packet += '<br />';
		packet += '<label>--- Identifiant:</label>';
		packet += '<br />';
		packet += '- <font name="user">' + nameuser + '</font>';
		packet += '<input class="none" type="hidden" name="user" value="' + nameuser + '" />';
		packet += '<br /><br />';
		packet += '<label>--- Nom:</label>';
		packet += '<br />';
		packet += '- ' + name;
		packet += '<br /><br />';
		packet += '<label>--- Prénom:</label>';
		packet += '<br />';
		packet += '- ' + surname;
		packet += '<br /><br />';
		packet += '<label>--- Sexe:</label>';
		packet += '<br />';
		packet += '- ' + sexe;
		packet += '<br /><br />';
		packet += '<label>--- Adresse Mail:</label>';
		packet += '<br />';
		packet += '- ' + mail;
		packet += '<br /><br />';
		packet += '<label>--- Mot de passe:</label>';
		packet += '<br />';
		packet += '- ' + pws;
		packet += '<br /><br />';
		packet += '<label>--- Grade:</label>';
		packet += '<br />';
		packet += '- <select name="profile">';
		
		var grade = ['USER', 'ADMIN'];
		
		for(i = 0; i <= 1; i++) {
			var selected = '';
			if(profile == grade[i]) { selected = 'selected'; }
			packet += '<option value="' + grade[i] + '" ' + selected + '>' + grade[i] + '</option>';
		}
		
		packet += '</select>';
		packet += '<br /><br />';
		packet += '<input class="ACT" type="submit" name="special" value="Modifier" title="Modifier les Informations du Compte" />';
		packet += '</form>';
		
		info_param.innerHTML = packet;
	}
	else if(action == 3) {
		packet = '<h3>Fichiers sur Disque: </h3><br />';
		packet += '<fieldset>';
		packet += '<legend>Fichiers:</legend>';
		packet += '<iframe style="border-radius: 0; height: 300px;" src="./php/filelist.php?target=' + nameuser + '">';
		packet += '</iframe>';
		packet += '</fieldset>';
		packet += '<br />';
		packet += '<h3>Espace Disque: </h3><br />';
		packet += '<div id="progressbarControl" style="margin-left: 15px; margin-right: 15px; width: auto;">';
		packet += '<div id="progressbar">';
		packet += '</div>';
		packet += '</div>';
		packet += '<br /><br />';
		
		info_param.innerHTML = packet;
		analysedisk(taille);
	}
}

// Cette fonction est dédié pour les commandes de copies déplacements et confirmation de suppresion
function moreaction(action, fichier, partage, taille, placement, ext, sharekey, ID) {
	var popup = document.getElementById('popupabout');
	
	switch(action) {
		case 0: packet = ''; break; // Ici la copie
		case 1: packet = '<form method="post" action="./php/action.php?fichiers=' + fichier + '">'; // Ici la copie
			packet += '<fieldset>';
			packet += '<legend>Copier un fichier:</legend>';
			packet += '<p>Copie de "' + fichier + '"</p>';
			packet += '<br />';
			packet += '<label>Vers:</label>';
			packet += '<br />';
			packet += '<center>';
			packet += '<input class="text" style="margin: 0; margin-top: 4px; width: 98%;" type="text" name="to" placeholder="./Dossier/sous-Dossier/fichier_à_copier.ext" />';
			packet += '</center>';
			packet += '<br /><br />';
			packet += '<input class="ACT" type="submit" name="action" value="Copier" />';
			packet += ' - ';
			packet += '<input type="button" onclick="moreaction(0);" value="Annuler" />';
			packet += '</fieldset>';
			packet += '</form>';
			break;
		case 2: packet = '<form method="post" action="./php/action.php?fichiers=' + fichier + '">'; // Ici le déplacement
			packet += '<fieldset>';
			packet += '<legend>Déplacer un fichier:</legend>';
			packet += '<p>Déplacement de "' + fichier + '"</p>';
			packet += '<br />';
			packet += '<label>Vers:</label>';
			packet += '<br />';
			packet += '<center>';
			packet += '<input class="text" style="margin: 0; margin-top: 4px; width: 98%;" type="text" name="to" placeholder="./Dossier/sous-Dossier/fichier_à_déplacer.ext" />';
			packet += '</center>';
			packet += '<br /><br />';
			packet += '<input class="ACT" type="submit" name="action" value="Déplacer" />';
			packet += ' - ';
			packet += '<input type="button" onclick="moreaction(0);" value="Annuler" />';
			packet += '</fieldset>';
			packet += '</form>';
			break;
		case 3: packet = '<form method="post" action="./php/action.php?fichiers=' + fichier + '">'; // Ici la confirmation de suppression
			packet += '<fieldset>';
			packet += '<legend>Supprimer un fichier:</legend>';
			packet += '<p>Êtes-vous sûre de vouloir supprimer "' + fichier + '" ?</p>';
			packet += '<br /><br />';
			packet += '<input class="WARN" type="submit" name="action" value="Oui" />';
			packet += ' - ';
			packet += '<input type="button" onclick="moreaction(0);" value="Non" />';
			packet += '</fieldset>';
			packet += '</form>';
			break;
		case 4: packet = '<form method="get" action="./client.php">'; // Ici la vue sur les propriétés du fichier sélectionner
			packet += '<fieldset>';
			packet += '<legend>Propriétés:</legend>';
			packet += '<h3>Information:</h3>';
			packet += '<br />'
			packet += '<p>> Nom: "' + fichier + '"</p>';
			packet += '<input type="hidden" name="fichier" value="' + fichier + '" />';
			packet += '<p>> Type: .' + ext + '</p>';
			packet += '<p>> Taille: ' + taille + '</p>';
			packet += '<p title="' + placement + '">> Placement: <input class="text" type="text" id="to_copy" style="width: 50%;" value="' + placement + '" readonly /></p>';
			packet += '<input id="btn_copy" type="button" value="Copier le chemin" />';
			packet += '<br /><br />';
			packet += '<h3>Paramètres du fichier: </h3>';
			packet += '<br />';
			packet += '<label for="share">> Partage du fichier: </label>';
			packet += '<select name="public">';
			
			var state = ['Public', 'Privé'];
			var valeur = ['y', 'n'];
			
			for(i = 0; i <= 1; i++) {
				var selected = '';
				if(partage == valeur[i]) { selected = 'selected'; }
				packet += '<option value="' + valeur[i] + '" ' + selected + '>' + state[i] + '</option>';
			}
			
			packet += '</select>';
			packet += '<br /><br />';
			packet += '<input class="ACT" type="submit" name="action" value="Appliquer" />';
			packet += ' - ';
			packet += '<input type="button" onclick="moreaction(0);" value="Fermer" />';
			packet += '</fieldset>';
			packet += '</form>';
			break;
		case 5: packet = '<fieldset>'; // Ici la fenêtre d'état de transfert de fichiers
			packet += '<center>';
			packet += '<br />';
			
			switch(fichier) {
				case 1: packet += '<img class="loader" type="image/gif" src="../pics/loader.gif" />'; break;
				default: packet += '<img class="loader" type="image/gif" src="./pics/loader.gif" />'; break;
			}
			
			packet += '<p>Importation en cours...</p>';
			packet += '<br />';
			packet += '</center>';
			packet += '</fieldset>';
			
			if(partage == 0) { packet = ''; }
			break;
		case 6: packet = '<form method="post" action="./php/action.php?fichiers=' + fichier + '">'; // Ici la fenêtre de renommage de fichiers
			packet += '<fieldset>';
			packet += '<legend>Renommer:</legend>';
			packet += '<p>Entrer le nom du fichier:</p>';
			packet += '<br />';
			packet += '<label>Nom: </label>';
			packet += '<br ∕>';
			packet += '<center>';
			packet += '<input class="text" style="margin: 0; margin-top: 4px; width: 98%;" type="text" id="to" name="to" placeholder="' + fichier + '" value="' + fichier + '" />';
			packet += '</center>';
			packet += '<br /><br />';
			packet += '<input class="ACT" type="submit" name="action" value="Renommer" />';
			packet += ' - ';
			packet += '<input type="button" onclick="moreaction(0);" value="Fermer" />';
			packet += '</fieldset>';
			packet += '</form>';
			break;
		case 7: packet = '<form method="post" action="./php/action.php?fichier=' + fichier + '">'; // Ici la fenêtre de partage du fichier
			packet += '<fieldset>';
			packet += '<legend>Partage:</legend>';
			packet += '<label>> Partage du fichier: </label>';
			packet += '<select name="public">';
			
			var state = ['Public', 'Privé'];
			var valeur = ['y', 'n'];
			
			for(i = 0; i <= 1; i++) {
				var selected = '';
				if(partage == valeur[i]) { selected = 'selected'; }
				packet += '<option value="' + valeur[i] + '" ' + selected + '>' + state[i] + '</option>';
			}
			
			packet += '</select>';
			packet += '<br /><br />';
			packet += '<p>> N° ID du fichier: ' + placement + '</p>';
			packet += '<p title="Clé de partage du fichier">> Clé de décodage: <input class="text" type="text" id="to_copy" style="width: 50%;" value="' + taille + '" readonly /></p>';
			packet += '<input id="btn_copy" type="button" value="Copier la Clé" />';
			packet += '<br /><br />';
			packet += '<input class="ACT" type="submit" name="action" value="Appliquer" />';
			packet += ' - ';
			packet += '<input type="button" onclick="moreaction(0);" value="Fermer" />';
			packet += '</fieldset>';
			packet += '</form>';
			break;
	}
	
	popup.innerHTML = packet;
	switch(action) { // Redimensionnement du popup
		case 4: popup.style.width = "35%"; popup.style.left = '32.3%';
			// Ajout d'une fonctionnalité de copie de texte
			case 7: var bouton = document.getElementById('btn_copy');
			var copying = document.getElementById('to_copy');
			
			bouton.addEventListener('click', function() {
				copying.select();
				document.execCommand('copy');
				return false;
			});
			break;
		case 5: 
		case 6: popup.style.width = "35%"; popup.style.left = '32.3%'; break;
		default: popup.style.width = "52%"; popup.style.left = '24%'; break;
	}
	if(action == 6) { document.getElementById('to').select(); }
	else if(action == 7) { popup.style.width = "52%"; popup.style.left = '24%'; }
}

// Barre d'analyse espace disque utilisateur
function analysedisk(occupied_space) {
	var progressbar = document.getElementById('progressbar');
	var free_space = 50000000;
	var quotient = occupied_space / free_space;
	var statdisk = Math.ceil(quotient * 100);
	
	progressbar.style.width = statdisk + '%';
	progressbar.innerHTML = '<p style="padding-left: 3px;">' + statdisk + '%</p>';
	
	free_space = (free_space / 1000000);
	occupied_space = (occupied_space / 1000000);
	occupied_space = String(occupied_space);
	
	switch(occupied_space.charAt(1)) {
		case '.': occupied_space = occupied_space.charAt(0); break;
		default: occupied_space = occupied_space.charAt(0) + occupied_space.charAt(1); break;
	}
	
	progressbar.innerHTML += "<p style='position: absolute;'>--- Espace Occupé: " + occupied_space + "/" + free_space + "Mo</p>";
}

// Personnalisation des controls de la balise <audio>
function custom_controls(action, lvl) {
	var player = document.getElementById('player');
	var starter = document.getElementById('player_start');
	var progressbar = document.getElementById('progressbar');
	//var volume_info = document.getElementById('volume_info');
	
	if(action == 1) { // Lecture et Pause
		if(player.paused) {
			player.play();
			starter.value = "||";
			starter.title = "Pause";
		}
		else {
			player.pause();
			starter.value = " ► ";
			starter.title = "Lecture";
		}
	}
	else if(action == 2) { // Stop puis Recommencer
		player.currentTime = 0;
		player.pause();
		progressbar.style.width = '0%';
		starter.value = " ► ";
		starter.title = "Lecture";
	}
	else if(action == 3) { // Volume
		player.volume = lvl;
		
		/*switch(lvl) {
			case 0: volume_info.innerHTML = "MUTED"; break;
			default: volume_info.innerHTML = lvl * 100 + "%"; break;
		}*/
	}
	else if(action == 4) { // Barre de progression
		switch(player.currentTime) {
			case 0: break;
			default: var quotient = player.currentTime / player.duration; break;
		}
		
		var statprogress = Math.ceil(quotient * 100);
		
		progressbar.style.width = statprogress + '%';
	}
}

// Annimation pour l'affichage de texte par défaut dans une barre input
function info_tchat(obj, msg) {
	if(obj == 1) { // Pour l'input du tchat
		var entry = document.getElementById('text_input');
		//var meta = document.getElementById('refresh');
		
		if(msg == 'Ecrivez votre message...') {
			entry.style.color = '#CCCCCC';
			entry.value = '';
		}
		else if(msg == '') {
			entry.style.color = '#999999';
			entry.value = 'Ecrivez votre message...';
		}
	}
}

// Fonction de changement de mode utilisateur pour l'administrateur user
function adminswitch(mode) {
	setTimeout(function() {
		switch(mode) {
			case 1: document.location = "./admin.php"; break; // ADMIN MOD
			case 2: document.location = "./client.php"; break; // USER MOD
		}
	}, 350);
}

// Fonction de gestions de pannaux administrateur
function panel_switch(action, list_user, theme) {
	var panel_left = document.getElementById('admin_panel_left');
	var panel_right = document.getElementById('admin_panel_right');
	
	if(action == 0) { // Ici l'Interface de Gestion Système Serveur
		// --------------------------------------------------------------------- Panneau N° 1 ---------------------------------------------------------------------
		packet = '<h2>Commandes</h2>';
		packet += '<div class="content">';
		packet += '<img class="classement" height="15px" src="./pics/' + theme + 'console.png" />';
		packet += '<input class="list" type="button" value="Panneau de commande" title="Panneau d\'affichage de commandes d\'interactions serveur" onclick="" />';
		packet += '<br />'
		packet += '<img class="classement" height="15px" src="./pics/' + theme + 'monitor.png" />';
		packet += '<input class="list" type="button" value="Moniteur Système" title="Affichage des informations d\'état du serveur" onclick="" />';
		packet += '<br />'
		packet += '<img class="classement" height="15px" src="./pics/' + theme + 'monitor.png" />';
		packet += '<input class="list" type="button" value="PhpMyAdmin" title="Ouverture de PhpMyAdmin" onclick="" />';
		packet += '</div>';
		// --------------------------------------------------------------------- Panneau N° 2 ---------------------------------------------------------------------
		packet0 = '<h2>Gestion du Système<input id="changing" type="button" value="Gestion Comptes" onclick="panel_switch(1, temp, theme);" /></h2>';
		packet0 += '<div id="frame_param">';
		packet0 += '';
		packet0 += '</div>';
	}
	else if(action == 1) { // Ici l'Interface de Gestion d'Utilisateurs
		// --------------------------------------------------------------------- Panneau N° 1 ---------------------------------------------------------------------
		packet = '<h2>Utilisateurs</h2>';
		packet += '<div class="content" id="list_user">';
		packet += list_user.innerHTML;
		packet += '</div>';
		// --------------------------------------------------------------------- Panneau N° 2 ---------------------------------------------------------------------
		packet0 = '<h2>Administration Compte <input id="changing" type="button" value="Gestion Système" onclick="panel_switch(0, temp, theme);" /></h2>';
		packet0 += '<div id="frame_param">';
		packet0 += '<div class="info_selected">';
		packet0 += '<h3 id="selected">Affichage de: </h3>> ';
		packet0 += '<input type="button" value="Données Utilisateurs" onclick="" />';
		packet0 += ' <input type="button" value="Paramètre Profile" onclick="" />';
		packet0 += '<br /><br />';
		packet0 += '<h3>Paramètre Afficher:</h3>';
		packet0 += '</div>';
		packet0 += '<div id="info_param">';
		packet0 += '<p>Veuillez selectionnez un compte...</p>';
		packet0 += '</div>';
		packet0 += '</div>';
	}
	
	panel_left.innerHTML = packet;
	panel_right.innerHTML = packet0;
}

// Cette fonction est pour le menu contextuel de la liste de fichiers
function option(action, mouse, list, attempt, nom, theme, taille, partage, ext, owner, sharekey, ID) {
	if(action == 1) { // Affichage de la flèche d'option de fichier dans la liste
		var cellule = document.getElementById(list);
		
		switch(mouse) {
			case 0: cellule.style.width = '95%'; break;
			case 1: cellule.style.width = '90%'; break;
		}
	}
	else if(action == 2) { // Affichage du menu d'option d'objet
		var menu = document.getElementById(list);
		
		switch(document.location.pathname) {
			case '/Stock-One-master/admin.php':
			case '/Stock-One-master/client.php':
			case '/Stock-One-master/compteuser.php': var link = '.'; break;
			default: var link = '..'; break;
		}
		
		switch(menu.innerHTML) {
			case '': option(0);
				menu.style.border = '1px solid';
				menu.style.padding = '4px';
				
				var all_unit = ["b", "Kb", "Mb", "Gb", "Tb"];
				var unit = all_unit[0];
				
				for(var i = 1; taille > 1000; i++) { // Convertisseur d'unité
					taille = taille / 1000;
					unit = all_unit[i];
				}
				
				taille = String(taille);
				taille = taille.charAt(0) + taille.charAt(1) + taille.charAt(2) + taille.charAt(3) + taille.charAt(4);
				
				menu.innerHTML = '<img class="classement" height="16px" type="image/png" src="' + link + '/pics/' + theme + 'download.png" /><a href="' + attempt + '" download><input class="opt_cel" type="button" onclick="option(0);" value="Télécharger" /></a><br />';
				menu.innerHTML += '<img class="classement" height="16px" type="image/png" src="' + link + '/pics/' + theme + 'share.png" /><input class="opt_cel" type="button" onclick="moreaction(7, \'' + nom + '\', \'' + partage + '\', \'' + sharekey + '\', \'' + ID + '\'); option(0);" value="Partage" /><br />';
				menu.innerHTML += '<hr />';
				menu.innerHTML += '<img class="classement" height="16px" type="image/png" src="' + link + '/pics/' + theme + 'copy.png" /><input class="opt_cel" type="button" onclick="moreaction(1, \'' + nom + '\'); option(0);" value="Copier vers" /><br />';
				menu.innerHTML += '<img class="classement" height="16px" type="image/png" src="' + link + '/pics/' + theme + 'copy.png" /><input class="opt_cel" type="button" onclick="moreaction(2, \'' + nom + '\'); option(0);" value="Déplacer vers" /><br />';
				menu.innerHTML += '<img class="classement" height="16px" type="image/png" src="' + link + '/pics/' + theme + 'rename.png" /><input class="opt_cel" type="button" onclick="moreaction(6, \'' + nom + '\'); option(0);" value="Renommer" /><br />';
				menu.innerHTML += '<hr />';
				menu.innerHTML += '<img class="classement" height="16px" type="image/png" src="' + link + '/pics/trash.png" /><input class="opt_cel WARN" type="button" onclick="moreaction(3, \'' + nom + '\'); option(0);" value="Supprimer" /><br />';
				menu.innerHTML += '<hr />';
				substract = 8 + owner.length;
				menu.innerHTML += '<img class="classement" height="16px" type="image/png" src="' + link + '/pics/' + theme + 'info.png" /><input class="opt_cel" type="button" onclick="moreaction(4, \'' + nom + '\', \'' + partage + '\', \'' + taille + unit + '\', \'.' + attempt.substring(substract, 1000) + '\', \'' + ext + '\', \'' + sharekey + '\'); option(0);" value="Propriétés" />';
				break;
			default: option(0); break;
		}
	}
	else if(action == 0) { // Effacement du menu
		for(i = 0; i < 10000; i++) {
			var list = 'opt_' + i;
			var menu = document.getElementById(list);
			
			if(menu != undefined) {
				menu.style.border = '0';
				menu.style.padding = '0';
				menu.innerHTML = '';
			}
		}
	}
}

// Cette fonction est pour la deconnexion du compte
function disconnect(stat, method) {
	if(method == 0) {
		switch(stat) {
			case 0: popupaction(0); break;
			case 1: document.location = "./php/disconnect.php"; break;
		}
	}
}

// Fonction de développement /!\ PAS TOUCHER !!!!
function other(op) {
	switch(op) {
		case 0: document.location = "../client.php"; break;
		case 1: document.location = "./php/other.php"; break;
	}
}

/******************************************************************************
function hide_pubs() {
	for(var i = 0; i < 1; i++) {
		switch(i) {
			case 0: var pub = document.getElementById('av_toolbar_iframe'); break;
			case 1: var pub = document.getElementById('av_toolbar_regdiv'); break;
		}
		
		pub.style.width = 0;
		pub.style.height = 0;
		pub.style.position = "absolute";
		pub.innerHTML = "";
	}
	
	document.body.style.marginTop = 0;
}
******************************************************************************/

/******
* END *
******/

