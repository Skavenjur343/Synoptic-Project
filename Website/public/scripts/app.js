const burgerButton = document.querySelector("#burger-nav #burger")
const burgerMenu = document.querySelector("#burger-nav-container nav")

burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("active")
    burgerMenu.classList.toggle("open")
})