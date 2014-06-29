create table users (
	_id varchar(10) not null primary key,
	name varchar(20) not null,
	email varchar(50) not null,
	active boolean not null default false
);