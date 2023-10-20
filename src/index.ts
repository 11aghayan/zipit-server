import 'dotenv/config';
import express from 'express';

// Route imports
import { categoryRouter } from './routes';

const app = express();
const BASE_URL = '/api/v1';

// Middleware
app.use(express.json({ limit: '10mb' }));

// Routes
app.use(`${BASE_URL}/categories`, categoryRouter);

// PORT and server function
const PORT = process.env.PORT || 3200;
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Try to connect to DB then start server
try {
  // TODO: Connect to DB
  startServer();
} catch (error) {
  console.log(error);
}