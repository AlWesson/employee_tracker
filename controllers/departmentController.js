const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const server = require('../server.js');

function viewDepartments() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if(err) {
            return res(err);
            
        };
        console.table(res);

        server.initializePrompt();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter in the department you would like to add."
    }).then((answer) => {
        const query = `INSERT INTO departments (departmentTitle) VALUES ("${answer.name}")`;
        connection.query(query, (err, res) => {
            if(err) {
                return res(err);
                
            };
            console.log(`The department ${answer.name} has been added.`);
            server.initializePrompt();
        });
    });
}

module.exports = {viewDepartments, addDepartment};