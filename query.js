var query = {

    viewTeamStruct:
    `select role.id, title, salary,department_id, name AS department from role join department on role.department_id = department.id`,

    viewEmployDetail: 
    `Select e.id, e.first_name, e.last_name, title, name 'department', salary, IFNULL(CONCAT(m.first_name, ' ' , m.last_name), 'null') AS 'Manager' from employee e 
    left join role on e.role_id = role.id 
    left join employee m on e.manager_id = m.id 
    left join department on department_id = department.id`,

    viewListOfDept:
    `Select name from department`,

    viewListOfManager:
    `Select m.id 'id', concat(m.first_name,' ',m.last_name) AS 'Manager' from employee e
    inner join employee m on e.manager_id = m.id;`,

    viewListOfRole:
    `select title from role`,

    viewListOfAllName:
    `select id, concat(first_name,' ',last_name) as Name from employee`,

    insertNewEmployee:
    `insert into employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)`,

    removeEmpolyee:
    `delete from employee`,

    updateEmplyee:
    `update employee`,

    viewDepartBudget:
    `select name 'department', sum(salary)'budget' from department 
    left join role on department.id = role.department_id
    right join employee on employee.role_id = role.id
    group by name`

}

module.exports = query;