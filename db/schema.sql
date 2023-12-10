/* start with blank slate for employees db */
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

/* department table */
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)

/* role table */
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
)

/* employee table */
CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id)
);