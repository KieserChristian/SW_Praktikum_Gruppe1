CREATE DATABASE  IF NOT EXISTS `sw_praktikum_cloud` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sw_praktikum_cloud`;
-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: sw_praktikum_cloud
-- ------------------------------------------------------
-- Server version	5.7.25-google-log

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'fcba5f47-4432-11eb-9c6a-42010a9c0ffa:1-142327';

--
-- Table structure for table `automat`
--

DROP TABLE IF EXISTS `automat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `automat` (
  `automat_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `current_state` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`automat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `automat`
--

LOCK TABLES `automat` WRITE;
/*!40000 ALTER TABLE `automat` DISABLE KEYS */;
/*!40000 ALTER TABLE `automat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grading`
--

DROP TABLE IF EXISTS `grading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grading` (
  `grading_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `grade` float DEFAULT NULL,
  PRIMARY KEY (`grading_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grading`
--

LOCK TABLES `grading` WRITE;
/*!40000 ALTER TABLE `grading` DISABLE KEYS */;
INSERT INTO `grading` VALUES (1,NULL,1),(2,NULL,NULL),(3,NULL,3),(4,NULL,0.9),(5,'2020-12-20 17:38:21',5.8),(6,'2020-12-20 20:13:34',3),(7,'2020-12-20 20:19:34',4),(8,'2020-12-20 20:23:04',4.25),(9,'2020-12-20 20:25:34',5.5),(10,'2020-12-20 20:27:32',3.69),(11,'2020-12-20 20:34:33',3.22),(12,'2020-12-20 20:35:14',3.22),(13,'2020-12-20 20:40:02',3.22),(14,'2020-12-20 20:45:52',3.22),(15,'2020-12-21 11:55:48',4.7),(16,'2020-12-22 10:45:08',4);
/*!40000 ALTER TABLE `grading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `module_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `edv_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participation`
--

DROP TABLE IF EXISTS `participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participation` (
  `participation_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`participation_id`),
  CONSTRAINT `grading_id` FOREIGN KEY (`participation_id`) REFERENCES `grading` (`grading_id`),
  CONSTRAINT `module_id` FOREIGN KEY (`participation_id`) REFERENCES `module` (`module_id`),
  CONSTRAINT `project_id` FOREIGN KEY (`participation_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `student_idd` FOREIGN KEY (`participation_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participation`
--

LOCK TABLES `participation` WRITE;
/*!40000 ALTER TABLE `participation` DISABLE KEYS */;
/*!40000 ALTER TABLE `participation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `person_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  CONSTRAINT `student_id` FOREIGN KEY (`person_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `external_partners` varchar(45) DEFAULT NULL,
  `short_description` varchar(45) DEFAULT NULL,
  `weekly_flag` tinyint(4) DEFAULT NULL,
  `bd_before_lecture_period` int(11) DEFAULT NULL,
  `bd_in_exam_period` int(11) DEFAULT NULL,
  `bd_in_lecture_period` int(11) DEFAULT NULL,
  `bd_preffered_in_lecture_period` int(11) DEFAULT NULL,
  `special_room` int(11) DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  CONSTRAINT `module_idd` FOREIGN KEY (`project_id`) REFERENCES `module` (`module_id`),
  CONSTRAINT `person_idd` FOREIGN KEY (`project_id`) REFERENCES `person` (`person_id`),
  CONSTRAINT `project_type_id` FOREIGN KEY (`project_id`) REFERENCES `project_type` (`project_type_id`),
  CONSTRAINT `semester_id` FOREIGN KEY (`project_id`) REFERENCES `semester` (`semester_id`),
  CONSTRAINT `state_id` FOREIGN KEY (`project_id`) REFERENCES `state` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_type`
--

DROP TABLE IF EXISTS `project_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_type` (
  `project_type_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `number_ects` int(11) DEFAULT NULL,
  `number_sws` int(11) DEFAULT NULL,
  PRIMARY KEY (`project_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_type`
--

LOCK TABLES `project_type` WRITE;
/*!40000 ALTER TABLE `project_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `static_attribute` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  CONSTRAINT `person_id` FOREIGN KEY (`role_id`) REFERENCES `person` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester` (
  `semester_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`semester_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `state_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `matriculation_number` int(11) DEFAULT NULL,
  `course_abbreviation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-30 15:38:41
