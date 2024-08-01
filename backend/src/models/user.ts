import mongoose,  {Schema, Document, Types} from "mongoose"

export interface UserType extends Document { 
    name: string,
    age: number,
    teams: Types.ObjectId[]; // Array de ObjectIDs que referencian a los equipos

}

const TeamSchema: Schema = new Schema ({ 
    name: { 
        type: String,
        required: true,
    },
    age: { 
        type: Number,
        required: true
    }
})

const User = mongoose.model<UserType>("User", TeamSchema)

export default User