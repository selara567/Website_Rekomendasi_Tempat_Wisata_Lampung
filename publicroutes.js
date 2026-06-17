const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publiccontroller");

router.get("/", publicController.showHome);
router.get("/detail/:id", publicController.showDetail);
router.post("/like/:id", publicController.likeWisata);

module.exports = router;