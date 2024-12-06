import { useReducer, useState } from "react";
import UsersTable, { User } from "./components/UsersTable";
import UserForm from "./components/UserForm";
import classNames from "classnames";
import { userReducer } from "./reducers/user.reducer";

function App() {
  const [user, setUser] = useState<User>();
  const [users, dispatch] = useReducer(userReducer, []);
  const [sort, setSort] = useState<string>("-id");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = Object.fromEntries(formData.entries()) as unknown as User;
    if (user) {
      dispatch({ type: "UPDATE", payload: { ...newUser, id: user.id } });
      setUser(undefined);
    } else {
      dispatch({ type: "ADD", payload: newUser });
    }
    event.currentTarget.reset();
  };
  const handleDeleteUser = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const handleUpdateUser = (currentUser: User) => {
    setUser(currentUser);
  };

  return (
    <div
      className={classNames(`container mx-auto p-2 `, { "bg-red-400": !!user })}
    >
      <div className="flex items-start gap-3 card">
        <UsersTable
          sort={sort}
          onSort={setSort}
          users={users}
          onDeleteUser={handleDeleteUser}
          onUpdateUser={handleUpdateUser}
        />
        <UserForm onSubmit={handleSubmit} currentUser={user} />
      </div>
    </div>
  );
}

export default App;
