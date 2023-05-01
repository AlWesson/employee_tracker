/*const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const {initializePrompt} = require('../server.js');


// Function that allows user to view employees.
function viewEmployees() {
    const query = `SELECT employees.id, employees.firstName, employees.lastName, roles.title, departments.departmentTitle, roles.salary, 
                   CONCAT(manager.firstName,' ',manager.lastName) AS managerName
                   FROM employees
                   LEFT JOIN roles ON employees.roleID = roles.id
                   LEFT JOIN departments ON roles.departmentID = departments.id
                   LEFT JOIN employees manager ON employees.managerID = managers.id;`;
    connection.query(query, (err, res) => {
        if(err) {
            return err;  
        };
        console.table(res);

        initializePrompt();
    });
}

// Function that allows user to add an employee.
function addEmployee() {
    const query = "SELECT id, title FROM roles";
    connection.query(query, (err, res) => {
        if(err) {
            return err;
        }
        const roles = res.map(({ id, title}) => ({
            name: title, value: id,
        }));

        const query = "SELECT id, CONCAT(firstName, ' ', lastName AS name FROM employees";
        connection.query(query, (err, res) => {
            if(err) {
                return err;
            }

            const managers = res.map(({ id, name}) => ({
                name, value: id,
            }));

            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Please enter the first name of the employee.",
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Please enter the last name of the employee.",
                },
                {
                    type: "list",
                    name: "roleID",
                    message: "Please select the role of the employee",
                    choices: roles,
                },
                {
                    type: "list",
                    name: "managerID",
                    message: "Please select the employee's manager.",
                    choices: [{name:"none", value: null}, ...managers,],
                },
            ]).then((answer) => {
                const insert = "INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ( ?, ?, ?, ?)";
                const newEValues = [answer.firstName, answer.lastName, answer.roleID, answer.managerID,];
                connection.query(insert, newEValues, (err) => {
                    if(err) {
                        return err;
                    }
                    initializePrompt();
                });
            })
        });
    });
}

// function to update an employees role.

function updateERole() {
    const roleSelect = "SELECT * From roles";
    const employeeSelect = "SELECT employees.id, employees.firstName, employees.lastName, roles.title FROM employees LEFT JOIN roles ON employees.roleID = roles.id";
    connection.query(employeeSelect, (err, res1) => {
        if(err) {
            return err;
        }
        connection.query(roleSelect, (err, res2) => {
            if(err) {
                return err;
            }
            //prompt to choose which employee the user wishes to update.
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Please select the employee you wish to update.",
                    choices: res1.map((employees) => `${employees.firstName} ${employees.lastName}`),
                },
                {
                    type: "list",
                    name: "role",
                    message: "Please select the role.",
                    choices: res2.map((role) => role.title),
                },
            ]).then((answer) => {
                const employee = res1.find((employee) => 
                `${employee.firstName} ${employee.lastName}`
                === answer.employee);

                const role = res2.find((role) => 
                role.title === answer.role);

                const update = "UPDATE employee SET roleID = ? WHERE id = ?";
                connection.query(update, [role.id, employee.id], (err,res) => {
                    if(err) {
                        return err;
                    }

                    console.log(`Employee ${employee.firstName} ${employee.lastName} has been updated.`);

                    initializePrompt();
                });

            });
        });
    });
}
module.exports = {viewEmployees, addEmployee, updateERole};*/