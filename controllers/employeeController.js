const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const server = require('../server.js');

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
            return res(err);  
        };
        console.table(res);

        server.initializePrompt();
    });
}

// Function that allows user to add an employee.
function addEmployee() {
    const query = "SELECT id, title FROM roles";
    connection.query(query, (err, res) => {
        if(err) {
            return res(err);
        }
        const roles = res.map(({ id, title}) => ({
            name: title, value: id,
        }));

        const query = "SELECT id, CONCAT(firstName, ' ', lastName AS name FROM employees";
        connection.query(query, (err, res) => {
            if(err) {
                return res(err);
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
                    options: roles,
                },
                {
                    type: "list",
                    name: "managerID",
                    message: "Please select the employee's manager.",
                    options: [{name:"none", value: null}, ...managers,],
                },
            ]).then((answer) => {
                const insert = "INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ( ?, ?, ?, ?)";
                const newEValues = [answer.firstName, answer.lastName, answer.roleID, answer.managerID,];
                connection.query(insert, newEValues, (err) => {
                    if(err) {
                        return err;
                    }
                    server.initializePrompt();
                });
            })
        });
    });
}

module.exports = {viewEmployees, addEmployee};