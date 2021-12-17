import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { auth } from "./firebase";

type Props = {
  id: string;
  dbtitle: string;
};

const Login: VFC<any> = (props) => {
  const { id, dbtitle } = props;
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  useEffect(() => {
    // authは標準でuserを取得できるここには失敗した時null判定で分岐可能
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/");
    });
    return () => {
      unSub();
    };
  }, [props.history]);

  return (
    <SBox>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name={"email"}
          label={"E-mail"}
          value={email}
          onChange={onChangeEmail}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name={"password"}
          label={"password"}
          type={"password"}
          value={password}
          onChange={onChangePassword}
        />
      </FormControl>
      <br />
      <Button
        variant={"contained"}
        color={"primary"}
        size={"small"}
        onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error: any) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error: any) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? "Login" : "Register"}
      </Button>
      <br />
      <Typography align="center">
        <SSpan onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create new account ?" : "Back to login"}
        </SSpan>
      </Typography>
    </SBox>
  );
};

export default memo(Login);

const SBox = styled(Box)`
  font-family: serif;
  color: dimgray;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
`;

const SSpan = styled.span`
  cursor: pointer;
`;
