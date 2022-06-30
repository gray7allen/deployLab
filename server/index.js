const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'dfd18e3154814152b56d702ac6107ce6',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

rollbar.log('Hello world!')

try {
    nonExistentFunction();
  } catch (error) {
    rollbar.info('catch try error')
    rollbar.error('Error Error Error')
    rollbar.critcal('explosion')
    rollbar.warning('Warning Warning Warning')
  }

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../styles.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.js'))
})

const port = process.env.PORT ||4000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})