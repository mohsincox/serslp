-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2022 at 06:52 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `slplaytest`
--

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_name` varchar(255) DEFAULT NULL,
  `flag` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `short_name`, `flag`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Bangladesh', 'BD', 'Images\\Country_1663515161912.png', NULL, NULL, '2022-09-17 18:00:20', '2022-09-18 15:37:12'),
(7, 'Sri Lanks', 'SL', 'Images\\Country_1663672776301.png', NULL, NULL, '2022-09-17 19:26:54', '2022-09-28 07:13:01'),
(12, 'Australia', 'AUS', 'Images\\Country_1663827932370.png', NULL, NULL, '2022-09-22 06:25:32', '2022-09-24 06:54:30'),
(13, 'India', 'IND', '', NULL, NULL, '2022-10-08 13:22:59', '2022-10-08 13:22:59');

-- --------------------------------------------------------

--
-- Table structure for table `franchises`
--

CREATE TABLE `franchises` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `franchises`
--

INSERT INTO `franchises` (`id`, `name`, `country_id`, `logo`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Sunrisers Hyderabad', 13, '', NULL, NULL, '2022-10-04 06:13:10', '2022-10-08 13:23:07'),
(2, 'Kolkata Knight Riders', 13, '', NULL, NULL, '2022-10-08 13:22:47', '2022-10-08 13:23:12');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `detail` varchar(1000) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `detail`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Cricket', 'Cricket Game', NULL, NULL, '2022-09-17 14:01:01', '2022-09-22 05:20:39'),
(2, 'Football', 'Game Details (Details Information)', NULL, NULL, '2022-09-22 04:25:39', '2022-09-22 04:32:15'),
(6, 'Kabaddi', '\'কাবাডি উপমহাদেশের অন্যতম জনপ্রিয় খেলা। বর্তমানে কাবাডি আন্তর্জাতিক ভাবেও বেশ জনপ্রিয়তা অর্জন করেছে। এই খেলা সাধারণত কিশোর থেকে শুরু করে প্রাপ্তবয়স্ক সব ধরনের ছেলে এবং মেয়েরা খেলে থাকে। সাধারণত বিশেষ উৎসব বা পালা-পার্বণে বেশ আড়ম্বরপূর্ণ ভাবে কাবাডি খ', NULL, NULL, '2022-09-22 05:21:24', '2022-09-24 06:54:20');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `stage_name` varchar(255) DEFAULT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `tournament_team_one_id` int(11) DEFAULT NULL,
  `tournament_team_two_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `stage_name`, `tournament_id`, `tournament_team_one_id`, `tournament_team_two_id`, `start_date`, `start_time`, `venue`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(2, NULL, 1, 3, 2, '2022-10-31', '8:00 PM', 'Mirpur', NULL, NULL, '2022-10-06 10:05:33', '2022-10-06 10:11:21');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `perm_name` varchar(255) NOT NULL,
  `perm_description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `perm_name`, `perm_description`, `createdAt`, `updatedAt`) VALUES
(1, 'user_get_all', 'Get All User', '2022-09-30 18:18:48', '2022-09-30 18:18:48'),
(2, 'user_get', 'Get User', '2022-09-30 18:20:38', '2022-09-30 18:20:38'),
(3, 'user_add', 'Add User', '2022-09-30 18:22:00', '2022-09-30 18:22:00'),
(4, 'user_update', 'Update User', '2022-09-30 18:23:33', '2022-09-30 18:23:33'),
(5, 'user_delete', 'Delete User', '2022-09-30 18:24:52', '2022-09-30 18:24:52'),
(6, 'role_get_all', 'Get All Role', '2022-09-30 18:31:34', '2022-09-30 18:31:34'),
(7, 'role_get', 'Get Role', '2022-09-30 18:33:03', '2022-09-30 18:33:03'),
(8, 'role_add', 'Add Role', '2022-09-30 18:36:26', '2022-09-30 18:36:48'),
(9, 'role_update', 'Update Role', '2022-09-30 18:38:23', '2022-09-30 18:38:23'),
(10, 'role_delete', 'Delete Role', '2022-09-30 18:39:56', '2022-09-30 18:39:56'),
(11, 'game_get_all', 'Get All Game', '2022-10-01 06:27:02', '2022-10-01 06:27:02'),
(12, 'game_get', 'Get Game', '2022-10-01 06:28:27', '2022-10-01 06:28:27'),
(13, 'game_add', 'Add Game', '2022-10-01 06:29:50', '2022-10-01 06:29:50'),
(14, 'game_update', 'Update Game', '2022-10-01 06:31:28', '2022-10-01 06:31:28'),
(15, 'game_delete', 'Delete Game', '2022-10-01 06:33:19', '2022-10-01 06:33:19'),
(16, 'country_get_all', 'Get All Country', '2022-10-01 06:37:09', '2022-10-01 06:37:09'),
(17, 'country_get', 'Get Country', '2022-10-01 06:38:13', '2022-10-01 06:38:13'),
(18, 'country_add', 'Add Country', '2022-10-01 06:46:31', '2022-10-01 06:46:31'),
(19, 'country_update', 'Update Country', '2022-10-01 06:47:07', '2022-10-01 06:47:07'),
(20, 'country_delete', 'Delete Country', '2022-10-01 06:48:07', '2022-10-01 06:48:07'),
(21, 'franchise_get_all', 'Get All Franchise', '2022-10-01 06:49:38', '2022-10-01 06:49:38'),
(22, 'franchise_get', 'Get Franchise', '2022-10-01 06:50:38', '2022-10-01 06:50:38'),
(23, 'franchise_add', 'Add Franchise', '2022-10-01 06:51:37', '2022-10-01 06:51:37'),
(24, 'franchise_update', 'Update Franchise', '2022-10-01 06:52:36', '2022-10-01 06:52:36'),
(25, 'franchise_delete', 'Delete Franchise', '2022-10-01 06:53:46', '2022-10-01 06:53:46'),
(26, 'tournament_get_all', 'Get All Tournament', '2022-10-01 06:55:10', '2022-10-01 06:55:10'),
(27, 'tournament_get', 'Get Tournament', '2022-10-01 06:55:57', '2022-10-01 06:55:57'),
(28, 'tournament_add', 'Add Tournament', '2022-10-01 06:56:43', '2022-10-01 06:56:43'),
(29, 'tournament_update', 'Update Tournament', '2022-10-01 06:57:21', '2022-10-01 06:57:21'),
(30, 'tournament_delete', 'Delete Tournament', '2022-10-01 06:58:04', '2022-10-01 06:58:04'),
(31, 'player_get_all', 'Get All Player', '2022-10-01 06:59:21', '2022-10-01 06:59:21'),
(32, 'player_get', 'Get Player', '2022-10-01 07:00:40', '2022-10-01 07:00:40'),
(33, 'player_add', 'Add Player', '2022-10-01 07:01:12', '2022-10-01 07:01:12'),
(34, 'player_update', 'Update Player', '2022-10-01 07:01:58', '2022-10-01 07:01:58'),
(35, 'player_delete', 'Delete Player', '2022-10-01 07:03:08', '2022-10-01 07:03:08'),
(36, 'slider_get_all', 'Get All Slider', '2022-10-01 07:03:56', '2022-10-01 07:03:56'),
(37, 'slider_get', 'Get Slider', '2022-10-01 07:04:24', '2022-10-01 07:04:24'),
(38, 'slider_add', 'Add Slider', '2022-10-01 07:05:08', '2022-10-01 07:05:08'),
(39, 'slider_update', 'Update Slider', '2022-10-01 07:05:41', '2022-10-01 07:05:41'),
(40, 'slider_delete', 'Delete Slider', '2022-10-01 07:06:15', '2022-10-01 07:06:15'),
(41, 'tournament_team_get_all', 'Get All Tournament Team', '2022-10-01 07:07:32', '2022-10-01 07:07:32'),
(42, 'tournament_team_get', 'Get Tournament Team', '2022-10-01 07:08:09', '2022-10-01 07:08:09'),
(43, 'tournament_team_add', 'Add Tournament Team', '2022-10-01 07:09:02', '2022-10-01 07:09:02'),
(44, 'tournament_team_update', 'Update Tournament Team', '2022-10-01 07:09:54', '2022-10-01 07:09:54'),
(45, 'tournament_team_delete', 'Delete Tournament Team', '2022-10-01 07:10:31', '2022-10-01 07:10:31'),
(46, 'match_get_all', 'Get All Match', '2022-10-01 07:11:16', '2022-10-01 07:11:16'),
(47, 'match_get', 'Get Match', '2022-10-01 07:11:49', '2022-10-01 07:11:49'),
(48, 'match_add', 'Add Match', '2022-10-01 07:12:20', '2022-10-01 07:12:20'),
(49, 'match_update', 'Update Match', '2022-10-01 07:13:02', '2022-10-01 07:13:02'),
(50, 'match_delete', 'Delete Match', '2022-10-01 07:13:23', '2022-10-01 07:13:23'),
(51, 'news_get_all', 'Get All News', '2022-10-01 09:11:02', '2022-10-01 09:11:02'),
(52, 'news_get', 'Get News', '2022-10-01 09:11:30', '2022-10-01 09:11:30'),
(53, 'news_add', 'Add News', '2022-10-01 09:12:00', '2022-10-01 09:12:00'),
(54, 'news_update', 'Update News', '2022-10-01 09:12:42', '2022-10-01 09:12:42'),
(55, 'news_delete', 'Delete News', '2022-10-01 09:13:21', '2022-10-01 09:13:21');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `specification` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `franchise_id` int(11) DEFAULT NULL,
  `ranking` int(11) DEFAULT NULL,
  `point` double(8,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `game_id`, `specification`, `country_id`, `franchise_id`, `ranking`, `point`, `image`, `status`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(8, 'Shakib Al Hasan', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":false, \"Keeper\":false, \"Goalkeeper\":false, \"Defender\":false, \"Midfielder\":false, \"Forward\":false }', 1, 0, 0, 0.00, 'Images\\Player_1664789739511.png', 'Active', NULL, NULL, '2022-10-03 09:35:39', '2022-10-10 09:07:43'),
(9, 'Afif Hossain', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":false, \"Keeper\":false }', 1, NULL, 0, 0.00, 'Images\\Player_1664789927483.png', 'Active', NULL, NULL, '2022-10-03 09:38:47', '2022-10-03 09:38:47'),
(10, 'Ebadot Hossain', 1, '{ \"All Rounder\":false, \"Batsman\":false, \"Bowler\":true, \"Keeper\":false }', 1, NULL, 87, 0.00, 'Images\\Player_1664790401358.jpg', 'Active', NULL, NULL, '2022-10-03 09:46:41', '2022-10-03 11:44:27'),
(11, 'Sabbir Rahman', 1, '{ \"All Rounder\":false, \"Batsman\":true, \"Bowler\":false, \"Keeper\":false }', 1, NULL, 589, 0.00, 'Images\\Player_1664790674845.jpg', 'Active', NULL, NULL, '2022-10-03 09:51:14', '2022-10-03 09:51:14'),
(12, 'Mosaddek Hossain	', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":false, \"Keeper\":false }', 1, NULL, 0, 0.00, 'Images\\Player_1664791663803.png', 'Active', NULL, NULL, '2022-10-03 10:07:43', '2022-10-03 10:07:43'),
(13, 'Mahmudullah', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":false, \"Keeper\":false }', 1, NULL, 0, 0.00, 'Images\\Player_1664791816696.png', 'Active', NULL, NULL, '2022-10-03 10:10:16', '2022-10-03 10:10:16'),
(14, 'Mahedi Hasan	', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":false, \"Keeper\":false }', 1, NULL, 0, 0.00, 'Images\\Player_1664791918947.jpg', 'Active', NULL, NULL, '2022-10-03 10:11:58', '2022-10-03 10:11:58'),
(15, 'Mohammad Saifuddin	', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":false, \"Keeper\":false }', 1, NULL, 0, 0.00, 'Images\\Player_1664792628079.jpg', 'Active', NULL, NULL, '2022-10-03 10:23:48', '2022-10-03 10:23:48'),
(16, 'Mehidy Hasan Miraz	', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":false, \"Keeper\":false }', 1, NULL, 0, 0.00, 'Images\\Player_1664795304890.jpg', 'Active', NULL, NULL, '2022-10-03 11:08:24', '2022-10-03 11:08:24'),
(17, 'Anamul Haque', 1, '{ \"All Rounder\":false, \"Batsman\":true, \"Bowler\":false, \"Keeper\":true }', 1, NULL, 385, 0.00, 'Images\\Player_1664795560241.jpg', 'Active', NULL, NULL, '2022-10-03 11:12:40', '2022-10-03 11:12:40'),
(18, 'Mushfiqur Rahim	', 1, '{ \"All Rounder\":false, \"Batsman\":true, \"Bowler\":false, \"Keeper\":true }', 1, NULL, 662, 0.00, 'Images\\Player_1664795705081.jpg', 'Active', NULL, NULL, '2022-10-03 11:15:05', '2022-10-03 11:15:05'),
(19, 'Mustafizur Rahman	', 1, '{ \"All Rounder\":false, \"Batsman\":false, \"Bowler\":true, \"Keeper\":false }', 1, NULL, 34, 0.00, 'Images\\Player_1664796052172.jpg', 'Active', NULL, NULL, '2022-10-03 11:20:52', '2022-10-03 11:20:52'),
(20, 'Nasum Ahmed	', 1, '{ \"All Rounder\":false, \"Batsman\":false, \"Bowler\":true, \"Keeper\":false }', 1, NULL, 27, 0.00, 'Images\\Player_1664796315811.png', 'Active', NULL, NULL, '2022-10-03 11:25:15', '2022-10-03 11:25:15'),
(21, 'Taskin Ahmed	', 1, '{ \"All Rounder\":false, \"Batsman\":false, \"Bowler\":true, \"Keeper\":false, \"Goalkeeper\":false, \"Defender\":false, \"Midfielder\":false, \"Forward\":false }', 1, 0, 70, 0.00, 'Images\\Player_1664796419399.jpg', 'Active', NULL, NULL, '2022-10-03 11:26:59', '2022-10-10 08:19:06'),
(22, 'Parvez Hossain Emon	', 1, '{ \"All Rounder\":false, \"Batsman\":true, \"Bowler\":false, \"Keeper\":true }', 1, NULL, 0, 0.00, 'Images\\Player_1664859279082.jpg', 'Active', NULL, NULL, '2022-10-04 04:54:39', '2022-10-04 04:54:39'),
(23, 'Pathum Nissanka	', 1, '{ \"All Rounder\":false, \"Batsman\":true, \"Bowler\":false, \"Keeper\":false }', 7, NULL, 68, 0.00, 'Images\\Player_1664859516765.jpg', 'Active', NULL, NULL, '2022-10-04 04:58:36', '2022-10-04 04:58:36'),
(24, 'Nuwanidu Fernando', 1, '{ \"All Rounder\":false, \"Batsman\":true, \"Bowler\":false, \"Keeper\":false }', 7, NULL, 0, 0.00, 'Images\\Player_1664861421514.png', 'Active', NULL, NULL, '2022-10-04 05:30:21', '2022-10-04 05:30:21'),
(25, 'Danushka Gunathilaka', 1, '{ \"All Rounder\":true, \"Batsman\":true, \"Bowler\":false, \"Keeper\":false }', 7, NULL, 56, 0.00, 'Images\\Player_1664861613055.jpg', 'Active', NULL, NULL, '2022-10-04 05:33:33', '2022-10-04 05:33:33'),
(26, 'Dhananjaya de Silva	', 1, '{ \"All Rounder\":true, \"Batsman\":true, \"Bowler\":false, \"Keeper\":false }', 7, NULL, 71, 0.00, 'Images\\Player_1664861758826.png', 'Active', NULL, NULL, '2022-10-04 05:35:58', '2022-10-04 05:35:58'),
(27, 'Dasun Shanaka (C)	', 1, '{ \"All Rounder\":true, \"Batsman\":true, \"Bowler\":false, \"Keeper\":false }', 7, NULL, 40, 0.00, 'Images\\Player_1664861951097.jpg', 'Active', NULL, NULL, '2022-10-04 05:39:11', '2022-10-04 05:39:11'),
(28, 'Charith Asalanka	', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":true, \"Keeper\":false }', 7, NULL, 38, 0.00, 'Images\\Player_1664862213603.png', 'Active', NULL, NULL, '2022-10-04 05:43:33', '2022-10-04 05:43:33'),
(29, 'Wanindu Hasaranga	', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":true, \"Keeper\":false }', 7, NULL, 5, 0.00, 'Images\\Player_1664862335330.jpg', 'Active', NULL, NULL, '2022-10-04 05:45:35', '2022-10-04 05:45:35'),
(30, 'New', 1, '{ \"All Rounder\":true, \"Batsman\":false, \"Bowler\":false, \"Keeper\":false, \"Goalkeeper\":false, \"Defender\":false, \"Midfielder\":false, \"Forward\":false }', 8, 0, 0, 0.00, '', 'Active', NULL, NULL, '2022-10-10 08:56:15', '2022-10-11 12:09:52');

-- --------------------------------------------------------

--
-- Table structure for table `rolepermission`
--

CREATE TABLE `rolepermission` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role_id` int(11) NOT NULL,
  `perm_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `role_description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `role_description`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'System Admin ', '2022-09-10 15:49:17', '2022-09-10 15:49:17'),
