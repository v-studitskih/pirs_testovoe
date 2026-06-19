import type { foodItem } from "../types/food";

export const getFoodNames = (
  ids: number[] | undefined,
  foodList: foodItem[] | undefined,
) => {
  const validIds = ids?.filter(Boolean) || [];

  if (!validIds.length) return "Всеядный";

  const names = validIds
    .map((id) => foodList?.find((item) => item.id === String(id))?.name)
    .filter(Boolean);

  return names.join(", ");
};
