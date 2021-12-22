import { ChangeEvent, memo, useState, VFC } from "react";
import { useSetRecoilState } from "recoil";
import { AiOutlineMail } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { auth, storage } from "../../api/firebase";
import { LoginUser } from "../../store/LoginUser";
import { FormInput, FormTitle, PrimaryButton, IconFileButton } from "../atoms";

type Props = {};
const RegisterForm: VFC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const setLoginUser = useSetRecoilState(LoginUser);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };
  const signUpEmail = async () => {
    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let url = "";
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKSMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;
      await uploadBytes(ref(storage, `avatars/${fileName}`), avatarImage);
      url = await getDownloadURL(ref(storage, `avatars/${fileName}`));
    }
    if (authUser.user) {
      await updateProfile(authUser.user, {
        displayName: username,
        photoURL: url,
      });
    }
    setLoginUser({
      uid: authUser.user?.uid!,
      photoUrl: url,
      displayName: username,
    });
  };

  const onClickRegister = async () => {
    try {
      await signUpEmail();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <FormTitle>Register</FormTitle>
      <FormInput
        label={"Username"}
        InputType={"text"}
        value={username}
        onChange={onChangeUsername}
      />
      <IconFileButton file={avatarImage} onChange={onChangeImageHandler} />
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
        disabled={!username || !email || password.length < 6 || !avatarImage}
        onClick={onClickRegister}
      >
        Register
      </PrimaryButton>
    </>
  );
};

export default memo(RegisterForm);
