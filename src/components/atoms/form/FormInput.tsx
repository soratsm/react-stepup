import { ChangeEventHandler, memo, VFC } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type Props = {
  label: string;
  InputType: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
const FormInput: VFC<Props> = (props) => {
  const { label, InputType, value, onChange } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input type={InputType} value={value} onChange={onChange} />
    </FormControl>
  );
};

export default memo(FormInput);
