const express = require('express');
const router = express.Router();
const { postName, getName } = require('./controller');

router.use("/", (req, res, next) => {
    next();
})

router.post("/", async (req, res, next) => {
    postName(req, res, next);
})

router.get('/id', async (req, res, next) => {
    getName( req, res, next);
});

module.exports = router;


