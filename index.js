const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.post()

app.listen(3000, () => {
    console.log("App Running...")
})