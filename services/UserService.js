const Mysql = require('./MysqlService2');
const moment = require('moment');


const GetUser = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_user = data.id_user
        const query = `SELECT * FROM users where id = ${id_user}`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.length > 0){
                resp.status = 200;
                resp.message = "User Exist"
                resp.data = {id_user:id_user,rows: result}; 
            } else {
                resp.status = 400;
                resp.message = "User not Exist"
                resp.data = {id_user:id_user, rows: result};
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
        let recordatorio = data.recordatorio
        let create_at = moment().format('YYYY-MM-DD'); 
        
        const query = `INSERT INTO users(lada, telefono, estado, ciudad, edad, peso, nombre_medico, apellido_medico,
            pass, hash, recordatorio, create_at) 
            VALUES ('${lada}','${telefono}','${estado}','${ciudad}',${edad},'${peso}','${nombre_medico}','${apellido_medico}',
                '${pass}','${hash}',${recordatorio},'${create_at}')`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.affectedRows > 0){
                resp.status = 200;
                resp.message = "Success"
                resp.data = {id_user: result.insertId}; //insertId
            } else {
                resp.status = 400;
                resp.message = "Insert Error"
                resp.data = {id_user: result.insertId};
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
        let nombre_medico = data.nombre_medico
        let apellido_medico = data.apellido_medico
        let pass = data.pass
        let hash = data.hash
        let recordatorio = data.recordatorio
        let update_at = moment().format('YYYY-MM-DD'); 

        const query = `UPDATE users SET lada = ${lada}, telefono = ${telefono},
            estado = '${estado}', ciudad = '${ciudad}', edad = ${edad}, peso = '${peso}',
            nombre_medico = '${nombre_medico}', apellido_medico = '${apellido_medico}',
            pass = '${pass}', hash = '${hash}', recordatorio = ${recordatorio},
            update_at = '${update_at}'
            WHERE id = ${id_user}`;

        await Mysql.executeQuery(query,(result) => {

            let resp = [];

            if(result.affectedRows > 0){
                resp.status = 200;
                resp.message = "User Update"
                resp.data = {id_user:id_user,rows: result.affectedRows}; 
            } else {
                resp.status = 400;
                resp.message = "User not Update"
                resp.data = {id_user:id_user,rows: result.affectedRows};
            }
            resolve(resp)
        })
    })
}

const DeleteUser = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_user = data.id_user
        let delete_at = moment().format('YYYY-MM-DD');

        const query = `UPDATE users SET delete_at = '${delete_at}' 
            WHERE id = ${id_user}`;
        
        await Mysql.executeQuery(query,({status,data}) => {
            
            if(!status)
                reject(data)

            let resp = [];
            
            if(result.affectedRows > 0){
                resp.status = 200;
                resp.message = "User Delete"
                resp.data = {id_user:id_user,rows: result.affectedRows}; 
            } else {
                resp.status = 400;
                resp.message = "User not Delete"
                resp.data = {id_user:id_user, rows: result.affectedRows};
            }
            resolve(resp)
            
            
        })
    })
}



module.exports = {
    GetUser,
    ExistUser,
    CreateUser,
    UpdateUser,
    DeleteUser
};