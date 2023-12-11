// require mySQL2, express, inquirer v 8.2.4
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

// choose a PORT to use for running app
const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database const with login info for mySQL
const db = mysql.createConnection({
  host: 'localhost',
// MySQL username,
    user: 'root',
// MySQL password
  password: '',
  database: 'employees_db',
});

// let the user know if there's an error connecting
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  // tell the user they've connected to the db
  console.log('Connected to the employees_db database.');
  startApp();
});

// inquirer questions at start
// function to start the application
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
        // end the program when exit is chosen
          db.end();
          break;
      }
    });
}

// functions for each event to happen, 
// depending on user choice

function viewDepartments() {
  const query = 'SELECT * FROM department';
  db.promise()
    .query(query)
    .then(([rows]) => {
      console.table(rows);
      startApp();
    })
    .catch((err) => {
      console.error('Error:', err);
      startApp();
    });
}

function viewRoles() {
  const query =
    'SELECT role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id';
  db.promise()
    .query(query)
    .then(([rows]) => {
      console.table(rows);
      startApp();
    })
    .catch((err) => {
      console.error('Error:', err);
      startApp();
    });
}

function viewEmployees() {
  const query =
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id';
  db.promise()
    .query(query)
    .then(([rows]) => {
      console.table(rows);
      startApp();
    })
    .catch((err) => {
      console.error('Error:', err);
      startApp();
    });
}

// functions for adding items, 
// depending on user choice

function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department (Legal, Engineering, Sales, Marketing, CEO):',
    })
    .then((answer) => {
      const query = 'INSERT INTO department SET ?';
      db.promise()
        .query(query, { name: answer.name })
        .then(() => {
          console.log('Department added successfully!');
          startApp();
        })
        .catch((err) => {
          console.error('Error:', err);
          startApp();
        });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:',
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO role SET ?';
      db.promise()
        .query(query, answer)
        .then(() => {
          console.log('Role added successfully!');
          startApp();
        })
        .catch((err) => {
          console.error('Error:', err);
          startApp();
        });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "Enter the employee's role ID (1-5):",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "Enter the employee's manager ID:",
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO employee SET ?';
      db.promise()
        .query(query, answer)
        .then(() => {
          console.log('Employee added successfully!');
          startApp();
        })
        .catch((err) => {
          console.error('Error:', err);
          startApp();
        });
    });
}

// functions for updating items, 
// depending on user choice

function updateEmployeeRole() {
  db.promise().query('SELECT * FROM employee')
    .then(([employees]) => {
      inquirer
        .prompt({
          name: 'employeeId',
          type: 'list',
          message: 'Select the employee you want to update:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        })
        .then((employeeAnswer) => {
          db.promise().query('SELECT * FROM role')
            .then(([roles]) => {
              inquirer
                .prompt({
                  name: 'roleId',
                  type: 'list',
                  message: 'Select the new role for the employee:',
                  choices: roles.map((role) => ({
                    name: role.title,
                    value: role.id,
                  })),
                })
                .then((roleAnswer) => {
                  db.promise().query(
                    'UPDATE employee SET role_id = ? WHERE id = ?',
                    [roleAnswer.roleId, employeeAnswer.employeeId]
                  )
                    .then(() => {
                      console.log('Employee role updated successfully!');
                      startApp();
                    })
                    .catch((err) => {
                      console.error('Error:', err);
                      startApp();
                    });
                });
            });
        });
    })
    .catch((err) => {
      console.error('Error:', err);
      startApp();
    });
}

// Default response for any other request (Not Found)

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
