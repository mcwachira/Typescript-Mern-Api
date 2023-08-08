import UserModel, { UserDocument, UserInput } from "../models/user.model";
export  const createUser = async(input:UserInput) => {

    try{
       return   await UserModel.create(input);

    }catch(e:any){
        throw  new Error(e)
    }
}