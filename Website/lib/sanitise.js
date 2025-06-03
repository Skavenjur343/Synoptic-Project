/**
 * @typedef {Object} SanitisedResult
 * @property {Object} sanitised
 * @property {String[]} errors 
 */

/**
 * Sanitises and validates the `data` parameter based on the provided `format` parameter.

 * @param {Object} data - The input data to be sanitized. Each key in this object should correspond to a key in the `format` object.
 * @param {{[key: String]: Function}} format - Defines the mutators to be used for each key of `data`.
 *
 * @returns {SanitisedResult}
 * - `sanitised`: A new object containing the sanitised result of each of the data keys.
 * - `errors`: An array of error messages, including missing required keys or failed mutators.
 */
function sanitise(data, format) {
    let errors = []
    let sanitised = {}
    for(const key in format) {
        // console.log("Key:", key)
        if (!data[key]) {
            errors.push(`Missing required key ${key}.`);
            continue
        }

        let value = data[key]
        for (const mutate of format[key]) {
            // console.log("Mutator:", mutate, mutate.name)
            let oldValue = value

            let newValue = mutate(value)
            if (!newValue) {
                errors.push(`Mutator ${mutate.name} failed with value ${oldValue}.`)
                continue
            }
            
            // Don't set mutate value if it was a check function rather than a mutator
            if (typeof newValue !== "boolean")
                value = newValue
            
            // console.log("New Value", value)
        }

        sanitised[key] = value
        console.log(sanitised)
    }

    return { sanitised, errors }
}

function escape(input) {
    // Don't need to escape other types
    if (typeof input != "string") return input

    return input
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&rt;")
            .replaceAll("/", "&#x2F;")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#x27;")
}

function trim(input) {
    // Don't need to trim other types
    if (typeof input != "string") return input

    return input.trim()
}

const EMAIL_LOCAL_PATTERN = /(?:^[^\s.]?(?:[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~][\.]{0,1})*[^\s.]+)/
const EMAIL_DOMAIN_PATTERN = /[^\.\-@][a-zA-Z0-9\-]+[\.][a-zA-Z0-9\-]*[^\.\-]/

function isEmail(input) {
    if (typeof input != "string") return false

    let parts = input.split("@")
    if (parts.length != 2) {
        return false
    }

    let [local, domain] = parts
    return (
        EMAIL_LOCAL_PATTERN.test(local) && EMAIL_DOMAIN_PATTERN.test(domain)   
    )
}

const PASSWORD_MIN_LENGTH = 7
const PASSWORD_MAX_LENGTH = 21
const PASSWORD_CHARS_PATTERN = /[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:'",.<>\/?]*/;

function isPassword(input) {
    return (
        input.length >= PASSWORD_MIN_LENGTH             &&  // Password is within length limits
        input.length <= PASSWORD_MAX_LENGTH             &&  // --

        input.toLowerCase() != input                    &&  // Password contains capital letter
        input.toUpperCase() != input                    &&  // Password contains lowercase letter

        input.replace(PASSWORD_CHARS_PATTERN, "") == ""     // Password only contains valid characters
    )
}

module.exports = { 
    sanitise,
    escape,
    trim,
    isEmail,
    isPassword
}