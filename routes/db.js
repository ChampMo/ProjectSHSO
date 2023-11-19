
const mysql = require('mysql2');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'peet ',
            database: 'Second_Hand_Shopping_Online'
        });
    }

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
            } else {
                console.log('Connected to MySQL');
            }
        });
    }

    close() {
        this.connection.end((err) => {
            if (err) {
                console.error('Error closing MySQL connection:', err);
            } else {
                console.log('Closed MySQL connection');
            }
        });
    }

    query(sql, values, callback) {
        this.connection.query(sql, values, (err, results, fields) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = Database;
