const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

require('dotenv').config()

const usersRouter = require('./routes/users.js');
const employeesRouter = require('./routes/employees.js');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', req.header('origin')
      || req.header('x-forwarded-host') || req.header('referer') || req.header('host'));
  next();
});


app.use('/api/user', usersRouter);
app.use('/api/employees', employeesRouter);


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    resultCode: 1,
    status,
    message,
  })
})

const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
  console.log('Server start', PORT)
})
