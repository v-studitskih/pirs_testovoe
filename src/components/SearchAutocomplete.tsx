import { Box } from "@mui/material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import type { foodItem } from "../types/food";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  options?: foodItem[];
  placeholder?: string;
};

const SearchAutocomplete = ({ value, onChange, onKeyDown, options, placeholder }: Props) => {
  return (
    <Autocomplete
      multiple
      fullWidth
      options={options || []}
      value={options?.filter((item) => value.includes(item.id)) || []}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
      onChange={(_, newValue) => {
        onChange(newValue.map((item) => item.id));
      }}
      onKeyDown={onKeyDown}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
        />
      )}
      renderOption={(props, option, { selected }) => {
        const { key, ...restProps } = props;
        return (
          <Box component="li" key={key} {...restProps}>
            <Checkbox checked={selected} />
            {option.name}
          </Box>
        );
      }}
    />
  );
};

export default SearchAutocomplete;