const Mysql = require('./MysqlService2');
const moment = require('moment');
const axios = require('axios');



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

const GetUserByPhone = async(data) => {
    return new Promise(async (resolve,reject) => {

        let phone = data.phone
        const query = `SELECT * FROM users where telefono = '${phone}'`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "User Exist"

                //console.log(`resuuuult ${Object.keys(result.data[0]) }`)
                resp.data = {phone,rows: result.data[0]};
            }else{

                resp.status = 400;
                resp.message = "User not Exist"
                resp.data = {phone, rows: result.data};
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

            if(result.status && result.data.length > 0){

                console.log(`result data ${result.status}`)
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

const UpdateLandbotId = async(data) => {
    return new Promise(async (resolve,reject) => {

        let landbotId = data.landbotId
        let id_user = data.id_user
        let update_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 

        const query = `UPDATE users SET landbot_id = ${landbotId},
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
            pass = '${pass}', country = '${country}', recordatorio = '${recordatorio}',
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

const SendWhatsapp = async(customer, code) => {
    console.log(`Into send wh`)

    /*const resultado = await axios({
        method: 'get',
        url: 'https://api.landbot.io/',
        responseType: 'json',
        headers: {
            'Authorization': 'Token 5046a0bf7add2c578e59ac8713fff7fe8300a589',
            'Content-Type' : 'application/json'
        },
    });*/

    const resultado2 = await axios({
        method: 'post',
        url: `https://api.landbot.io/v1/customers/${customer}/send_template/`,
        //responseType: 'json',
        headers: {
            'Authorization': 'Token 86d929431f2643afe43a932a370eac7e7695450b',
            'Content-Type' : 'application/json'
        },
        data : {
               "template_id": 12170,
               "template_params": {
                  "header" : {},
                  "body": {
                     "params": [
                        `${code}`
                     ]
                  }
               },
               "template_language": "es_MX"
        }
    });
    /*
    const resultado2 = await axios({
        method: 'post',
        url: 'https://messages.landbot.io/wa/W-1818-YLSJCP6KP6OF6WQ0/opt_in?phone=+5218714353747',
        //responseType: 'json',
        headers: {
            'Authorization': 'Token 5046a0bf7add2c578e59ac8713fff7fe8300a589',
            'Content-Type' : 'application/json'
        },
        data : {
            custom_params: {
                "header": {
                    "params": ["Prueba"]
                },
                "body": { 
                    "params": ["Prueba"]
                }
            },
            template_params: {
                "header": {
                    "params": ["Prueba"]
                },
                "body": { 
                    "params": ["Prueba"]
                }
            },
        }        
    });*/

    return resultado2;

    /*axios({
        method: 'get',
        url: 'https://api.landbot.io/',
        responseType: 'json',
        headers: {
            'Authorization': 'Token 5046a0bf7add2c578e59ac8713fff7fe8300a589',
            'Content-Type' : 'application/json'
        },
    })
    .then(function (response) {

        console.log(`Response ${response}`)
        //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });*/
}

const CreateOtp = async(phone, otp) => {

    return new Promise(async (resolve,reject) => {

        
        let create_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 
        
        const query = `INSERT INTO otp( phone, otp, created_at) 
            VALUES ('${phone}','${otp}','${create_at}')`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "Success"
                resp.data = {id_otp: result.data.insertId};
            }else{

                resp.status = 400;
                resp.message = "Insert Error"
                resp.data = {phone};
            }


            resolve(resp)
        })
    })
}

const GetOtp = async( otp ) => {

    return new Promise(async (resolve,reject) => {
        
        const query = `SELECT * FROM otp WHERE otp = '${otp}'`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "Success"
                resp.data = {id_otp: result.data};
            }else{

                resp.status = 400;
                resp.message = "Insert Error"
                resp.data = {otp};
            }


            resolve(resp)
        })
    })
}

const UpdatePassword = async(data) => {
    return new Promise(async (resolve,reject) => {

        const { phone, password } = data;
        let update_at = moment().format('YYYY-MM-DDTHH:mm:ss'); 

        const query = `UPDATE users SET pass = '${password}', updated_at = '${update_at}'
            WHERE telefono = ${phone}`;

        await Mysql.executeQuery(query,(result) => {

            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "User Update"
                resp.data = {phone,rows: result.data};
            }else{

                resp.status = 400;
                resp.message = "User not Update"
                resp.data = {phone,rows: result.data};
            }

            resolve(resp)
        })
    })
}


module.exports = {
    GetUser,
    GetUserByPhone,
    GetUserLogin,
    GetUsers,
    ExistUser,
    CreateUser,
    UpdateUser,
    UpdateLandbotId,
    DeleteUser,
    SendWhatsapp,
    CreateOtp,
    GetOtp,
    UpdatePassword
};