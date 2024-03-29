const mysql = require('mysql2');

var poolLocal;

async function getConnectionLocal(){

    try {
        
        if(poolLocal == undefined || poolLocal == null){

            const hostDB = process.env.DB_HOST;
            const userDB = process.env.DB_USER;
            const passwordDB = process.env.DB_PW;
            const dbNameDB = process.env.DB_NAME;
            const portDB = process.env.DB_PORT;

                poolLocal = mysql.createPool({
                    host: "195.179.237.51",//,//,"localhost",//
                    user: "u584193332_iphonezone",////"","intestinolimpio_prod",//
                    password : "Tt^GwGxX4=",//"IntestinoProd7",//"IntestinoProd7",//
                    port : 3306,
                    database: "u584193332_iphonezone",////"intestinolimpio_prod", //
                    waitForConnections: true,
                    connectionLimit: 50,
                    queueLimit: 0,
                    idleTimeout: 60000,
                });
            
            console.log(`no existia una conexión local, se ha creado una nueva conexión`)
        }else{
            console.log(`ya existe un conexión local, no crea una nueva`)
        }
        return true;

    } catch (error) {
        
        console.log(`Error connection mysql`)
        return error
    }
    
    

}

async function executeQuery(queryString,calback){

    
    if(await getConnectionLocal()){

        console.log(`pool local ${poolLocal}`)

        //await poolLocal.getConnection( function(err, connection){

            poolLocal.query(queryString, async function(err, rows, fields) {
                
                //connection.release();

                if(err) return calback({'status' : false, 'data':err})

                return calback({'status' : true, 'data':rows})
            })
       // })
    }
    
}


module.exports = {
    executeQuery
};