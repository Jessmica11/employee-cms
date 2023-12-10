/* for adding into employee table */
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
    (1, 'Jane', 'Doe', 1, 1),
    (2,'Jessica', 'Scheck', 2, NULL);

/* for adding into department table */
INSERT INTO department (id, name) VALUES
    (1,'Legal'),
    (2,'Engineering');  

/* for adding into role table */
INSERT INTO role (id, title, salary, department_id) VALUES
    (1,'Attorney', 100000.00, 1),
    (2, 'Software Engineer', 120000.00, 2);  