var inquirer = require("inquirer");
var orm = require("./dataPull");


start();  // start manipulating team!!!!

function start() {
    inquirer.prompt({
        type: "list",
        message: "What do you want to do?",
        name: "action",
        choices: [
            "View all the employees",
            "View all the employees by department",
            "View all the employees by manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View utilized budget by department",
            "End"
        ]
    })
        .then(function (userAns) {
            let userAction = userAns.action;
            switch (userAction) {
                case ("View all the employees"):
                    viewEmployee();
                    break;
                case ("View all the employees by department"):
                    viewEmployeeByDept();
                    break;
                case ("View all the employees by manager"):
                    viewEmployeeByManager();
                    break;
                case ("Add Employee"):
                    addEmployee();
                    break;
                case ("Remove Employee"):
                    removeEmployee();
                    break;
                case ("Update Employee Role"):
                    updateRole();
                    break;
                case ("Update Employee Manager"):
                    updateManager();
                    break;
                case ("View utilized budget by department"):
                    viewBudget();
                    break;
                default:
                    orm.finish();
            }
        });
}


function viewEmployee() {
    orm.viewEmployDetail(start);
}


async function viewEmployeeByDept() {
    let listDept = await orm.getListOfDept();
    orm.viewEmployeeByDept(start, listDept);
}

async function viewEmployeeByManager() {
    let listManager = await orm.getListOfManager();
    orm.viewEmployeeByManager(start, listManager);
}


async function addEmployee() {
    let listRole = await orm.getListOfRole();
    let listName = await orm.getListOfAllName();
    orm.addEmployee(start, listRole, listName);
}

async function removeEmployee() {
    let listName = await orm.getListOfAllName();
    orm.removeAndUpdate(start, listName);
}

async function updateRole() {
    let listRole = await orm.getListOfRole();
    let listName = await orm.getListOfAllName();
    orm.updateRole(start, listName, listRole);
}


async function updateManager() {
    let listName = await orm.getListOfAllName();
    orm.updateManager(start,listName);
}

async function viewBudget () {
    let listDept = await orm.getListOfDept();
    orm.viewDepartBudget(start, listDept);
}
