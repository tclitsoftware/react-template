import { profilePageRouteName } from "modules/profile/features/create/index.page";
import { Link } from "react-router-dom";
import { useAppSelector } from "store";

const ChildComponent = () => {
  const { users } = useAppSelector(state => state.example);

  const profilePage = (index: number): string => {
    return profilePageRouteName.replace(":id", index.toString())
  }

  return (
    <div className="max-h-full overflow-y-scroll flex flex-col gap-4">
      {users.map((user, i) => (
        <Link to={profilePage(i)} key={`user-${i}`} className="flex flex-col gap-2 border border-black rounded-lg p-2">
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
        </Link>
      ))}
    </div>
  )
}

export default ChildComponent;