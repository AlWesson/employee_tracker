INSERT INTO departments (departmentTitle)
VALUES
('Front-end developer'),
('Back-end developer'),
('Marketing'),
('Human Resources'),
('Finance'),
('Security'),
('Legal');

INSERT INTO roles (title, salary, departmentID)
VALUES
('Senior Front-end Developer', 150000.00, 1),
('Senior Back-end developer', 180000.00, 2),
('Marketing Manager', 120000.00, 3),
('Human Resources Director', 220000.00, 4),
('Head of Finance', 200000.00, 5),
('Security Director', 195500.00, 6),
('Legal Manager', 95000.00, 7);

INSERT INTO employees (firstName, lastName, roleID, managerID)
VALUES
('Diana', 'Diaz' 1, 1),
('Al', 'Hernandez', 2, 2),
('Samuel', 'McJonesifer', 3, 3),
('Christian', 'Garza', 4, 4),
('Cyrus', 'Montes', 5, 5),
('Moe', 'Money', 6, 6),
('Mufasa', 'Snobee', 7, 7);