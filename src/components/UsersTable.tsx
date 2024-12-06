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
  sort: string;
  onSort: (sort: string) => void;
};
export default function UsersTable({
  users,
  onDeleteUser,
  onUpdateUser,
  sort,
  onSort,
}: Props) {
  return (
    <table className={classNames("border", classes.card)}>
      <UserTableHead sort={sort} onSort={onSort} />
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
