const express = require('express');
const router = express.Router();
// const { getResource } = require("../resourceUtils")

router.get("/", function(req, res) {
    res.render("index", { 
        title: "Home",
        // data: getResource("home"),
    });
});

module.exports = {
    router_path: "/",
    router
};
