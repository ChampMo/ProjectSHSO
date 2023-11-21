// Assuming you are using mysql2 library
const mysql = require('mysql2');
const pass = require('../passdb')


class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: pass.password,
      database: 'Second_Hand_Shopping_Online',
    });
  }

  connect() {
    this.connection.connect(err => {
      if (err) {
        console.error('Error connecting to database:', err);
        throw err;
      }
      console.log('Connected to database');
    });
  }

  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Database;
