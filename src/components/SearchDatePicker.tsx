import { DatePicker } from "@mui/x-date-pickers";
import { parseDate, formatDate } from "../utils/dateUtils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

const SearchDatePicker = ({ value, onChange, label }: Props) => {
  return (
    <DatePicker
      label={label}
      format="dd.MM.yyyy"
      sx={{ width: "7vw" }}
      value={value ? parseDate(value) : null}
      onChange={(date) => {
        onChange(date ? formatDate(date) : "");
      }}
     slotProps={{ field: { clearable: true } }}
    />
  );
};

export default SearchDatePicker;