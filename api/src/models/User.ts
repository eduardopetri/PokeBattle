import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface User extends Document {
    username: string
    password: string
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

UserSchema.pre("save", async function(next) {
    const user = this as User
    user.password = await bcrypt.hash(user.password, 10)
    next()
})

export default model<User>("User", UserSchema)