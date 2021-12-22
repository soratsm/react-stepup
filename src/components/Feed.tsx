import { Button } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { auth } from "../api/firebase";
import { LoginUser } from "./../store/LoginUser";

const Feed = () => {
  const loginUser = useRecoilValue(LoginUser);
  console.log(loginUser);

    const onClickLogout = () => {
      auth.signOut();
      console.log(loginUser);
    };
  
  return (
    <div>
      Feed
      <Button onClick={onClickLogout}>Logout</Button>
    </div>
  );
};

export default Feed;
