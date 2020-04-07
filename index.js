const express = require('express')

const dbRouter = require('./data/router.js')

const server = express()


//middleware
server.use(express.json()) 

server.use("/api/posts", dbRouter)

//endpoints
server.get('/', (req, res) => {
    res.send(`
        <h2>Blog API</h>
        <p>this is a blog<p>
    `)
})

server.listen(5000, () => {
    console.log("\n*** Server Running on http://localhost:5000 ***\n")
})