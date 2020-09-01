import express, { Application } from 'express'
import dbConfig from './database/config'
import mongoose from 'mongoose'
import routes from './router'

class App {
    public app: Application;

    constructor() {
        this.app = express()

        this.database()
        this.middlewares()
        this.routes()

        this.app.listen(3333, () => console.info("API running"))
    }

    private database() {
        mongoose.connect(dbConfig.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    }

    private middlewares() {
        this.app.use(express.json())
    }

    private routes() {
        this.app.use(routes)
    }
}

export default new App().app