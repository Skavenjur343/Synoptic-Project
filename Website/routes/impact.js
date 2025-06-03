const express = require('express');
const router = express.Router();
const { getDatabase } = require("../lib/db");

router.get("/", function(req, res) {
    res.render("impact", { 
        title: "Impact",
        data: getDatabase().getImpact()
    });
});

module.exports = {
    router_path: "/impact",
    router
};
