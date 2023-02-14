import express from 'express';
import config from './config';

console.log(config);

//application ==> عشان احنا بنستخدم ال typescript
//وممكن ما نستخدمهوش
//, { application }

//create instance of server
const app = express();
const port = config.port || 3000;
app.use(express.json());
//start express server
//ممكن نقوله ابعتلي callback فانكشن بيحصلها لما السيرفر يشتغل
app.listen(port, () => {
  console.log(`server is run at port ${port}`);
});

export default app;
