import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    lowercase: false,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  github: {
    name: {
      type: String,
      required: false,
      lowercase: false,
    },
    githubLogin: {
      type: String,
      required: false,
      lowercase: false,
    },
    githubToken: {
      type: String,
      required: false,
      lowercase: false,
    },
    avatar: {
      type: String,
      required: false,
      lowercase: false,
    },
  }
});

const model = mongoose.model("users", UserSchema);

export const schema = model.schema;
export default model;