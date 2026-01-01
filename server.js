import express from 'express';
import { initSqlDb, getMysqlConnection } from './utils/mysql.js';
import { initMongoDb, getMongoDbConnection } from './utils/mongodb.js';
import messagesRouter from './routes/messages.js'
import usersRouter from './routes/users.js'

const app = express();
const PORT = 8000
app.use(express.json());



app.use((req, res, next) => {
  req.mysqlConn = getMysqlConnection();
  req.mongoDbConn = getMongoDbConnection();
  next();
})


app.use('/api/auth',usersRouter)
app.use('/api/messages',messagesRouter)
app.use('/api/users', ()=>{})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    initSqlDb();
    initMongoDb();
});