import UserRow from "./UserRow";
import UserTableHead from "./UserTableHead";

export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
};

type Props = {
  users: User[];
  onDeleteUser: (id: number) => void;
};
export default function UsersTable({ users, onDeleteUser }: Props) {
  return (
    <table className="border">
      <UserTableHead />
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} onDeleteUser={onDeleteUser} />
        ))}
      </tbody>
    </table>
  );
}
