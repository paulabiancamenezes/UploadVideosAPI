import express from 'express';
import router from './routes/fileRoutes.js';

const app = express();
const port = 3000;

app.use('/', router);
app.use('/uploads', express.static('uploads')) //download

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});