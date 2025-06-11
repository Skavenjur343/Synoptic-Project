const form = document.querySelector("#login-form")
console.log(form)

const email = document.querySelector("#email")
const password = document.querySelector("#password")

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

    fetch("/login", {
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
        console.log(res.ok)
        if (!res.ok) {
            new Modal({
                type: "error",
                title: "Login Error",
                text: res_json.errors.join("<br/>")
            }).Show()

            return
        }
        else {            
            new Modal({
                type: "info",
                title: "Login",
                text: "Login successful!"
            }).Show()
        }
    })
    .catch(e => {
        new Modal({
            text: e
        })
    })
})