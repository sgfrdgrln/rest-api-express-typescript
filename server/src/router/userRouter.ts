import express from "express";

import { getAllUsers, deleteUsers, updateUser } from "../Controllers/userController";
import { isOwner, isAuthenticated } from "../Middlewares";

export default (router: express.Router) => {
    router.get('/users', getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUsers)
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
};