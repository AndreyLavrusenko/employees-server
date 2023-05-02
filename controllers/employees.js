const {prisma} = require("../prisma/prisma-client.js");

const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await prisma.employee.findMany()

        return res.status(200).json(employees)
    } catch (err) {
        return res.status(400).json({message: "Что то пошло не так"})
    }
}

const getEmployee = async (req, res, next) => {
    try {

        const {id} = req.params

        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        return res.status(200).json(employee)

    } catch (err) {
        return res.status(400).json({message: "Что то пошло не так"})
    }
}

const addNewEmployee = async (req, res, next) => {
    try {

        const {firstName, lastName, age, address} = req.body

        if (!firstName || !lastName || !age || !address) {
            return res.status(400).json({message: "Пожалуйста, заполните все обязательные поля"})
        }

        const employee = await prisma.employee.create({
            data: {
                ...req.body,
                userId: req.user.id
            }
        })

        return res.status(201).json(employee)

    } catch (err) {
        return res.status(400).json({message: "Что то пошло не так"})
    }
}

const removeEmployee = async (req, res, next) => {
    try {

        const {id} = req.params

        await prisma.employee.delete({
            where: {
                id
            }
        })

        return res.status(204).json('OK')

    } catch (err) {
        return res.status(400).json({message: "Не удалось изменить сотрудника"})
    }
}

const editEmployee = async (req, res, next) => {
    try {

        const {id} = req.params

        await prisma.employee.update({
            where: {
                id
            },
            data: {
                ...req.body,
                id
            }
        })

        return res.status(204).json("OK")

    } catch (err) {
        return res.status(400).json({message: "Не удалось отредактировать сотрудника"})
    }
}

module.exports = {
    getAllEmployees,
    getEmployee,
    addNewEmployee,
    removeEmployee,
    editEmployee,
}