import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";
import { LoginCredentials } from "../types/userInterface";
export default {
  login: (credentials: LoginCredentials) =>
    httpActions.post(API_ROUTES.auth.login, credentials),
  logout: () => httpActions.post(API_ROUTES.auth.logout),
  authenticateUser: () => httpActions.post(API_ROUTES.auth.authenticateUser),
  activateUser: (verificationToken: string) =>
    httpActions.put(API_ROUTES.auth.activateUser(verificationToken), {}),
};
