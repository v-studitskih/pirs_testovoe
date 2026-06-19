import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Button } from "@mui/material";
import { type Schema, schema } from "../types/schema";
import RHFAutocomplete from "./RHFAutocomplete";
import { useEffect, useState } from "react";
import { useFoodList } from "../services/queries";
import RHFDateTimerPicker from "./RHFDatePicker";
import Avatar from "@mui/material/Avatar";
import type { User } from "../types/user";
import { parseDate, formatDate } from "../utils/dateUtils";
import RHFTextField from "./RHFTextField";

type Props = {
  user?: User;
  onSubmit: (data: FormData) => void;
  submitButtonText?: string;
};

const UserForm = ({
  user,
  onSubmit,
  submitButtonText = "Сохранить",
}: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const foodListQuery = useFoodList();

  const { control, reset, handleSubmit } = useForm<Schema>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      options: [],
      birthDate: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      console.log(new Date(user.birthdate));
      reset({
        name: user.username,
        email: user.email,
        options: user.favorite_food_ids?.map(String) || [],
        birthDate: user.birthdate ? parseDate(user.birthdate) : new Date(),
      });
    }
  }, [user, reset]);

  const onFormSubmit = (data: Schema) => {
    const formData = new FormData();
    formData.append("username", data.name);
    formData.append("email", data.email);
    if (data.birthDate) {
      formData.append("birthdate", formatDate(data.birthDate));
    }
    if (data.options && data.options.length > 0) {
      data.options.forEach((id) => {
        if (id) {
          formData.append("favorite_food_ids[]", id);
        }
      });
    }
    if (image) {
      formData.append("upload_photo", image);
    }

    onSubmit(formData);
  };

  return (
    <div className="pt-17.5 py-4 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">
      <div className="flex align-middle justify-center text-center">
        <label
          className="text-[#212529] text-base font-normal leading-6 cursor-pointer"
          htmlFor="image1"
        >
          <Avatar
            alt="аватарка"
            sx={{ margin: "0 auto", width: "150px", height: "150px" }}
            src={
              image
                ? URL.createObjectURL(image)
                : user?.photo_id
                  ? `http://tasks.tizh.ru/file/get?id=${user.photo_id}`
                  : "http://tasks.tizh.ru/images/user-placeholder.png"
            }
          />
          <input
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            type="file"
            id="image1"
            hidden
            accept="image/*"
          />
          <span className="block mt-2">Заменить</span>
        </label>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center", mt: 7.5 }}
        >
          <RHFTextField name="name" control={control} label="Имя" />

          <RHFTextField name="email" control={control} label="Email" />
          <RHFDateTimerPicker
            name="birthDate"
            label="Дата рождения"
            control={control}
          />
          <RHFAutocomplete
            name="options"
            label="Любимая еда"
            options={foodListQuery.data}
            control={control}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ alignSelf: "flex-start", mt: 2 }}
          >
            {submitButtonText}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default UserForm;
