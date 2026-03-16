interface UserI {
  id: number;
  name: string;
  email: string;
  followers: number;
}
const RenderValue = () => {
  const title: string = 'title';
  const followers: number = 0;
  const animalList: Array<String> = ["Gajah", "Harimau", "Jerapah"];
  const userList: Array<UserI> = [
    {
      id: 1,
      name: 'Toddler',
      email: 'example@toddler.com',
      followers: 0,
    }
  ]

  return (
    <>
      <div>Render value</div>
      <div>{title}</div>
      <div>{followers}</div>

      <div>Render array</div>
      {animalList.map((animal, i) =>
        <div key={`animal-${i}`}>
          {animal}
        </div>
      )}

      <div>Render array of object</div>
      {userList.map((user, i) =>
        <div key={`user-${i}`}>
          <div>
            <div>ID</div>
            <div>{user.id}</div>
          </div>
          <div>
            <div>Name</div>
            <div>{user.name}</div>
          </div>
          <div>
            <div>Email</div>
            <div>{user.email}</div>
          </div>
          <div>
            <div>Followers</div>
            <div>{user.followers}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default RenderValue;