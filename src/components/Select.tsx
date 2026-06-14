
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { food } from "../constants/food";

type Props = {
  selectedIds?: number[];
  onChange?: (ids: number[]) => void;
};

const Select = ({ selectedIds = [], onChange }: Props) => {
  const allOption = { name: "Выбрать все", id: "all" };
  const allFood = [allOption, ...food];

  // обработка выбора
  const handleChange = (e: any) => {
    const value = e.value;

    // если выбраны все опции
    if (value && value.some((v: any) => v.id === "all") && onChange) {
      onChange(food.map((f) => f.id));
    } else if (onChange) {
      onChange(value?.map((v: any) => v.id) || []);
    }
  };

  // очистка 
  const clearAll = () => {
    onChange?.([]);
  };

  return (
    <div className="relative w-full">
      <style>{`
        .p-multiselect .p-multiselect-trigger {
          display: none !important;
        }
        .p-checkbox {
          display: none !important;
        }
        .p-multiselect-header {
          display: none !important;
        }
        
      `}</style>

      <MultiSelect
        value={food.filter((f) => selectedIds.includes(f.id))}
        options={allFood}
        onChange={handleChange}
        optionLabel="name"
        className="w-full wrap"
        display="chip"
        showSelectAll={false}
      />

      {selectedIds.length > 0 && (
        <button
          onClick={clearAll}
          className="absolute right-2 top-1/2 -translate-y-1/2 -translate-2  text-2xl text-[#6c757d] hover:text-black "
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Select;
