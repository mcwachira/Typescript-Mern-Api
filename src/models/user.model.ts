import mongoose  from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'



const userSchema = new mongoose.Schema({
        email: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            require: true,

        },

        password:{
            type:String,
            require:true,

        }
    },
    {
        timestamps:true
    }
)
export interface UserInput  {
    email:string;
    name:string;
    password:string;
}


export interface UserDocument extends UserInput,  mongoose.Document{
    createdAt:Date;
    updatedAt:Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;

}



const saltWorkFactor = config.get<number>('saltWorkFactor')



userSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }


    const salt = await bcrypt.genSalt(saltWorkFactor);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash

    return next()
});


// Used for logging in
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};


const User = mongoose.model<UserDocument>("User", userSchema);

export default User