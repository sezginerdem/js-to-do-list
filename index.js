import express from 'express';
// import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).send('');
  });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// app.use(bodyParser.json());

app.get('/', (req, res) => res.send('To Do List'));

app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`));
