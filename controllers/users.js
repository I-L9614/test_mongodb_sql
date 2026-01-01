import { ObjectId } from "bson";

export async function createUser(req, res) {
  try {
         const result = await req.mongoDbConn
      .collection('users')
      .insertOne({
        ...req.body,
        encryptedMessagesCount : 0,
        createdAt: new Date(),
        
      });

    res.status(201).json({ id: result.insertedId.toString(),username: req.body.username});
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'User with this name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
}