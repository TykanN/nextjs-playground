import { ObjectId } from "mongodb";

export default class Post {
  constructor(
    public title: string,
    public content: string,
    public _id?: ObjectId
  ) {}
}
