const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'rishabh',
    password: 'rishabh',
    database: 'carsales'
});


function addNewPerson(fullName, userName, password)
{
    return new Promise(function(resolve,reject){
        connection.query(
            `INSERT INTO infoOfUser VALUES (DEFAULT, ?, ?, ?)`,
            [fullName,userName,password],
            function(err,result)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(result);
                }
            }
        )
    })
}
function checkIfExist(userName, password)
{
    return new Promise(function(resolve,reject)
    {
        connection.query(
            "SELECT * FROM infoofuser WHERE userName = ? AND password = ?;",
             [userName,password],
            function(err,results,field)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(results);
                }
            }
        )
    })
}
exports = module.exports = {
    addNewPerson,
    checkIfExist
}