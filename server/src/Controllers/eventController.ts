import express from 'express';

import { EventModel } from '../Models/events';

export const getAllEvents = async(req: express.Request, res: express.Response) => {

    const events = await EventModel.find();

    if(!events?.length) {
        return res.status(400).json({message: 'No event found'})
    }
    res.json(events);

}

export const createEvent = async(req: express.Request, res: express.Response) => {

   // Get other fields from request body
   const { title, description, rtfContent, eventJoinable, eventEndDate} = req.body;

   const { originalname, buffer, mimetype } = req.file;

   const eventDateCreated = new Date(); // Assuming eventDateCreated is the current date/time
   if (eventDateCreated > new Date(eventEndDate)) {
       return res.status(400).json({ message: 'Event creation date cannot be after the event end date' });
   }
//    await imageProcessing(req, res); // <-- Here's the addition

    let eventJoinableValue;

// Check if eventJoinable is an array
    if (Array.isArray(eventJoinable)) {
    // Extract the value of the first element (index 0) from the eventJoinable array
    [eventJoinableValue] = eventJoinable;
    } else {
    // If eventJoinable is not an array, assign its value directly
    eventJoinableValue = eventJoinable;
    }   

    // Check if event title is a duplicate
    const duplicate = await EventModel.findOne({ title }).lean().exec();
    if (duplicate) {
    // If a duplicate title is found, delete the uploaded file
    // if (req.processedImage) {
    //     fs.unlinkSync(req.processedImage ? `uploads/${req.processedImage}` : null);
    // }
    return res.status(400).json({ message: 'Duplicate title event' });
}




// Create new event in database
const event = new EventModel({
    title,
    description,
    rtfContent,
    eventEndDate,
    eventJoinable: eventJoinableValue,
    thumbnail: {
        name: originalname,
        data: buffer,
        contentType: mimetype
    }
});
await event.save();

if (event) {
    res.status(201).json({ message: 'Event created successfully', event });
} else {
    res.status(400).json({ message: 'Invalid event data received' });
}
    

}



