import User from '../models/user.model';

//SignUp new user
export const signUp = async (body) => {
  const user = await User.findOne({email: body.email});

  if(user){
    throw new Error("You are already registered !!")
  }
  
  const data = await User.create(body);
  return data;
};
