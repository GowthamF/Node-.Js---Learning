const express = require("express");
const isAuth = require("../middleware/is-auth");
const statusController = require("../controllers/status");

const router = express.Router();

router.get("/getStatus", isAuth, statusController.getStatus);

router.put("/updateStatus", isAuth, statusController.updateStatus);

module.exports = router;
