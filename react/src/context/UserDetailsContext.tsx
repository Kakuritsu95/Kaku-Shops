import { createContext, ReactNode, useContext, useReducer } from "react";
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
  role: undefined,
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
  const [{ userId, email, role }, dispatch] = useReducer(
    userDetailsReducer,
    intialContextValues,
  );
  function initializeUser(user: PartialUser) {
    dispatch({ type: ReducerActionType.INITIALIZE, payload: user });
  }
  function logout() {
    dispatch({ type: ReducerActionType.LOGOUT });
  }
  return (
    <UserPrincipalContext.Provider
      value={{ userId, email, role, initializeUser, logout }}
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
