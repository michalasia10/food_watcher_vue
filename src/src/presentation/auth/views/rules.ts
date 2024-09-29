const usernameRules = [
    (v: string) => !!v || "Username is required"
]
const passwordRules = [
    (v: string) => !!v || "Password is required"
]
const emailRules = [
    (v: string) => !!v || "Email is required",
    (v: string) => /.+@.+\..+/.test(v) || "Email must be valid",
]

export {
    usernameRules,
    passwordRules,
    emailRules
}