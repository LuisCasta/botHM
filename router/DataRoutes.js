const express = require("express");

const DataController = require("../controllers/DataController");

const DataRouter = () => {
    const router = express.Router();
    const controller = DataController();

    router.route("/estados")
        .get(controller.GetStates)
    router.route("/municipios")
        .post(controller.GetTown)
    router.route("/provincia")
        .get(controller.GetProvincias)
    router.route("/canton")
        .post(controller.GetCanton)

    return router;
}

module.exports = DataRouter;