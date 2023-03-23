const mysql = require('mysql2');

var poolLocal;

async function getConnectionLocal(){

    if(poolLocal == undefined || poolLocal == null){

        poolLocal = mysql.createPool({
            host: process.env.HOST_DB || '127.0.0.1',
            user: process.env.USER_DB || 'luiscasta',
            password : process.env.PW || '123',
            database: process.env.NAME_DB || 'bot',
            waitForConnections: true,
            connectionLimit: 30,
            queueLimit: 0
        });
        console.log(`no existia una conexión local, se ha creado una nueva conexión`)
    }else{
        console.log(`ya existe un conexión local, no crea una nueva`)
    }
    return true;
    

}

async function executeQuery(queryString,calback){

    
    if(await getConnectionLocal()){

        await poolLocal.getConnection( function(err, connection){

            connection.query(queryString, async function(err, rows, fields) {
                
                connection.release();

                if(err) return calback({'status' : false, 'data':err})

                return calback({'status' : true, 'data':rows})
            })
        })
    }
    
}


module.exports = {
    executeQuery
};