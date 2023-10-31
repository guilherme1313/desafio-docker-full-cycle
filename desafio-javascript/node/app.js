const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

function insert(connection) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO people(name) VALUES('full cycle')`;
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
function find(connection) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM people`;
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } 

app.get('/', async (req, res) => {
   try {
    const mysql = require('mysql');
    const connection =  mysql.createConnection(config);
    await insert(connection);
    const data = await find(connection);
    const liElements = data.map((item) => `<li>${item.name}</li>`).join('');
    const html = `
    <h1>Full cycle Rocks!!</h1>
    <ul>
      ${liElements}
    </ul>
  `;
   res.send(html);
   connection.end();
   } catch (error) {
    console.log(err.message);
      res.status(500).send('Erro no banco de dados: ' + err.message);
   }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
