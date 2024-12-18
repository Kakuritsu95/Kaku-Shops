import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";
import { CreateUser, UpdateUser } from "../types/userInterface";

export default {
  getById: (userId: string) =>
    httpActions.get(API_ROUTES.user.getUserById(userId)),
  register: (user: CreateUser) =>
    httpActions.post(API_ROUTES.user.createUser, user),
  update: (userId: string, user: UpdateUser) =>
    httpActions.patch(API_ROUTES.user.updateUser(userId), user),
  delete: (userId: string) =>
    httpActions.delete(API_ROUTES.user.updateUser(userId)),
};
