import { useSearchParams, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

import { useUser } from "../services/queries";
import { useUpdateUser } from "../services/mutations";

const UpdateUser = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const userId = searchParams.get("id");

  const { data: user } = useUser(Number(userId));

  const updateUserMutation = useUpdateUser();

  const handleUpdateUser = (formData: FormData) => {
    updateUserMutation.mutate(
      { id: Number(userId), formData },
      {
        onSuccess: () => {
          navigate(`/user/view?id=${userId}`);
        },
      },
    );
  };
  return (
    <div className="pt-17.5 py-4 w-full px-4 mx-auto max-w-135 md:max-w-180 lg:max-w-240 xl:max-w-285 2xl:max-w-330">
      <UserForm user={user} onSubmit={handleUpdateUser} />
    </div>
  );
};

export default UpdateUser;
