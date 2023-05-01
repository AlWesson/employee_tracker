/*const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const { initializePrompt } = require('../server.js');

function viewDepartments() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if(err) {
            return err;
            
        };
        console.table(res);

        initializePrompt();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "dName",
        message: "Enter in the department you would like to add."
    }).then((answer) => {
        const query = `INSERT INTO departments (departmentTitle) VALUES ("${answer.dName}")`;
        connection.query(query, (err, res) => {
            if(err) {
                return err;
                
            };
            console.log(`The department ${answer.dName} has been added.`);
            initializePrompt();
        });
    });
}

module.exports = {viewDepartments, addDepartment};*/