const Mysql = require('./MysqlService2');
const moment = require('moment');

const GetPrescription = async(data) => {
    return new Promise(async(resolve,reject) => {

        let id_presc = data.id_presc;
        const query = `SELECT * FROM prescriptions 
            WHERE id = ${id_presc}`;
        
        
        await Mysql.executeQuery(query,(result) => {

            let resp = [];
            console.log(`query ${result.data}`)
            if(result.status){
                resp.status = 200;
                resp.message = "Prescription Exist"
                resp.data = {id_prescription: result.data};
            }else{
                resp.status = 400;
                resp.message = "Error prescription not Exist"
                resp.data = {id_prescription: result.data};
            }
            resolve(resp)
        })
    })
}

const ExistPrescription = async(data) => {
    return new Promise(async (resolve,reject) => {

        let fecha_estudio = data.fecha_estudio
        let hora_estudio = data.hora_estudio

        const query = `SELECT * FROM prescriptions 
            WHERE fecha_estudio = '${fecha_estudio}' and hora_estudio = '${hora_estudio}'`;

        await Mysql.executeQuery(query,(result) => {

            let resp = [];

            if(result.length > 0){
                resp.status = 200;
                resp.message = "Prescription Exist"
                resp.data = {rows: result.length}; 
            } else {
                resp.status = 400;
                resp.message = "Prescription not Exist"
                resp.data = {rows: result.length};
            }
            resolve(resp)
        })
    })
}

const CreatePrescription = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_user = data.id_user
        let fecha_estudio = data.fecha_estudio
        let hora_estudio = data.hora_estudio
        let fecha_prim_toma = data.fecha_prim_toma
        let hora_prim_toma = data.hora_prim_toma
        let fecha_seg_toma = data.fecha_seg_toma
        let hora_seg_toma = data.hora_seg_toma
        let create_at = moment().format('YYYY-MM-DDTHH:mm:ss');

        const query = `INSERT INTO prescriptions(id_user, fecha_estudio, hora_estudio, 
            fecha_prim_toma, hora_prim_toma, fecha_seg_toma, hora_seg_toma, create_at)
            VALUES (${id_user},'${fecha_estudio}','${hora_estudio}',
            '${fecha_prim_toma}','${hora_prim_toma}','${fecha_seg_toma}','${hora_seg_toma}','${create_at}')`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];
            console.log(result)

            if(result.status){
                resp.status = 200;
                resp.message = "Success Create prescription"
                resp.data = {id_prescription: result.data.insertId};
            }else{
                resp.status = 400;
                resp.message = "Error Create prescription"
                resp.data = {id_prescription: result.insertId};
            }

            resolve(resp)
        })
        
    })
}

const UpdatePrescription = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_presc = data.id_presc
        let fecha_estudio = data.fecha_estudio
        let hora_estudio = data.hora_estudio
        let fecha_prim_toma = data.fecha_prim_toma
        let hora_prim_toma = data.hora_prim_toma
        let fecha_seg_toma = data.fecha_seg_toma
        let hora_seg_toma = data.hora_seg_toma
        let update_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 
        
        const query = `UPDATE prescriptions SET fecha_estudio = '${fecha_estudio}', hora_estudio ='${hora_estudio}',
            fecha_prim_toma = '${fecha_prim_toma}', hora_prim_toma = '${hora_prim_toma}',
            fecha_seg_toma = '${fecha_seg_toma}', hora_seg_toma = '${hora_seg_toma}', update_at = '${update_at}'
            WHERE id = ${id_presc}`; 
        
        await Mysql.executeQuery(query,(result) => {

            console.log(`Result ${result}`)
            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "Success update prescription"
                resp.data = {id_presc: id_presc, rows: result.affectedRows};

            }else{

                resp.status = 400;
                resp.message = "Error update prescription"
                resp.data = {id_presc: id_presc, rows: result.affectedRows};
            }

            resolve(resp)
        })
        
    })
}

const DeletePrescription = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_presc = data.id_presc
        let delete_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 
        
        const query = `UPDATE prescriptions SET delete_at = '${delete_at}'
            WHERE id = ${id_presc}`; 
        
        await Mysql.executeQuery(query,(result) => {

            let resp = [];
            if(result.status){

                resp.status = 200;
                resp.message = "Success delete prescription"
                resp.data = {id_presc: id_presc, rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "Error delete prescription"
                resp.data = {id_presc: id_presc, rows: result.data};
            }
            resolve(resp)
        })
        
    })
}

module.exports = {
    GetPrescription,
    ExistPrescription,
    CreatePrescription,
    UpdatePrescription,
    DeletePrescription
};