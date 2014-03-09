SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `todo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `todo` ;

-- -----------------------------------------------------
-- Table `todo`.`user`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `todo`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(45) NULL ,
  `password` VARCHAR(45) NULL ,
  `session_token` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`board`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `todo`.`board` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`list`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `todo`.`list` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `board_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_list_board1_idx` (`board_id` ASC) ,
  CONSTRAINT `fk_list_board1`
    FOREIGN KEY (`board_id` )
    REFERENCES `todo`.`board` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`task`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `todo`.`task` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `description` VARCHAR(45) NULL ,
  `end_date` DATETIME NULL ,
  `list_id` INT NOT NULL ,
  `status` ENUM('completed','not_completed') NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_task_list1_idx` (`list_id` ASC) ,
  CONSTRAINT `fk_task_list1`
    FOREIGN KEY (`list_id` )
    REFERENCES `todo`.`list` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`user_has_board`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `todo`.`user_has_board` (
  `user_id` INT NOT NULL ,
  `board_id` INT NOT NULL ,
  PRIMARY KEY (`user_id`, `board_id`) ,
  INDEX `fk_user_has_board_board1_idx` (`board_id` ASC) ,
  INDEX `fk_user_has_board_user_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_user_has_board_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `todo`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_board_board1`
    FOREIGN KEY (`board_id` )
    REFERENCES `todo`.`board` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
