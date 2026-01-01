import express from 'express'
import * as usersControllers from '../controllers/users.js'


const router = express.Router()

router.route('/register')
    .post(usersControllers.createUser)



router.route('/me')
    .get(()=>{})






export default router