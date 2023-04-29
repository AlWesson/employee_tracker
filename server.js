const inquirer = require('inquirer');
const mysql = require('mysql2');
const cfonts = require('cfonts');

const connection = require('./config/connection');
const department = require('./controllers/departmentController');
const employee = require('./controllers/employeeController');
const role = require('./controllers/roleController');
//const routes = require('./routes');


connection.connect((err) => {
    if(err) {
        return err;
    }
    initializePrompt();
});

// cfonts allows usage of different styles "fonts", colors, spacing, etc. inside of the terminal. I'm using cfonts with node.
cfonts.say('EMPLOYEE|TRACKER' , {
    font: '3D', 
    align: 'left',
    colors: ['yellow', 'gray'],
    letterSpacing: 1,
    space: true,
    //gradient: ['yellow', '#3EB489'],
    env: 'node'
});

// initial user prompt 
function initializePrompt() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like do do?",
        options: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
          
        ],
    }).then((answer) => {
        switch (answer.choice) {
            case "View all departments":
                department.viewDepartments();
                break;
            case "View all roles":
                role.viewRoles();
                break;
            case "View all employees":
                employee.viewEmployees();
                break;
            case "Add a department":
                department.addDepartment();
                break;
            case "Add a role":

                break;
            case "Add an employee":

                break;
            case "Update an employee role":

                break;
            case "Exit":
                connection.end();
                break;
        }
    });
    
}

process.on("exit", () => {
    connection.end();
});

module.exports = initializePrompt;