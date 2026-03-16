import Input from "components/input";
import useProfileForm from "hooks/example/useProfileForm";
import ChildComponent from "./component";

export const listProfilePageRouteName = "/profile";
const ListProfilePage = () => {
  const { saveProfileHandler, register, errors } = useProfileForm();
  return (
    <div className="grid grid-cols-2 items-start gap-4 p-4 bg-white h-screen">
      <form onSubmit={saveProfileHandler} className="flex flex-col gap-2 border border-black rounded-lg p-2">
        <Input label="Name" {...register("name")} error={errors.name} />
        <Input label="Email" {...register("email")} error={errors.email} />
        <button type="submit">Save Profile Info</button>
      </form>
      <ChildComponent />
    </div>
  )
}

export default ListProfilePage;