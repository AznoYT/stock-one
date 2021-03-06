-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 23 Février 2017 à 20:10
-- Version du serveur :  5.6.15-log
-- Version de PHP :  5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `stock-one`
--

-- --------------------------------------------------------

--
-- Structure de la table `donnee`
--

CREATE TABLE IF NOT EXISTS `donnee` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `identifiant` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `nom_dossier` varchar(255) NOT NULL,
  `taille` int(255) NOT NULL,
  `placement` varchar(255) NOT NULL,
  `public` text NOT NULL,
  `sharecode` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=99 ;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `utilisateur` varchar(255) DEFAULT NULL,
  `nom` text,
  `prenom` text,
  `genre` text,
  `email` text,
  `pws` text,
  `notifso` text,
  `notifpartenaire` text,
  `GRADE` varchar(255) DEFAULT NULL,
  `theme` varchar(255) NOT NULL DEFAULT 'default',
  UNIQUE KEY `utilisateur` (`utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`utilisateur`, `nom`, `prenom`, `genre`, `email`, `pws`, `notifso`, `notifpartenaire`, `GRADE`, `theme`) VALUES
('admin', NULL, NULL, NULL, NULL, 'admin', 'y', 'n', 'ADMIN', 'reverse');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
