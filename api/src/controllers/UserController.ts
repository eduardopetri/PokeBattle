import { Request, Response } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import authConfig from '../config/auth'

interface TokenPayload {
    _id: string
    username: string
}

function generateToken(params: TokenPayload) {
    return jwt.sign(params, authConfig.appKey)
}

class UserController {
    async store(request: Request, response: Response) {
        const { username, password } = request.body

        if (!username || !password || password.length < 8)
            return response.status(400).send()
        
        const user = await User.create({ username, password })

        const token = generateToken({
            _id: user._id,
            username: user.username
        })

        if (!user) return response.status(500).send()
        return response.json({ token })
    }

    async login(request: Request, response: Response) {
        const { username, password } = request.body

        if (!username || !password || password.length < 8)
            return response.status(400).send()
        
        const user = await User.find({ username })
        if (!user || !bcrypt.compare(password, user[0].password))
            return response.status(400).send()
        
        const token = generateToken({
            _id: user[0]._id,
            username: user[0].username
        })
        return response.json({ token })
    }
}

export default new UserController()