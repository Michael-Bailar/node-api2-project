const express = require("express")

const DB = require("./db.js")

const router = express.Router()

router.post('/', (req, res) => {

    if(req.body.title && req.body.contents) {
        DB.insert(req.body)
        .then(db => {
            res.status(201).json(db)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "error adding data"
            })
        })
    } else {
        res.status(404).json({
            message: "post not found"
        })
    }
})

router.post('/:id/comments', (req, res) => {
    DB.insertComment(req.body)
    .then((comment) => {
        res.status(201).json(comment)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "error adding data"
        })
    })
})

router.get('/', (req, res) => {
    DB.find(req.query)
    .then(db => {
        res.status(200).json(db)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "error retrieving data"
        })
    })
})

router.get('/:id', (req, res) => {

    const id = req.params.id

    DB.findById(req.params.id)
    .then(db => {
        if (db.length !== 0) {
            res.status(200).json(db)
        } else {
            res.status(404).json({message: "data not found"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: "error retrieving data"
        })
    })
})

router.get('/:id/comments', (req, res) => {
    DB.findPostComments(req.params.id).then(comments => {
        res.status(200).json(comments)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'error reading comments'})
    })
})

router.delete('/:id', (req, res) => {
    DB.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: 'the post has been removed'})
        } else {
            res.status(404).json({message: 'the post could not be found'})
        }
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    DB.update(req.params.id, changes)
    .then(db => {
        if(db) {
            res.status(200).json(db)
        } else {
            res.status(404).json({message: 'the post could not be found'})
        }
    })
})

module.exports = router