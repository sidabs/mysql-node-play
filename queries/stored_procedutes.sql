##### CRUD
#create new user
DELIMITER $$
CREATE PROCEDURE createNewUser
(
	IN userId varchar(10),
	IN userName varchar(20),
	IN userEmail varchar(50)
)
BEGIN
	INSERT INTO users VALUES (userId, userName, userEmail);
END$$
DELIMITER ;

#retrieve user by id
DELIMITER $$
CREATE PROCEDURE getUserById
(
	IN userId varchar(10)
)
BEGIN
	SELECT * FROM users WHERE _id = userId;
END$$
DELIMITER ;

#update user by id
DELIMITER $$
CREATE PROCEDURE updateUserById
(
	IN userId varchar(10),
	IN updatedUserName varchar(20),
	IN updatedUserEmail varchar(50)
)
BEGIN
	UPDATE users SET name = updatedUserName, email = updatedUserEmail where _id = userId;
END$$
DELIMITER ;


#delete user by id
DELIMITER $$
CREATE PROCEDURE deleteUserById
(
	IN userId varchar(10)
)
BEGIN
	DELETE FROM users WHERE _id = userId;
END$$
DELIMITER ;

##### NON CRUD
#retrieve all users
DELIMITER $$
CREATE PROCEDURE getUsers ()
BEGIN
	SELECT * FROM users;
END$$
DELIMITER ;