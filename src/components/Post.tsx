import React, {
  memo,
  useState,
  useEffect,
  VFC,
  FormEvent,
  ChangeEvent,
} from "react";
import styles from "./Post.module.css";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useRecoilValue } from "recoil";
import { Avatar } from "@mui/material";
import { LoginUser } from "./../store/LoginUser";
import Send from "@mui/icons-material/Send";
import { Message } from "@mui/icons-material";

type Props = {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
};

type Comment = {
  id: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: string;
};

const Post: VFC<Props> = (props) => {
  const { postId, avatar, image, text, timestamp, username } = props;
  const loginUser = useRecoilValue(LoginUser);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "",
      avatar: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);
  const [openComments, setOpenComments] = useState(false);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            text: doc.data().text,
            username: doc.data().username,
            timestamp: doc.data().timestamp,
          }))
        );
      });
    return () => {
      unSub();
    };
  }, [postId]);
  const newComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      avatar: loginUser.photoUrl,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: loginUser.displayName,
    });
    setComment("");
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_avatar}>
        <Avatar src={avatar} />
      </div>
      <div className={styles.post_body}>
        <div>
          <div className={styles.post_header}>
            <h3>
              <span className={styles.post_headerUser}>@{username}</span>
              <span className={styles.post_headerTime}>
                {new Date(timestamp?.toDate()).toLocaleString()}
              </span>
            </h3>
          </div>
          <div className={styles.post_tweet}>
            <p>{text}</p>
          </div>
        </div>
        {image && (
          <div className={styles.post_tweetImage}>
            <img src={image} alt="tweet" />
          </div>
        )}
        <Message
          className={styles.post_commentIcon}
          onClick={() => setOpenComments(!openComments)}
        />
        {openComments && (
          <>
            {comments.map((com) => (
              <div key={com.id} className={styles.post_comment}>
                <Avatar src={com.avatar} sx={{ width: 24, height: 24 }} />
                <span className={styles.post_commentUser}>@{com.username}</span>
                <span className={styles.post_commentText}>{com.text}</span>
                <span className={styles.post_headerTime}>
                  {new Date(com.timestamp?.toDate()).toLocaleString()}
                </span>
              </div>
            ))}
            <form onSubmit={newComment}>
              <div className={styles.post_form}>
                <input
                  className={styles.post_input}
                  type="text"
                  placeholder={"Type new comment..."}
                  value={comment}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                  }
                />
                <button
                  disabled={!comment}
                  className={
                    comment ? styles.post_button : styles.post_buttonDisable
                  }
                  type={"submit"}
                >
                  <Send className={styles.post_sendIcon} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Post);
