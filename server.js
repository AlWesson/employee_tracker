const inquirer = require('inquirer');
const mysql = require('mysql2');
const cfonts = require('cfonts');

const connection = require('./config/connection');

//const {viewDepartments, addDepartment} = require('./controllers/departmentController');
//const {viewEmployees, addEmployee, updateERole} = require('./controllers/employeeController');
//const {viewRoles, addRole} = require('./controllers/roleController');



connection.connect((err) => {
    if(err) {
        return err;
    }
    initializePrompt();
});

// cfonts allows usage of different styles "fonts", colors, spacing, etc. inside of the terminal. I'm using cfonts with node.
cfonts.say('EMPLOYEE|TRACKER' , {
    font: '3D', 
    align: 'left',
    colors: ['yellow', 'gray'],
    letterSpacing: 1,
    space: true,
    //gradient: ['yellow', '#3EB489'],
    env: 'node'
});

// initial user prompt 
function initializePrompt() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like do do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
        ],
    }).then((answer) => {
        switch (answer.choice) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateERole();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
    
}

//==============================================================
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
        name: "name",
        message: "Enter in the department you would like to add."
    }).then((answer) => {
        const insert = `INSERT INTO departments (departmentTitle) VALUES ("${answer.name}")`;
        connection.query(insert, (err, res) => {
            if(err) {
                return err;
            };
            console.log(`The department ${answer.dName} has been added.`);
            initializePrompt();
        });
    });
}

//============================================================================
function viewRoles() {
    const query = "SELECT roles.title, roles.id, departments.departmentTitle, roles.salary from roles join departments on roles.departmentID = departments.id";
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
        }
    inquirer.prompt([
        {
        type: "input",
        name: "title",
        message: "Please enter name of the new role.",
        },
        {
        type: "input",
        name: "salary",
        message: "Please enter the salary of this role.",
        },
        {
        type: "list",
        name: "department",
        message: "Please choose the department for this role.",
        choices: res.map((department) => department.departmentTitle),
        },
    ]).then((answer) => {
        const department = res.find((department) => department.departmentTitle === answer.department).id;
        const insert = "INSERT INTO roles SET ?";
        connection.query(insert,
        {   
            title: answer.title,
            salary: answer.salary,
            departmentID: department,
        },
        (err, res) => {
        if(err) {
            return err;
        }
        console.log( `Added role and salary to ${answer.department}.`);
            
        initializePrompt();
        }
        );
    });

});
}

//=========================================================================
// Function that allows user to view employees.
function viewEmployees() {
    const query = `SELECT employees.id, employees.firstName, employees.lastName, roles.title, departments.departmentTitle, roles.salary, 
                   CONCAT(managers.firstName,' ',managers.lastName) AS managerName
                   FROM employees
                   LEFT JOIN roles ON employees.roleID = roles.id
                   LEFT JOIN departments ON roles.departmentID = departments.id
                   LEFT JOIN employees managers ON employees.managersID = managers.id;`;
    connection.query(query, (err, res) => {
        if(err) {
            return err;  
        };
        console.table(res);

        initializePrompt();
    });
}

// Function that allows user to add an employee.
function addEmployee() {
    const query = "SELECT id, title FROM roles";
    connection.query(query, (err, res) => {
        if(err) {
            return err;
        }
        const roles = res.map(({ id, title}) => ({
            name: title, value: id,
        }));

        const query = "SELECT id, CONCAT(firstName, ' ', lastName) AS name FROM employees";
        connection.query(query, (err, res) => {
            if(err) {
                return err;
            }

            const managers = res.map(({ id, name}) => ({
                name, value: id,
            }));

            inquirer.prompt([
                {
                    type: "input",
                    name: "first_Name",
                    message: "Please enter the first name of the employee.",
                },
                {
                    type: "input",
                    name: "last_Name",
                    message: "Please enter the last name of the employee.",
                },
                {
                    type: "list",
                    name: "role_ID",
                    message: "Please select the role of the employee",
                    choices: roles,
                },
                {
                    type: "list",
                    name: "managers_ID",
                    message: "Please select the employee's manager.",
                    choices: [{name: "None", value: null}, ...managers,],
                },
            ]).then((answer) => {
                const insert = "INSERT INTO employees (firstName, lastName, roleID, managersID) VALUES ( ?, ?, ?, ?)";
                const newEValues = [answer.first_Name, answer.last_Name, answer.role_ID, answer.managers_ID,];
                connection.query(insert, newEValues, (err) => {
                    if(err) {
                        return err;
                    }
                    console.log('The employee has been added to the system.')
                    initializePrompt();
                });
            })
        });
    });
}

// function to update an employees role.

function updateERole() {
    const roleSelect = "SELECT * From roles";
    const employeeSelect = "SELECT employees.id, employees.firstName, employees.lastName, roles.title FROM employees LEFT JOIN roles ON employees.roleID = roles.id";
    connection.query(employeeSelect, (err, res1) => {
        if(err) {
            return err;
        }
        connection.query(roleSelect, (err, res2) => {
            if(err) {
                return err;
            }
            //prompt to choose which employee the user wishes to update.
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Please select the employee you wish to update.",
                    choices: res1.map((employee) => `${employee.firstName} ${employee.lastName}`),
                },
                {
                    type: "list",
                    name: "role",
                    message: "Please select the role.",
                    choices: res2.map((role) => role.title),
                },
            ]).then((answer) => {
                const employee = res1.find((employee) => 
                `${employee.firstName} ${employee.lastName}`
                === answer.employee);

                const role = res2.find((role) => 
                role.title === answer.role);

                const update = "UPDATE employees SET roleID = ? WHERE id = ?";
                connection.query(update, [role.id, employee.id], (err, res) => {
                    if(err) {
                        return err;
                    }

                    console.log(`Employee ${employee.firstName} ${employee.lastName} has been updated.`);

                    initializePrompt();
                });

            });
        });
    });
}
//===============================================================================

process.on("exit", () => {
    connection.end();
});

