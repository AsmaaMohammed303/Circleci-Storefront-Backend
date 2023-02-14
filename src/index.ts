import express from 'express';
import { Client } from 'pg';
import db from '../database/index';
import config from '../middleware/config';
import routes from '../routes';

//application ==> عشان احنا بنستخدم ال typescript
//وممكن ما نستخدمهوش
//, { application }

//create instance of server
console.log(config);

const app = express();
const port = config.port || 3000;

/*
const _db = new Client({
  ssl: false,
  host: 'localhost',
  port: 5432,
  database: 'store_dev',
  user: 'postgres',
  password: 'the#1s',
});*/

//create instance
app.use(express.json()); //عشان اخليه يقدر يقري بارمترات الجاسون من البوست مان
app.use('/api', routes);

//test database
db.connect().then((client) => {
  return client
    .query('select NOW()')
    .then((res) => {
      client.release();
      console.log(res.rows[0].now);
    })
    .catch((err) => {
      // Make sure to release the client before any error handling,
      // just in case the error handling itself throws an error.
      client.release();
      console.log(err.stack);
    });
});

//start express server
//ممكن نقوله ابعتلي callback فانكشن بيحصلها لما السيرفر يشتغل
app.listen(port, () => {
  console.log(`server is run at port ${port}`);
});

export default app;
