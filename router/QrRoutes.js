const express = require('express');

const QrController = require('../controllers/QrController');

const UserRouter = () => {
    const router = express.Router();
    const controller = QrController();

    router.route('/')
        .post(controller.sendData)
    return router;
}

module.exports = UserRouter;