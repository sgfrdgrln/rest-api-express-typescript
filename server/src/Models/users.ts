import mongoose from "mongoose";


export interface IUser extends mongoose.Document {
    username: string;
    authentication: {
        password: string,
        salt: string,
        sessionToken?: string
    };
  }
  

  const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    authentication: {
       password: {type: String, required: true, select: false},
       salt: {type: String, select: false},
       sessionToken: {type: String, select: false}
    }
   
  });

  export const UserModel = mongoose.model('User', UserSchema);

  export const getUsers = () => UserModel.find();
  export const getUserByUsername = (username: string) => UserModel.findOne({ username });
  export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
  });
  export const getUserById = (id: string) => UserModel.findById(id);
  export const createUser = (values: Record<string, any>) => new UserModel(values)
  .save().then((user) => user.toObject());
  export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
  export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
  
  export default UserSchema