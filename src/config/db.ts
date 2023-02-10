import mongoose from 'mongoose'
const CONNECT_DATABASE = process.env.CONNECT_DATABASE;

mongoose.set("strictQuery", false);
export const connect_db = async () => {
  try {
    await mongoose.connect(CONNECT_DATABASE)
    console.log("mongodb connected successfully")
  } catch (error) {
    console.log(error)
  }
}