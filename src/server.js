import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();
router.use(categoriesRoutes);

app.use(router);

app.listen(process.env.PORT, () => console.log(`App running in port: 4000`));