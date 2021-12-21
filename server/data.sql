-- MySQL Database

CREATE TABLE `contacts` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`phone` VARCHAR(50) NOT NULL UNIQUE,
	`selection` VARCHAR(100) NOT NULL,
	`timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`sent` TIMESTAMP NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO contacts (name, email, phone, selection) VALUES ("Alex","alex@live.se", "073318729","Telefon");
INSERT INTO contacts (name, email, phone, selection) VALUES ("Thomas","thomas_@hotmail.com", "012319731","Email");

