import argon2 from 'argon2';
import jwt from'jsonwebtoken';
import model from "../models/User";

const User = model
const SECRET = process.env.SECRET

export const UserResolvers = {
  Query: {
    hello: () => "hello world",
  },
  Mutation: {
    createUser: async (_, {name, email}) => {
      const user = await User.create({
        name, email
      })
      return user
    },
    signup: async (_, { name, email, password }) => {
      try {
        const already_exsist = await User.findOne({ email });
        if (already_exsist) {
          throw Error("Email already exists");
        }
        const hashed_password = await argon2.hash(password);
        const user = await User.create({
          name,
          email,
          password: hashed_password,
        });
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
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
    },
  },
};