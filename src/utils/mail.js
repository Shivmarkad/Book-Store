import dotenv from 'dotenv';
dotenv.config();
import logger from '../config/logger';
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });

      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            logger.info("ERROR: ", err)
            reject();
          }
          resolve(token); 
        });
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.USER_EMAIL,
          accessToken,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
         
        }, tls: {
          rejectUnauthorized: false
        }
      });
      return transporter;
  } catch (err) {
    return err
  }
};

export const sendMail = async (email,token) => {
  try {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Reset Your password",
      text: `http://localhost:${process.env.APP_PORT}/users/reset/${token}`,
    }

    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(mailOptions);
  } catch (err) {
    logger.info("ERROR: ", err)
  }
};