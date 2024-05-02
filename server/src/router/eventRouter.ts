import express from "express";

import { getAllEvents, createEvent } from "../Controllers/eventController";
import { imageProcessing } from "../Middlewares";
import upload from "../Middlewares/upload";

export default (router: express.Router) => {
    router.get('/event', getAllEvents)
    router.post('/event', upload.single('thumbnail'), imageProcessing, createEvent)
  
};