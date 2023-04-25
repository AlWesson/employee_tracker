DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

-- create a table for 'departments' with department ids, and department names.
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    departmentTitle VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
);
-- create a table for 'roles' that includes job title, role id, the department that role belongs to, and the salary for that role.
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    departmentID INT NOT NULL,
    salary DECIMAL(10,2), -- The 10 in this parentheses is for the total number of digits, the 2 is for the nuber of digits after the decimal. ex: 0123456789.50 
    PRIMARY KEY (id)
);

-- create a table for 'employees with employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.'
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleID INT NOT NULL,
    managerID INT NOT NULL,
    PRIMARY KEY (id)

);