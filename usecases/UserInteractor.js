const query = require('../services/UserService');
const catalogo = require("../helpers/catalogKids");
const prescription = require('../services/PrescService')

module.exports =  () => {

    async function GetUser(data) {

        let result = await query.GetUser(data);
        
        return result;
    } 

    async function Login(data) {

        let result = await query.GetUserLogin(data);
        console.log(`Satus ${result.status}`)
        if(result.status == 400)    
            return {result, error: 400};

        let id = result['data'].rows[0].id

        let result2 = await prescription.GetPrescriptionsById(id)
        return {result, result2};
    } 

    async function GetUsers() {

        let result = await query.GetUsers();

        return result;
    } 
    
    async function CreateUser(data) {

        let exist_user = await query.ExistUser(data);
        let result = []

        if(exist_user.status == 400){
            result = await query.CreateUser(data);

            const peso = data.peso;
            if(peso >=  8.5 && peso <= 10.5)
                return { user: result, prescription : catalogo.catalogo["1-2"]};
            if(peso >= 10.6 && peso <= 14.7)
                return { user: result, prescription : catalogo.catalogo["2-4"]};
            if(peso >=14.8 && peso <= 28)
                return { user: result, prescription : catalogo.catalogo["4-9"]};
            
            return { user: result, prescription : catalogo.catalogo["10"]};

        } else {
            result = exist_user
        }
        return result;
    } 

    async function GetPrescriptionDetails(data) {

        const peso = data.peso;
        if(peso >=  8.5 && peso <= 10.5)
            return { prescription : catalogo.catalogo["1-2"]};
        if(peso >= 10.6 && peso <= 14.7)
            return { prescription : catalogo.catalogo["2-4"]};
        if(peso >=14.8 && peso <= 28)
            return { prescription : catalogo.catalogo["4-9"]};
        
        return { prescription : catalogo.catalogo["10"]};
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
    
    async function SendWhatsapp() {
        
        let result = []
        console.log("send3")
        result = await query.SendWhatsapp();
        console.log(`result ${result}`)
        return result;
    }

    return {
        GetUser,
        Login,
        GetUsers,
        CreateUser,
        UpdateUser,
        DeleteUser,
        GetPrescriptionDetails,
        SendWhatsapp
    }
};