import Input from "components/input";
import useProfileForm from "hooks/example/useProfileForm";
import { profilePageRouteName } from "modules/profile/features/create/index.page";
import { useAppDispatch, useAppSelector } from "store";
import { Link } from "react-router-dom";
import useCreateProfile from "./useCreateProfile";
import { toggleSideBar } from "store/global-components";

export const listProfilePageRouteName = "/profile";
const ListProfilePage = () => {
  const { saveProfileHandler, register, errors } = useProfileForm();
  const { users } = useAppSelector(state => state.example);
  useCreateProfile();
  const dispatch = useAppDispatch();

  const profilePage = (index: number): string => {
    return profilePageRouteName.replace(":id", index.toString())
  }

  const handleToggle = () => {
    dispatch(toggleSideBar());
  }

  return (
    <div className="grid grid-cols-2 items-start gap-4 p-4 bg-white h-screen">
      <form onSubmit={saveProfileHandler} className="flex flex-col gap-2 border border-black rounded-lg p-2">
        <Input label="Name" {...register("name")} error={errors.name} />
        <Input label="Email" {...register("email")} error={errors.email} />
        <button type="submit">Save Profile Info</button>
      </form>
      <div className="max-h-full overflow-y-scroll flex flex-col gap-4">
        {users.map((user, i) => (
          <Link to={profilePage(i)} key={`user-${i}`} className="flex flex-col gap-2 border border-black rounded-lg p-2">
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
          </Link>
        ))}
        <button className="border border-black" onClick={handleToggle}>
          Toggle Sidebar
        </button>
      </div>
    </div>
  )
}

export default ListProfilePage;