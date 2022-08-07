import express from 'express';
import { PORT, DB_URL } from './constants/index.js';
import router from './router/index.js';
import cors from 'cors';
import mongoose from 'mongoose';
import { authMiddleware } from './middleware/index.js';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use(router);
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
