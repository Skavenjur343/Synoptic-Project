const express = require('express');
const router = express.Router();
const { sanitise, escape, trim, isEmail, isPassword } = require("../lib/sanitise")
const crypt = require("../lib/crypt")

router.get("/", function(req, res) {
    res.render("register", { 
        title: "Register",
    });
});

router.post("/", (req, res) => {
    const { sanitised, errors } = sanitise(req.body, {
        "email": [escape, trim, isEmail],
        "password": [ isPassword ]
    })

    if (errors.length > 0) {
        return res.status(400).send({ errors })
    }

    const hashed_pass = crypt.hashSync(sanitised.password);
    console.log(sanitised.email, sanitised.password, hashed_pass)
    res.status(200).send({ message: "Successfully registered!" })
})

module.exports = {
    router_path: "/register",
    router
};
