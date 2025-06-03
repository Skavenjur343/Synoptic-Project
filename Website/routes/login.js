const express = require('express');
const router = express.Router();
const { sanitise, escape, trim, isEmail, isPassword } = require("../lib/sanitise");
const crypt = require("../lib/crypt")

router.get("/", function(req, res) {
    res.render("login", { 
        title: "Login",
        scripts: [
            "pages/login.js",
            "scripts/modal.js",
            "scripts/validation.js"
        ]
    });
});

router.post("/", (req, res) => {
    const { sanitised, errors } = sanitise(req.body, {
        "email": [ escape, trim, isEmail ],
        "password": [ isPassword ]
    })

    if (errors.length > 0) {
        return res.status(400).send({ errors })
    }

    const hashed_pass = crypt.hashSync(sanitised.password)
    console.log(sanitised.email, sanitised.password, hashed_pass)
    console.log(crypt.compareSync(sanitised.password, hashed_pass))
    res.status(200).send();
})

module.exports = {
    router_path: "/login",
    router
};
