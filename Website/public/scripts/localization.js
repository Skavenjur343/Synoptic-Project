function setLang(lang) {
    console.log(lang)
    document.cookie = "lang=" + lang;
    window.location.reload()
}