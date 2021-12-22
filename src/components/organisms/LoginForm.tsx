import { ChangeEvent, memo, useState, VFC } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";

import { PrimaryButton, FormTitle, FormInput } from "../atoms";
import { auth } from "../../api/firebase";

type Props = {};
const LoginForm: VFC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const signInEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  const onClickLogin = async () => {
    try {
      await signInEmail();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <FormTitle>Login</FormTitle>
      <FormInput
        label={"Email address"}
        InputType={"email"}
        value={email}
        onChange={onChangeEmail}
      />
      <FormInput
        label={"Password"}
        InputType={"password"}
        value={password}
        onChange={onChangePassword}
      />
      <PrimaryButton
        icon={<AiOutlineMail />}
        disabled={!email || password.length < 6}
        onClick={onClickLogin}
      >
        Login
      </PrimaryButton>
    </>
  );
};

export default memo(LoginForm);
