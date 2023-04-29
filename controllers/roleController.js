const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const server = require('../server.js');

function viewRoles() {
    const query = 'SELECT roles.title, roles.id, department.departmentTitle, roles.salary FROM roles JOIN departments ON roles.departmentID = departments.id;';
    connection.query(query, (err, res) => {
        if(err) {
            return res(err);
            
        };
        console.table(res);

        server.initializePrompt();
    });
}

function addRole() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if(err) {
            return res(err);
        };
    inquirer.prompt([
        {
        type: "input",
        name: "name",
        message: "Enter name of the new role.",
        },
        {
        type: "input",
        name: "salary",
        message: "Enter the salary of this role.",
        },
        {
        type: "list",
        name: "department",
        message: "Choose the department for this role.",
        options: res.map((dept) => dept.departmentTitle),
        },
    ]).then((answer) => {
        const dept = res.find(
        (dept) => dept.name === answer.dept
        );
        connection.query("INSERT INTO roles SET ?",
        {   name: answer.name,
            salary: answer.salary,
            departmentID: dept,
        },
        function (err, res){
        if(err) {
            return res(err);
        };
        console.log( `Added role and salary to ${answer.dept} `);
        }
        );
    });

});
};
module.exports = {viewRoles};