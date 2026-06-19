import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { useCreateUser } from "../services/mutations";

const CreateUser = () => {
  const navigate = useNavigate();

  const createUserMutation = useCreateUser();

  const handleCreateUser = (formData: FormData) => {
    createUserMutation.mutate(formData, {
      onSuccess: (data) => {
        navigate(`/user/view?id=${data.id}`);
      },
    });
  };

  return (
    <div className="pt-17.5 py-4 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">
      <UserForm onSubmit={handleCreateUser} submitButtonText="Сохранить" />
    </div>
  );
};

export default CreateUser;