const connection = require('../config/connection.js');


function viewRoles() {
    const query = 'SELECT roles.title, roles.id, department.departmentTitle, roles.salary FROM roles JOIN departments ON roles.departmentID = departments.id;';
    connection.query(query, (err, res) => {
        if(err) {
            return res(err);
            
        };
        console.table(res);

        initializePrompt();
    });
}

module.exports = {viewRoles};