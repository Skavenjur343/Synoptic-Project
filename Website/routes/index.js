const express = require('express');
const router = express.Router();
const { getPageLoc, getLang } = require("../lib/localization")

router.get("/", function(req, res) {
    res.render("index", { 
        title: "Home",
        loc: getPageLoc("home", getLang(req.cookies)),
        metrics: require("../tmp_data.json"),
        scripts: [
            "pages/index.js",
            "scripts/modal.js"
        ]
    });
});

module.exports = {
    router_path: "/",
    router
};
