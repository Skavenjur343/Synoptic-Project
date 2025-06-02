const express = require('express');
const router = express.Router();
const { getDatabase } = require("../lib/db");

router.get("/", function(req, res) {
    res.render("tips", { 
        title: "Tips",
        data: getDatabase().getTips()
    });
});

module.exports = {
    router_path: "/tips",
    router
};
