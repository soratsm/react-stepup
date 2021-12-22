import { memo, VFC, useState } from "react";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../../api/firebase";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ResetEmailModal: VFC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const [resetEmail, setResetEmail] = useState("");

  const onChangeResetEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setResetEmail(e.target.value);
  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setResetEmail("");
        onClose();
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>Reset E-mail</FormLabel>
            <Input
              placeholder="email"
              value={resetEmail}
              onChange={onChangeResetEmail}
            />
            <IconButton
              aria-label={"sendResetEmail"}
              icon={<AiOutlineSend />}
              onClick={sendResetEmail}
            />
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(ResetEmailModal);
