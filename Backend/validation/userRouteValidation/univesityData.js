const isEmpty = require('../isEmpty');
const mysql = require('mysql2/promise');

const validateUniversityData = async (universityID, universityEmail) => {
    let errors = {};

    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'universitydatabase'
        });

        console.log('Connected to MySQL as id ' + connection.threadId);

        const [rows] = await connection.execute(
            'SELECT * FROM unidata WHERE universityID=? AND universityEmail=?',
            [universityID, universityEmail]
        );

        console.log('Query results: ', rows);

        if (rows.length === 0) {
            errors.status = 404;
            errors.message = 'University ID or email cannot be found';
        }

        await connection.end();

        console.log('Errors before returning: ', errors);

        return {
            errors,
            isValid: isEmpty(errors)
        };
    } catch (error) {
        console.error('Error connecting to MySQL: ' + error.message);
        errors.message = 'Error connecting to the database';
        errors.error = error;
        errors.status = 500;

        console.log('Errors in catch block: ', errors);

        return {
            errors,
            isValid: isEmpty(errors)
        };
    }
};

module.exports = validateUniversityData;
