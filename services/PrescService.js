const Mysql = require('./MysqlService2');
const moment = require('moment');

const GetPrescription = async(data) => {
    return new Promise(async(resolve,reject) => {

        let id_presc = data.id_prescription;
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

const GetPrescriptionsById = async(data) => {
    return new Promise(async(resolve,reject) => {

        let id = data
        const query = `SELECT * FROM prescriptions WHERE id_user = '${id}' ORDER BY id DESC LIMIT 1`;
        
        await Mysql.executeQuery(query,(result) => {

            console.log(`Entra a mysql ${result}`)

            const keys = Object.keys(result)
            console.log(keys+result.data)
            let resp = [];

            if(result.status){

                resolve({status : 200, data: result.data[0]})
            }else{
                resolve({status : 400, data: result.data})
            }

            //console.log(`RESPONSE ${res}`)
            resolve(result.data)
        })
    })
}

const GetPrescriptions = async() => {
    return new Promise(async(resolve,reject) => {

        const query = `SELECT * FROM prescriptions`;
        
        
        await Mysql.executeQuery(query,(result) => {

            let resp = [];

            if(result.status){
                resp.status = 200;
                resp.message = "Prescription Exist"
                resp.data = {data: result.data};
            }else{
                resp.status = 400;
                resp.message = "Error prescription not Exist"
                resp.data = {data: result.data};
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
        let peso = data.peso
        let phone = data.phone
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
                resp.data = { 
                    id_prescription: result.data.insertId,
                    fecha_prim_toma, 
                    hora_prim_toma,
                    fecha_seg_toma,
                    hora_seg_toma,
                    id_user,
                    peso,
                    phone
                };
            }else{
                resp.status = 400;
                resp.message = "Error Create prescription"
                resp.data = {id_prescription: result.insertId};
            }

            resolve(resp)
        })
        
    })
}


const createTomas = async (data) => {
    return new Promise(async (resolve,reject) => {

        let { id_user, fecha, mensaje, toma, peso, phone } = data;

        console.log(`Fecha ${fecha}`)

        let fechaParse = moment(fecha).format("YYYY-MM-DDTHH:mm:ss")
        console.log("************************************")
        console.log(fechaParse)
        const query = `INSERT INTO tomas(id_user, fecha, mensaje, toma, peso, phone, estatus) 
            VALUES ('${id_user}','${fechaParse}','${mensaje}','${toma}','${peso}', '${phone}', '${1}')`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];


            if(result.status){

                resp.status = 200;
                resp.message = "Success"
                resp.data = {id_toma: result.data.insertId, id_user, peso};
            }else{
                console.log(`***********************Error*****************`)
                console.log(result)
                resp.status = 400;
                resp.message = "Insert Error"
                resp.data = {id_user: result.data};
            }


            resolve(resp)
        })
    })
}

const UpdateToma = async(data) => {
    return new Promise(async (resolve,reject) => {

        let { id_toma } = data;

        let update_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 

        const query = `UPDATE toma SET estatus = ${0},
            updated_at = '${update_at}'
            WHERE id = ${id_toma}`;

        await Mysql.executeQuery(query,(result) => {

            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "User Update"
                resp.data = {id_toma,rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "User not Update"
                resp.data = {id_toma,rows: result.data};
            }

            resolve(resp)
        })
    })
}

const GetToma = async(data) => {
    return new Promise(async (resolve,reject) => {

        let now = moment().utc().subtract(6,'h').format('YYYY-MM-DDTHH:mm:ss'); 
        let to  = moment().utc().add(1,'h').subtract(6,'h').format('YYYY-MM-DDTHH:mm:ss'); 

        console.log(`From ${now}`)
        console.log(`To ${to}`)

        const query = `SELECT * FROM tomas WHERE fecha BETWEEN '${now}' AND '${to}' `;

        await Mysql.executeQuery(query,(result) => {

            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "User Update"
                resp.data = {rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "User not Update"
                resp.data = {rows: result.data};
            }

            resolve(resp)
        })
    })
}

const UpdatePrescription = async(data) => {
    return new Promise(async (resolve,reject) => {

        let id_presc      = data.id_prescription
        let fecha_estudio = data.fecha_estudio
        let hora_estudio  = data.hora_estudio
        let fecha_prim_toma = data.fecha_prim_toma
        let hora_prim_toma  = data.hora_prim_toma
        let fecha_seg_toma  = data.fecha_seg_toma
        let hora_seg_toma   = data.hora_seg_toma
        let update_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 
        
        const query = `UPDATE prescriptions SET fecha_estudio = '${fecha_estudio}', hora_estudio ='${hora_estudio}',
            fecha_prim_toma = '${fecha_prim_toma}', hora_prim_toma = '${hora_prim_toma}',
            fecha_seg_toma = '${fecha_seg_toma}', hora_seg_toma = '${hora_seg_toma}', updated_at = '${update_at}'
            WHERE id = ${id_presc}`; 
        
        await Mysql.executeQuery(query,(result) => {

            console.log(`Result ${result}`)
            console.log(`Result Status ${result.data}`)

            const keys = Object.keys(result)
            console.log(`Key ${keys}`)
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
    GetPrescriptions,
    GetPrescriptionsById,
    ExistPrescription,
    CreatePrescription,
    UpdatePrescription,
    DeletePrescription,
    createTomas,
    GetToma
};