import { useState, useEffect, VFC, ChangeEvent, MouseEvent } from "react";
import { Box, Button, FormControl, List, TextField } from "@mui/material";
import { AddToPhotos, ExitToApp } from "@mui/icons-material";

import { db, auth } from "./firebase";
import TaskItem from "./TaskItem";
import styled from "@emotion/styled";

const App: VFC<any> = (props) => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");

  // firebaseからの取得部分
  useEffect(() => {
    // onSnapshot：dbに変化があった場合シャッターを押して値を取得してくれるイメージ
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }))
      );
    });
    // このコンポーネントがアンマウントされた時に走る
    // ここではsnapshotのサブスクを削除する
    return () => {
      unSub();
    };
  }, []);

  // firebaseからログアウトした場合にログインを促すよう遷移する
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.phsh("/login");
    });
    return () => {
      unSub();
    };
  }, [props.history]);

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  // firebaseへの登録部分
  const onClickNewTask = (e: MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input });
    setInput("");
  };

  return (
    <SBox>
      <SH1>ToDo APP by React/Firebase</SH1>
      <SLogoutButton
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("/login");
          } catch (error: any) {
            alert(error.message);
          }
        }}
      >
        <ExitToApp />
      </SLogoutButton>
      <br />
      <FormControl>
        <STextField
          InputLabelProps={{ shrink: true }}
          label="New task ?"
          value={input}
          onChange={onChangeTask}
        />
      </FormControl>
      <SIconButton disabled={!input} onClick={onClickNewTask}>
        <AddToPhotos />
      </SIconButton>
      <SList>
        {tasks.map((task) => (
          // mapを使う場合はkeyを忘れない！！
          <TaskItem key={task.id} id={task.id} dbtitle={task.title} />
        ))}
      </SList>
    </SBox>
  );
};

export default App;

const SBox = styled(Box)`
  text-align: center;
  color: dimgray;
  font-family: serif;
`;

const SIconButton = styled(Button)`
  margin-top: 30px;
  color: dimgray;
  button: disabled {
    color: #ccc;
    cursor: none;
  }
`;

const SLogoutButton = styled(Button)`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  color: dimgray;
  margin-left: 10px;
  button: disabled {
    color: #ccc;
    cursor: none;
  }
`;

const SH1 = styled.h1`
  display: inline-block;
`;

const STextField = styled(TextField)`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const SList = styled(List)`
  margin: auto;
  width: 40%;
`;
