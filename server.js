// require mySQL2, express, inquirer v 8.2.4
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database const with login info for mySQL
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'JessMySQL23',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

// query database

// inquirer questions at start
// Function to start the application
function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      // choices provided in Acceptance Criteria
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    // choices will start their related functions:
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
    // start viewDepartments() when this choice is made
          viewDepartments();
          break;

        case 'View all roles':
    // start viewRoles() when this choice is made
          viewRoles();
          break;

        case 'View all employees':
    // start viewEmployees() when this choice is made
          viewEmployees();
          break;

        case 'Add a department':
    // start addDepartment() when this choice is made
          addDepartment();
          break;

        case 'Add a role':
    // start addRole() when this choice is made
          addRole();
          break;

        case 'Add an employee':
    // start addEmployee() when this choice is made
          addEmployee();
          break;

        case 'Update an employee role':
    // start updateEmployeeRole() when this choice is made
          updateEmployeeRole();
          break;

        case 'Exit':
    // Exit = end the program
          connection.end();
          break;
      }
    });
}

// functions for each event to happen, 
// depending on user choice




// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});