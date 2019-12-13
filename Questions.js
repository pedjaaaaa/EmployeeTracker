addingEmployee = [{
    message: 'What is the employees first name?',
    name: "firstName",
    type: 'input',
    validate: async (input) => {
        if (input.length === 0 || !input.match(/[a-zA-Z]/i)) {
            console.log("\nPlease enter a valid name with only letters");
            return false;
        }
        return true;
    },
},
{
    message: 'What is the employees last name?',
    name: "lastName",
    type: 'input',
    validate: async (input) => {
        if (input.length === 0 || !input.match(/[a-zA-Z]/i)) {
            console.log("\nPlease enter a valid name with only letters");
            return false;
        }
        return true;
    },
},
{
    message: 'What is the employees role?',
    name: "role",
    type: 'list',
    choices: [ 'Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'
]
},
{
    message: "Who is the employee's manager?",
    name: "manager",
    type: 'list',
    choices: ['None']
}]

module.exports = addingEmployee;