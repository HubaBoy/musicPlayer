-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: musicplayer
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `song` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'Rap God','uploads\\songs\\1691580543288-15737293','uploads\\thumbnails\\1691580543342-337307237'),(2,'FRIENDS','uploads\\songs\\1691581658851-232135626','uploads\\thumbnails\\1691581658982-478727410'),(3,'Sentrope','uploads\\songs\\1691581828070-687032334','uploads\\thumbnails\\1691581828156-528981605'),(4,'Depresar','uploads\\songs\\1691582112398-969022252','uploads\\thumbnails\\1691582112439-700632906'),(5,'Shake it off','uploads\\songs\\1691582198993-979495608','uploads\\thumbnails\\1691582199103-291828157'),(6,'Till i collapse ','uploads\\songs\\1691582280713-839039612','uploads\\thumbnails\\1691582280951-754215642'),(7,'Te amo','uploads\\songs\\1691582304737-345066704','uploads\\thumbnails\\1691582304828-506498468'),(8,'Мойта','uploads\\songs\\1691582520098-132260200','uploads\\thumbnails\\1691582520213-49904904'),(9,'Жива рана','uploads\\songs\\1691582840275-156791093','uploads\\thumbnails\\1691582840463-933456634'),(10,'Holiday','uploads\\songs\\1691583040109-175812712','uploads\\thumbnails\\1691583040174-482428517'),(11,'Old Town Road','uploads\\songs\\1691583063371-628362890','uploads\\thumbnails\\1691583063446-288364479'),(12,'Dom Dom Yes Yes','uploads\\songs\\1691583094112-372749414','uploads\\thumbnails\\1691583094205-170214443'),(13,'All Star','uploads\\songs\\1691583308296-316934246','uploads\\thumbnails\\1691583308367-893526866');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-12  1:20:54
