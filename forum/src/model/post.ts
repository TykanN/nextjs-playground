import { ObjectId } from "mongodb";

export default interface Post extends Document {
  author?: string | null;
  title: string;
  content: string;
  _id?: ObjectId;
}
