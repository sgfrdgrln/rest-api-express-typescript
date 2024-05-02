import express from "express";

import { Users } from "../Controllers/userController";
import { isOwner, isAuthenticated } from "../Middlewares";

export default (router: express.Router) => {

    const users = new Users();

    router.get('/users', users.getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwner, users.deleteUsers)
    router.patch('/users/:id', isAuthenticated, isOwner, users.updateUser)
};