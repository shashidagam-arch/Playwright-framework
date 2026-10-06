import { ApiClient } from "../Utils/ApiClient";
import { LoginRequest } from "../Models/LoginRequest";

export class LoginApi {
  async login(requestBody: LoginRequest) {
    const api = await ApiClient.getContext();
    const response = await api.post("/posts", {
      data: requestBody,
    });
    return response;
  }
}
