import express from 'express';
import { initSqlDb, getMysqlConnection } from './utils/mysql.js';
import { initMongoDb, getMongoDbConnection } from './utils/mongodb.js';


const app = express();
const PORT = 8000
app.use(express.json());

await initSqlDb();
await initMongoDb();

app.use((req, res, next) => {
  req.mysqlConn = getMysqlConnection();
  req.mongoDbConn = getMongoDbConnection();
  next();
})


app.use('/api/auth')
app.use('/api/messages')
app.use('/api/users')



app.listen(PORT, () => console.log(`Server running on port ${PORT }`));