const UserInteractor  = require('../usecases/UserInteractor');
const PrescInteractor = require('../usecases/PrescInteractor');

module.exports = () => {
    const userInteractor = UserInteractor();
    const prescInteractor = PrescInteractor();

    const GetUser = (req, res, next) => {

        const data = req.body
        userInteractor.GetUser(data).then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const Login = (req, res, next) => {

        const data = req.body

        userInteractor.Login(data).then(async (responses) => {
            
            let response = responses.result
            let respons2 = responses.result2;

            let status_r    = response.status
            let message_r   = response.message
            let values      = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values, prescription : respons2})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const GetUsers = (req, res, next) => {

        userInteractor.GetUsers().then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const CreateUser = (req, res, next) => {

        const data = req.body;
        userInteractor.CreateUser(data).then((response) => {

            
            let status_r = response.user.status
            let message_r = response.user.message
            let values = response.user.data
            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const GetPrescriptionDetails = (req, res, next) => {

        const data = req.body;
        userInteractor.GetPrescriptionDetails(data).then((response) => {

            let status_r = 200;
            let message_r = "Success prescription details"
            let values = response.prescription

            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const UpdateUser = (req, res, next) => {

        const data = req.body;

        userInteractor.UpdateUser(data).then((response) => {

            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const DeleteUser = (req, res, next) => {

        const data = req.body

        userInteractor.DeleteUser(data).then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data
            
            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const SendWhatsapp = ( req, res ) => {

        
        console.log(`Send whatsapp`)
        userInteractor.SendWhatsapp().then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data
            
            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
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