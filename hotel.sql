-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` varchar(36) NOT NULL,
  `fullName` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'user',
  `active` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('6d9ec823-b0af-44ad-a96c-870843a1a229','khang',NULL,NULL,'$2b$10$H.F2DNHNyXnz4Mn6hO9owOQpePvztNM0d9NatWwUKza4om.AxPGYW','admin',1,'2021-03-20 00:39:25','2021-03-20 00:39:25'),('ea616ffc-1243-4887-b09b-1da2bbb38dd2','thang',NULL,NULL,'$2b$10$H.F2DNHNyXnz4Mn6hO9owOQpePvztNM0d9NatWwUKza4om.AxPGYW','user',1,'2021-03-20 00:39:38','2021-03-20 00:39:38');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `roomId` varchar(36) DEFAULT NULL,
  `quantity` int NOT NULL,
  `status` int DEFAULT '1',
  `day` int NOT NULL,
  `month` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES ('b1e90314-7c44-4484-8957-41a2e6c56199','6d9ec823-b0af-44ad-a96c-870843a1a229','fd659cc4-040a-4be4-8c77-19da769724c5',1,1,6,7,'2021-03-20 00:51:53','2021-03-20 00:51:53'),('b4641438-d527-4fb0-80bd-90a44c5309ce','6d9ec823-b0af-44ad-a96c-870843a1a229','fd659cc4-040a-4be4-8c77-19da769724c5',20,0,6,7,'2021-03-20 00:45:19','2021-03-20 00:47:47'),('d1fd8774-079b-41a1-a790-56aedf9fd446','6d9ec823-b0af-44ad-a96c-870843a1a229','fd659cc4-040a-4be4-8c77-19da769724c5',20,0,6,7,'2021-03-20 00:47:10','2021-03-20 00:51:40'),('f6d83de5-ee36-490f-94eb-9813364732e3','6d9ec823-b0af-44ad-a96c-870843a1a229','fd659cc4-040a-4be4-8c77-19da769724c5',20,1,6,7,'2021-03-20 00:51:48','2021-03-20 00:51:48');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` varchar(36) NOT NULL,
  `name` varchar(36) DEFAULT NULL,
  `description` varchar(36) DEFAULT NULL,
  `type` varchar(36) NOT NULL,
  `image` varchar(36) DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` varchar(36) DEFAULT NULL,
  `active` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES ('cadde328-2e48-40bf-bfb9-e6dd3d9ff18f','standard room ',NULL,'two bedroom ',NULL,28,'$150',1,'2021-03-20 00:43:59','2021-03-20 00:43:59'),('fd659cc4-040a-4be4-8c77-19da769724c5','delux room',NULL,'onebedroom',NULL,29,'$200',1,'2021-03-20 00:43:38','2021-03-20 00:46:49');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomstatus`
--

DROP TABLE IF EXISTS `roomstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomstatus` (
  `id` varchar(36) NOT NULL,
  `roomId` varchar(36) DEFAULT NULL,
  `quantityLeft` int NOT NULL,
  `day` int NOT NULL,
  `month` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomstatus`
--

LOCK TABLES `roomstatus` WRITE;
/*!40000 ALTER TABLE `roomstatus` DISABLE KEYS */;
INSERT INTO `roomstatus` VALUES ('02d1f148-0789-467b-b1af-a8356df0843c','fd659cc4-040a-4be4-8c77-19da769724c5',27,6,7,'2021-03-20 00:45:19','2021-03-20 00:51:53');
/*!40000 ALTER TABLE `roomstatus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-20  7:58:28