(6, 'Fixture & Team', 'Fixture & Team', '2022-10-03 07:54:32', '2022-10-03 07:54:32');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `perm_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `role_id`, `perm_id`, `createdAt`, `updatedAt`) VALUES
(61, 1, 1, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(62, 1, 4, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(63, 1, 3, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(64, 1, 2, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(65, 1, 5, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(66, 1, 7, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(67, 1, 6, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(68, 1, 8, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(69, 1, 9, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(70, 1, 10, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(71, 1, 11, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(72, 1, 12, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(73, 1, 13, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(74, 1, 14, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(75, 1, 15, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(76, 1, 16, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(77, 1, 17, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(78, 1, 18, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(79, 1, 19, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(80, 1, 20, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(81, 1, 21, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(82, 1, 22, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(83, 1, 23, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(84, 1, 24, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(85, 1, 25, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(86, 1, 26, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(87, 1, 27, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(88, 1, 28, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(89, 1, 29, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(90, 1, 30, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(91, 1, 31, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(92, 1, 32, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(93, 1, 33, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(94, 1, 34, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(95, 1, 35, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(96, 1, 36, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(97, 1, 37, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(98, 1, 38, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(99, 1, 39, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(100, 1, 40, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(101, 1, 41, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(102, 1, 42, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(103, 1, 43, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(104, 1, 44, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(105, 1, 45, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(106, 1, 46, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(107, 1, 47, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(108, 1, 48, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(109, 1, 49, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(110, 1, 50, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(111, 1, 51, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(112, 1, 52, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(113, 1, 53, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(114, 1, 54, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(115, 1, 55, '2022-10-01 09:14:13', '2022-10-01 09:14:13'),
(158, 6, 11, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(159, 6, 12, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(160, 6, 13, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(161, 6, 14, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(162, 6, 15, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(163, 6, 16, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(164, 6, 18, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(165, 6, 19, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(166, 6, 17, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(167, 6, 20, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(168, 6, 26, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(169, 6, 27, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(170, 6, 28, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(171, 6, 29, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(172, 6, 30, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(173, 6, 31, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(174, 6, 32, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(175, 6, 33, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(176, 6, 34, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(177, 6, 35, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(178, 6, 41, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(179, 6, 42, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(180, 6, 43, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(181, 6, 44, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(182, 6, 45, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(183, 6, 46, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(184, 6, 47, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(185, 6, 48, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(186, 6, 49, '2022-10-03 08:50:39', '2022-10-03 08:50:39'),
(187, 6, 50, '2022-10-03 08:50:39', '2022-10-03 08:50:39');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `name`, `image`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Slider 1', 'Images\\Slider_1663998254274.png', NULL, NULL, '2022-09-24 05:44:14', '2022-09-24 05:44:14'),
(2, 'Slider 2', 'Images\\Slider_1663998281755.jpg', NULL, NULL, '2022-09-24 05:44:41', '2022-09-24 05:44:41'),
(3, 'Slider 3', 'Images\\Slider_1663998305341.jpg', NULL, NULL, '2022-09-24 05:45:05', '2022-09-24 05:45:05');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `player_ids` varchar(255) DEFAULT NULL,
  `ranking` int(11) DEFAULT NULL,
  `point` double(8,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `team_details`
--

CREATE TABLE `team_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `month` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tournaments`
--

INSERT INTO `tournaments` (`id`, `name`, `game_id`, `category`, `month`, `year`, `logo`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Asia Cup', 1, 'International', 'March', '2022', 'Images\\Tournament_1663578242640.png', NULL, NULL, '2022-09-19 05:31:34', '2022-09-19 09:04:02'),
(2, 'hello', 1, 'Franchise', 'June', '2023', 'Images\\Tournament_1663565540349.jpg', NULL, NULL, '2022-09-19 05:32:20', '2022-09-24 04:55:35'),
(3, 'FIFA World Cup', 2, 'International', 'July', '2022', 'Images\\Tournament_1663578117579.png', NULL, NULL, '2022-09-19 06:15:00', '2022-09-24 04:55:38'),
(4, 'ICC T20 World Cup', 1, 'International', 'November', '2022', 'Images\\Tournament_1663579171194.png', NULL, NULL, '2022-09-19 06:15:33', '2022-09-24 04:55:40'),
(5, 'Product-1', 1, 'Franchise', '', '', '', NULL, NULL, '2022-09-22 05:18:15', '2022-09-24 04:55:12'),
(6, 'প্রো-কাবাডি', 6, 'Franchise', 'November', '2022', 'Images\\Tournament_1663825529966.jpg', NULL, NULL, '2022-09-22 05:45:29', '2022-09-24 06:54:37'),
(7, 'Bangabaundho BPL 22', 1, 'Franchise', 'September', '2022', '', NULL, NULL, '2022-10-04 06:13:48', '2022-10-04 06:13:48'),
(8, 'IPL', 1, 'Franchise', 'November', '2022', '', NULL, NULL, '2022-10-04 07:09:39', '2022-10-08 13:23:32'),
(9, 'Testing Tournament', 1, 'International', 'January', '2022', '', NULL, NULL, '2022-10-11 04:52:59', '2022-10-11 05:00:46'),
(10, 'Asia Cupdff', 1, 'International', 'March', '2022', '', NULL, NULL, '2022-10-11 05:10:34', '2022-10-11 05:10:34'),
(11, 'df', 1, 'International', '', '', '', NULL, NULL, '2022-10-11 07:06:38', '2022-10-11 07:06:38');

-- --------------------------------------------------------

--
-- Table structure for table `tournament_teams`
--

CREATE TABLE `tournament_teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `franchise_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tournament_teams`
--

