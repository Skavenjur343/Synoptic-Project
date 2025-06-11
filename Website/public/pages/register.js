const form = document.querySelector("#login-form")
console.log(form)

const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirm_password = document.querySelector("#confirm-password")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (!Validate.Email(email.value)) {
        inputError(email)

        new Modal({
            type: "error",
            title: "Error",
            text: `Invalid email: ${email.value}`
        }).Show()
        
        return
    }

    if (!Validate.Password(password.value)) {
        inputError(password)

        new Modal({
            type: "error",
            title: "Error",
            text: `Invalid password.` 
        }).Show()
        
        return
    }

    console.log(password.value, confirm_password.value)
    if (password.value != confirm_password.value) {
        inputError(confirm_password)

        new Modal({
            type: "error",
            title: "Error",
            text: "Passwords don't match!"
        }).Show()

        return
    }

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(async res => {
        const res_json = await res.json()
        if (!res.ok) {
            new Modal({
                type: "error",
                title: "Registration Error",
                text: res_json.errors.join("<br/>")
            }).Show()

            return
        }

        new Modal({
            type: "info",
            title: "Registration Success",
            text: res_json.message
        }).Show()
    })
    .catch(e => {
        new Modal({
            text: e
        })
    })
})