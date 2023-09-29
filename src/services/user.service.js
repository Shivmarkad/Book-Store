import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//SignUp new user
export const signUp = async (body) => {

  const user = await User.findOne({ email: body.email });
  if (user) { throw new Error("You are already registered !!") }

  const saltRounds = 10;
  const hashPass = bcrypt.hashSync(body.password, saltRounds);
  body.password = hashPass;

  const data = await User.create(body);

  if (data) {
    const { firstName, lastName, email } = data;
    return { firstName, lastName, email };
  } else { throw new Error("Unable to register !!") }
};

//SignUp new user
export const signIn = async (body) => {

  const user = await User.findOne({ email: body.email });
  if (!user) { throw new Error("User Not Found !!") }

  const hashedPassword = user.password;
  const isTrue = bcrypt.compareSync(body.password, hashedPassword);
  if (isTrue) {
    var token = jwt.sign({ email: user.email, id: user.id }, process.env.SECRET_KEY);
    return token;
  } else {
    throw new Error("Password Incorrect");
  }
};


//reset password
export const resetPassword = async (password, id) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  password = hash;
  const update = { password: password }
  const data = await User.findByIdAndUpdate({ _id: id }, update, {
    new: true
  });
  if (data) {
    return data.email;
  } else {
    throw new Error("Unable to reset Password");
  }
};


//forgot password
export const forgotPassword = async (email) => {
  
  const data = await User.find({email: email  });
  if (data) {
    var token = jwt.sign({ email: data.email, id: data.id }, process.env.SECRET_KEY);
    return token;
  } else {
    throw new Error("Unable to change Password");
  };
};