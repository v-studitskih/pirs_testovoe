import React, { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import Select from "./Select";
import Button from "./Button";
import { DatePicker } from "@mantine/dates";
import useClickOutside from "../hooks/useClickOutside";
import { getPhotoUrl } from "../mock/users";

type UserFormProps = {
  initialUsername?: string;
  initialEmail?: string;
  initialBirthdate?: string;
  initialFavoriteFoodIds?: number[];
  initialPhotoId?: number | null;
  onSubmit: (formData: FormData) => void;
  submitButtonText: string;
};

const UserForm = ({
  initialUsername = "",
  initialEmail = "",
  initialBirthdate = "",
  initialFavoriteFoodIds = [],
  initialPhotoId,
  onSubmit,
  submitButtonText,
}: UserFormProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>(initialUsername);
  const [email, setEmail] = useState<string>(initialEmail);
  const [birthDate, setBirthDate] = useState<string | null>(initialBirthdate);
  const [selectedFood, setSelectedFood] = useState<number[]>(
    initialFavoriteFoodIds,
  );

  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    birthdate?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    birthdate?: boolean;
  }>({});

  // закрытие календаря
  const calendarRef = useClickOutside(() => {
    setShowCalendar(false);
  });

  // синхронизация для редактирования
  useEffect(() => {
    if (initialUsername) setName(initialUsername);
    if (initialEmail) setEmail(initialEmail);

    if (initialBirthdate) {
      let formattedDate = initialBirthdate;
      if (initialBirthdate.includes(".")) {
        const [day, month, year] = initialBirthdate.split(".");
        formattedDate = `${year}-${month}-${day}`;
      }
      setBirthDate(formattedDate);
    }
    if (initialFavoriteFoodIds?.length) setSelectedFood(initialFavoriteFoodIds);
  }, [initialUsername, initialEmail, initialBirthdate, initialFavoriteFoodIds]);

  //   валидация
  const validate = (name: string, value: string) => {
    let error = "";

    if (name === "name" && !value.trim()) {
      error = "Необходимо заполнить «Имя».";
    }

    if (name === "email") {
      if (!value.trim()) {
        error = "Необходимо заполнить «Email».";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Некорректный email";
      }
    }

    if (name === "birthdate" && !value) {
      error = "Необходимо заполнить «Дата рождения».";
    }

    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  // обработка потери фокуса

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate(name, value);
  };

  const handleDateBlur = () => {
    setTouched((prev) => ({ ...prev, birthdate: true }));
    validate("birthdate", birthDate || "");
  };

  //   отправка формы
  const onSubmithandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({ name: true, email: true, birthdate: true });

    validate("name", name);
    validate("email", email);
    validate("birthdate", birthDate || "");

    if (errors.name || errors.email || errors.birthdate) {
      return;
    }

    const formData = new FormData();

    formData.append("username", name);
    formData.append("email", email);

    if (birthDate) {
      const [year, month, day] = birthDate.split("-");
      const formattedDate = `${day}.${month}.${year}`;
      formData.append("birthdate", formattedDate);
    }

    if (selectedFood.length > 0) {
      formData.append("favorite_food_ids[]", selectedFood.join(","));
    }

    image && formData.append("upload_photo", image);

    onSubmit(formData);
  };

  // для выбора даты из календаря
  const handleDataChange = (value: any) => {
    setBirthDate(value);
    setShowCalendar(false);
    if (errors.birthdate) setErrors({ ...errors, birthdate: undefined });
  };

  return (
    <form action="" onSubmit={onSubmithandler}>

      {/* аватарка*/}
      <div className="flex align-middle justify-center text-center mt-7.5">
        <label
          className="text-[#212529] text-base font-normal leading-6 cursor-pointer"
          htmlFor="image1"
        >
          <img
            className="w-[150px] h-[150px] rounded-full object-cover"
            src={
              image
                ? URL.createObjectURL(image)
                : initialPhotoId
                  ? getPhotoUrl(initialPhotoId)
                  : "http://tasks.tizh.ru/images/user-placeholder.png"
            }
            alt="аватарка"
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

      {/* имя */}
      <div className="w-full">
        <p className="text-[#212529] text-base font-normal leading-6 mb-1">
          Имя
        </p>
        <input
          name="name"
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlur}
          value={name}
          className={`w-full border px-3 py-2 rounded ${errors.name ? "border-red-500" : "border-[#dee2e6]"}`}
          type="text"
          required
        />
        {touched.name && errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Почта */}
      <div className="w-full">
        <p className="text-[#212529] text-base font-normal leading-6 mb-1">
          Email
        </p>
        <input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          value={email}
          className={`w-full border px-3 py-2 rounded ${errors.email ? "border-red-500" : "border-[#dee2e6]"}`}
          type="email"
          required
        />
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* дата рождения */}
      <div>
        <p className="text-[#212529] text-base font-normal leading-6 mb-1">
          Дата рождения
        </p>
        <div className="flex items-center">
          <div className="relative">

            {/* кнопка с календарем */}
            <button
              type="button"
              title="Выбрать дату"
              className="w-10.5 h-9.5 flex items-center justify-center border border-[#dee2e6] bg-[#f8f9fa] cursor-pointer rounded-l-sm"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#9BACB9"
                viewBox="0 0 16 16"
              >
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </button>

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute top-full left-0 mt-1 z-50 bg-white rounded-md shadow-lg border border-gray-200"
              >
                <DatePicker
                  value={birthDate}
                  onChange={handleDataChange}
                  locale="ru"
                />
              </div>
            )}
          </div>

            {/* кнопка для очистки */}
          <button
            type="button"
            title="Очистить поле"
            className="w-10.5 h-9.5 flex items-center justify-center border border-[#dee2e6] bg-[#f8f9fa] cursor-pointer"
            onClick={() => setBirthDate(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#9BACB9"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </button>

          <DateInput
            value={birthDate}
            clearable
            onBlur={handleDateBlur}
            onChange={(value) => {
              setBirthDate(value);
            }}
            valueFormat="DD.MM.YYYY"
            className="w-full"
            clearSectionMode="rightSection"
            styles={{
              input: {
                padding: "0.375rem 0.75rem",
                height: "38px",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "1.5",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                borderTopRightRadius: "0.25rem",
                borderBottomRightRadius: "0.25rem",
                borderColor: errors.birthdate ? "#ef4444" : "#dee2e6",
              },
            }}
          />
        </div>
        {touched.birthdate && errors.birthdate && (
          <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
        )}
      </div>

        {/* еда */}
      <div className="text-[#212529] text-base font-normal leading-6 mb-3">
        <p>Любимая еда</p>
        <Select selectedIds={selectedFood} onChange={setSelectedFood} />
      </div>

      <Button text={submitButtonText} type={"submit"} styles={"bg-[#198754]"} />
    </form>
  );
};

export default UserForm;
