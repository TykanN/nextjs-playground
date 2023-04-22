import { ObjectId } from "mongodb";

export default interface CommentModel {
  _id?: ObjectId;
  author?: string | null;
  content: string;
  parent: ObjectId;
}
