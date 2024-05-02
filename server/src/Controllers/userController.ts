import express from 'express';

import { getUsers, deleteUserById, getUserById } from '../Models/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
        
    }
}
export const deleteUsers = async (req: express.Request, res: express.Response) => {

    try {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({message: 'User ID required'})
        }

        const user = await deleteUserById(id);

        if(!user) {
            return res.status(400).json({message: 'No user found'})
        }else {
            return res.status(200).json({message: `User ${user.username} has been deleted`});
        }
        


    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

}

export const updateUser = async (req: express.Request, res: express.Response) => {

    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({message: 'All fields required'})
        }

        const user = await getUserById(id)

        if(!user) {
            return res.status(400).json({message: 'No user found'})
        }else {

            user.username = username;
            await user.save();

            return res.status(200).json({message: `User ${user.username} has been updated`})
        }

    }catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }

}
