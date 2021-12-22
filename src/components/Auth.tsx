import { ChangeEvent, MouseEvent, useState, VFC } from "react";
import { useRecoilState } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Typography,
  Link,
  Grid,
  CssBaseline,
  Paper,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SendIcon from "@mui/icons-material/Send";
import CameraIcon from "@mui/icons-material/Camera";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import styles from "./Auth.module.css";
import { auth, provider, storage } from "../firebase";
import { LoginUser } from "../store/LoginUser";

const theme = createTheme();

// modalを画面の真ん中に表示
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Auth: VFC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loginUser, setLoginUser] = useRecoilState(LoginUser);
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onClickIsLoginChange = () => setIsLogin(!isLogin);
  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };
  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    let url = "";
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKSMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;
      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    }
    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    });
    setLoginUser({
      uid: authUser.user?.uid!,
      photoUrl: url,
      displayName: username,
    });
  };
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  const sendResetEmail = async (e: MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1639562954926-131acb2c091e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? "Login" : "Register"}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {!isLogin && (
                <>
                  <TextField
                    variant={"outlined"}
                    margin={"normal"}
                    required
                    fullWidth
                    id={"username"}
                    label={"Username"}
                    name={"username"}
                    autoComplete={"username"}
                    autoFocus
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <Box textAlign="center">
                    <IconButton>
                      <label>
                        <AccountCircleIcon
                          fontSize="large"
                          className={
                            avatarImage
                              ? styles.login_addIconLoaded
                              : styles.login_addIcon
                          }
                        />
                        <input
                          className={styles.login_hiddenIcon}
                          type="file"
                          onChange={onChangeImageHandler}
                        />
                      </label>
                    </IconButton>
                  </Box>
                </>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={onChangeEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChangePassword}
              />
              <Button
                disabled={
                  isLogin
                    ? !email || password.length < 6
                    : !username || !email || password.length < 6 || !avatarImage
                }
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<EmailIcon />}
                onClick={
                  isLogin
                    ? async () => {
                        try {
                          await signInEmail();
                        } catch (err: any) {
                          alert(err.message);
                        }
                      }
                    : async () => {
                        try {
                          await signUpEmail();
                        } catch (err: any) {
                          alert(err.message);
                        }
                      }
                }
              >
                {isLogin ? "Login" : "Register"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <span
                    className={styles.login_reset}
                    onClick={() => setOpenModal(true)}
                  >
                    Forgot password
                  </span>
                </Grid>
                <Grid item>
                  <span
                    className={styles.login_toggleMode}
                    onClick={onClickIsLoginChange}
                  >
                    {isLogin ? "Create new account ?" : "Back to login"}
                  </span>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<CameraIcon/>}
                onClick={signInGoogle}
              >
                SignIn with Google
              </Button>
            </Box>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <div style={getModalStyle()} className={styles.modal}>
                <div className={styles.login_modal}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="email"
                    name="email"
                    label="Reset E-mail"
                    value={resetEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setResetEmail(e.target.value);
                    }}
                  />
                  <IconButton onClick={sendResetEmail}>
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
            </Modal>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Auth;
