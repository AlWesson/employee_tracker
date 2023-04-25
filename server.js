const inquirer = require('inquirer');
const mysql = require('mysql2');
const cfonts = require('cfonts');

const connection = require('./config/connections.js');

const routes = require('./routes');

// cfonts allows usage of different styles "fonts", colors, spacing, etc. inside of the terminal. I'm using cfonts with node.
cfonts.say(' EMPLOYEE TRACKER ' , {
    font: '3D', 
    align: 'left',
    colors: ['yellow', 'gray'],
    letterSpacing: 1,
    space: true,
    //gradient: ['yellow', '#3EB489'],
    env: 'node'
});