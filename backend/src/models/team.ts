import mongoose, { Schema, Document, Types } from "mongoose";

const PlayerSchema: Schema = new Schema({
    name: { 
        type: String,
        required: true
    },
    image: { 
        type: String
    },
    id: { 
        type: String,
        required: true
    }
});


export interface TeamType extends Document {
    name: string;
    createdBy: Types.ObjectId;
    players: Array<{
        name: string;
        image: string;
        id: string;
    }>;
}


const TeamSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    players: {
        type: [PlayerSchema], 
        default: [], 
    },
});


const Team = mongoose.model<TeamType>("Team", TeamSchema);

export default Team;