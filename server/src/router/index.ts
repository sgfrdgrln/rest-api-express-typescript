import express from 'express';

import authRouter from './authRouter';
import userRouter from './userRouter';
import eventRouter from './eventRouter';

const router = express.Router();

export default (): express.Router => {
    authRouter(router);
    userRouter(router);
    eventRouter(router);

    return router;
}