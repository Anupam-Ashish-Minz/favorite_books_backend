import mysql from 'mysql';
import util from 'util';

// callback to return value
function mysqlConnect (query, callBack) {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'test',
        password : 'test',
        database : 'test'
    });

    connection.connect();
    
    connection.query(query, function (error, results, fields) {
        // to be converted to promise using util.promisify which takes in 
        // (error, value) syntax is null/undefined in no error
        callBack(error, results);
    });

    connection.end();
}

function execQuery (query) {
    const connect = util.promisify(mysqlConnect);
    const data = connect(query);
    return data;
}

export { mysqlConnect, execQuery };

