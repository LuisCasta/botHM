const express = require('express');

const UserController = require('../controllers/UserController');

const UserRouter = () => {
    const router = express.Router();
    const controller = UserController();

    router.route('/')
        .get(controller.GetUser)
        .post(controller.CreateUser)
        .put(controller.UpdateUser)
        .delete(controller.DeleteUser)
    router.route('/users')
        .get(controller.GetUsers)
    router.route('/login')
        .post(controller.Login)
    router.route('/me')
        .post(controller.GetUser)
    router.route('/otp')
        .post(controller.SendOtp)
    router.route('/validateOtp')
        .post(controller.ValidateOtp)
    router.route('/prescriptionDetails')
        .post(controller.GetPrescriptionDetails)
    router.route('/sendWhatsapp')
        .get(controller.SendWhatsapp)
    return router;
}

module.exports = UserRouter;