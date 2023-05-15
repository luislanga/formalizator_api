require("dotenv/config")
const fetch = require('cross-fetch')
const express = require('express')
const cors = require('cors')
const PORT = 3000

const API_KEY = process.env.API_KEY

const app = express()
app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log('running on port ' + PORT))

app.get('/persistence', async (req, res) => {
    res.send("oi")
})

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "formalize o seguinte texto: " + req.body.message}],
            max_tokens: 100,
        })
    }
    try{
       const response = await fetch('https://localhost:3000/completions', options)
       const data = await response.json()
       res.send(data)
    }catch(error){
        console.error(error)
    }
})
