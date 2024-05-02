import mongoose from "mongoose";


export interface IEvent extends mongoose.Document {
    title: string;
    description: string;
    rtfContent: mongoose.Schema.Types.Mixed;
    thumbnail: {
        name: string;
        data: Buffer;
        contentType: string;
    }
    eventDateCreated: Date;
    eventEndDate: Date;
    eventJoinable?: boolean; 
    
  }

  const EventSchema = new mongoose.Schema<IEvent>({
    title: { type: String, required: true, unique: true },
    
    description: {
        type: String,
        required: true
    },
    rtfContent: {
        type: mongoose.Schema.Types.Mixed, // Store as JSON or text
        required: true
    },
    thumbnail: {
        name: String,
        data: Buffer,
        contentType: String,
    },
    eventDateCreated: {
        type: Date,
        default: Date.now // Automatically set to the current date/time
    },
    eventEndDate: {
        type: Date,
        required: true
    },
    eventJoinable: {
        type: Boolean,
        required: false
    }

   
  });

  export const EventModel = mongoose.model('Event', EventSchema);

  
  export default EventSchema