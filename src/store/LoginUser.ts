import { atom } from "recoil";
import { User } from "../types/User";

export const LoginUser = atom<User>({
  key: "LoginUser",
  default: {
    uid: "",
    photoUrl: "",
    displayName: "",
  },
});
