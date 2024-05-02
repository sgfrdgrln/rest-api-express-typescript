import express from "express";

import { Auth } from "../Controllers/authController";

export default (router: express.Router) => {

    const auth = new Auth();

    router.post('/auth/register', auth.register)
    router.post('/auth/login', auth.login)
};