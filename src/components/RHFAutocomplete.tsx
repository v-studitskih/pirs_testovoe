import { Box } from "@mui/material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { foodItem } from "../types/food";

type Props = {
  name: string;
  control: any;
  options?: foodItem[];
  label: string;
};

const RHFAutocomplete = ({ name, control, options, label }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref } }) => (
        <Autocomplete
          fullWidth
          options={options || []}
          value={
            Array.isArray(value)
              ? value
                  .map((id: string) => options?.find((item) => item.id === id))
                  .filter(Boolean)
              : []
          }
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option?.id)?.name ?? ""
          }
          isOptionEqualToValue={(option, newValue) =>
            option?.id === newValue?.id
          }
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item?.id));
          }}
          disableCloseOnSelect
          multiple
          renderInput={(params) => (
            <TextField label={label} {...params} fullWidth inputRef={ref} />
          )}
          renderOption={(props, option, { selected }) => {
            const { key, ...restProps } = props;
            return (
              <Box component="li" key={key} {...restProps}>
                <Checkbox checked={selected}  />
                {option?.name}
              </Box>
            );
          }}
        />
      )}
    />
  );
};

export default RHFAutocomplete;
