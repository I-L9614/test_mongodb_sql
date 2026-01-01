import { reverse } from "../utils/cipherMessage.js";
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
                cipherMessage = reverse(message)
            }
            await req.mysqlConn.execute(
                'INSERT INTO messages (username, cypherType, encrypted_text) VALUES (?, ?, ?, ?)',
                [username, cipherType, encrypted_text, cipherMessage]
            );

            await req.mongoDbConn
                .collection('products')
                .updateOne({ _id: product._id }, { $inc: { totalOrdersCount: 1 } });

            res.status(201).json({ message: 'Order created' })}
    } catch (err) {
        return res.status(404).json({ error: 'User not found' })
    }
}

