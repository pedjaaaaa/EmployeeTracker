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
  FOREIGN KEY (department_id)
    REFERENCES department(id),
  PRIMARY KEY(id) 
);

CREATE TABLE employees (
  id int AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id)
    REFERENCES roles(id),
  FOREIGN KEY (manager_id)
    REFERENCES employees(id),
);


INSERT INTO employees (first_name, last_name) VALUES ('John Doe'), ('Mike Chan'), ('Ashley Rodriguez'), ('Kevin Tupik'), ('Malia Brown'), ('Sarah Lourd'), ('Tom Allen'), ('Tammer Galal');
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');
INSERT INTO roles (title, salary) VALUES ('Sales Lead', 100,000), ('Salesperson', 80,000), ('Lead Engineer', 150,000), ('Software Engineer', 120,000), ('Accountant', 125,000), ('Legal Team Lead', 250,000), ('Lawyer', 190,000);
