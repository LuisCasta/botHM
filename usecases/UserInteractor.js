const query = require('../services/UserService');

module.exports =  () => {

    async function GetUser(data) {

        let result = await query.GetUser(data);

        return result;
    } 
    
    async function CreateUser(data) {

        let exist_user = await query.ExistUser(data);
        let result = []

        if(exist_user.status == 400){
            result = await query.CreateUser(data);
        } else {
            result = exist_user
        }
        return result;
    } 

    async function UpdateUser(data) {

        let getuser = await query.GetUser(data);
        let result = []

        if(getuser.status == 200){
            result = await query.UpdateUser(data);
        } else {
            result = getuser
        }
        return result;
    } 

    async function DeleteUser(data) {
        
        let getuser = await query.GetUser(data);
        let result = []

        if(getuser.status == 200){
            result = await query.DeleteUser(data);
        } else {
            result = getuser
        }
        return result;
    } 

    return {
        GetUser,
        CreateUser,
        UpdateUser,
        DeleteUser
    }
};