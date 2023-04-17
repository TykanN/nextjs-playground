import { ObjectId } from "mongodb";

export default interface Post extends Document {
  title: string;
  content: string;
  _id?: ObjectId;
}
