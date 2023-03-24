const PrescInteractor = require('../usecases/PrescInteractor');
const moment = require('moment'); 

module.exports = () => {
    const prescInteractor = PrescInteractor();

    const GetPrescription = (req, res, next) => {
        const data = req.body
        prescInteractor.GetPrescription(data).then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data
            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const CreatePrescription = (req, res, next) => {
        const data = req.body

        let {fecha_estudio, hora_estudio, fecha_prim_toma, hora_prim_toma, fecha_seg_toma, hora_seg_toma} = data;
        
        let dateOne = `${fecha_estudio}T${hora_estudio}}`;
        let datePlan = moment.utc(dateOne,"DD-MM-YYYYTHH:mm:ss.sssZ")

        let dateTwo = `${fecha_prim_toma}T${hora_prim_toma}}`;
        let dateFirst = moment.utc(dateTwo,"DD-MM-YYYYTHH:mm:ss.sssZ")

        let dateThree = `${fecha_seg_toma}T${hora_seg_toma}}`;
        let dateSecond = moment.utc(dateThree,"DD-MM-YYYYTHH:mm:ss.sssZ")

        if(dateFirst > datePlan)
            return res.send("Error, primera toma es mayor al estudio")

        if(dateFirst > dateSecond)
            return res.send("Error, primera toma es mayor que la segunda toma")
        
        if(dateSecond > datePlan)
            return res.send("Error, segunda toma mayor que la fecha de estudio")

        prescInteractor.CreatePrescription(data).then((response) => {
            
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const UpdatePrescription = (req, res, next) => {
        const data = req.body
        prescInteractor.UpdatePrescription(data).then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data
            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const DeletePrescription = (req, res, next) => {
        const data = req.body
        prescInteractor.DeletePrescription(data).then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data
            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    return{
        GetPrescription,
        CreatePrescription,
        UpdatePrescription,
        DeletePrescription
    }
};