INSERT INTO `tournament_teams` (`id`, `name`, `tournament_id`, `category`, `country_id`, `franchise_id`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(2, 'Team Two', 1, 'International', 7, 0, NULL, NULL, '2022-09-28 07:13:59', '2022-09-28 07:13:59'),
(3, 'Group A', 1, 'International', 1, 0, NULL, NULL, '2022-10-04 06:25:58', '2022-10-04 06:25:58'),
(4, 'Group-1', 8, 'Franchise', 0, 1, NULL, NULL, '2022-10-04 07:10:10', '2022-10-04 07:10:10');

-- --------------------------------------------------------

--
-- Table structure for table `tournament_team_players`
--

CREATE TABLE `tournament_team_players` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `tournament_team_id` int(11) DEFAULT NULL,
  `player_ids` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tournament_team_players`
--

INSERT INTO `tournament_team_players` (`id`, `tournament_id`, `tournament_team_id`, `player_ids`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(2, 1, 3, '[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]', NULL, NULL, '2022-10-11 05:25:54', '2022-10-11 12:51:29');

-- --------------------------------------------------------

--
-- Table structure for table `tournament_team_player_details`
--

CREATE TABLE `tournament_team_player_details` (
  `id` int(11) NOT NULL,
  `tournament_team_player_id` int(11) DEFAULT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `tournament_team_id` int(11) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tournament_team_player_details`
--

INSERT INTO `tournament_team_player_details` (`id`, `tournament_team_player_id`, `tournament_id`, `tournament_team_id`, `player_id`, `created_by`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 3, 8, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(2, 2, 1, 3, 10, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(3, 2, 1, 3, 9, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(4, 2, 1, 3, 12, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(5, 2, 1, 3, 11, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(6, 2, 1, 3, 13, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(7, 2, 1, 3, 14, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(8, 2, 1, 3, 15, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(9, 2, 1, 3, 16, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(10, 2, 1, 3, 17, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(11, 2, 1, 3, 18, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(12, 2, 1, 3, 19, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(13, 2, 1, 3, 20, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(14, 2, 1, 3, 21, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29'),
(15, 2, 1, 3, 22, NULL, NULL, '2022-10-11 12:51:29', '2022-10-11 12:51:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `password`, `phone_number`, `gender`, `age`, `createdAt`, `updatedAt`) VALUES
(4, 1, 'Admin User', 'admin@gmail.com', '$2a$08$Q3ZhbtWyok5NB6919XrJvumHZ2/09Tz86cKb9sDuHDUME7zNQN3R2', NULL, NULL, NULL, '2022-09-11 09:44:03', '2022-09-11 09:44:03'),
(16, 1, 'Sumon', 'admin@example.com', '$2a$08$Nkp.VlKO15BLtsIK8aZluesbHg71Dra7pJYbuskRgeINZvI3HosHC', '01322819427', 'Male', '', '2022-09-21 04:33:00', '2022-09-21 04:33:00'),
(17, 6, 'riaz', 'riazuddinusbangla@gmail.com', '$2a$08$fMIkd/hXCcLKu3Jmudf2XuJq4TL1ylK/GBaDpRowskA0vhc.oJGEW', NULL, NULL, NULL, '2022-10-03 07:38:13', '2022-10-03 08:07:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `franchises`
--
ALTER TABLE `franchises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tournament_id` (`tournament_id`),
  ADD KEY `tournament_team_one_id` (`tournament_team_one_id`),
  ADD KEY `tournament_team_two_id` (`tournament_team_two_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `perm_name` (`perm_name`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rolepermission`
--
ALTER TABLE `rolepermission`
  ADD PRIMARY KEY (`role_id`,`perm_id`),
  ADD KEY `perm_id` (`perm_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_details`
--
ALTER TABLE `team_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player_id` (`player_id`);

--
-- Indexes for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tournament_teams`
--
ALTER TABLE `tournament_teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tournament_team_players`
--
ALTER TABLE `tournament_team_players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tournament_id` (`tournament_id`),
  ADD KEY `tournament_team_id` (`tournament_team_id`);

--
-- Indexes for table `tournament_team_player_details`
--
ALTER TABLE `tournament_team_player_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tournament_team_player_id` (`tournament_team_player_id`),
  ADD KEY `player_id` (`player_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `franchises`
--
ALTER TABLE `franchises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=188;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_details`
--
ALTER TABLE `team_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tournament_teams`
--
ALTER TABLE `tournament_teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tournament_team_players`
--
ALTER TABLE `tournament_team_players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tournament_team_player_details`
--
ALTER TABLE `tournament_team_player_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `franchises`
--
ALTER TABLE `franchises`
  ADD CONSTRAINT `franchises_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`tournament_team_one_id`) REFERENCES `tournament_teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`tournament_team_two_id`) REFERENCES `tournament_teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rolepermission`
--
ALTER TABLE `rolepermission`
  ADD CONSTRAINT `rolepermission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rolepermission_ibfk_2` FOREIGN KEY (`perm_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team_details`
--
ALTER TABLE `team_details`
  ADD CONSTRAINT `team_details_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tournament_team_players`
--
ALTER TABLE `tournament_team_players`
  ADD CONSTRAINT `tournament_team_players_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tournament_team_players_ibfk_2` FOREIGN KEY (`tournament_team_id`) REFERENCES `tournament_teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tournament_team_player_details`
--
ALTER TABLE `tournament_team_player_details`
  ADD CONSTRAINT `tournament_team_player_details_ibfk_1` FOREIGN KEY (`tournament_team_player_id`) REFERENCES `tournament_team_players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tournament_team_player_details_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
