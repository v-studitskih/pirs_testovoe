import { TextField } from "@mui/material";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
};

const SearchTextField = ({ value, onChange, onKeyDown, placeholder }: Props) => {
  return (
    <TextField
      type="search"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      slotProps={{ inputLabel: { shrink: true } }}
    />
  );
};

export default SearchTextField;