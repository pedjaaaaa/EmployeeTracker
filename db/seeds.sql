USE employeetracker_db;

INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Legal');

INSERT INTO ROLE (title,salary,department_id) VALUES ("Lead Engineer",100000,1);
INSERT INTO ROLE (title,salary,department_id) VALUES ("General Engineer", 70000,1);
INSERT INTO ROLE (title,salary,department_id) VALUES ("Lead Sale", 60000, 2);
INSERT INTO ROLE (title,salary,department_id) VALUES ("Saleperson", 40000,2);
INSERT INTO ROLE (title,salary,department_id) VALUES ("Lawyer",80000,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, null), ('Mike', 'Chan', 2, 1), ('Ashley', 'Rodriguez', 3, null);
