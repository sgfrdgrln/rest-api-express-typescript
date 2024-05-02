import express from "express";
import { getUserByUsername, createUser } from "../Models/users";
import { authentication, random } from "../Helpers/helper";

export class Auth {

  async login(req: express.Request, res: express.Response) {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'All fields required' });
      }
  
      const user = await getUserByUsername(username).select('+authentication.salt +authentication.password');
  
      if (!user) {
        return res.status(400).json({ message: 'No user found' });
      }
  
      const expectedHash = authentication(user.authentication.salt, password);
  
      if (user.authentication.password !== expectedHash) {
        return res.sendStatus(403); // Send unauthorized response
      }
  
      const salt = random();
      user.authentication.sessionToken = authentication(salt, user._id.toString());
      await user.save();
  
      res.cookie('MY-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});
      return res.status(200).json(user); // Send successful login response only once
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' }); // Generic error response
    }
  };

  async register(req: express.Request, res: express.Response) {

    try {
        const { username, password } = req.body;

        if(!username || !password) {

            return res.status(400).json({message: 'All fields required'})

        }

    const existingUser = await getUserByUsername(username);

    if(existingUser) {
        return res.status(400).json({message: 'Duplicate username'})
    }

    const salt = random();
    const user = await createUser({
        username,
        authentication: {
            salt,
            password: authentication(salt, password)
        }
    });

    if(user) {
        return res.status(200).json({message: `User ${user.username} has been created`})
    }else {
        return res.sendStatus(400);
    }

    }catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }

}
  
}





