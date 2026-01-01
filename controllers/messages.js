import { reverse } from "../utils/cipherMessage.js";
export async function createMessage(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password
        const message = req.body.message
        const cipherType = req.body.cipherType
        let cipherMessage = ""

        const user = await req.mongoDbConn
            .collection('users')
            .findOne({ username, password });
        if (user) {
            if (cipherType === 'reverse') {
                cipherMessage = reverse(message)
            }
            await req.mysqlConn.query(
                'INSERT INTO messages (username, cipher_type, encrypted_text) VALUES (?, ?, ?);',
                [username, cipherType, cipherMessage]
            );

            await req.mongoDbConn
                .collection('users')
                .updateOne({ username }, { $inc: { encryptedMessagesCount: 1 } });
            const [rows] = await req.mysqlConn.query(`SELECT * FROM messages where encrypted_text = '${cipherMessage}'`);
            res.status(201).json({ message: { id: rows[0].id, cipherType: rows[0].cipher_type, encryptedText: rows[0].encrypted_text } })
        }
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: err.message })
    }
}

export async function decryptMessage(req, res) {
    try {
        const user = await req.mysqlConn.query(`SELECT * FROM messages where id = '${req.body.id}'`)
        const messageReturn = reverse(user[0].encrypted_text)
        res.status(201).json({message:{id:user[0].id,decryptedText:messageReturn}})
    } catch (err) {

    }
}