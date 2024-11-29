import { useState } from "react";
import UsersTable, { User } from "./components/UsersTable";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "ali", lastName: "komijani", email: "ali@gmail.com" },
    { id: 2, name: "ali", lastName: "komijani", email: "ali@gmail.com" },
    { id: 5, name: "ali", lastName: "komijani", email: "ali@gmail.com" },
    { id: 3, name: "ali", lastName: "komijani", email: "ali@gmail.com" },
    { id: 6, name: "ali", lastName: "komijani", email: "ali@gmail.com" },
  ]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = Object.fromEntries(formData.entries()) as unknown as User;
    const max = Math.max(...users.map((user) => user.id));
    setUsers([...users, { ...newUser, id: max + 1 }]);
    event.currentTarget.reset();
  };
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  return (
    <div className="container mx-auto p-2">
      <div className="flex items-start gap-3">
        <UsersTable users={users} onDeleteUser={handleDeleteUser} />
        <UserForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;
