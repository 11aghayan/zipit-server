
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

// Cors middleware import
import cors from './middleware/cors';

// Not Found controller import
import notFoundController from './controllers/notFoundController';

// Credentials Middleware import
import credentials from './middleware/credentials';

// Route imports
import { categoryRouter, itemsRouter, authRouter } from './routes';

const app = express();
const BASE_URL = '/api/v1';

// Middleware
app.use(express.json({ limit: '30mb' }));
app.use(cookieParser());
app.use(credentials);
app.use(cors);

// Routes
app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/categories`, categoryRouter);
app.use(`${BASE_URL}/items`, itemsRouter);
app.use(notFoundController);

// PORT and server function
const PORT = process.env.PORT || 3200;
function startServer () {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    startServer();
  }
}

startServer();