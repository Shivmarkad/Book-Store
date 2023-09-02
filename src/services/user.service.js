import User from '../models/user.model';
import bcrypt from 'bcrypt';

//SignUp new user
export const signUp = async (body) => {
  const user = await User.findOne({ email: body.email });

  if (user) {
    throw new Error("You are already registered !!")
  }

  const saltRounds = 10;
  const hash = bcrypt.hashSync(body.password, saltRounds);
  body.password = hash;

  const data = await User.create(body);

  const {firstName, lastName, email} = data;

  return {firstName, lastName, email};
};
