-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 12, 2022 at 06:56 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wall`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `comment` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_messages1_idx` (`message_id`),
  KEY `fk_comments_users1_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `message_id`, `comment`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'cris - cris comment', '2022-12-10 00:11:03', '2022-12-10 00:17:03'),
(2, 1, 2, 'vincent - cris comment', '2022-12-10 00:12:03', '2022-12-10 00:17:03'),
(3, 2, 2, 'vincent - vincent comment', '2022-12-10 00:13:03', '2022-12-10 00:17:03'),
(4, 1, 3, 'test3 - cris comment', '2022-12-10 00:14:03', '2022-12-10 00:17:03'),
(5, 2, 3, 'test3 - vincent comment', '2022-12-10 00:15:03', '2022-12-10 00:17:03'),
(6, 3, 3, 'test3 - test3 comment', '2022-12-10 00:16:03', '2022-12-10 00:17:03'),
(7, 1, 4, 'test4 - cris comment', '2022-12-10 00:17:03', '2022-12-10 00:17:03'),
(8, 2, 4, 'test4 - vincent comment', '2022-12-10 00:18:03', '2022-12-10 00:17:03'),
(9, 3, 4, 'test4 - test3 comment', '2022-12-10 00:19:03', '2022-12-10 00:17:03'),
(10, 4, 4, 'test4 - test4 comment', '2022-12-10 00:20:03', '2022-12-10 00:17:03'),
(11, 1, 2, 'try', '2022-12-10 20:53:14', NULL),
(12, 1, 1, 'test', '2022-12-10 21:41:47', NULL),
(13, 1, 2, 'test', '2022-12-10 21:42:07', NULL),
(14, 1, 2, 'test', '2022-12-10 21:42:15', NULL),
(16, 1, 4, 'test', '2022-12-11 22:22:27', NULL),
(17, 1, 3, 'ttttt', '2022-12-11 22:25:31', NULL),
(18, 1, 2, 'yyyy', '2022-12-11 22:31:50', NULL),
(19, 1, 1, 'bbbb', '2022-12-11 22:38:16', NULL),
(20, 1, 1, 'bbbb', '2022-12-11 22:38:20', NULL),
(21, 1, 4, 'grrrr', '2022-12-11 22:44:34', NULL),
(25, 1, 7, 'aaaaaaaaaaaaaaaaaaa', '2022-12-11 23:14:44', NULL),
(26, 1, 7, 'test', '2022-12-12 07:18:43', NULL),
(27, 1, 7, 'try', '2022-12-12 09:03:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_messages_users_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `message`, `created_at`, `updated_at`) VALUES
(1, 1, 'cris message', '2022-12-10 00:11:29', '2022-12-10 00:15:29'),
(2, 2, 'vincent message', '2022-12-10 00:12:29', '2022-12-10 00:15:29'),
(3, 3, 'test3 message', '2022-12-10 00:13:29', '2022-12-10 00:15:29'),
(4, 4, 'test4 message', '2022-12-10 00:14:29', '2022-12-10 00:15:29'),
(5, 1, 'test', '2022-12-10 20:39:33', NULL),
(6, 1, 'try', '2022-12-11 21:59:18', NULL),
(7, 1, 'aaaaa', '2022-12-11 23:03:58', NULL),
(8, 1, 'test', '2022-12-12 09:02:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'cris', 'castro', 'test@test.com', '202cb962ac59075b964b07152d234b70', '2022-12-08 07:13:12', NULL),
(2, 'vincent', 'castro', 'test2@test.com', '202cb962ac59075b964b07152d234b70', '2022-12-08 09:14:26', NULL),
(3, 'test3', 'test3', 'test3@test.com', '202cb962ac59075b964b07152d234b70', '2022-12-10 00:14:02', '2022-12-10 00:14:02'),
(4, 'test4', 'test4', 'test4@test.com', '202cb962ac59075b964b07152d234b70', '2022-12-10 00:14:02', '2022-12-10 00:14:02');

-- --------------------------------------------------------

--
-- Stand-in structure for view `walls`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `walls`;
CREATE TABLE IF NOT EXISTS `walls` (
`message_id` int(11)
,`user_id` int(11)
,`message_sender` varchar(511)
,`message` text
,`message_date` varchar(74)
,`comment` json
);

-- --------------------------------------------------------

--
-- Structure for view `walls`
--
DROP TABLE IF EXISTS `walls`;

DROP VIEW IF EXISTS `walls`;
CREATE ALGORITHM=UNDEFINED DEFINER=`ccastro`@`localhost` SQL SECURITY DEFINER VIEW `walls`  AS SELECT `m`.`id` AS `message_id`, `m`.`user_id` AS `user_id`, concat(`u`.`first_name`,' ',`u`.`last_name`) AS `message_sender`, `m`.`message` AS `message`, date_format(`m`.`created_at`,'%M %D %Y') AS `message_date`, (select json_objectagg(`c`.`id`,json_array(`c`.`user_id`,concat(`u2`.`first_name`,' ',`u2`.`last_name`),`c`.`comment`,date_format(`c`.`created_at`,'%M %D %Y'),`c`.`id`)) from (`comments` `c` left join `users` `u2` on((`u2`.`id` = `c`.`user_id`))) where (`m`.`id` = `c`.`message_id`)) AS `comment` FROM (`messages` `m` join `users` `u` on((`u`.`id` = `m`.`user_id`))) GROUP BY `m`.`id` ORDER BY `m`.`created_at` DESC ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_messages1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comments_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
