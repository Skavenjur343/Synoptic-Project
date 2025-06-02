// Temporary JSON implementation of a database lib,
// waiting on final db implementation to rewrite

const fs = require("fs")

const DB_PATH = "db.json"

class Database {
    #db
    #file_path

    constructor(path = DB_PATH) {
        this.#loadDB(path)
        console.log(this.#db)
    }

    #loadDB(path) {
        try {
            this.#db = JSON.parse(fs.readFileSync(path))
            this.#file_path = path
        }
        catch (e) {
            console.error("Database file not found, creating new instance.")
            this.#db = { 
                home: [], 
                tips: [
                    { title: "yuegu kiherbge", text: "Blah blah balhg balhgh sbgkbrgkb srdgujhbsufghsfdg", img: "" },
                    { title: "yuegu kiherbge", text: "Blah blah balhg balhgh sbgkbrgkb srdgujhbsufghsfdg", img: "" },
                    { title: "yuegu kiherbge", text: "Blah blah balhg balhgh sbgkbrgkb srdgujhbsufghsfdg", img: "" },
                    { title: "yuegu kiherbge", text: "Blah blah balhg balhgh sbgkbrgkb srdgujhbsufghsfdg", img: "" },
                    { title: "yuegu kiherbge", text: "Blah blah balhg balhgh sbgkbrgkb srdgujhbsufghsfdg", img: "" }
                ], 
                impact: [] 
            }
            fs.writeFileSync(path, JSON.stringify(this.#db))
        }
    }

    getHome() {
        return this.#db.home;
    }

    getTips() {
        return this.#db.tips;
    }

    getImpact() {
        return this.#db.impact;
    }
}

const DATABASE = new Database();

module.exports = {
    getDatabase: () => DATABASE
}