import { useState, useCallback } from "react";
import {
  Flex,
  Stack,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import {
  signInWithPopup,
} from "firebase/auth";
import { LockIcon } from "@chakra-ui/icons";
import { AiFillChrome } from "react-icons/ai";

import { auth, provider } from "../api/firebase";
import { LoginImage, PrimaryButton } from "./atoms";
import { LoginForm, RegisterForm, ResetEmailModal } from "./organisms";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickIsLoginChange = () => setIsLogin(!isLogin)
  const signInGoogle = useCallback( async () => {
    await signInWithPopup(auth, provider).catch((err: any) =>
      alert(err.message)
    );
  },[]);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Box textAlign={"center"}>
            <LockIcon w={8} h={8} color="red.500" />
          </Box>
            {isLogin ? <LoginForm/> : <RegisterForm/>}
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Text cursor={"pointer"} color={"blue.500"} onClick={onOpen}>
                Forgot password?
              </Text>
              <Text
                cursor={"pointer"}
                color={"blue.500"}
                onClick={onClickIsLoginChange}
              >
                {isLogin ? "Create new account ?" : "Back to login"}
              </Text>
            </Stack>
            <PrimaryButton icon={<AiFillChrome />} onClick={signInGoogle}>
              SignIn with Google
            </PrimaryButton>
          </Stack>
        </Stack>
        <ResetEmailModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Flex flex={1}>
        <LoginImage />
      </Flex>
    </Stack>
  );
};

export default Auth;
