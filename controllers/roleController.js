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



module.exports = {viewRoles};