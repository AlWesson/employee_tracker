const connection = require('../config/connection.js');
const server = require('../server.js');

function viewDepartments() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if(err) {
            return res(err);
            
        };
        console.table(res);

        initializePrompt();
    });
}

module.exports = {viewDepartments};