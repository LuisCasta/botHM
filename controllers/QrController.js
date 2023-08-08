const QrInteractor = require('../usecases/QrInteractor');

module.exports = () => {
    const qrInteractor = QrInteractor();

    const sendData = (req, res, next) => {

        const data = req.body;
        qrInteractor.sendData(data).then((response) => {

            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    return {
        sendData,
    }
};