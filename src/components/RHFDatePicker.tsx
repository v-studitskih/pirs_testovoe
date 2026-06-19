import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

type Props = {
  name: string;
  control: any;
  label: string;
};

const RHFDatePicker = ({ name, control, label }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const value = field.value ? new Date(field.value) : null;
        return (
          <DatePicker
            label={label}
            value={value}
            onChange={(date) => {
              field.onChange(date);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        );
      }}
    />
  );
};

export default RHFDatePicker;
