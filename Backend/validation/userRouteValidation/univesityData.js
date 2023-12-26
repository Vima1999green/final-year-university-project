const validator = require('validator');
const isEmpty = require('../isEmpty');
const mysql = require('mysql2');


let errors = {};

//check university id and email are going to be matched with university database 
const checkUniData = (universityID, universityEmail) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'universitydatabase',
    });


    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL as id ' + connection.threadId);
    });
    let sqlQuery = 'SELECT * FROM unidata WHERE universityID=\'' + universityID + ' \' AND universityEmail=\'' + universityEmail + '\'';
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) throw error;
        console.log('Query results: ', results);
    });

    connection.end((err) => {
        if (err) {
            console.error('Error closing the MySQL connection: ' + err.stack);
        }
        console.log('MySQL connection closed.');
    });
}

const validateUniversityData = (data) => {
    data.universityID = isEmpty(data.universityID) ? '' : data.universityID;
    data.universityEmail = isEmpty(data.universityEmail) ? '' : data.universityEmail;

    if (

        validator.isEmpty(data.universityEmail) ||
        validator.isEmpty(data.universityID))

        errors.error = 'University details are required';
    else if (!validator.isEmail(data.universityEmail))
        errors.universityEmail = 'Invalid email'
    else if (!checkUniData(data.universityID, data.universityEmail))
        errors.error = 'University detalis are not matched'
    return (
        {
            errors,
            isValid: isEmpty(errors)
        }
    )
}

module.exports = validateUniversityData;