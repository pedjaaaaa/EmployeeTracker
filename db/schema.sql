DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE roles (
  id int AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id int NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY(id) 
);

create table employee (
    id INT not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int null,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    PRIMARY KEY (id)
);

select roles.id, first_name, last_name, title, salary, department_id, name AS department from roles
join department on roles.department_id = department.id;

select * from employee;