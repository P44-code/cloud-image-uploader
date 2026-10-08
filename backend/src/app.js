const express = require('express')

const app = express()
const { uploadImageToCDN } = require('./services/post.service')
const postModel = require('./models/post.model')
const cors = require('cors')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })
app.use(cors())




app.post('/create-post', upload.single('image'), async (req, res) => {

    const result = await uploadImageToCDN(req.file.buffer, req.file.originalname)

    await postModel.create({
        image: result.url,
        description: req.body.description
    })

    res.status(201).json({
        message: "post created succefully",
    })

})

app.get('/posts', async (req, res) => {

    const post = await postModel.find()

    res.status(201).json({
        message: "post fetched succefully",
        post: post
    })
})

module.exports = app;