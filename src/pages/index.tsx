import { VFC, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Box } from "@chakra-ui/react";

import { auth } from "../api/firebase";
import { LoginUser } from "../store/LoginUser";
import { initUser } from "../types/User";
import Feed from "../components/Feed";
import Auth from "../components/Auth";


const App: VFC = () => {
  const [loginUser, setLoginUser] = useRecoilState(LoginUser);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setLoginUser({
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName,
        });
      } else {
        setLoginUser(initUser);
      }
    });
    return () => {
      unSub();
    };
  }, [setLoginUser]);

  return (
    <>
      {loginUser.uid ? (
        <Box display={"flex"} height={"100vh"} padding={"30px 80px"} backgroundColor={"#444447"}>
          <Feed />
        </Box>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
