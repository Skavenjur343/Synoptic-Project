const express = require('express');
const router = express.Router();
const { getDatabase } = require("../lib/db");
const { getPageLoc, getLang } = require("../lib/localization")

router.get("/", function(req, res) {
    res.render("tips", { 
        title: "Tips",
        data: getDatabase().getTips(),
        loc: getPageLoc("tips", getLang(req.cookies))
    });
});

module.exports = {
    router_path: "/tips",
    router
};
