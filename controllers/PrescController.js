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

    const GetPrescriptions = (req, res, next) => {

        prescInteractor.GetPrescriptions().then((response) => {
            
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

        const now = moment();
        console.log(`Ahora ${now} Plan ${datePlan}`)
        if(datePlan < now)
            return res.send("Error, la fecha del estudio no puede ser menor a la fecha de hoy.")

        if(dateFirst > datePlan)
            return res.send("Error, primera toma es mayor al estudio")

        if(dateFirst > dateSecond)
            return res.send("Error, primera toma es mayor que la segunda toma")
        
        if(dateSecond > datePlan)
            return res.send("Error, la segunda toma es posterior a la fecha del estudio.")


        const diffTime = datePlan.diff(dateSecond, 'hours', true); // devolverá 1,75

        if(diffTime < 6){
            console.log( moment.duration(datePlan - dateSecond).humanize() + ' between meals' )
            return res.send("Error, no hay suficiente tiempo entre la segunda toma y el estudio, al menos debe existir 6 horas de diferencia.")
        }
        
        prescInteractor.CreatePrescription(data).then(async (response) => {
            
            let status_r  = response.status
            let message_r = response.message
            let values    = response.data

            let id_user = values.id_user;

            let aux = values.fecha_prim_toma.split('-')
            let newAux1 = `${aux[2]}-${aux[1]}-${aux[0]}`

            let aux2 = values.fecha_seg_toma.split('-')
            let newAux2 = `${aux2[2]}-${aux2[1]}-${aux2[0]}`

            console.log(`/////////// ${values.fecha_prim_toma} & ${values.hora_prim_toma}`)
            let dateTwo = `${newAux1}T${values.hora_prim_toma}}`;
            let t1 = moment.utc(dateTwo,"YYYY-MM-DDTHH:mm:ss.sssZ")
            console.log(`/////////// ${values.fecha_seg_toma} & ${values.hora_seg_toma}`)
            let dateThree = `${newAux2}T${values.hora_seg_toma}}`;
            let t2 = moment.utc(dateThree,"YYYY-MM-DDTHH:mm:ss.sssZ")

            console.log(`t1 ${t1}`)
            let h1 = t1.add(1, 'h');
            console.log(`h1 ${h1}`)
            let h2 = h1.add(1, 'h');
            console.log(`h2 ${h2}`)
            let h3 = h2.add(1, 'h');
            console.log(`h2 ${h3}`)
            let h4 = h3.add(1, 'h');
            let h5 = h4.add(1, 'h');
            console.log(`t2 ${t2}`)
            let h6 = h5.add(1,'h');
            console.log(`h6 ${h6}`)
            let h7 = h6.add(1,'h');
            let h8 = h7.add(1,'h');

            //const allH = [ h1, h2, h3 , h4, h5, h6, h7, h8];

            await prescInteractor.createTomas({id_user, fecha : h1, mensaje : "test"});
            await prescInteractor.createTomas({id_user, fecha : h2, mensaje : "test"});
            await prescInteractor.createTomas({id_user, fecha : h3, mensaje : "test"});
            await prescInteractor.createTomas({id_user, fecha : h4, mensaje : "test"});
            await prescInteractor.createTomas({id_user, fecha : h5, mensaje : "test"});
            await prescInteractor.createTomas({id_user, fecha : h6, mensaje : "test"});
            await prescInteractor.createTomas({id_user, fecha : h7, mensaje : "test"});
            await prescInteractor.createTomas({id_user, fecha : h8, mensaje : "test"});
            
            //let count = 0;

            /*allH.forEach(async h => {

                let params = {
                    id_user,
                    fecha : h,
                    mensaje : "test"
                }

                let resultTomas = await prescInteractor.createTomas(params);
                console.log(`Resultado de hidratacion ${h} => ${resultTomas}`)
            }) */           

            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const UpdatePrescription = (req, res, next) => {
        const data = req.body

        let {fecha_estudio, hora_estudio, fecha_prim_toma, hora_prim_toma, fecha_seg_toma, hora_seg_toma} = data;
        
        let dateOne = `${fecha_estudio}T${hora_estudio}}`;
        let datePlan = moment.utc(dateOne,"DD-MM-YYYYTHH:mm:ss.sssZ")

        let dateTwo = `${fecha_prim_toma}T${hora_prim_toma}}`;
        let dateFirst = moment.utc(dateTwo,"DD-MM-YYYYTHH:mm:ss.sssZ")

        let dateThree = `${fecha_seg_toma}T${hora_seg_toma}}`;
        let dateSecond = moment.utc(dateThree,"DD-MM-YYYYTHH:mm:ss.sssZ")

        const now = moment();
        console.log(`Ahora ${now} Plan ${datePlan}`)
        if(datePlan < now)
            return res.send("Error, la fecha del estudio no puede ser menor a la fecha de hoy.")

        if(dateFirst > datePlan)
            return res.send("Error, primera toma es mayor al estudio")

        if(dateFirst > dateSecond)
            return res.send("Error, primera toma es mayor que la segunda toma")
        
        if(dateSecond > datePlan)
            return res.send("Error, la segunda toma es posterior a la fecha del estudio")


        const diffTime = datePlan.diff(dateSecond, 'hours', true); // devolverá 1,75

        if(diffTime < 6){
            console.log( moment.duration(datePlan - dateSecond).humanize() + ' between meals' )
            return res.send("Error, no hay suficiente tiempo entre la segunda toma y el estudio, al menos debe existir 6 horas de diferencia.")
        }
        
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
        GetPrescriptions,
        CreatePrescription,
        UpdatePrescription,
        DeletePrescription
    }
};