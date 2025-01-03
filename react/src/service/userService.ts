import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";
import { CreateUser, UpdatePassword, User } from "../types/userInterface";

export default {
  getAuthenticatedUserDetails: () =>
    httpActions.get(API_ROUTES.user.getAuthenticatedUserDetails),
  getById: (userId: string) =>
    httpActions.get(API_ROUTES.user.getUserById(userId)),
  register: (user: CreateUser) =>
    httpActions.post(API_ROUTES.user.createUser, user),
  update: (userDetails: Partial<User>) =>
    httpActions.patch(API_ROUTES.user.updateUser, userDetails),
  changeAuthenticatedUserPassword: (updatePasswordRequest: UpdatePassword) =>
    httpActions.patch(API_ROUTES.user.changePassword, updatePasswordRequest),
  delete: (userId: string) =>
    httpActions.delete(API_ROUTES.user.deleteUser(userId)),
};
