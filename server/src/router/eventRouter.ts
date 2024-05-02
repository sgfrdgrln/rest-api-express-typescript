import express from "express";

import { Events } from "../Controllers/eventController";
import { imageProcessing } from "../Middlewares";
import upload from "../Middlewares/upload";

export default (router: express.Router) => {

    const events = new Events();

    router.get('/event', events.getAllEvents)
    router.post('/event', upload.single('thumbnail'), imageProcessing, events.createEvent)
  
};