const mysql = require('mysql2');

const dbServer = process.env.DB_SERVER;
const dbDatabase= process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbPort= process.env.DB_PORT;


const connection = mysql.createConnection({
    host: dbServer,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
    port: dbPort,
  });


const conn = async () =>{
    
    connection.connect((err) => {
        if (err) {
          console.error('Error connecting to database: ', err);
        } else {
          console.log('Connected to database!');
        }
      });
};

conn();

module.exports = conn;