// Import express
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 

const DataBaseConnection = require('./databaseConnection');
const todoRoutes = require('./routers/todoRoute');

const app = express();
app.use(express.json());

// Connect DB
DataBaseConnection();

const allowedOrigin = process.env.FRONTEND_URL || "*"; // allowed all url before FRONTEND_URL enviroment setup
app.use(cors({
  origin: allowedOrigin, 
  credentials: true
}));

// Request logger
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Health check (VERY IMPORTANT for deployment)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'UP',
    environment:  'development'
  });
});

// Default route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'App on default page'
  });
});

app.use('/api/todos', todoRoutes);
 
// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
