import { CreatePostRequest } from "../Models/CreatePostRequest";
import { BaseApi } from "../Base/BaseApi";

export class PostApi extends BaseApi {
  async createPost(requestBody: CreatePostRequest) {
    return await this.post("/posts", requestBody);
  }
}
