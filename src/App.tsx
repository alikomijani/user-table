import { useCallback, useEffect, useState } from "react";
import UsersTable, { User } from "./components/UsersTable";
import UserForm from "./components/UserForm";
import classNames from "classnames";
import { createUser, getUsers } from "./api/users";

function App() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [sort, setSort] = useState<string>("-id");

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
      const id = Math.max(...users.map((user) => user.id)) + 1;
      createUser({ ...newUser, id }).then(() => {
        getUsersFn();
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

  const getUsersFn = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getUsers({
        params: {
          _sort: sort,
        },
      });
      setUsers(res.data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [sort]);

  useEffect(() => {
    getUsersFn();
  }, [sort]);

  return (
    <div
      className={classNames(`container mx-auto p-2 `, { "bg-red-400": !!user })}
    >
      <div className="flex items-start gap-3 card">
        {error && (
          <div>
            در برقراری ارتباط با سرور خطایی رخ داده! لطفا بعدا تلاش نمایید
            <button onClick={getUsersFn}>تلاش مجدد</button>
          </div>
        )}
        {!error && isLoading && "دیتا در حال لود شدن هست"}

        {!error && !isLoading && (
          <UsersTable
            sort={sort}
            onSort={setSort}
            users={users}
            onDeleteUser={handleDeleteUser}
            onUpdateUser={handleUpdateUser}
          />
        )}
        <UserForm onSubmit={handleSubmit} currentUser={user} />
      </div>
    </div>
  );
}

export default App;
