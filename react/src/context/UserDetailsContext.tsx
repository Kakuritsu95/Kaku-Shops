import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { PartialUser } from "../types/userInterface";

interface ContextValues extends PartialUser {
  initializeUser: (user: PartialUser) => void;
  logout: () => void;
}
interface ReducerAction {
  type: ReducerActionType;
  payload?: PartialUser;
}
enum ReducerActionType {
  INITIALIZE = "INITIALIZE",
  LOGOUT = "LOGOUT",
}
const intialContextValues: ContextValues = {
  userId: undefined,
  email: undefined,
  roles: [],
  initializeUser: () => {},
  logout: () => {},
};
const UserPrincipalContext = createContext<ContextValues>(intialContextValues);
function userDetailsReducer(state: PartialUser, action: ReducerAction) {
  const { type, payload } = action;
  switch (type) {
    case ReducerActionType.INITIALIZE:
      return payload ?? intialContextValues;
    case ReducerActionType.LOGOUT:
      return intialContextValues;
    default:
      return state;
  }
}
export function UserDetailsContext({ children }: { children: ReactNode }) {
  const [{ userId, email, roles }, dispatch] = useReducer(
    userDetailsReducer,
    intialContextValues,
  );
  const initializeUser = useCallback((user: PartialUser) => {
    dispatch({ type: ReducerActionType.INITIALIZE, payload: user });
  }, []);
  const logout = useCallback(() => {
    dispatch({ type: ReducerActionType.LOGOUT });
  }, []);
  return (
    <UserPrincipalContext.Provider
      value={{ userId, email, roles, initializeUser, logout }}
    >
      {children}
    </UserPrincipalContext.Provider>
  );
}

export function useUserDetails() {
  const userDetails = useContext(UserPrincipalContext);
  if (!userDetails)
    throw new Error("Cannot access principals outside it's provider");
  return userDetails;
}
