import User from '../models/user.model';
import bcrypt from 'bcrypt';

//SignUp new user
export const signUp = async (body) => {

  const user = await User.findOne({ email: body.email });
  if (user) { throw new Error("You are already registered !!") }

  const saltRounds = 10;
  const hashPass = bcrypt.hashSync(body.password, saltRounds);
  body.password = hashPass;

  const data = await User.create(body);
  
  if(data){
    const {firstName, lastName, email} = data;
    return {firstName, lastName, email};
  }else{ throw new Error("Unable to register !!") }
};
