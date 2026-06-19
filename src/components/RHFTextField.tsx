import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

type Props = {
  name: string;
  control: any;
  label: string;
};

const RHFTextField = ({ name, control, label }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default RHFTextField;
