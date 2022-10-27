const express = require('express')

const app = express()
const PORT = 3060

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Home page')
})

app.listen(PORT, () => console.log(`api running on: http://localhost:${PORT}`))