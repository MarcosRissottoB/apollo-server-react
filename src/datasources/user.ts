import { RESTDataSource } from '@apollo/datasource-rest';
import argon2 from 'argon2';
import jwt from'jsonwebtoken';
import UserModel from "../models/User";

const SECRET = process.env.SECRET

export class UserAPI extends RESTDataSource {

  async signup ({ name, email, password }) {
    try {
      const already_exsist = await UserModel.findOne({ email });
      if (already_exsist) {
        throw Error("Email already exists");
      }
      const hashed_password = await argon2.hash(password);
      const user = await UserModel.create({
        name,
        email,
        password: hashed_password,
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async login ({ email, password }) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw Error("Invalid email given");
      }
      if (!(await argon2.verify(user.password, password))) {
        throw Error("Invalid password given!");
      }
      const token = jwt.sign(
        { data: { userId: user._id, email } },
        SECRET,
        { expiresIn: "1h" }
      );
      return {
        user,
        token,
      };
    } catch (error) {
      console.log(error);
    }
  }
}