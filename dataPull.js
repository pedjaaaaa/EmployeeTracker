const connection = require("./connection");
const queryRun = require("./query");
const inquirer = require("inquirer");

var orm = {

    // A list of name of department
    getListOfDept() {
        return new Promise(resolve => {
            connection.query(queryRun.viewListOfDept, function (err, res) {
                if (err) throw err;
                let listDept = [];
                for (var i = 0; i < res.length; i++) {
                    listDept.push(res[i].name);
                }
                resolve(listDept);
            });
        });
    },


    // A list of name of role
    getListOfRole() {
        return new Promise(resolve => {
            connection.query(queryRun.viewListOfRole, function (err, res) {
                if (err) throw err;
                let listRole = [];
                for (var i = 0; i < res.length; i++) {
                    listRole.push(res[i].title);
                }
                resolve(listRole);
            });
        });
    },

    // A list of all the employee's name
    getListOfAllName() {
        return new Promise(resolve => {
            connection.query(queryRun.viewListOfAllName, function (err, res) {
                if (err) throw err;
                let listName = ["None"];
                for (var i = 0; i < res.length; i++) {
                    listName.push(res[i].id + "." + res[i].Name);
                }
                resolve(listName);
            });
        });
    },

    // The total utilized budget of a selected daprtment
    viewDepartBudget(cb, listDept) {
        inquirer.prompt({
            type: "list",
            name: "department",
            message: "Which department do you want to view the budget?",
            choices: listDept
        })
            .then(function (userPick) {
                let addOnQuery = ` Having name = ?`;
                connection.query(queryRun.viewDepartBudget + addOnQuery, [userPick.department], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    cb();
                });
            });
    },

    // View employee detailed information along wit role and manager
    viewEmployDetail(cb) {
        connection.query(queryRun.viewEmployDetail, function (err, res) {
            if (err) throw err;
            console.table(res);
            cb();
        });
    },

    // View employee deatailed information as above by in selected department
    viewEmployeeByDept(cb, listDept) {
        inquirer.prompt({
            type: "list",
            name: "department",
            message: "Which department do you want to choose?",
            choices: listDept
        })
            .then(function (userPick) {
                let addOnQuery = ` Where department.name = ?;`;
                connection.query(queryRun.viewEmployDetail + addOnQuery, [userPick.department], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    cb();
                });
            });
    },

    // View employee deatailed information as above by under selected current manager
    viewEmployeeByManager(cb, listManager) {    //with manager himself
        inquirer.prompt({
            type: "list",
            name: "manager",
            message: "Which manager do you want to choose?",
            choices: listManager
        })
            .then(function (userPick) {
                let fullNmae = userPick.manager.split(".")[1];
                let managerId = parseInt(userPick.manager.split(".")[0]);
                let firstName = fullNmae.split(" ")[0];
                let lastName = fullNmae.split(" ")[1];
                let addOnQuery = ` where e.manager_id = ? or e.id = ?
                order by 'Manager' desc;`;
                connection.query(queryRun.viewEmployDetail + addOnQuery, [managerId, managerId], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    cb();
                });
            });
    },


    // Insert new Employee into table
    addEmployee(cb, listRole, listName) {
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of this employee?",
                validate: async (input) => {
                    if (/^[a-zA-Z]+$/.test(input)) {
                        return true;
                    }
                    console.log("\nPlease enter a valid name");
                    return false;
                }
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of this employee?",
                validate: async (input) => {
                    if (/^[a-zA-Z]+$/.test(input)) {
                        return true;
                    }
                    console.log("\nPlease enter a valid name");
                    return false;
                }
            },
            {
                type: "list",
                name: "role",
                message: "What is the role of this employee?",
                choices: listRole
            },
            {
                type: "list",
                name: "manager",
                message: "What is the manager of this employee?",
                choices: listName
            }
        ])

            .then(async function (data) {
                let companyData = await orm.getTeamStruct();
                let firstName = data.firstName;
                let lastName = data.lastName;
                let role_id = companyData[data.role].id;
                let manager_id;
                if (data.manager === "None") manager_id = null;
                else {
                    manager_id = parseInt(data.manager.split(".")[0]);
                }
                connection.query(queryRun.insertNewEmployee, [firstName, lastName, role_id, manager_id], function (err, res) {
                    if (err) throw err;
                    console.log(firstName + " " + lastName + " was added!!!");
                    cb();
                });

            });
    },


    // Remove current selected employee and update all other employee's manager for whoever's manager is the deleted employeee
    removeAndUpdate(cb, listName) {
        inquirer.prompt({
            type: "list",
            name: "remove_employee",
            message: "Which employee do you want to remove?",
            choices: listName
        })
            .then(function (data) {
                if (data.remove_employee === "None") cb();
                else {
                    let remove_employee_id = parseInt(data.remove_employee.split(".")[0]);
                    let addOnQuery = ` where id = ?`;
                    connection.query(queryRun.removeEmpolyee + addOnQuery, [remove_employee_id], function (err, res) {
                        if (err) throw err;
                        console.log("ID:" + remove_employee_id + " employee was removed!!!");
                        let addOnQuery = ` set manager_id = null where manager_id = ?`
                        connection.query(queryRun.updateEmplyee + addOnQuery, [remove_employee_id], function (err, res) {
                            if (err) throw err;
                            console.log("Database was up to date after removing employee!");
                            cb();
                        })
                    });
                }
            });
    },


    // Update current Employee's role with validate unchanged operation
    updateRole(cb, listName, listRole) {
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "which employee do you want to update?",
                choices: listName,
            },
            {
                type: "list",
                name: "role",
                message: "which role do you want to update to?",
                choices: listRole
            }
        ])
            .then(function (data) {
                if (data.employee === "None") cb();
                else {
                    let updateNameId = parseInt(data.employee.split(".")[0]);
                    let updateRole = data.role;
                    let addOnQuery = ` where e.id = ?;`;
                    connection.query(queryRun.viewEmployDetail + addOnQuery, [updateNameId], function (err, res) {
                        if (err) throw err;
                        if (res.title === updateRole) {
                            console.log("It seems like you update to the same role as before.");
                            inquirer.prompt({
                                type: "confirm",
                                name: "update",
                                message: "Do you want to do the update again?"
                            })
                                .then(function (data) {
                                    if (data.update) orm.updateRole(listRole, listName);
                                    else orm.updateRoleNext(cb, updateNameId, updateRole);
                                });
                        } else orm.updateRoleNext(cb, updateNameId, updateRole);
                    });
                }
            })
    },

    // Update current Employee's manager
    updateManager(cb, listName) {
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "which employee do you want to update?",
                choices: listName
            },
            {
                type: "list",
                name: "manager",
                message: "which manager do you want to update to?",
                choices: listName
            }
        ])
            .then(function (data) {
                if (data.employee === "None") cb();
                else {
                    let pickNameId = parseInt(data.employee.split(".")[0]);
                    let pickManagerId;
                    if (data.manager === "None") pickManagerId = null;
                    else pickManagerId = parseInt(data.manager.split(".")[0]);
                    if (pickManagerId === pickNameId) {
                        console.log("Sorry! You can't set yourself as manager!");
                        inquirer.prompt({
                            type: "confirm",
                            name: "update",
                            message: "Do you want to do the update again?"
                        })
                            .then(function (data) {
                                if (data.update) updateManager(cb, istName);
                                else cb();
                            });
                    }
                    else {
                        let addOnQuery = ` set manager_id = ? where id =?`;
                        connection.query(queryRun.updateEmplyee + addOnQuery, [pickManagerId, pickNameId], function (err, res) {
                            if (err) throw err;
                            console.log("ID: " + pickNameId + "'s manager was updated to ID: " + pickManagerId);
                            cb();
                        })
                    }
                }
            });
    },

    //End
    finish() {
        connection.end();
    }

}





module.exports = orm;