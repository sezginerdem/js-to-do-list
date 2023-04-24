# define the data model for basic, simple To-Do List application and desig the MySQL database schema for me

Run command in the same folder docker-compose.yaml
```bash
docker-compose up -d
```

Go to http://localhost:8080
## MySQL credential
Username: root
Password: rootpassword

To shutdown database without remove the container.
```bash
docker-compose stop
```

To shutdown database and remove the container.
```bash 
docker-compose down
```

A basic To-Do List application can be designed using a simple data model that consists of two tables: one for tasks and one for users. The tasks table should have columns for task ID, task name, task description, due date, and status (completed or not). The users table should have columns for user ID, username, email address, and password.

To create a MySQL database with tables for your To-Do List application, you can follow these general steps:

Create a new database in MySQL using the CREATE DATABASE statement.
Create a new table for tasks in your database using the CREATE TABLE statement.
Define the columns of your table and their data types.
Add any constraints or indexes to your table as needed.
Here’s an example of how you might create a simple To-Do List table for tasks:
```sql
CREATE DATABASE todo_list;

USE todo_list;

CREATE TABLE tasks (
  task_id INT NOT NULL AUTO_INCREMENT,
  task_name VARCHAR(255) NOT NULL,
  task_description TEXT,
  due_date DATE,
  status ENUM('completed', 'not completed') DEFAULT 'not completed',
  PRIMARY KEY (task_id)
);
```
This creates a new database called todo_list and a new table called tasks. The tasks table has five columns: task_id, task_name, task_description, due_date, and status. The task_id column is an auto-incrementing integer that serves as the primary key for the table.

You can customize this example to fit your specific needs by adding or removing columns, changing data types, or adding constraints as needed.

To create a users table with columns for user ID, username, email address, and password, you can follow similar steps:
```sql
CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);
```
This creates a new table called users. The users table has four columns: user_id, username, email, and password. The user_id column is an auto-incrementing integer that serves as the primary key for the table.

## create a mysql db on my local macos macine with this schema
You can create a new MySQL database on your macOS machine by following these steps:

Download and install MySQL Community Server from MySQL website.
After installation, open MySQL Workbench.
Click on the Local instance MySQL80 under MySQL Connections.
Click on Schemas tab.
Click on Create Schema button.
Enter a name for your schema and click Apply.
That’s it! You have created a new MySQL database on your macOS machine.

## To implement CRUD operations for your To-Do List application using Node.js and Express.js with MySQL database, you can follow these steps:

## Install Node.js
https://phoenixnap.com/kb/install-npm-mac

## Create a new Node.js project and install the required dependencies such as Express.js, MySQL driver, etc

To create a new Node.js project and install the required dependencies such as Express.js, MySQL driver, etc., you can follow these steps:

Create a new directory and initialize a Node project using NPM:

$ mkdir myproject && cd myproject
$ npm init --y

Install Express.js and MySQL driver using NPM:

$ npm install --save express mysql

Create a new file named app.js in your project directory and add the following code:
```js
const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  connection.query(
    'INSERT INTO tasks (name, description) VALUES (?, ?)',
    [name, description],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  connection.query(
    'UPDATE tasks SET name = ?, description = ? WHERE id = ?',
    [name, description, id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, () => console.log('Server started!'));
```

Run your application:
$ node app.js

This will create a new Node.js project with Express.js and MySQL driver installed.

You can replace myproject with your desired project name and mydatabase with your desired database name.


This example creates a new server using Express.js that listens for incoming HTTP requests on port 3000. It defines four routes for each of the CRUD operations that you might want to support in your To-Do List application:

GET /tasks: Retrieves all tasks from your MySQL database.
POST /tasks: Creates a new task in your MySQL database.
PUT /tasks/:id: Updates an existing task in your MySQL database.
DELETE /tasks/:id: Deletes an existing task from your MySQL database.
You can customize this example by changing the values of the host, user, password, and database properties of the connection object to match your specific configuration.

To test your To-Do List application, you can use a tool like Postman or cURL to send HTTP requests to your Express.js server and verify that it responds correctly.

Here’s an example of how you might use Postman to test the CRUD API that we created earlier:

Open Postman and create a new request.
Set the HTTP method to GET and enter the URL http://localhost:3000/tasks.
Click the “Send” button to send the request to your Express.js server.
Verify that the server responds with a list of tasks in JSON format.
You can repeat this process for each of the CRUD operations that you want to test in your To-Do List application.

# FRONTEND
Navigate to your project folder: Use the cd command to navigate to the folder that contains your index.html file.

Start the development server: Run the following command to start the development server on port 5500:

http-server -p 5500
Access the development server: Open your web browser and navigate to http://localhost:5500/. You should see your index.html file served by the development server.


#