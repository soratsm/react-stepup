import React, { ChangeEvent, FormEvent, memo, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import firebase from "firebase/app";

import { storage, db, auth } from "../firebase";
import styles from "./TweetInput.module.css";
import { LoginUser } from "../store/LoginUser";
import { Avatar, Button, IconButton } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";

const TweetInput: VFC = () => {
  const loginUser = useRecoilValue(LoginUser);
  const [tweetImage, setTweetImage] = useState<File | null>(null);
  const [tweetMsg, setTweetMsg] = useState("");

  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setTweetImage(e.target.files![0]);
      e.target.value = "";
    }
  };
  const sendTweet = (e: FormEvent<HTMLFormElement>) => {
    // submit時に自動でブラウザがリフレッシュされるのを防ぐ
    e.preventDefault();
    if (tweetImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKSMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + tweetImage.name;
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(tweetImage);
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // progress
        () => {},
        // error
        (err) => {
          alert(err);
        },
        // 後処理
        async () => {
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("posts").add({
                avatar: loginUser.photoUrl,
                image: url,
                text: tweetMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: loginUser.displayName,
              });
            });
        }
      );
    } else {
      db.collection("posts").add({
        avatar: loginUser.photoUrl,
        image: "",
        text: tweetMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: loginUser.displayName,
      });
    }
    setTweetImage(null);
    setTweetMsg("");
  };

  return (
    <>
      <form onSubmit={sendTweet}>
        <div className={styles.tweet_form}>
          <Avatar
            className={styles.tweet_avatar}
            src={loginUser.photoUrl!}
            onClick={async () => {
              await auth.signOut();
            }}
          />
          <input
            className={styles.tweet_input}
            placeholder="What's happening?"
            type="text"
            autoFocus
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
          />
          <IconButton>
            {/* アイコンとインプットをlabelで囲うとアイコンクリックでダイアログが立ち上がる */}
            <label>
              <AddAPhoto
                className={
                  tweetImage ? styles.tweet_addIconLoaded : styles.tweet_addIcon
                }
              />
              <input
                className={styles.tweet_hiddenIcon}
                type="file"
                onChange={onChangeImageHandler}
              />
            </label>
          </IconButton>
        </div>
        <Button
          type="submit"
          disabled={!tweetMsg}
          className={
            tweetMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
          }
        >
          tweet
        </Button>
      </form>
    </>
  );
};

export default memo(TweetInput);
