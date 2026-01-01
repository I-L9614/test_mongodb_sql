import * as cipherUtils from "../utils/cipherMessage.js";
export async function createMessage(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password
        const message = req.body.message
        const cipherType = req.body.cipherType
        let cipherMessage=""

        const user = await req.mongoDbConn
            .collection('users')
            .findOne({ username,password });
        if (user) {   
            if (cipherType === 'reverse') {
                cipherMessage = cipherUtils.encrypt(message)
            }
            await req.mysqlConn.query(
                'INSERT INTO messages (username, cipher_type, encrypted_text) VALUES (?, ?, ?);',
                [username, cipherType, cipherMessage]
            );
            console.log('dfsdf')

            await req.mongoDbConn
                .collection('users')
                .updateOne({ username }, { $inc: { encryptedMessagesCount: 1 } });

            res.status(201).json({ message: 'Message created' })}
    } catch (err) {
        console.log(err)
        return res.status(404).json({ error: err.message })
    }
}

