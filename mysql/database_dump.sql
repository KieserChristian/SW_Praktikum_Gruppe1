CREATE DATABASE IF NOT EXISTS 'it_projekt'
USE 'it_projekt';


CREATE TABLE `grading` (
  `grading_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `grade` float DEFAULT NULL,
  PRIMARY KEY (`grading_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `module` (
  `module_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `edv_number` int DEFAULT NULL,
  PRIMARY KEY (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `participation` (
  `participation_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`participation_id`),
  CONSTRAINT `grading_id` FOREIGN KEY (`participation_id`) REFERENCES `grading` (`grading_id`),
  CONSTRAINT `module_id` FOREIGN KEY (`participation_id`) REFERENCES `module` (`module_id`),
  CONSTRAINT `project_id` FOREIGN KEY (`participation_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `student_idd` FOREIGN KEY (`participation_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `person` (
  `person_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  CONSTRAINT `student_id` FOREIGN KEY (`person_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `project` (
  `project_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `external_partners` varchar(45) DEFAULT NULL,
  `short_description` varchar(45) DEFAULT NULL,
  `weekly_flag` tinyint DEFAULT NULL,
  `bd_before_lecture_period` int DEFAULT NULL,
  `bd_in_exam_period` int DEFAULT NULL,
  `bd_in_lecture_period` int DEFAULT NULL,
  `bd_preffered_in_lecture_period` int DEFAULT NULL,
  `special_room` int DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  CONSTRAINT `module_idd` FOREIGN KEY (`project_id`) REFERENCES `module` (`module_id`),
  CONSTRAINT `person_idd` FOREIGN KEY (`project_id`) REFERENCES `person` (`person_id`),
  CONSTRAINT `project_type_id` FOREIGN KEY (`project_id`) REFERENCES `project_type` (`project_type_id`),
  CONSTRAINT `semester_id` FOREIGN KEY (`project_id`) REFERENCES `semester` (`semester_id`),
  CONSTRAINT `state_id` FOREIGN KEY (`project_id`) REFERENCES `state` (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `project_type` (
  `project_type_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `number_ects` int DEFAULT NULL,
  `number_sws` int DEFAULT NULL,
  PRIMARY KEY (`project_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `static_attribute` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  CONSTRAINT `person_id` FOREIGN KEY (`role_id`) REFERENCES `person` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `semester` (
  `semester_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`semester_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `state` (
  `state_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `state_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `student` (
  `student_id` int NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `matriculation_number` int DEFAULT NULL,
  `course_abbreviation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
