const connection = require('../config/connection.js');

function viewEmployees () {
    const query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        if(err) {
            return res(err);
            
        };
        console.table(res);

        initializePrompt();
    });
}

module.exports = {viewEmployees};