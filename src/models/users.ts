import {Schema, Document, model} from "mongoose";

export interface IUser extends Document{
    username: string,
    email: string,
    password: string
}

const UserSchema: Schema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
})

export default model<IUser>('User', UserSchema);
// export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// // export const getUserByAccessToken = (accessToken: string) => UserModel.findOne({ accessToken });
// export const getUserById = (id: string) => UserModel.findById(id);
// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject);
// export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
// export const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);


