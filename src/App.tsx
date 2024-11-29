import { useState } from "react";
import UsersTable, { User } from "./components/UsersTable";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = Object.fromEntries(formData.entries()) as unknown as User;
    if (user) {
      setUsers((oldUsers) =>
        oldUsers.map((u) => (user.id === u.id ? { ...newUser, id: u.id } : u))
      );
      setUser(undefined);
    } else {
      setUsers((old) => {
        const max = Math.max(...old.map((user) => user.id));
        return [...old, { ...newUser, id: max + 1 }];
      });
    }
    event.currentTarget.reset();
  };
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  const handleUpdateUser = (currentUser: User) => {
    setUser(currentUser);
  };
  return (
    <div className="container mx-auto p-2">
      <div className="flex items-start gap-3">
        <UsersTable
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
