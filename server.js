const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const chalk = require("chalk");
const figlet = require("figlet");
const boxen = require("boxen");
const questions = require("./Questions");

//  Add departments, roles, employees
//  View departments, roles, employees
//  Update employee roles

console.log(
    boxen(chalk.cyan(figlet.textSync('Employee' + '\n' + 'Manager', { horizontalLayout: 'full' }))
    ));

start();

function start() {
    inquirer
        .prompt([{
            message: 'What would you like to do?',
            name: "initQuestion",
            type: 'list',
            choices: [
                "View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "View Total Utilized Budget", "End"
            ]
        }])
        .then(answer => {
            if (answer.initQuestion === "View All Employees") {
                console.log("Viewing All Employees");

            } else if (answer.initQuestion === "View All Employees by Department") {
                console.log("Viewing All Employees by Department");

            } else if (answer.initQuestion === "View All Employees by Manager") {
                console.log("Viewing All Employees by Manager");

            } else if (answer.initQuestion === "Add Employee") {
                inquirer.prompt(addingEmployee)
                    .then(function (data) {
                        console.log(data);
                        console.log(:"Added Employee");

                    }, function (error) {
                        console.log(error);
                    })

            } else if (answer.initQuestion === "Update Employee Role") {
                console.log("Updating Employee Role");

            } else if (answer.initQuestion === "View All Roles") {
                console.log("Viewing All Roles");

            } else if (answer.initQuestion === "Add Role") {
                console.log("Adding Role");

            } else if (answer.initQuestion === "View All Departments") {
                console.log("Viewing Department");

            } else if (answer.initQuestion === "Add Department") {
                console.log("Adding Department");

            } else if (answer.initQuestion === "View Total Utilized Budget") {
                console.log("Viewing Budget");

            } else if (answer.initQuestion === "End") {
                console.log("Ending");
            }
        })
};
// * Add departments, roles, employees
// * View departments, roles, employees
// * Update employee roles
// * Update employee managers
// * View employees by manager
// * Delete departments, roles, and employees
// * View the total utilized budget of a department -- ie the combined salaries of all employees in that department