import httpActions from "./httpActions";
import API_ROUTES from "../api-routes/apiRoutes";
import { LoginCredentials } from "../types/userInterface";
export default {
  login: (credentials: LoginCredentials) =>
    httpActions.post(API_ROUTES.auth.login, credentials),
};
