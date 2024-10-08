const SECRET_KEY = require("../Keys/key.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const emailValidation = require("../functions/validateEmail.js")
const sendPasswordChangeEmail = require("../functions/sendEmail.js")
const register = async (req, res, User) => {
    try {
        console.log(req.body)
        let { username, email, password, active } = req.body

        if (!username || !password || !active || !email) {
            return res.status(400).json({ error: 'Data is empty' })
        }
        const existingUser = await User.findOne({ where: { username } })
        if (existingUser) {
            return res.status(400).json({ error: "User exist" })
        }
        if (!emailValidation(email)) {
            return res.status(400).json({ error: "Email is not valid" })
        }
        console.log("La contraseña es" + password)
        const passwordEncrypt = bcrypt.hashSync(password, 10)
        console.log("Password encriptada" + passwordEncrypt)
        password = passwordEncrypt
        const user = await User.create({ username, password, active, email })
        return res.status(200).json({ message: "user created" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const login = async (req, res, User) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res.status(400).json({ error: "Data is empty" })
        }
        const user = await User.findOne({ where: { username } })
        if (user.active == 0) {
            return res.status(400).json({ message: "User is not active" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(404).json({ error: "Incorrect Password" })
        }
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' })
        res.cookie('token', token)
        return res.status(200).json(token)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const recoverPassword = async (req, res, User) => {
    const { email } = req.body
    try {
        if (!emailValidation(email)) {
            return res.status(400).json({ error: "Email is not valid" })
        }
        console.log(email)
        let userExist = await User.findOne({ where: { email } })
        if (!userExist) {
            return res.status(400).json({ error: "User not found" })
        }
        let newPassword = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
        console.log(newPassword)
        newPassword = newPassword.toString()
        const newPasswordEncrypt = bcrypt.hashSync(newPassword, 10)
        await sendPasswordChangeEmail(email, newPassword)
        userExist.password = newPasswordEncrypt
        await userExist.save()
        return res.status(200).json({ message: "Password chaanged" })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const changePassword = async (req, res, User) => {
    let { email, newPassword, number } = req.body
    try {
        if (!email || !newPassword || !number) {
            return res.status(400).json({ error: "Data is empty" })
        }
        const userExist = await User.findOne({ where: { email } })
        number = number.toString()
        const validateNumber = bcrypt.compare(number, userExist.password)
        const newPasswordEncrypt = bcrypt.hashSync(newPassword, 10)
        if (validateNumber) {
            userExist.password = newPasswordEncrypt
            userExist.save()
            return res.status(200).json({ message: 'User password updated' })
        } else {
            return res.status(400).json({ error: "Number is not correct" })
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const disableAccount = (req,res,User) => {
    const {email} = req.body
    try{
        if(!email){
            return res.status(400).json({error: "Data is empty"})
        }
        const user = User.findOne({where: {email}})
        user.active = 0
        user.save()
        return res.status(200).json({message: "User disabled"})
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}
module.exports =
{
    login, register, recoverPassword, changePassword, disableAccount
}