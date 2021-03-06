import { Router, request } from 'express'
import UserController from './controllers/UserController'

const router = Router()

router.post("/users/register", UserController.store)
router.post("/users/login", UserController.login)

export default router