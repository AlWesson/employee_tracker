/*const inquirer = require('inquirer');
const connection = require('../config/connection.js');
const {initializePrompt} = require('../server.js');

function viewRoles() {
    const query = 'SELECT roles.title, roles.id, department.departmentTitle, roles.salary FROM roles JOIN departments ON roles.departmentID = departments.id;';
    connection.query(query, (err, res) => {
        if(err) {
            return err;
            
        };
        console.table(res);

        initializePrompt();
    });
}
// function to add a role, the salary for that role, and in which department that role is being added to.
function addRole() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if(err) {
            return err;
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
        choices: res.map((dept) => dept.departmentTitle),
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
            return err;
        };
        console.log( `Added role and salary to ${answer.dept} `);
            initializePrompt();
        }
        );
    });

});
};
module.exports = {viewRoles, addRole};*/