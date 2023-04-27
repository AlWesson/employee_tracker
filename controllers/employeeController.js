const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const server = require('../server.js');

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

module.exports = {viewEmployees};