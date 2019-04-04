require("dotenv").config();
const express = require("express");
const router = express.Router();
const Controller = require("../controller/service.js");

router.get("/user", Controller.user);
router.get("/search/:userName", Controller.findUser);
router.get("/starred/:user", Controller.findStrarredList);
router.post("/addrepo", Controller.createRepo);
router.delete("/deleterepo/:owner/:repoName", Controller.destroyRepo);
router.delete("/unstar/:owner/:repoName", Controller.destroyStarredRepo);
router.post("/logingoogle", Controller.sigin);

router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ databaseError: err });
  }
});

module.exports = router;
