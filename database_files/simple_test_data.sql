INSERT INTO user (username, `password`, session_token) VALUES('test','test','test');

INSERT INTO board (`name`) VALUES ("MyBoard");
INSERT INTO board (`name`) VALUES ("Board 2");
INSERT INTO user_has_board (user_id, board_id) VALUES (1,1);
INSERT INTO user_has_board (user_id, board_id) VALUES (1,2);

INSERT INTO `list` (`name`, board_id) VALUES('List nr1', 1);

INSERT INTO task (`name`,description,end_date,`status`,list_id) VALUES("TestTask","Fake description",'0000-00-00 00:00:00',"completed",1);
INSERT INTO task (`name`,description,end_date,`status`,list_id) VALUES("Test nr 2","Fake description for task 2",'2014-01-01 00:00:00',"not_completed",1);