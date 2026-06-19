import * as yup from "yup";
import { pattenrns } from "../constants/constants";

export const schema = yup.object({
  name: yup.string().required("Необходимо заполнить «Имя»."),
  email: yup
    .string()
    .required("Необходимо заполнить «Email».")
    .test("valid-email", "Некорректный email", (text) => !!text && pattenrns.email.test(text)),
  options: yup.array().of(yup.string()).default([]),
  birthDate: yup
    .date()
    .typeError("Необходимо заполнить «Дата рождения».")
    .required("Необходимо заполнить «Дата рождения»."),
});

export type Schema = yup.InferType<typeof schema>;
