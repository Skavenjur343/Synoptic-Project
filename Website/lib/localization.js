const Localization = require("../loc.json")

function getLang(cookies) {
    console.log(cookies)
    let lang = 0
    try {
        lang = parseInt(cookies.lang)
    }
    catch {
        console.error(`Failed to parse cookies: ${cookies}`)
    }
    return lang
}

function getLoc(tag, lang) {
    if (!Localization[tag] || !Localization[tag][lang]) {
        return `<${tag}_${lang}>`
    }
    return Localization[tag][lang]
}

function getPageLoc(page, lang) {
    if (!Localization.pages[page][lang]) {
        return Localization.pages[page][0]
    }

    var loc = Localization.pages[page][lang];
    loc.common = Localization.common[lang];
    // loc.recs = Localization.recommendations[lang]

    return loc;
}

module.exports = {
    getLang,
    getLoc,
    getPageLoc
}