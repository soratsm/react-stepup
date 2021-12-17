import styled from "@emotion/styled";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Button, Grid, ListItem, TextField } from "@mui/material";
import { ChangeEvent, memo, useState, VFC } from "react";

import { db } from "./firebase";

type Props = {
  id: string;
  dbtitle: string;
};

const TaskItem: VFC<Props> = (props) => {
  const { id, dbtitle } = props;
  const [title, setTitle] = useState(dbtitle);

  const onChangeEdit = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onClickEditTask = () => {
    // collection：documentを指定
    // id：targetを指定
    // set：値を指定
    // merge：特定の項目のみ更新
    db.collection("tasks").doc(id).set({ title: title }, { merge: true });
  };
  const onClickDeleteTask = () => {
    db.collection("tasks").doc(id).delete();
  };

  return (
    <ListItem>
      
      <SH2>{dbtitle}</SH2>
      <Grid container justifyContent={"flex-end"}>
        <STextField
          InputLabelProps={{ shrink: true }}
          label="Edit task"
          value={title}
          onChange={onChangeEdit}
        />
      </Grid>
      <SButton onClick={onClickEditTask}>
        <EditOutlined />
      </SButton>
      <SButton onClick={onClickDeleteTask}>
        <DeleteOutlined />
      </SButton>
    </ListItem>
  );
};

export default memo(TaskItem);

const SH2 = styled.h2`
  width: 10px;
  margin-right:5em;
`;

const STextField = styled(TextField)`
  width: 10em;
`;
const SButton = styled(Button)`
  margin-left: 2px;
  color: dimgray;
`;
