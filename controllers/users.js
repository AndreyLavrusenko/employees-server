const {prisma} = require("../prisma/prisma-client.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async function(req, res, next) {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({message: "Пожалуйста, заполните обязательные поля"})
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    })

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))


}

const register = function(req, res, next) {
    res.send('register');
}

const current = function(req, res, next) {
    res.send('current');
}

module.exports = {
    login,
    register,
    current,
}