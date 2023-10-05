const UserInteractor  = require('../usecases/UserInteractor');
const PrescInteractor = require('../usecases/PrescInteractor');
const otpGenerator =  require("otp-generator");
const axios = require('axios');

const otps = {};

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

    const GetUserByPhone = (req, res, next) => {

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
        userInteractor.CreateUser(data).then(async (response) => {

            let status_r = response.user.status
            let message_r = response.user.message
            let values = response.user.data

            if(status_r == 200){

                const phone = data.telefono;
                const opt_in = await axios({
                    method: 'post',
                    url: `https://messages.landbot.io/wa/W-1840-G81XFAOLNX64HKRR/opt_in?phone=${phone}`,
                    headers: {
                        'Authorization': 'Token 86d929431f2643afe43a932a370eac7e7695450b',
                        'Content-Type' : 'application/json'
                    }
                });

                console.log(`opt in customer ${ opt_in.data.customer.id }`)

                const asign = await axios({
                    method: 'put',
                    url: `https://api.landbot.io/v1/customers/${opt_in.data.customer.id}/unassign/`,
                    headers: {
                        'Authorization': 'Token 86d929431f2643afe43a932a370eac7e7695450b',
                        'Content-Type' : 'application/json'
                    }
                });
                

                const statusLandbot = await userInteractor.UpdateLandbotId({id_user: values.id_user,  landbotId : opt_in.data.customer.id})

            }

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

    const SendOtp = (req, res) => {

        const { phone } = req.body;

        const otp = otpGenerator.generate(8, { upperCaseAlphabets: false, specialChars: false });

        userInteractor.CreateOtp({phone, otp}).then(async (response) => {
            
            let status_r    = response.status
            let statusSend ="";

            console.log(`phoneeee ${phone}`)
            const idCustomer = await userInteractor.GetUserByPhone({phone})

            const id = idCustomer.data.rows.landbot_id;
            console.log( `idCustomer ${id}` )

            if(status_r == 200)
               statusSend  = await userInteractor.SendWhatsapp(id,otp)

            
            return res.status(status_r).json({status:200,message:`send otp Success`,data:otp})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const ValidateOtp = async (req, res) => {

        const { otp, phone, password } = req.body;

        const otpResult = await userInteractor.GetOtp(otp);

        if(otpResult.status == 200){

            const updated = await userInteractor.UpdatePassword({phone, password})

            if(updated.status == 200)
                return res.status(200).json({status:200,message:updated.message_r,data:updated.data})
            else
                return res.status(400).json({status:400,message:updated.message_r,data:updated.data})
        }else{

            return res.status(400).json({status:400,message:otpResult.message_r,data:otp})
        }
    }

    return {
        GetUser,
        Login,
        GetUsers,
        CreateUser,
        UpdateUser,
        DeleteUser,
        GetPrescriptionDetails,
        SendWhatsapp,
        SendOtp,
        ValidateOtp
    }
};