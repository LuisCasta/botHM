const Mysql = require('./MysqlService2');
const moment = require('moment');


const GetUser = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_user = data.id_user
        const query = `SELECT * FROM users where id = ${id_user}`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "User Exist"
                resp.data = {id_user:id_user,rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "User not Exist"
                resp.data = {id_user:id_user, rows: result.data};
            }
            resolve(resp)
        })
    })
}

const GetUserLogin = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_user = data.id_user
        const query = `SELECT * FROM users where telefono = '${data.phone}' AND pass = '${data.password}'`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "User Exist"
                resp.data = {id_user:id_user,rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "User not Exist"
                resp.data = {id_user:id_user, rows: result.data};
            }
            resolve(resp)
        })
    })
}

const GetUsers = async() => {
    return new Promise(async (resolve,reject) => {

        const query = `SELECT * FROM users`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];
            console.log(result.data)

            if(result.status){

                resp.status = 200;
                resp.message = "Users"
                resp.data = {rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "Users not Found"
                resp.data = {rows: result.data};
            }
            resolve(resp)
        })
    })
}


const ExistUser = async(data) => {
    return new Promise(async (resolve,reject) => {

        let lada = data.lada
        let telefono = data.telefono

        const query = `SELECT * FROM users where lada = ${lada} and telefono = ${telefono}`;

        await Mysql.executeQuery(query,(result) => {

            let resp = [];

            if(result.length > 0){
                resp.status = 200;
                resp.message = "User Exist"
                resp.data = {rows: result.length}; 
            } else {
                resp.status = 400;
                resp.message = "User not Exist"
                resp.data = {rows: result.length};
            }
            resolve(resp)
        })
    })
}

const CreateUser = async(data) => {
    return new Promise(async (resolve,reject) => {

        let lada = data.lada
        let telefono = data.telefono
        let estado = data.estado
        let ciudad = data.ciudad
        let edad = data.edad
        let peso = data.peso
        let nombre_medico = data.nombre_medico
        let apellido_medico = data.apellido_medico
        let pass = data.pass
        let hash = data.hash
        let country = data.country;
        let recordatorio = data.recordatorio;
        let create_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 
        
        const query = `INSERT INTO users(lada, telefono, estado, ciudad, edad, peso, nombre_medico, apellido_medico,
            pass, hash, country, recordatorio, created_at) 
            VALUES ('${lada}','${telefono}','${estado}','${ciudad}',${edad},'${peso}','${nombre_medico}','${apellido_medico}',
                '${pass}','${hash}','${country}','${recordatorio}','${create_at}')`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            
            const keys = Object.keys(result)

            if(result.status){

                resp.status = 200;
                resp.message = "Success"
                resp.data = {id_user: result.data.insertId};
            }else{

                resp.status = 400;
                resp.message = "Insert Error"
                resp.data = {id_user: result.data};
            }


            resolve(resp)
        })
    })
}

const UpdateUser = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_user = data.id_user
        let lada = data.lada
        let telefono = data.telefono
        let estado = data.estado
        let ciudad = data.ciudad
        let edad = data.edad
        let peso = data.peso
        let nombre_medico   = data.nombre_medico
        let apellido_medico = data.apellido_medico
        let pass    = data.pass
        let country = data.country
        let recordatorio = data.recordatorio;
        let update_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 

        const query = `UPDATE users SET lada = ${lada}, telefono = ${telefono},
            estado = '${estado}', ciudad = '${ciudad}', edad = ${edad}, peso = '${peso}',
            nombre_medico = '${nombre_medico}', apellido_medico = '${apellido_medico}',
            pass = '${pass}', country = '${country}', ,'${recordatorio}'
            updated_at = '${update_at}'
            WHERE id = ${id_user}`;

        await Mysql.executeQuery(query,(result) => {

            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "User Update"
                resp.data = {id_user:id_user,rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "User not Update"
                resp.data = {id_user:id_user,rows: result.data};
            }

            resolve(resp)
        })
    })
}

const DeleteUser = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_user = data.id_user
        let delete_at = moment().format('YYYY-MM-DDTHH:mm:ss');

        const query = `UPDATE users SET delete_at = '${delete_at}' 
            WHERE id = ${id_user}`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "User Delete"
                resp.data = {id_user:id_user,rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "User not Delete"
                resp.data = {id_user:id_user, rows: result.data};
            }   
            
            resolve(resp)
            
            
        })
    })
}



module.exports = {
    GetUser,
    GetUserLogin,
    GetUsers,
    ExistUser,
    CreateUser,
    UpdateUser,
    DeleteUser
};