import { useNavigate } from "react-router-dom";
// import {api} from '../api/wrapper'
import UserForm from "../components/UserForm";
import { addMockUser } from "../mock/users";

const CreateUser = () => {
  const navigate = useNavigate();

  // const handleSubmit = async (formData: FormData) => {
  //   try {
  //     const res = await api.createUser(formData as any)
  //     navigate(`/user/${res.id}`);
  //   } catch (error) {
  //     console.error("Ошибка при создании пользователя", error);

  //   }

  // };

  const handleSubmit = (formData: FormData) => {
    const newUser = {
      id: Date.now(),
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      birthdate: formData.get("birthdate") as string,
      favorite_food_ids:
        (formData.get("favorite_food_ids[]") as string)
          ?.split(",")
          .map(Number) || [],
      photo_id: Math.floor(Math.random() * 5),
    };

    addMockUser(newUser);
    navigate(`/user/view?id=${newUser.id}`);
  };

  return (
    <div className="pt-17.5 py-4 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">
      <UserForm onSubmit={handleSubmit} submitButtonText="Сохранить" />
    </div>
  );
};

export default CreateUser;
