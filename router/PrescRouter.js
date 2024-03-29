const express = require('express');
const service = require("../services/PrescService")

const PrescController = require('../controllers/PrescController');
/**
     * @openapi
     * /api/v1/user:
     *   get:
     *     description: User
     *     tags : 
     *      -workouts 
     *     responses:
     *       200:
     *         description: ok
     */
const PrescRouter = () => {
    const router = express.Router();
    const controller = PrescController();

    router.route('/')
        .get(controller.GetPrescription)
        .post(controller.CreatePrescription)
        .put(controller.UpdatePrescription)
        .delete(controller.DeletePrescription)
    router.route('/prescriptions')
        .get(controller.GetPrescriptions)
    router.route('/me')
        .post(controller.GetPrescription)
    return router;
}

module.exports = PrescRouter;