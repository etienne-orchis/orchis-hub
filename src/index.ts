import express from 'express';
import router from './routes/routes';
import dotenv from 'dotenv';
import cors from 'cors';
        
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
        
app.use('/api', router);
        
app.listen(port, () => console.log('Server is running on http://localhost:' + port + '/'));
        