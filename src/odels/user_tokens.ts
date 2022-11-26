import { Schema,Document,model } from 'mongoose';

interface IUserToken extends Document{
    email: string;
    token: string
  }

const userSchema : Schema = new Schema({
    email :{
        type: String,
        required : true
    },
    token: {
        type: String,
        required: true
    }
  });

const UserToken = model<IUserToken>('Users_Tokens',userSchema);
export default UserToken;
  


