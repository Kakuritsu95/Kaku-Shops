import { useQuery } from "@tanstack/react-query";
import userService from "../service/userService";
import { User } from "../types/userInterface";

export default function useUserDetails() {
  const { data: userDetails, isLoading } = useQuery<Partial<User>>({
    queryKey: ["userDetails"],
    queryFn: () => userService.getAuthenticatedUserDetails(),
  });
  return { userDetails, isLoading };
}
