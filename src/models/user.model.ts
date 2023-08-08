import mongoose  from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends mongoose.Document{
    email:string;
    name:string;
    password:string;
    createdAT:Date;
    updatedAt:Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;

}



const saltWorkFactor = config.get<number>('saltWorkFactor')
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


userSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    if (!user.isModified('password')) {
        return next();
    }


    const salt = await bcrypt.genSalt(saltWorkFactor);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash

    return next()
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};


const User = mongoose.model("User", userSchema);

export default User