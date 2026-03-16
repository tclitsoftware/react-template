import NotFoundPage from "modules/not-found/index.page";
import { useParams } from "react-router-dom";
import { useAppSelector } from "store";
import useProfileDetail from "./useProfileDetail";

export const profilePageRouteName = "/profile/:id";
const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { users } = useAppSelector(state => state.example);
  useProfileDetail();

  if (!id) return <NotFoundPage />

  const user = users[+id];
  if (!user) return <NotFoundPage />

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col gap-2 border border-black rounded-lg p-2 bg-white">
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
      </div>
    </div>
  )
}

export default ProfilePage;