import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (request, response) => response.send("Hello, PokeBattle"))

app.listen(3333, () => console.info("API running"))