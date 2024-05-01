import mongoose from "mongoose";
const Schema = mongoose.Schema;


const NotificationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    
    message: {
        type: String,
        required: true,
    },
    
    status: {
        type: Boolean,
        default: false,
    },
    
}, {
    timestamps: true,   

});

let Model = mongoose.model("Notification", NotificationSchema);
export default Model;
