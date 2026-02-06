// Import express
const express = require('express');
const dotenv = require('dotenv')

const DataBaseConnection = require('./databaseConnection');
const todoRoutes = require('./routers/todoRoute');

const app = express();
app.use(express.json());
dotenv.config();

DataBaseConnection();

// Middleware clearification
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 





app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `App on default page`
    })
});


app.use('/todos', todoRoutes);



// PORT 
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App listen on http://localhost:${PORT}`)
})