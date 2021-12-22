import { memo, VFC } from "react";
import { Box, IconButton,Input } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  file: File;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const IconFileButton: VFC<Props> = (props) => {
  const { file, onChange} = props;
  return (
    <Box textAlign={"center"}>
      <IconButton aria-label={"account"} size={"sm"}>
        <label>
          <FaUserCircle
            size="50px"
            cursor={"pointer"}
            color={file ? "whitesmoke" : "gray"}
          />
          <Input
            type="file"
            textAlign={"center"}
            display={"none"}
            onChange={onChange}
          />
        </label>
      </IconButton>
    </Box>
  );
};

export default memo(IconFileButton);
