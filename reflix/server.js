const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 1309


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')))


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/', function(){
    res.end()
})

app.listen(port, function () {
    console.log(`Running on port ${port}`)
})