const burgerButton = document.querySelector("#burger-nav #burger")
const burgerMenu = document.querySelector("#burger-nav-container nav")

burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("active")
    burgerMenu.classList.toggle("open")
})

function setLang(lang) {
    console.log(lang)
    document.cookie = "lang=" + lang;
    window.location.reload()
}