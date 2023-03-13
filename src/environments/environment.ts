import * as dotenv from "dotenv";
dotenv.config();

export const environment = {
  production: true,
  firebaseUrl: process.env["FIREBASE_URL"],
  firebaseApiKey: process.env["FIREBASE_API_KEY"],
};
