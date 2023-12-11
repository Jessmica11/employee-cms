/*  found this online as a way to clear the tables for each test I would run */
TRUNCATE TABLE department;
TRUNCATE TABLE role;
TRUNCATE TABLE employee;

/* for adding into department table */
INSERT INTO department (id, name) VALUES
    (1, 'Legal'),
    (2, 'Engineering')
    (3, 'Sales');
    (4, 'Marketing')
    (5, 'CEO');

/* for adding into role table */
INSERT INTO role (id, title, salary, department_id) VALUES
    (1, 'Attorney', 100000.00, 1),
    (2, 'Software Engineer', 120000.00, 2)
    (3, 'Regional Sales Rep', 70000.00, 3)
    (4, 'SEO Specialist', 65000.00, 4)
    (5, 'President & CEO', 200000.00, NULL);

/* for adding into employee table */
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
    (1, 'Jane', 'Doe', 1, 1),
    (2, 'Jessica', 'Scheck', 2, NULL);
