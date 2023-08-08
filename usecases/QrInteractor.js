const qr = require('../services/QrService')

module.exports =  () => {

    async function sendData(data) {

        return await qr.SaveData(data);
    }

    return {
        sendData
    }
};

