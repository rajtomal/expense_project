-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2024 at 07:11 PM
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
-- Database: `mydatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

CREATE TABLE `expense` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `expenseName` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`id`, `userId`, `expenseName`, `amount`, `date`) VALUES
(1, 1004, 'asd', 344.00, '2024-12-06'),
(2, 1004, 'dfgd', 4535.00, '2024-12-05'),
(3, 1005, '345435', 3453.00, '345345'),
(4, 1000, 'sdf', 23423.00, 'dfgdfg'),
(6, 1004, 'Tomal', 1234.00, '2024-12-12'),
(7, 1004, 'Tomal', 12343455.00, '2024-12-12'),
(8, 1004, 'Tomal', 12343455.00, '2024-12-12'),
(10, 1000, 'bazar khoroc', 145.00, '2024-12-04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(50) NOT NULL,
  `userImg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `userImg`) VALUES
(1000, 'Tomal', 'tomal@gmail.com', '12345', 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg'),
(1001, 'hi', 'hi@gmail.com', '123', 'aaa'),
(1002, 'hello', 'hello@gmal.com', '123', '123'),
(1004, 'dsfds', 'tomaffl@gmail.com', '12345', NULL),
(1005, 'dsfds', 'tomaff3@gmail.com', '12345', 'fdgdg'),
(1007, 'tomal', 'ffff@gmail.com', '12345', 'dfsd'),
(1008, '123', 'sdf@gmail.com', '123', '123'),
(1010, 'Toukir', 'toukir@gmail.com', '12345', 'toukir'),
(1011, 'Tomal', 'qweqwe@dfgn.com', '4fddsdf', 'eq'),
(1012, 'sdf', 'sdfs@gmail.com', '12345', 'sdf'),
(1013, 'samir', 'samir@gmail.com', '12345', 'aaa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `unique_userEmail` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expense`
--
ALTER TABLE `expense`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1014;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expense`
--
ALTER TABLE `expense`
  ADD CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
