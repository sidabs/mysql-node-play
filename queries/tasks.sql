##### CRUD
#create new user
DELIMITER $$
CREATE PROCEDURE createNewTask
(
	IN taskId varchar(10),
	IN task varchar(255)
)
BEGIN
	INSERT INTO tasks VALUES (taskId, task);
END$$
DELIMITER ;

#retrieve user by id
DELIMITER $$
CREATE PROCEDURE getTaskById
(
	IN taskId varchar(10)
)
BEGIN
	SELECT * FROM tasks WHERE _id = taskId;
END$$
DELIMITER ;

#update user by id
DELIMITER $$
CREATE PROCEDURE updateTaskById
(
	IN taskId varchar(10),
	IN updatedTask varchar(255)
)
BEGIN
	UPDATE tasks SET task = updatedTask where _id = taskId;
END$$
DELIMITER ;


#delete user by id
DELIMITER $$
CREATE PROCEDURE deleteTaskById
(
	IN taskId varchar(10)
)
BEGIN
	DELETE FROM tasks WHERE _id = taskId;
END$$
DELIMITER ;

##### NON CRUD
#retrieve all users
DELIMITER $$
CREATE PROCEDURE getTasks ()
BEGIN
	SELECT * FROM tasks;
END$$
DELIMITER ;