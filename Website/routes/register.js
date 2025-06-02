const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
    res.render("register", { 
        title: "Register",
    });
});

module.exports = {
    router_path: "/register",
    router
};
