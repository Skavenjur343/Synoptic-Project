const express = require('express');
const router = express.Router();
const { getDatabase } = require("../lib/db");
const { getPageLoc, getLang } = require('../lib/localization');

router.get("/", function(req, res) {
    res.render("impact", { 
        title: "Impact",
        data: getDatabase().getImpact(),
        loc: getPageLoc("impact", getLang(req.cookies))
    });
});

module.exports = {
    router_path: "/impact",
    router
};
