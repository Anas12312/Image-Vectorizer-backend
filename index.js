const express = require('express')
const cors = require('cors')
const {randomUUID} = require('crypto')
const fileUpload = require('express-fileupload')
const ftp = require('basic-ftp')
const { Readable } = require('stream')
const app = express()

app.use(cors())
app.use(fileUpload())

app.post('/upload/', async (req, res) => {
    try {

        const img = req.files.file
        const client = new ftp.Client()
        await client.access({
            host: "ftp.sirv.com",
            user: "zizo.zoom.z0@gmail.com+nopheate",
            password: "zyad7890",
        })

        const uuid = randomUUID();

        await client.upload(Readable.from(img.data), uuid )
        res.send({message: 'https://nopheate.sirv.com/'+uuid})

    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


app.listen(3000, () => {
    console.log("App Running...")
})