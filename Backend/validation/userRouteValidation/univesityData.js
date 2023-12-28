const validator = require('validator');
const isEmpty = require('../isEmpty');
const mysql = require('mysql2/promise');


let errors = {};

//check university id and email are going to be matched with university database 
const checkUniData = async (universityID, universityEmail) => {


    try {

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'universitydatabase'
        });




        console.log('Connected to MySQL as id ' + connection.threadId);

        const [rows] = await connection.execute('SELECT * FROM universitydatabase.unidata WHERE universityID=? AND universityEmail=?', [universityID, universityEmail]);



        console.log('Query results: ', rows);
        if (rows.length === 0) {
            errors.message = 'university ID or email cannot be found';

        }


        await connection.end((err) => {
            if (err) {
                console.error('Error closing the MySQL connection: ' + err.stack);
            }
            console.log('MySQL connection closed.');
        });


        return (
            {
                errors,
                isValid: isEmpty(errors)
            }
        );
    }
    catch (error) {
        console.error('Error connecting to MySQL: ' + error.message);
        return {
            errors: { message: 'Error connecting to the database' },
            isValid: false
        };
    }
};








module.exports = checkUniData;
