class Modal {
    #modal_panel = null
    #modal_bg = null

    #modal_title = null
    #modal_text = null
    #modal_btn = null

    #type = ""
    #title = ""
    #text = ""
    #image = ""

    /**
     * @typedef {Object} ModalOptions
     * @property {"info"|"error"|"image"} type
     * @property {string} title
     * @property {string} text
     * @property {string} image
     */

    /**
     * Modal constructor
     * @param {ModalOptions} opts 
     */
    constructor(opts) {
        this.#type = opts.type
        this.#title = opts.title
        this.#text = opts.text
        this.#image = opts.image

        if (!this.#FindPanel()) {
            this.#CreatePanel()
        }
    }

    #FindPanel() {
        let panel = document.querySelector("#modal-panel")
        let background = document.querySelector("#modal-bg")
        if (!panel || !background) {
            return false
        }

        this.#modal_panel = panel
        this.#modal_title = panel.children[0]
        this.#modal_text = panel.children[1]
        this.#modal_btn = panel.children[2]

        this.#modal_bg = background

        return true
    }

    #CreatePanel() {
        let panel = document.createElement("div")
        panel.id = "modal-panel"
        panel.setAttribute("hidden", "")
        
        let background = document.createElement("div")
        background.id = "modal-bg"
        background.setAttribute("hidden", "")
        
        let title = document.createElement("h3")
        panel.append(title)
        
        let text = document.createElement("p")
        if (this.#type != "image") {
            let close_btn = document.createElement("button")
            close_btn.textContent = "Close"
            close_btn.onclick = () => { this.Hide() }
            this.#modal_btn = close_btn
        
            panel.append(text, close_btn)
        }
        else {
            let img = document.createElement("img")
            img.src = this.#image
            panel.append(img)
        }
        
        document.body.appendChild(background)
        document.body.appendChild(panel)
        
        this.#modal_panel = panel
        this.#modal_bg = background

        this.#modal_title = title
        this.#modal_text = text
    }

    Show() {
        console.log("Modal::Show")
        this.#modal_title.textContent = this.#title
        // Use innerHTML instead of textContent in case we want
        // to include other elements such as <pre>
        this.#modal_text.innerHTML = this.#text
        this.#modal_panel.setAttribute("modal-type", this.#type)

        this.#modal_panel.removeAttribute("hidden")
        this.#modal_bg.removeAttribute("hidden")
    }
    

    Hide() {
        this.#modal_panel.setAttribute("hidden", "")
        this.#modal_bg.setAttribute("hidden", "")
    }
}