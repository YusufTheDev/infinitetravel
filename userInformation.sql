-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2025 at 07:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `userName` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `bestScore` bigint(20) NOT NULL DEFAULT 0,
  `gold` bigint(20) NOT NULL DEFAULT 0,
  `speedBoost` tinyint(4) NOT NULL DEFAULT 0,
  `moreHp` tinyint(4) NOT NULL DEFAULT 0,
  `default` tinyint(4) NOT NULL DEFAULT 2,
  `golden` tinyint(4) NOT NULL DEFAULT 0,
  `exGolden` tinyint(4) NOT NULL DEFAULT 0,
  `promax` tinyint(4) NOT NULL DEFAULT 0,
  `mew` tinyint(4) NOT NULL DEFAULT 0,
  `what` tinyint(4) NOT NULL DEFAULT 0,
  `big` tinyint(4) NOT NULL DEFAULT 0,
  `skin` varchar(15) NOT NULL DEFAULT 'default'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userInformation`
--

INSERT INTO `userInformation` (`userName`, `password`, `bestScore`, `gold`, `speedBoost`, `moreHp`, `default`, `golden`, `exGolden`, `promax`, `mew`, `what`, `big`, `skin`) VALUES
('fus41', '$2y$10$1A4yT/NimjI5BOe6wRYfbOF6Sv34ftc/OHnK3o4Hj41Q1TAUN0aKy', 234, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 'default'),
('hello', '$2y$10$2aG6F4IrLqoneq9KBxFU7upVD.B.M37ZbtjDNLI3focri9IHLoj86', 34, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 'default'),
('test1', '$2y$10$2qitUgF/KeJBM/iV7pP4JOpBFvZ8s1QK6drv9m5mEEYCq4b1twCcy', 2000, 988000, 2, 2, 1, 1, 2, 0, 0, 1, 1, 'exGolden'),
('testuser1', '$2y$10$QgZoUpm4AeoC.u1EBWRoyenNH1wleJcVzoMQnEB9e3I4asfGXHkqS', 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 'default'),
('testuser2', '$2y$10$dXORijuO0EIQyG5R2HZ6auY6NSWaXFqEaW.DQR5kPDwFglTSlYVxi', 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 'default'),
('TOTO', '$2y$10$ynjuzjf2vka.fxwYx1kBEu0t9QHq5BoGts4nT3yuw75QueaklofxO', 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 'default'),
('user1', '$2y$10$U6CYPbQwTefSoQom9eaPE.ylozpnjWmCO1Gdwx4Uu4x1y7YVK5esC', 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 'default'),
('yusuf', '$2y$10$iPkOea5CQrgOC/PM4xifR.P44lW/9ZY8aFLXB0vNseHJyiKNkbhWS', 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 'default');

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
