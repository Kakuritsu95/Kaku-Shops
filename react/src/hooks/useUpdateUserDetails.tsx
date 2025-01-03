import { useMutation } from "@tanstack/react-query";
import userService from "../service/userService";
import { User } from "../types/userInterface";
import { useUserContext } from "../context/UserDetailsContext";
import toast from "react-hot-toast";
export default function useUpdateUserDetails() {
  const { updateFirstName } = useUserContext();
  const { mutate: updateUserDetails } = useMutation({
    mutationFn: (userInformation: Partial<User>) =>
      userService.update(userInformation),
    onSuccess: (userInformation: User) => {
      updateFirstName(userInformation as Partial<User>);
      toast.success("Information updated!");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return { updateUserDetails };
}
