import mongoose, {Schema} from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    // this.password = await bcrypt.hash(this.password, 10)
    // next()

    try {
        // Hash the password before saving it to the database
        this.password = await bcryptjs.hash(this.password, 10); // Use bcryptjs.hash()
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcryptjs.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User', userSchema)