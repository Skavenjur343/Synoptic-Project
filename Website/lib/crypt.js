const bcrypt = require("bcrypt")

function hashSync(input, saltRounds = 10) {
    return bcrypt.hashSync(input, saltRounds)
}

function compareSync(input, hash) {
    return bcrypt.compareSync(input, hash)
}

module.exports = {
    hashSync,
    compareSync
}