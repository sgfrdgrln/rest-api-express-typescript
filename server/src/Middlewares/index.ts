import express from 'express';
import { get, merge} from 'lodash';
import { getUserBySessionToken } from '../Models/users';
import { MulterError } from 'multer'; // Import Multer error type
import sharp from 'sharp';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const sessionToken = req.cookies['MY-AUTH'];

        if(!sessionToken) {
            return res.sendStatus(400)
        }
        
        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        return next();


    }catch(err) {
        console.log(err);
        return res.sendStatus(400);
        
    }

}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if(currentUserId.toString() != id) {
            return res.sendStatus(403)
        }

        next();

    }catch(error) {
        console.log(error);
        
        return res.sendStatus(400);
    }

}
export const imageProcessing = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      if (!req.file) {
        return next();
      }
  
      const { buffer, mimetype } = req.file; // Type assertion (optional)
  
      // Apply image processing using Sharp
      const processedImageBuffer = await sharp(buffer)
        .resize({ width: 100 }) // Example: Resize the image to a maximum width of 100 pixels
        .toBuffer();
  
      // Replace the original buffer with the processed one
      req.file.buffer = processedImageBuffer;
  
      next();
    } catch (error) {
      console.error('Error processing image:', error);
  
      // Handle Multer specific errors (optional)
      if (error instanceof MulterError) {
        return res.status(400).json({ message: error.message });
      }
  
      res.status(500).json({ message: 'Error processing image' });
    }
  };
