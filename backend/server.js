const express = require('express');
const dotenv = require('dotenv').config();
const goalRoute = require('./routes/goalRoutes');
const userRoute = require('./routes/userRoutes');
const connectionDB = require('./database/db');
const path = require('path');
const { executionAsyncResource } = require('async_hooks');

port = process.env.PORT || 5555;

connectionDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.use('/goals', goalRoute);
app.use('/users', userRoute);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>{
        res.sendFile(
            path.resolve(__dirname, 'frontend', 'build', 'index.html')
        )
        })
} else {
    app.get('/', (req, res) => {
        res.send("Please Set To Production...");
    })
}

app.listen(port, ()=>{
    console.log(`Server is Running on http://localhost:${port}`);
})