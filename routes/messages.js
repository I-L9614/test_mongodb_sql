import express from 'express'
import * as messagesControllers from '../controllers/messages.js'

const router = express.Router()

router.route("/")
    .get(()=>{})



router.route('/encrypt')
    .post(messagesControllers.createMessage)


router.route('/decrypt')
    .post(()=>{})





export default router