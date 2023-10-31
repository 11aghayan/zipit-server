
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

// Cors middleware import
// import cors from './middleware/cors';
import cors from 'cors';

// Not Found controller import
import notFoundController from './controllers/notFoundController';

// Credentials Middleware import
import credentials from './middleware/credentials';

// Route imports
import { categoryRouter, itemsRouter, authRouter } from './routes';

const app = express();
const BASE_URL = '/api/v1';

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(credentials);
app.use(cors());


app.options(BASE_URL, (req, res) => {
  res.sendStatus(200);
});

// Routes
app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/categories`, categoryRouter);
app.use(`${BASE_URL}/items`, itemsRouter);
app.use(notFoundController);

// PORT and server function
const PORT = process.env.PORT || 3200;
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

try {
  startServer();
} catch (error) {
  console.log(error);
}