import classNames from "classnames";
import UserRow from "./UserRow";
import UserTableHead from "./UserTableHead";
import classes from "./user-from.module.css";

export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
};

type Props = {
  users: User[];
  onDeleteUser: (id: number) => void;
  onUpdateUser: (user: User) => void;
};
export default function UsersTable({
  users,
  onDeleteUser,
  onUpdateUser,
}: Props) {
  return (
    <table className={classNames("border", classes.card)}>
      <UserTableHead />
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onDeleteUser={onDeleteUser}
            onUpdateUser={onUpdateUser}
          />
        ))}
      </tbody>
    </table>
  );
}
