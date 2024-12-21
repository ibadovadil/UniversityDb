import express from "express";
import cors from 'cors';
import connection from './config/connection.js';
import universityRoute from "./routes/universityRoute.js";
import facultyRoute from "./routes/facultyRoute.js";
import studentRoute from "./routes/studentRoute.js"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import auth from "./middlewares/Auth.js";
import isAdmin from "./middlewares/isAdmin.js";
import isadmin from "./middlewares/isAdmin.js";
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    res.status(200).send("Server is running");
});

app.use(isadmin)
app.use('/auth', authRoute);
app.use('/university', universityRoute);
app.use('/faculty', facultyRoute);
app.use('/student', studentRoute);
app.use('/user', userRoute);

connection();
app.listen(3001, async () => {
    console.log("Server is running on port 3001");
});





