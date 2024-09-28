import express from 'express';

require('dotenv').config();
const app = express()
import './db/dbConnections'
import userRoute from "./route/userRoute";

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", userRoute)


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})



