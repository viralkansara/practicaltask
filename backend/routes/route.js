import userRouter from './user.js';
import express from 'express';
const app = express();

//define user routed
app.use('/user', userRouter);

export default app;