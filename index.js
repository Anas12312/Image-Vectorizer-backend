const express = require('express')
const cors = require('cors')
const { randomUUID } = require('crypto')
const fileUpload = require('express-fileupload')
const ftp = require('basic-ftp')
const { Readable } = require('stream')
const app = express()
const fs = require('fs')
const request = require('request')
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

        await client.upload(Readable.from(img.data), uuid)
        request.post({
            url: 'https://vectorizer.ai/api/v1/vectorize',
            formData: {
                "image.url": 'https://nopheate.sirv.com/' + uuid, // TODO: Replace with your image
                mode: "test"
            },
            auth: { user: 'vk7z93fmx2eatfh', pass: 'rbcfhqq8n9rdqasp4f40bt75c1gs5s8f8kjcip21ru90tsvoaogk' },
            followAllRedirects: true,
            encoding: null,
            
        }, async function (error, response, body) {
            if (error) {
                res.send({
                    error: 'Request failed:', error
                });
            } else if (!response || response.statusCode != 200) {
                res.send({
                    error: 'Error:' +  response && response.statusCode +  body.toString('utf8')
                });
            } else {
                const uuid = randomUUID();
                await client.upload(Readable.from(body), uuid)
                res.send({
                    url: 'https://nopheate.sirv.com/' + uuid
                })
            }
        })


    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


app.listen(3000, () => {
    console.log("App Running...")
})