const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/auth.js");
const {getAllEmployees, getEmployee, addNewEmployee, removeEmployee, editEmployee} = require("../controllers/employees.js");


router.get('/', auth, getAllEmployees)

router.get('/:id', auth, getEmployee)

router.post('/add', auth, addNewEmployee)

router.delete('/remove/:id', auth, removeEmployee)

router.put('/edit/:id', auth, editEmployee)


module.exports = router