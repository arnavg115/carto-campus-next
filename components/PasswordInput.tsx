import { Box, Button, TextInput } from "grommet";
import { Hide, View } from "grommet-icons";
import { FC, useState } from "react";
import { colors } from "../lib/Constants";

import { PassWordInputProps } from "../lib/types";

export const PasswordInput: FC<PassWordInputProps> = ({
  password,
  setPassword,
  size,
}) => {
  const [view, setView] = useState(false);
  return (
    <Box fill="horizontal" direction="row" gap="small">
      <TextInput
        type={view ? "text" : "password"}
        value={password}
        onChange={setPassword}
        placeholder="Password"
        size={size || "medium"}
      />
      <Button
        label=""
        secondary
        color={colors.basic.three}
        onClick={() => {
          setView(!view);
        }}
        icon={!view ? <View /> : <Hide />}
      />
    </Box>
  );
};
