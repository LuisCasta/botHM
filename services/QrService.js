const Mysql = require('./MysqlService2');
const moment = require('moment');

const SaveData = async(data) => {
    return new Promise(async (resolve,reject) => {

        let user   = data.user;
        let origin = data.origin;
        let gender = data.gender;
        
        const query = `INSERT INTO analytics(user, origin, gender) 
            VALUES ('${user}','${origin}','${gender}')`;
        
        await Mysql.executeQuery(query,(result) => {
            
            let resp = [];

            if(result.status){

                resp.status = 200;
                resp.message = "Success"
                resp.data = result.data;
            }else{

                resp.status = 400;
                resp.message = "Insert Error"
                resp.data = {};
            }
            resolve(resp)
        })
    })
}

module.exports = {
    SaveData
};