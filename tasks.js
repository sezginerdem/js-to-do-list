import express from 'express';
import mysql from 'mysql';

const app = express();

app.use(express.json())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'todo_list',
  password: 'Renegade187!'

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