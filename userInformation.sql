-- phpMyAdmin SQL Dump
-- version 5.2.2-1.el9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2025 at 04:15 AM
-- Server version: 9.1.0-commercial
-- PHP Version: 8.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `het33_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `userInformation`
--

CREATE TABLE `userInformation` (
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text NOT NULL,
  `bestScore` bigint NOT NULL DEFAULT '0',
  `gold` bigint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userInformation`
--

INSERT INTO `userInformation` (`userName`, `password`, `bestScore`, `gold`) VALUES
('fus41', '$2y$10$1A4yT/NimjI5BOe6wRYfbOF6Sv34ftc/OHnK3o4Hj41Q1TAUN0aKy', 0, 0),
('hello', '$2y$10$2aG6F4IrLqoneq9KBxFU7upVD.B.M37ZbtjDNLI3focri9IHLoj86', 0, 0),
('het', '1234567Aa.', 0, 0),
('testuser1', '$2y$10$QgZoUpm4AeoC.u1EBWRoyenNH1wleJcVzoMQnEB9e3I4asfGXHkqS', 0, 0),
('testuser2', '$2y$10$dXORijuO0EIQyG5R2HZ6auY6NSWaXFqEaW.DQR5kPDwFglTSlYVxi', 0, 0),
('tony1', 'Tony1.', 0, 0),
('TOTO', '$2y$10$ynjuzjf2vka.fxwYx1kBEu0t9QHq5BoGts4nT3yuw75QueaklofxO', 0, 0),
('user1', '$2y$10$U6CYPbQwTefSoQom9eaPE.ylozpnjWmCO1Gdwx4Uu4x1y7YVK5esC', 0, 0),
('yusuf', '$2y$10$iPkOea5CQrgOC/PM4xifR.P44lW/9ZY8aFLXB0vNseHJyiKNkbhWS', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userInformation`
--
ALTER TABLE `userInformation`
  ADD PRIMARY KEY (`userName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
