import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

import authService from "../service/authService";
import { User } from "../types/userInterface";
import { useNavigate } from "react-router";

interface ContextValues extends Partial<User> {
  initializeUser: (user: Partial<User>) => void;
  updateFirstName: (firstName: Partial<User>) => void;
  logout: () => void;
}
interface ReducerAction {
  type: ReducerActionType;
  payload?: Partial<User>;
}
enum ReducerActionType {
  INITIALIZE = "INITIALIZE",
  UPDATE_FIRSTNAME = "UPDATE_FIRSTNAME",
  LOGOUT = "LOGOUT",
}
const intialContextValues: ContextValues = {
  userId: undefined,
  email: undefined,
  firstName: undefined,
  roles: [],
  updateFirstName: () => {},
  initializeUser: () => {},
  logout: () => {},
};
const UserPrincipalContext = createContext<ContextValues>(intialContextValues);
function userDetailsReducer(state: Partial<User>, action: ReducerAction) {
  const { type, payload } = action;
  switch (type) {
    case ReducerActionType.INITIALIZE:
      return payload ?? intialContextValues;
    case ReducerActionType.LOGOUT:
      return intialContextValues;
    case ReducerActionType.UPDATE_FIRSTNAME:
      return { ...state, firstName: payload?.firstName };
    default:
      return state;
  }
}
export function UserDetailsContext({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [{ userId, email, firstName, roles }, dispatch] = useReducer(
    userDetailsReducer,
    intialContextValues,
  );
  const initializeUser = useCallback((user: Partial<User>) => {
    dispatch({ type: ReducerActionType.INITIALIZE, payload: user });
  }, []);
  const updateFirstName = useCallback((firstName: Partial<User>) => {
    dispatch({ type: ReducerActionType.UPDATE_FIRSTNAME, payload: firstName });
  }, []);
  const logout = useCallback(() => {
    dispatch({ type: ReducerActionType.LOGOUT });
    authService.logout();
    navigate("/");
  }, []);
  return (
    <UserPrincipalContext.Provider
      value={{
        userId,
        email,
        firstName,
        roles,
        initializeUser,
        logout,
        updateFirstName,
      }}
    >
      {children}
    </UserPrincipalContext.Provider>
  );
}

export function useUserContext() {
  const userDetails = useContext(UserPrincipalContext);
  if (!userDetails)
    throw new Error("Cannot access principals outside it's provider");
  return userDetails;
}
