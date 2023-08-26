const query = require('../services/PrescService');

module.exports = () => {

    async function GetPrescription(data) {
        let result = await query.GetPrescription(data);

        return result;
    }

    async function GetPrescriptions() {
        let result = await query.GetPrescriptions();

        return result;
    }

    async function GetPrescriptionsById(id) {
        let result = await query.GetPrescriptionsById(id);

        return result;
    }

    async function CreatePrescription(data) {
        
        let exist_presc = await query.ExistPrescription(data);
        let result = []
        if(exist_presc.status == 400){
            result = await query.CreatePrescription(data);
            let { id_prescription } = await result;
            console.log(`Result prescripcion ${id_prescription}`);
        } else {
            result = exist_presc
        }

        return result;
    }

    async function createTomas(data) {
        
        
        let result = []
        result = await query.createTomas(data);

        return result;
    }

    async function UpdatePrescription(data) {
        
        let getpresc = await query.GetPrescription(data);
        let result = []
        if(getpresc.status == 200){
            result = await query.UpdatePrescription(data);
        } else {
            result = getpresc
        }
        return result;
    }

    async function DeletePrescription(data) {
        
        let getpresc = await query.GetPrescription(data);
        let result = []
        if(getpresc.status == 200){
            result = await query.DeletePrescription(data);
        } else {
            result = getpresc
        }
        return result;
    }

    return {
        GetPrescription,
        GetPrescriptions,
        GetPrescriptionsById,
        CreatePrescription,
        UpdatePrescription,
        DeletePrescription,
        createTomas
    }
}