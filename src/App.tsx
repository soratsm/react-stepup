import { VFC, useEffect } from "react";
import { useRecoilState } from "recoil";

import { auth } from "./firebase";
import styles from "./App.module.css";
import { LoginUser } from "./store/LoginUser";
import { initUser } from "./types/User";
import Feed from "./components/Feed";
import Auth from "./components/Auth";

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
      unSub()
    };
  }, [setLoginUser]);

  return (
    <>
      {loginUser.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
