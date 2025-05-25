const express = require('express')
const app = express();
const verifyPassword = require('./Asynchandler/verifypass')



app.use(function (req, res, next) {
    req.method = 'GET';
    const start = process.hrtime();

    res.on('finish', () => {

        console.log(req.method, req.path,)
    })
    next()
})

app.get('/dog', verifyPassword, (req, res) => {
    res.send('WOOF WOOF')
})

app.get('/', verifyPassword, (req, res) => {
    res.send('Welcome User')
})
app.use((err, req, res, next) => {
    console.log('*****************************')
    console.log('************ERROR*****************')
    console.log('*****************************')

    next(err)
})

app.listen(3000, () => {
    console.log('UP AND GRATEFUL 😤😤❤️✅🥶🔥🔥')
})